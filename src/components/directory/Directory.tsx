import {
  Card,
  ColorPicker,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { InvalidTokenError } from 'jwt-decode';
import {
  ChangeEvent,
  ComponentType,
  Suspense,
  useEffect,
  useReducer,
} from 'react';
import {
  ErrorBoundary,
  FallbackProps,
  useErrorBoundary,
} from 'react-error-boundary';
import { TbBrandMastodon, TbPhotoOff } from 'react-icons/tb';
import {
  TiSocialDribbble,
  TiSocialFlickr,
  TiSocialGithub,
  TiSocialLinkedin,
} from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { Edge, Node } from 'reactflow';

import { authAction } from '../../context/authProvider';
import { globalAction } from '../../context/globalProvider/state';
import { useAuth, useGlobalState } from '../../hooks';
import { Department, JobPosition, StoreLocation } from '../../types';
import {
  addFieldsToObject,
  fetchData,
  logState,
  urlBuilder,
  wrapPromise,
} from '../../utils';
import ErrorFallback from '../errorFallback/ErrorFallback';
import NodeBuilder from '../nodeBuilder/NodeBuilder';
import { FlowNode } from '../nodeBuilder/types';
import {
  directoryAction,
  directoryReducer,
  initialDirectoryState,
} from './state';
import { FetchUsersDirectoryResponse, DirectoryUserDocument } from './types';
import { returnDirectoryProfileCard } from './utils';
import { create } from 'domain';
import localforage from 'localforage';
import { AccessibleSelectInputCreatorInfo } from '../wrappers';
import {
  DEPARTMENT_DATA,
  JOB_POSITION_DATA,
  STORE_LOCATION_DATA,
} from '../../constants/data';
import { returnAccessibleSelectInputElements } from '../../jsxCreators';

function Directory() {
  // ┏━ begin hooks ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const [directoryState, directoryDispatch] = useReducer(
    directoryReducer,
    initialDirectoryState
  );
  const {
    groupedByDepartment,
    groupedByJobPositon,
    groupedByStoreLocation,

    filterByDepartment,
    filterByJobPosition,
    filterByStoreLocation,

    layoutDirection,
    triggerSetDepartmentsNodesAndEdges,
    departmentsNodesAndEdges,
  } = directoryState;

  const {
    authState: { accessToken },
  } = useAuth();

  const {
    globalDispatch,
    globalState: { padding, rowGap },
  } = useGlobalState();

  const { showBoundary } = useErrorBoundary();

  const navigate = useNavigate();

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end hooks ━┛

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchUsers(): Promise<void> {
      directoryDispatch({
        type: directoryAction.setIsLoading,
        payload: true,
      });
      directoryDispatch({
        type: directoryAction.setLoadingMessage,
        payload: 'Please wait. Fetching directory ...',
      });

      const url: URL = urlBuilder({
        path: 'user/directory',
      });

      const request: Request = new Request(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        signal: controller.signal,
      });

      try {
        const response = await fetch(request);
        const data: { message: string; resourceData: DirectoryUserDocument[] } =
          await response.json();
        if (!isMounted) {
          return;
        }

        const { ok } = response;
        if (!ok) {
          throw new Error(data.message);
        }

        directoryDispatch({
          type: directoryAction.setGroupedByDepartment,
          payload: data.resourceData,
        });
        directoryDispatch({
          type: directoryAction.setGroupedByJobPositon,
          payload: data.resourceData,
        });
        directoryDispatch({
          type: directoryAction.setGroupedByStoreLocation,
          payload: data.resourceData,
        });

        // set data to local forage to prevent refetches on every refresh
        localforage.setItem<DirectoryUserDocument[]>(
          'directory',
          data.resourceData
        );

        console.log('data from fetchUsers()', data);
      } catch (error: any) {
        if (!isMounted) {
          return;
        }
        if (error.name === 'AbortError') {
          return;
        }

        const errorMessage =
          error instanceof InvalidTokenError
            ? 'Invalid token. Please login again.'
            : !error.response
            ? 'Network error. Please try again.'
            : error.message ?? 'Unknown error occured. Please try again.';

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate('/portal');

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: '',
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        directoryDispatch({
          type: directoryAction.setIsLoading,
          payload: false,
        });
        directoryDispatch({
          type: directoryAction.setLoadingMessage,
          payload: '',
        });
      }
    }

    // only fetch if there is no directory in local forage
    async function checkLocalForageBeforeFetch(): Promise<void> {
      const directory = await localforage.getItem('directory');
      if (directory) {
        return;
      }

      await fetchUsers();
    }

    checkLocalForageBeforeFetch();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // on every mount, check if there is a directory in local forage
  useEffect(() => {
    let isMounted = true;

    async function checkLocalForage(): Promise<void> {
      const directory = await localforage.getItem<DirectoryUserDocument[]>(
        'directory'
      );
      if (!isMounted || !directory || !directory.length) {
        return;
      }

      // if present, set following state from local forage
      directoryDispatch({
        type: directoryAction.setGroupedByDepartment,
        payload: directory,
      });
      directoryDispatch({
        type: directoryAction.setGroupedByJobPositon,
        payload: directory,
      });
      directoryDispatch({
        type: directoryAction.setGroupedByStoreLocation,
        payload: directory,
      });
    }

    checkLocalForage();

    return () => {
      isMounted = false;
    };
  }, []);

  // once groupedByDepartment is set, trigger effect to set departments nodes and edges
  useEffect(() => {
    if (!Object.keys(groupedByDepartment).length) {
      return;
    }

    directoryDispatch({
      type: directoryAction.setTriggerSetDepartmentsNodesAndEdges,
      payload: true,
    });
  }, [groupedByDepartment]);

  useEffect(() => {
    if (!Object.keys(groupedByDepartment).length) {
      return;
    }
    // ┏━ begin store locations node creation ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const initialStoreLocationNode: Node = {
      id: 'starting-node-storeLocation',
      type: 'default',
      data: { label: 'Store Locations' },
      position: { x: 0, y: 0 },
      style: { width: 351, height: 217 },
    };

    const storeLocationsNodes = STORE_LOCATION_DATA.reduce(
      (storeLocationsNodesAcc: Node[], storeLocation: string) => {
        const storeLocationNode: Node = {
          id: `storeLocation-${storeLocation}`,
          type: 'default',
          data: { label: storeLocation },
          position: { x: 0, y: 0 },
          style: { width: 351, height: 217 },
        };
        storeLocationsNodesAcc.push(storeLocationNode);

        return storeLocationsNodesAcc;
      },
      [initialStoreLocationNode]
    );

    directoryDispatch({
      type: directoryAction.setDepartmentsNodesAndEdges,
      payload: {
        department: 'Store Locations',
        kind: 'nodes',
        data: storeLocationsNodes,
      },
    });
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end store locations node creation ━┛

    // ┏━ begin store locations edge creation ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const startingStoreLocationNodeId = initialStoreLocationNode.id;
    const edgesFromStartingStoreLocationToEachStoreLocations =
      storeLocationsNodes.reduce(
        (storeLocationsEdgesAcc: Edge[], storeLocationNode: Node) => {
          const { id: storeLocationNodeId } = storeLocationNode;

          if (storeLocationNodeId === startingStoreLocationNodeId) {
            return storeLocationsEdgesAcc;
          }

          const storeLocationEdge: Edge = {
            id: `${startingStoreLocationNodeId}-${storeLocationNodeId}`,
            source: startingStoreLocationNodeId,
            target: storeLocationNodeId,
            type: 'smoothstep',
            animated: true,
            // label: jobPosition,
            labelBgPadding: [8, 4],
            labelBgBorderRadius: 4,
            labelBgStyle: { fill: 'white' },
            labelStyle: { fill: 'black', fontWeight: 700 },
            style: { stroke: 'black' },
          };

          storeLocationsEdgesAcc.push(storeLocationEdge);

          return storeLocationsEdgesAcc;
        },
        []
      );

    const executiveManagements =
      groupedByDepartment['Executive Management'] ?? [];
    // find all ids except ceo
    const executiveManagementIds = executiveManagements.reduce(
      (
        executiveManagementIdsAcc: Record<string, string>,
        userDocument: DirectoryUserDocument
      ) => {
        const { _id, jobPosition } = userDocument;

        if (jobPosition === 'Chief Executive Officer') {
          return executiveManagementIdsAcc;
        }

        executiveManagementIdsAcc = addFieldsToObject({
          object: executiveManagementIdsAcc,
          fieldValuesTuples: [[jobPosition, _id]],
        });

        return executiveManagementIdsAcc;
      },
      Object.create(null)
    );

    // set edges from each executive managements (except ceo) to starting store location node
    const storeLocationsEdges = Object.entries(executiveManagementIds).reduce(
      (storeLocationsEdgesAcc: Edge[], [_, executiveManagementId]) => {
        const storeLocationEdge: Edge = {
          id: `${executiveManagementId}-${startingStoreLocationNodeId}`,
          source: executiveManagementId,
          target: startingStoreLocationNodeId,
          type: 'smoothstep',
          animated: true,
          // label: jobPosition,
          labelBgPadding: [8, 4],
          labelBgBorderRadius: 4,
          labelBgStyle: { fill: 'white' },
          labelStyle: { fill: 'black', fontWeight: 700 },
          style: { stroke: 'black' },
        };

        storeLocationsEdgesAcc.push(storeLocationEdge);

        return storeLocationsEdgesAcc;
      },
      [...edgesFromStartingStoreLocationToEachStoreLocations]
    );

    directoryDispatch({
      type: directoryAction.setDepartmentsNodesAndEdges,
      payload: {
        department: 'Store Locations',
        kind: 'edges',
        data: storeLocationsEdges,
      },
    });
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end store locations edge creation ━┛
  }, [
    filterByDepartment,
    filterByJobPosition,
    filterByStoreLocation,
    layoutDirection,
    triggerSetDepartmentsNodesAndEdges,
  ]);

  // ┏━ begin main node & edges effect ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  useEffect(() => {
    if (!Object.keys(departmentsNodesAndEdges).length) {
      return;
    }
    if (!Object.keys(groupedByDepartment).length) {
      return;
    }

    // ┏━ begin defaults ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    const storeLocations = ['Edmonton', 'Calgary', 'Vancouver'];
    const nodePosition = { x: 0, y: 0 };
    const nodeDimensions = { width: 351, height: 217 };
    const edgeDefaults: Edge = {
      // will be overwritten
      id: '',
      source: '',
      target: '',
      // defaults shared across all edges
      type: 'smoothstep',
      animated: true,
      // label: 'has subordinates',
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: 'white' },
      labelStyle: { fill: 'black', fontWeight: 700 },
      style: { stroke: 'black' },
    };

    const storeLocationsNodes =
      departmentsNodesAndEdges?.['Store Locations']?.nodes;

    if (!storeLocationsNodes) {
      return;
    }

    // edmonton store location node id
    const edmontonStoreLocationSourceId = storeLocationsNodes.find(
      (storeLocationNode: Node) =>
        storeLocationNode.id === 'storeLocation-Edmonton'
    )?.id as string;

    // calgary store location node id
    const calgaryStoreLocationSourceId = storeLocationsNodes.find(
      (storeLocationNode: Node) =>
        storeLocationNode.id === 'storeLocation-Calgary'
    )?.id as string;

    // vancouver store location node id
    const vancouverStoreLocationSourceId = storeLocationsNodes.find(
      (storeLocationNode: Node) =>
        storeLocationNode.id === 'storeLocation-Vancouver'
    )?.id as string;

    // ━━━━━ end defaults ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

    // ┏━ begin executive management ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setExecutiveManagementEdgesAndNodes() {
      const executiveManagementDocs =
        groupedByDepartment['Executive Management'] ?? [];

      const executiveManagementDocsNodes = executiveManagementDocs.reduce(
        (
          executiveManagementNodesAcc: Node[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, jobPosition } = userDocument;

          const directoryProfileCard = returnDirectoryProfileCard({
            userDocument,
            padding,
            rowGap,
          });

          const displayProfileCard = (
            <Group
              w="100%"
              h="100%"
              onClick={() => {
                console.log('executive management node clicked');
              }}
            >
              {directoryProfileCard}
            </Group>
          );

          const executiveManagementNode: Node = {
            id: _id,
            type:
              jobPosition === 'Chief Executive Officer' ? 'input' : 'default',
            data: { label: displayProfileCard },
            position: { x: 0, y: 0 },
            style: nodeDimensions,
          };
          executiveManagementNodesAcc.push(executiveManagementNode);

          return executiveManagementNodesAcc;
        },
        []
      );

      const ceoId =
        executiveManagementDocs.find(
          (userDocument: DirectoryUserDocument) =>
            userDocument.jobPosition === 'Chief Executive Officer'
        )?._id ?? '';

      const executiveManagementEdges = executiveManagementDocs.reduce(
        (
          executiveManagementEdgesAcc: Edge[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, jobPosition } = userDocument;

          if (jobPosition === 'Chief Executive Officer') {
            return executiveManagementEdgesAcc;
          }

          const executiveManagementEdge: Edge = {
            ...edgeDefaults,
            id: `${ceoId}-${_id}`, // source-target
            source: ceoId,
            target: _id,
          };
          executiveManagementEdgesAcc.push(executiveManagementEdge);

          return executiveManagementEdgesAcc;
        },
        []
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Executive Management',
          kind: 'nodes',
          data: executiveManagementDocsNodes,
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Executive Management',
          kind: 'edges',
          data: executiveManagementEdges,
        },
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end executive management ━┛

    // ┏━ begin administrative department ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setAdministrativeDepartmentEdgesAndNodes() {
      const administrativeDepartmentDocs =
        groupedByDepartment.Administrative ?? [];

      // starting administrative nodes for each store location
      const [
        edmontonAdministrativeStartingNode,
        calgaryAdministrativeStartingNode,
        vancouverAdministrativeStartingNode,
      ]: FlowNode[] = storeLocations.map((store) => {
        const initialAdministrativeDepartmentDocNode: FlowNode = {
          id: `administrative-department-${store}`,
          type: 'default',
          data: { label: `${store} Administrative Department` },
          position: nodePosition,
          style: nodeDimensions,
        };

        return initialAdministrativeDepartmentDocNode;
      });

      const administrativeDepartmentDocsNodes =
        administrativeDepartmentDocs.reduce(
          (
            administrativeDepartmentNodesAcc: Node[],
            userDocument: DirectoryUserDocument
          ) => {
            const { _id } = userDocument;
            const displayProfileCard = returnDirectoryProfileCard({
              userDocument,
              padding,
              rowGap,
            });

            const administrativeDepartmentNode: Node = {
              id: _id,
              type: 'output',
              data: { label: displayProfileCard },
              position: nodePosition,
              style: nodeDimensions,
            };
            administrativeDepartmentNodesAcc.push(administrativeDepartmentNode);

            return administrativeDepartmentNodesAcc;
          },

          [
            edmontonAdministrativeStartingNode,
            calgaryAdministrativeStartingNode,
            vancouverAdministrativeStartingNode,
          ]
        );

      // edmonton administrative node id
      const edmontonAdministrativeSourceId =
        edmontonAdministrativeStartingNode.id;

      // edge from edmonton store location to edmonton administrative node
      const edmontonStoreLocationToEdmontonAdministrativeEdge: Edge = {
        ...edgeDefaults,
        id: `${edmontonStoreLocationSourceId}-${edmontonAdministrativeSourceId}`, // source-target
        source: edmontonStoreLocationSourceId,
        target: edmontonAdministrativeSourceId,
      };

      const edmontonAdministrativeEdges = administrativeDepartmentDocs.reduce(
        (
          edmontonAdministrativeEdgesAcc: Edge[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, storeLocation } = userDocument;

          if (storeLocation === 'Vancouver' || storeLocation === 'Calgary') {
            return edmontonAdministrativeEdgesAcc;
          }

          const edmontonAdministrativeEdge: Edge = {
            ...edgeDefaults,
            id: `${edmontonAdministrativeSourceId}-${_id}`, // source-target
            source: edmontonAdministrativeSourceId,
            target: _id,
          };
          edmontonAdministrativeEdgesAcc.push(edmontonAdministrativeEdge);

          return edmontonAdministrativeEdgesAcc;
        },
        [edmontonStoreLocationToEdmontonAdministrativeEdge]
      );

      // calgary administrative node id
      const calgaryAdministrativeSourceId =
        calgaryAdministrativeStartingNode.id;

      // edge from calgary store location to calgary administrative node
      const calgaryStoreLocationToCalgaryAdministrativeEdge: Edge = {
        ...edgeDefaults,
        id: `${calgaryStoreLocationSourceId}-${calgaryAdministrativeSourceId}`, // source-target
        source: calgaryStoreLocationSourceId,
        target: calgaryAdministrativeSourceId,
      };

      const calgaryAdministrativeEdges = administrativeDepartmentDocs.reduce(
        (
          calgaryAdministrativeEdgesAcc: Edge[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, storeLocation } = userDocument;

          if (storeLocation === 'Vancouver' || storeLocation === 'Edmonton') {
            return calgaryAdministrativeEdgesAcc;
          }

          const calgaryAdministrativeEdge: Edge = {
            ...edgeDefaults,
            id: `${calgaryAdministrativeSourceId}-${_id}`, // source-target
            source: calgaryAdministrativeSourceId,
            target: _id,
          };
          calgaryAdministrativeEdgesAcc.push(calgaryAdministrativeEdge);

          return calgaryAdministrativeEdgesAcc;
        },
        [calgaryStoreLocationToCalgaryAdministrativeEdge]
      );

      // vancouver administrative node id
      const vancouverAdministrativeSourceId =
        vancouverAdministrativeStartingNode.id;

      // edge from vancouver store location to vancouver administrative node
      const vancouverStoreLocationToVancouverAdministrativeEdge: Edge = {
        ...edgeDefaults,
        id: `${vancouverStoreLocationSourceId}-${vancouverAdministrativeSourceId}`, // source-target
        source: vancouverStoreLocationSourceId,
        target: vancouverAdministrativeSourceId,
      };

      const vancouverAdministrativeEdges = administrativeDepartmentDocs.reduce(
        (
          vancouverAdministrativeEdgesAcc: Edge[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, storeLocation } = userDocument;

          if (storeLocation === 'Edmonton' || storeLocation === 'Calgary') {
            return vancouverAdministrativeEdgesAcc;
          }

          const vancouverAdministrativeEdge: Edge = {
            ...edgeDefaults,
            id: `${vancouverAdministrativeSourceId}-${_id}`, // source-target
            source: vancouverAdministrativeSourceId,
            target: _id,
          };
          vancouverAdministrativeEdgesAcc.push(vancouverAdministrativeEdge);

          return vancouverAdministrativeEdgesAcc;
        },
        [vancouverStoreLocationToVancouverAdministrativeEdge]
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Administrative',
          kind: 'nodes',
          data: administrativeDepartmentDocsNodes,
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Administrative',
          kind: 'edges',
          data: [
            ...edmontonAdministrativeEdges,
            ...calgaryAdministrativeEdges,
            ...vancouverAdministrativeEdges,
          ],
        },
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end administrative department ━┛

    // ┏━ begin sales and marketing department ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setSalesAndMarketingEdgesAndNodes() {
      const salesAndMarketingDocs =
        groupedByDepartment['Sales and Marketing'] ?? [];

      // starting sales and marketing nodes for each store location
      const [
        edmontonSalesAndMarketingStartingNode,
        calgarySalesAndMarketingStartingNode,
        vancouverSalesAndMarketingStartingNode,
      ]: FlowNode[] = storeLocations.map((store) => {
        const initialSalesAndMarketingDepartmentDocNode: FlowNode = {
          id: `sales-and-marketing-department-${store}`,
          type: 'default',
          data: { label: `${store} Sales and Marketing Department` },
          position: nodePosition,
          style: nodeDimensions,
        };

        return initialSalesAndMarketingDepartmentDocNode;
      });

      const salesAndMarketingDocsNodes = salesAndMarketingDocs.reduce(
        (
          salesAndMarketingNodesAcc: Node[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id } = userDocument;

          const displayProfileCard = returnDirectoryProfileCard({
            userDocument,
            padding,
            rowGap,
          });

          const salesAndMarketingNode: Node = {
            id: _id,
            type: 'output',
            data: { label: displayProfileCard },
            position: nodePosition,
            style: nodeDimensions,
          };
          salesAndMarketingNodesAcc.push(salesAndMarketingNode);

          return salesAndMarketingNodesAcc;
        },
        [
          edmontonSalesAndMarketingStartingNode,
          calgarySalesAndMarketingStartingNode,
          vancouverSalesAndMarketingStartingNode,
        ]
      );

      // edmonton sales and marketing node id
      const edmontonSalesAndMarketingSourceId =
        edmontonSalesAndMarketingStartingNode.id;

      // edge from edmonton store location to edmonton sales and marketing node
      const edmontonStoreLocationToEdmontonSalesAndMarketingEdge: Edge = {
        ...edgeDefaults,
        id: `${edmontonStoreLocationSourceId}-${edmontonSalesAndMarketingSourceId}`, // source-target
        source: edmontonStoreLocationSourceId,
        target: edmontonSalesAndMarketingSourceId,
      };

      const edmontonSalesAndMarketingEdges = salesAndMarketingDocs.reduce(
        (
          edmontonSalesAndMarketingEdgesAcc: Edge[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, storeLocation } = userDocument;

          if (storeLocation === 'Vancouver' || storeLocation === 'Calgary') {
            return edmontonSalesAndMarketingEdgesAcc;
          }

          const edmontonSalesAndMarketingEdge: Edge = {
            ...edgeDefaults,
            id: `${edmontonSalesAndMarketingSourceId}-${_id}`, // source-target
            source: edmontonSalesAndMarketingSourceId,
            target: _id,
          };
          edmontonSalesAndMarketingEdgesAcc.push(edmontonSalesAndMarketingEdge);

          return edmontonSalesAndMarketingEdgesAcc;
        },
        [edmontonStoreLocationToEdmontonSalesAndMarketingEdge]
      );

      // calgary sales and marketing node id
      const calgarySalesAndMarketingSourceId =
        calgarySalesAndMarketingStartingNode.id;

      // edge from calgary store location to calgary sales and marketing node
      const calgaryStoreLocationToCalgarySalesAndMarketingEdge: Edge = {
        ...edgeDefaults,
        id: `${calgaryStoreLocationSourceId}-${calgarySalesAndMarketingSourceId}`, // source-target
        source: calgaryStoreLocationSourceId,
        target: calgarySalesAndMarketingSourceId,
      };

      const calgarySalesAndMarketingEdges = salesAndMarketingDocs.reduce(
        (
          calgarySalesAndMarketingEdgesAcc: Edge[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, storeLocation } = userDocument;

          if (storeLocation === 'Vancouver' || storeLocation === 'Edmonton') {
            return calgarySalesAndMarketingEdgesAcc;
          }

          const calgarySalesAndMarketingEdge: Edge = {
            ...edgeDefaults,
            id: `${calgarySalesAndMarketingSourceId}-${_id}`, // source-target
            source: calgarySalesAndMarketingSourceId,
            target: _id,
          };
          calgarySalesAndMarketingEdgesAcc.push(calgarySalesAndMarketingEdge);

          return calgarySalesAndMarketingEdgesAcc;
        },
        [calgaryStoreLocationToCalgarySalesAndMarketingEdge]
      );

      // vancouver sales and marketing node id
      const vancouverSalesAndMarketingSourceId =
        vancouverSalesAndMarketingStartingNode.id;

      // edge from vancouver store location to vancouver sales and marketing node
      const vancouverStoreLocationToVancouverSalesAndMarketingEdge: Edge = {
        ...edgeDefaults,
        id: `${vancouverStoreLocationSourceId}-${vancouverSalesAndMarketingSourceId}`, // source-target
        source: vancouverStoreLocationSourceId,
        target: vancouverSalesAndMarketingSourceId,
      };

      const vancouverSalesAndMarketingEdges = salesAndMarketingDocs.reduce(
        (
          vancouverSalesAndMarketingEdgesAcc: Edge[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, storeLocation } = userDocument;

          if (storeLocation === 'Edmonton' || storeLocation === 'Calgary') {
            return vancouverSalesAndMarketingEdgesAcc;
          }

          const vancouverSalesAndMarketingEdge: Edge = {
            ...edgeDefaults,
            id: `${vancouverSalesAndMarketingSourceId}-${_id}`, // source-target
            source: vancouverSalesAndMarketingSourceId,
            target: _id,
          };
          vancouverSalesAndMarketingEdgesAcc.push(
            vancouverSalesAndMarketingEdge
          );

          return vancouverSalesAndMarketingEdgesAcc;
        },
        [vancouverStoreLocationToVancouverSalesAndMarketingEdge]
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Sales and Marketing',
          kind: 'nodes',
          data: salesAndMarketingDocsNodes,
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Sales and Marketing',
          kind: 'edges',
          data: [
            ...edmontonSalesAndMarketingEdges,
            ...calgarySalesAndMarketingEdges,
            ...vancouverSalesAndMarketingEdges,
          ],
        },
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end sales and marketing department ━┛

    // ┏━ begin information technology department ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setInformationTechnologyEdgesAndNodes() {
      const informationTechnologyDocs =
        groupedByDepartment['Information Technology'] ?? [];

      // starting information technology node
      const initialInformationTechnologyDepartmentDocNode: FlowNode = {
        id: 'information-technology-department',
        type: 'default',
        data: { label: 'Information Technology Department' },
        position: nodePosition,
        style: nodeDimensions,
      };

      const informationTechnologyDocsNodes = informationTechnologyDocs.reduce(
        (
          informationTechnologyNodesAcc: Node[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id } = userDocument;

          const displayProfileCard = returnDirectoryProfileCard({
            userDocument,
            padding,
            rowGap,
          });

          const informationTechnologyNode: Node = {
            id: _id,
            type: 'output',
            data: { label: displayProfileCard },
            position: nodePosition,
            style: nodeDimensions,
          };
          informationTechnologyNodesAcc.push(informationTechnologyNode);

          return informationTechnologyNodesAcc;
        },
        [initialInformationTechnologyDepartmentDocNode]
      );

      const informationTechnologyDepartmentSourceId =
        initialInformationTechnologyDepartmentDocNode.id;

      // edges from information technology department to information technology nodes
      const informationTechnologyEdges = informationTechnologyDocs.reduce(
        (
          informationTechnologyEdgesAcc: Edge[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id } = userDocument;

          const informationTechnologyEdge: Edge = {
            ...edgeDefaults,
            id: `${informationTechnologyDepartmentSourceId}-${_id}`, // source-target
            source: informationTechnologyDepartmentSourceId,
            target: _id,
          };
          informationTechnologyEdgesAcc.push(informationTechnologyEdge);

          return informationTechnologyEdgesAcc;
        },
        []
      );

      const executiveManagements =
        groupedByDepartment['Executive Management'] ?? [];
      // find all ids except ceo
      const executiveManagementIds = executiveManagements.reduce(
        (
          executiveManagementIdsAcc: Record<string, string>,
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, jobPosition } = userDocument;

          if (jobPosition === 'Chief Executive Officer') {
            return executiveManagementIdsAcc;
          }

          executiveManagementIdsAcc = addFieldsToObject({
            object: executiveManagementIdsAcc,
            fieldValuesTuples: [[jobPosition, _id]],
          });

          return executiveManagementIdsAcc;
        },
        Object.create(null)
      );

      // edges from each executive managements (except ceo) to information technology department starting node
      const informationTechnologyDepartmentEdges = Object.entries(
        executiveManagementIds
      ).reduce(
        (
          informationTechnologyDepartmentEdgesAcc: Edge[],
          [_, executiveManagementId]
        ) => {
          const informationTechnologyDepartmentEdge: Edge = {
            ...edgeDefaults,
            id: `${executiveManagementId}-${informationTechnologyDepartmentSourceId}`, // source-target
            source: executiveManagementId,
            target: informationTechnologyDepartmentSourceId,
          };
          informationTechnologyDepartmentEdgesAcc.push(
            informationTechnologyDepartmentEdge
          );

          return informationTechnologyDepartmentEdgesAcc;
        },
        [...informationTechnologyEdges]
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Information Technology',
          kind: 'nodes',
          data: informationTechnologyDocsNodes,
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Information Technology',
          kind: 'edges',
          data: informationTechnologyDepartmentEdges,
        },
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end information technology department ━┛

    // ┏━ begin repair technicians department ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setRepairTechniciansEdgesAndNodes() {
      const repairTechniciansDocs =
        groupedByDepartment['Repair Technicians'] ?? [];

      // starting repair technicians node for each store location
      const [
        edmontonRepairTechniciansStartingNode,
        calgaryRepairTechniciansStartingNode,
        vancouverRepairTechniciansStartingNode,
      ]: FlowNode[] = storeLocations.map((store) => {
        const initialRepairTechniciansDepartmentDocNode: FlowNode = {
          id: `repair-technicians-department-${store}`,
          type: 'default',
          data: { label: `${store} Repair Technicians Department` },
          position: nodePosition,
          style: nodeDimensions,
        };

        return initialRepairTechniciansDepartmentDocNode;
      });

      const repairTechniciansDocsNodes = repairTechniciansDocs.reduce(
        (
          repairTechniciansNodesAcc: Node[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id } = userDocument;

          const displayProfileCard = returnDirectoryProfileCard({
            userDocument,
            padding,
            rowGap,
          });

          const repairTechniciansNode: Node = {
            id: _id,
            type: 'output',
            data: { label: displayProfileCard },
            position: nodePosition,
            style: nodeDimensions,
          };
          repairTechniciansNodesAcc.push(repairTechniciansNode);

          return repairTechniciansNodesAcc;
        },
        [
          edmontonRepairTechniciansStartingNode,
          calgaryRepairTechniciansStartingNode,
          vancouverRepairTechniciansStartingNode,
        ]
      );

      // edmonton repair technicians node id
      const edmontonRepairTechniciansSourceId =
        edmontonRepairTechniciansStartingNode.id;

      // edge from edmonton store location to edmonton repair technicians node
      const edmontonStoreLocationToEdmontonRepairTechniciansEdge: Edge = {
        ...edgeDefaults,
        id: `${edmontonStoreLocationSourceId}-${edmontonRepairTechniciansSourceId}`, // source-target
        source: edmontonStoreLocationSourceId,
        target: edmontonRepairTechniciansSourceId,
      };

      const edmontonRepairTechniciansEdges = repairTechniciansDocs.reduce(
        (
          edmontonRepairTechniciansEdgesAcc: Edge[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, storeLocation } = userDocument;

          if (storeLocation === 'Vancouver' || storeLocation === 'Calgary') {
            return edmontonRepairTechniciansEdgesAcc;
          }

          const edmontonRepairTechniciansEdge: Edge = {
            ...edgeDefaults,
            id: `${edmontonRepairTechniciansSourceId}-${_id}`, // source-target
            source: edmontonRepairTechniciansSourceId,
            target: _id,
          };
          edmontonRepairTechniciansEdgesAcc.push(edmontonRepairTechniciansEdge);

          return edmontonRepairTechniciansEdgesAcc;
        },
        [edmontonStoreLocationToEdmontonRepairTechniciansEdge]
      );

      // calgary repair technicians node id
      const calgaryRepairTechniciansSourceId =
        calgaryRepairTechniciansStartingNode.id;

      // edge from calgary store location to calgary repair technicians node
      const calgaryStoreLocationToCalgaryRepairTechniciansEdge: Edge = {
        ...edgeDefaults,
        id: `${calgaryStoreLocationSourceId}-${calgaryRepairTechniciansSourceId}`, // source-target
        source: calgaryStoreLocationSourceId,
        target: calgaryRepairTechniciansSourceId,
      };

      const calgaryRepairTechniciansEdges = repairTechniciansDocs.reduce(
        (
          calgaryRepairTechniciansEdgesAcc: Edge[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, storeLocation } = userDocument;

          if (storeLocation === 'Vancouver' || storeLocation === 'Edmonton') {
            return calgaryRepairTechniciansEdgesAcc;
          }

          const calgaryRepairTechniciansEdge: Edge = {
            ...edgeDefaults,
            id: `${calgaryRepairTechniciansSourceId}-${_id}`, // source-target
            source: calgaryRepairTechniciansSourceId,
            target: _id,
          };
          calgaryRepairTechniciansEdgesAcc.push(calgaryRepairTechniciansEdge);

          return calgaryRepairTechniciansEdgesAcc;
        },
        [calgaryStoreLocationToCalgaryRepairTechniciansEdge]
      );

      // vancouver repair technicians node id
      const vancouverRepairTechniciansSourceId =
        vancouverRepairTechniciansStartingNode.id;

      // edge from vancouver store location to vancouver repair technicians node
      const vancouverStoreLocationToVancouverRepairTechniciansEdge: Edge = {
        ...edgeDefaults,
        id: `${vancouverStoreLocationSourceId}-${vancouverRepairTechniciansSourceId}`, // source-target
        source: vancouverStoreLocationSourceId,
        target: vancouverRepairTechniciansSourceId,
      };

      const vancouverRepairTechniciansEdges = repairTechniciansDocs.reduce(
        (
          vancouverRepairTechniciansEdgesAcc: Edge[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, storeLocation } = userDocument;

          if (storeLocation === 'Edmonton' || storeLocation === 'Calgary') {
            return vancouverRepairTechniciansEdgesAcc;
          }

          const vancouverRepairTechniciansEdge: Edge = {
            ...edgeDefaults,
            id: `${vancouverRepairTechniciansSourceId}-${_id}`, // source-target
            source: vancouverRepairTechniciansSourceId,
            target: _id,
          };
          vancouverRepairTechniciansEdgesAcc.push(
            vancouverRepairTechniciansEdge
          );

          return vancouverRepairTechniciansEdgesAcc;
        },
        [vancouverStoreLocationToVancouverRepairTechniciansEdge]
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Repair Technicians',
          kind: 'nodes',
          data: repairTechniciansDocsNodes,
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Repair Technicians',
          kind: 'edges',
          data: [
            ...edmontonRepairTechniciansEdges,
            ...calgaryRepairTechniciansEdges,
            ...vancouverRepairTechniciansEdges,
          ],
        },
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end repair technicians department ━┛

    // ┏━ begin field service technicians department ━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setFieldServiceTechniciansEdgesAndNodes() {
      const fieldServiceTechniciansDocs =
        groupedByDepartment['Field Service Technicians'] ?? [];

      // starting field service technicians node for each store location
      const [
        edmontonFieldServiceTechniciansStartingNode,
        calgaryFieldServiceTechniciansStartingNode,
        vancouverFieldServiceTechniciansStartingNode,
      ]: FlowNode[] = storeLocations.map((store) => {
        const initialFieldServiceTechniciansDepartmentDocNode: FlowNode = {
          id: `field-service-technicians-department-${store}`,
          type: 'default',
          data: { label: `${store} Field Service Technicians Department` },
          position: nodePosition,
          style: nodeDimensions,
        };

        return initialFieldServiceTechniciansDepartmentDocNode;
      });

      const fieldServiceTechniciansDocsNodes =
        fieldServiceTechniciansDocs.reduce(
          (
            fieldServiceTechniciansNodesAcc: Node[],
            userDocument: DirectoryUserDocument
          ) => {
            const { _id } = userDocument;

            const displayProfileCard = returnDirectoryProfileCard({
              userDocument,
              padding,
              rowGap,
            });

            const fieldServiceTechniciansNode: Node = {
              id: _id,
              type: 'output',
              data: { label: displayProfileCard },
              position: nodePosition,
              style: nodeDimensions,
            };
            fieldServiceTechniciansNodesAcc.push(fieldServiceTechniciansNode);

            return fieldServiceTechniciansNodesAcc;
          },
          [
            edmontonFieldServiceTechniciansStartingNode,
            calgaryFieldServiceTechniciansStartingNode,
            vancouverFieldServiceTechniciansStartingNode,
          ]
        );

      // edmonton field service technicians node id
      const edmontonFieldServiceTechniciansSourceId =
        edmontonFieldServiceTechniciansStartingNode.id;

      // edge from edmonton store location to edmonton field service technicians node
      const edmontonStoreLocationToEdmontonFieldServiceTechniciansEdge: Edge = {
        ...edgeDefaults,
        id: `${edmontonStoreLocationSourceId}-${edmontonFieldServiceTechniciansSourceId}`, // source-target
        source: edmontonStoreLocationSourceId,
        target: edmontonFieldServiceTechniciansSourceId,
      };

      const edmontonFieldServiceTechniciansEdges =
        fieldServiceTechniciansDocs.reduce(
          (
            edmontonFieldServiceTechniciansEdgesAcc: Edge[],
            userDocument: DirectoryUserDocument
          ) => {
            const { _id, storeLocation } = userDocument;

            if (storeLocation === 'Vancouver' || storeLocation === 'Calgary') {
              return edmontonFieldServiceTechniciansEdgesAcc;
            }

            const edmontonFieldServiceTechniciansEdge: Edge = {
              ...edgeDefaults,
              id: `${edmontonFieldServiceTechniciansSourceId}-${_id}`, // source-target
              source: edmontonFieldServiceTechniciansSourceId,
              target: _id,
            };
            edmontonFieldServiceTechniciansEdgesAcc.push(
              edmontonFieldServiceTechniciansEdge
            );

            return edmontonFieldServiceTechniciansEdgesAcc;
          },
          [edmontonStoreLocationToEdmontonFieldServiceTechniciansEdge]
        );

      // calgary field service technicians node id
      const calgaryFieldServiceTechniciansSourceId =
        calgaryFieldServiceTechniciansStartingNode.id;

      // edge from calgary store location to calgary field service technicians node
      const calgaryStoreLocationToCalgaryFieldServiceTechniciansEdge: Edge = {
        ...edgeDefaults,
        id: `${calgaryStoreLocationSourceId}-${calgaryFieldServiceTechniciansSourceId}`, // source-target
        source: calgaryStoreLocationSourceId,
        target: calgaryFieldServiceTechniciansSourceId,
      };

      const calgaryFieldServiceTechniciansEdges =
        fieldServiceTechniciansDocs.reduce(
          (
            calgaryFieldServiceTechniciansEdgesAcc: Edge[],
            userDocument: DirectoryUserDocument
          ) => {
            const { _id, storeLocation } = userDocument;

            if (storeLocation === 'Vancouver' || storeLocation === 'Edmonton') {
              return calgaryFieldServiceTechniciansEdgesAcc;
            }

            const calgaryFieldServiceTechniciansEdge: Edge = {
              ...edgeDefaults,
              id: `${calgaryFieldServiceTechniciansSourceId}-${_id}`, // source-target
              source: calgaryFieldServiceTechniciansSourceId,
              target: _id,
            };
            calgaryFieldServiceTechniciansEdgesAcc.push(
              calgaryFieldServiceTechniciansEdge
            );

            return calgaryFieldServiceTechniciansEdgesAcc;
          },
          [calgaryStoreLocationToCalgaryFieldServiceTechniciansEdge]
        );

      // vancouver field service technicians node id
      const vancouverFieldServiceTechniciansSourceId =
        vancouverFieldServiceTechniciansStartingNode.id;

      // edge from vancouver store location to vancouver field service technicians node
      const vancouverStoreLocationToVancouverFieldServiceTechniciansEdge: Edge =
        {
          ...edgeDefaults,
          id: `${vancouverStoreLocationSourceId}-${vancouverFieldServiceTechniciansSourceId}`, // source-target
          source: vancouverStoreLocationSourceId,
          target: vancouverFieldServiceTechniciansSourceId,
        };

      const vancouverFieldServiceTechniciansEdges =
        fieldServiceTechniciansDocs.reduce(
          (
            vancouverFieldServiceTechniciansEdgesAcc: Edge[],
            userDocument: DirectoryUserDocument
          ) => {
            const { _id, storeLocation } = userDocument;

            if (storeLocation === 'Edmonton' || storeLocation === 'Calgary') {
              return vancouverFieldServiceTechniciansEdgesAcc;
            }

            const vancouverFieldServiceTechniciansEdge: Edge = {
              ...edgeDefaults,
              id: `${vancouverFieldServiceTechniciansSourceId}-${_id}`, // source-target
              source: vancouverFieldServiceTechniciansSourceId,
              target: _id,
            };
            vancouverFieldServiceTechniciansEdgesAcc.push(
              vancouverFieldServiceTechniciansEdge
            );

            return vancouverFieldServiceTechniciansEdgesAcc;
          },
          [vancouverStoreLocationToVancouverFieldServiceTechniciansEdge]
        );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Field Service Technicians',
          kind: 'nodes',
          data: fieldServiceTechniciansDocsNodes,
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Field Service Technicians',
          kind: 'edges',
          data: [
            ...edmontonFieldServiceTechniciansEdges,
            ...calgaryFieldServiceTechniciansEdges,
            ...vancouverFieldServiceTechniciansEdges,
          ],
        },
      });
    }
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━ end field service technicians department ━┛

    // ┏━ begin logistics and inventory department ━━━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setLogisticsAndInventoryEdgesAndNodes() {
      const logisticsAndInventoryDocs =
        groupedByDepartment['Logistics and Inventory'] ?? [];

      // starting logistics and inventory node for each store location
      const [
        edmontonLogisticsAndInventoryStartingNode,
        calgaryLogisticsAndInventoryStartingNode,
        vancouverLogisticsAndInventoryStartingNode,
      ]: FlowNode[] = storeLocations.map((store) => {
        const initialLogisticsAndInventoryDepartmentDocNode: FlowNode = {
          id: `logistics-and-inventory-department-${store}`,
          type: 'default',
          data: { label: `${store} Logistics and Inventory Department` },
          position: nodePosition,
          style: nodeDimensions,
        };

        return initialLogisticsAndInventoryDepartmentDocNode;
      });

      const logisticsAndInventoryDocsNodes = logisticsAndInventoryDocs.reduce(
        (
          logisticsAndInventoryNodesAcc: Node[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id } = userDocument;

          const displayProfileCard = returnDirectoryProfileCard({
            userDocument,
            padding,
            rowGap,
          });

          const logisticsAndInventoryNode: Node = {
            id: _id,
            type: 'output',
            data: { label: displayProfileCard },
            position: nodePosition,
            style: nodeDimensions,
          };
          logisticsAndInventoryNodesAcc.push(logisticsAndInventoryNode);

          return logisticsAndInventoryNodesAcc;
        },
        [
          edmontonLogisticsAndInventoryStartingNode,
          calgaryLogisticsAndInventoryStartingNode,
          vancouverLogisticsAndInventoryStartingNode,
        ]
      );

      // edmonton logistics and inventory node id
      const edmontonLogisticsAndInventorySourceId =
        edmontonLogisticsAndInventoryStartingNode.id;

      // edge from edmonton store location to edmonton logistics and inventory node
      const edmontonStoreLocationToEdmontonLogisticsAndInventoryEdge: Edge = {
        ...edgeDefaults,
        id: `${edmontonStoreLocationSourceId}-${edmontonLogisticsAndInventorySourceId}`, // source-target
        source: edmontonStoreLocationSourceId,
        target: edmontonLogisticsAndInventorySourceId,
      };

      const edmontonLogisticsAndInventoryEdges =
        logisticsAndInventoryDocs.reduce(
          (
            edmontonLogisticsAndInventoryEdgesAcc: Edge[],
            userDocument: DirectoryUserDocument
          ) => {
            const { _id, storeLocation } = userDocument;

            if (storeLocation === 'Vancouver' || storeLocation === 'Calgary') {
              return edmontonLogisticsAndInventoryEdgesAcc;
            }

            const edmontonLogisticsAndInventoryEdge: Edge = {
              ...edgeDefaults,
              id: `${edmontonLogisticsAndInventorySourceId}-${_id}`, // source-target
              source: edmontonLogisticsAndInventorySourceId,
              target: _id,
            };
            edmontonLogisticsAndInventoryEdgesAcc.push(
              edmontonLogisticsAndInventoryEdge
            );

            return edmontonLogisticsAndInventoryEdgesAcc;
          },
          [edmontonStoreLocationToEdmontonLogisticsAndInventoryEdge]
        );

      // calgary logistics and inventory node id
      const calgaryLogisticsAndInventorySourceId =
        calgaryLogisticsAndInventoryStartingNode.id;

      // edge from calgary store location to calgary logistics and inventory node
      const calgaryStoreLocationToCalgaryLogisticsAndInventoryEdge: Edge = {
        ...edgeDefaults,
        id: `${calgaryStoreLocationSourceId}-${calgaryLogisticsAndInventorySourceId}`, // source-target
        source: calgaryStoreLocationSourceId,
        target: calgaryLogisticsAndInventorySourceId,
      };

      const calgaryLogisticsAndInventoryEdges =
        logisticsAndInventoryDocs.reduce(
          (
            calgaryLogisticsAndInventoryEdgesAcc: Edge[],
            userDocument: DirectoryUserDocument
          ) => {
            const { _id, storeLocation } = userDocument;

            if (storeLocation === 'Vancouver' || storeLocation === 'Edmonton') {
              return calgaryLogisticsAndInventoryEdgesAcc;
            }

            const calgaryLogisticsAndInventoryEdge: Edge = {
              ...edgeDefaults,
              id: `${calgaryLogisticsAndInventorySourceId}-${_id}`, // source-target
              source: calgaryLogisticsAndInventorySourceId,
              target: _id,
            };
            calgaryLogisticsAndInventoryEdgesAcc.push(
              calgaryLogisticsAndInventoryEdge
            );

            return calgaryLogisticsAndInventoryEdgesAcc;
          },
          [calgaryStoreLocationToCalgaryLogisticsAndInventoryEdge]
        );

      // vancouver logistics and inventory node id
      const vancouverLogisticsAndInventorySourceId =
        vancouverLogisticsAndInventoryStartingNode.id;

      // edge from vancouver store location to vancouver logistics and inventory node
      const vancouverStoreLocationToVancouverLogisticsAndInventoryEdge: Edge = {
        ...edgeDefaults,
        id: `${vancouverStoreLocationSourceId}-${vancouverLogisticsAndInventorySourceId}`, // source-target
        source: vancouverStoreLocationSourceId,
        target: vancouverLogisticsAndInventorySourceId,
      };

      const vancouverLogisticsAndInventoryEdges =
        logisticsAndInventoryDocs.reduce(
          (
            vancouverLogisticsAndInventoryEdgesAcc: Edge[],
            userDocument: DirectoryUserDocument
          ) => {
            const { _id, storeLocation } = userDocument;

            if (storeLocation === 'Edmonton' || storeLocation === 'Calgary') {
              return vancouverLogisticsAndInventoryEdgesAcc;
            }

            const vancouverLogisticsAndInventoryEdge: Edge = {
              ...edgeDefaults,
              id: `${vancouverLogisticsAndInventorySourceId}-${_id}`, // source-target
              source: vancouverLogisticsAndInventorySourceId,
              target: _id,
            };
            vancouverLogisticsAndInventoryEdgesAcc.push(
              vancouverLogisticsAndInventoryEdge
            );

            return vancouverLogisticsAndInventoryEdgesAcc;
          },
          [vancouverStoreLocationToVancouverLogisticsAndInventoryEdge]
        );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Logistics and Inventory',
          kind: 'nodes',
          data: logisticsAndInventoryDocsNodes,
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Logistics and Inventory',
          kind: 'edges',
          data: [
            ...edmontonLogisticsAndInventoryEdges,
            ...calgaryLogisticsAndInventoryEdges,
            ...vancouverLogisticsAndInventoryEdges,
          ],
        },
      });
    }
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end logistics and inventory department ━┛

    // ┏━ begin customer service department ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setCustomerServiceEdgesAndNodes() {
      const customerServiceDocs = groupedByDepartment['Customer Service'] ?? [];

      // starting customer service node for each store location
      const [
        edmontonCustomerServiceStartingNode,
        calgaryCustomerServiceStartingNode,
        vancouverCustomerServiceStartingNode,
      ]: FlowNode[] = storeLocations.map((store) => {
        const initialCustomerServiceDepartmentDocNode: FlowNode = {
          id: `customer-service-department-${store}`,
          type: 'default',
          data: { label: `${store} Customer Service Department` },
          position: nodePosition,
          style: nodeDimensions,
        };

        return initialCustomerServiceDepartmentDocNode;
      });

      const customerServiceDocsNodes = customerServiceDocs.reduce(
        (
          customerServiceNodesAcc: Node[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id } = userDocument;

          const displayProfileCard = returnDirectoryProfileCard({
            userDocument,
            padding,
            rowGap,
          });

          const customerServiceNode: Node = {
            id: _id,
            type: 'output',
            data: { label: displayProfileCard },
            position: nodePosition,
            style: nodeDimensions,
          };
          customerServiceNodesAcc.push(customerServiceNode);

          return customerServiceNodesAcc;
        },
        [
          edmontonCustomerServiceStartingNode,
          calgaryCustomerServiceStartingNode,
          vancouverCustomerServiceStartingNode,
        ]
      );

      // edmonton customer service node id
      const edmontonCustomerServiceSourceId =
        edmontonCustomerServiceStartingNode.id;

      // edge from edmonton store location to edmonton customer service node
      const edmontonStoreLocationToEdmontonCustomerServiceEdge: Edge = {
        ...edgeDefaults,
        id: `${edmontonStoreLocationSourceId}-${edmontonCustomerServiceSourceId}`, // source-target
        source: edmontonStoreLocationSourceId,
        target: edmontonCustomerServiceSourceId,
      };

      const edmontonCustomerServiceEdges = customerServiceDocs.reduce(
        (
          edmontonCustomerServiceEdgesAcc: Edge[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, storeLocation } = userDocument;

          if (storeLocation === 'Vancouver' || storeLocation === 'Calgary') {
            return edmontonCustomerServiceEdgesAcc;
          }

          const edmontonCustomerServiceEdge: Edge = {
            ...edgeDefaults,
            id: `${edmontonCustomerServiceSourceId}-${_id}`, // source-target
            source: edmontonCustomerServiceSourceId,
            target: _id,
          };
          edmontonCustomerServiceEdgesAcc.push(edmontonCustomerServiceEdge);

          return edmontonCustomerServiceEdgesAcc;
        },
        [edmontonStoreLocationToEdmontonCustomerServiceEdge]
      );

      // calgary customer service node id
      const calgaryCustomerServiceSourceId =
        calgaryCustomerServiceStartingNode.id;

      // edge from calgary store location to calgary customer service node
      const calgaryStoreLocationToCalgaryCustomerServiceEdge: Edge = {
        ...edgeDefaults,
        id: `${calgaryStoreLocationSourceId}-${calgaryCustomerServiceSourceId}`, // source-target
        source: calgaryStoreLocationSourceId,
        target: calgaryCustomerServiceSourceId,
      };

      const calgaryCustomerServiceEdges = customerServiceDocs.reduce(
        (
          calgaryCustomerServiceEdgesAcc: Edge[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, storeLocation } = userDocument;

          if (storeLocation === 'Vancouver' || storeLocation === 'Edmonton') {
            return calgaryCustomerServiceEdgesAcc;
          }

          const calgaryCustomerServiceEdge: Edge = {
            ...edgeDefaults,
            id: `${calgaryCustomerServiceSourceId}-${_id}`, // source-target
            source: calgaryCustomerServiceSourceId,
            target: _id,
          };
          calgaryCustomerServiceEdgesAcc.push(calgaryCustomerServiceEdge);

          return calgaryCustomerServiceEdgesAcc;
        },
        [calgaryStoreLocationToCalgaryCustomerServiceEdge]
      );

      // vancouver customer service node id
      const vancouverCustomerServiceSourceId =
        vancouverCustomerServiceStartingNode.id;

      // edge from vancouver store location to vancouver customer service node
      const vancouverStoreLocationToVancouverCustomerServiceEdge: Edge = {
        ...edgeDefaults,
        id: `${vancouverStoreLocationSourceId}-${vancouverCustomerServiceSourceId}`, // source-target
        source: vancouverStoreLocationSourceId,
        target: vancouverCustomerServiceSourceId,
      };

      const vancouverCustomerServiceEdges = customerServiceDocs.reduce(
        (
          vancouverCustomerServiceEdgesAcc: Edge[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, storeLocation } = userDocument;

          if (storeLocation === 'Edmonton' || storeLocation === 'Calgary') {
            return vancouverCustomerServiceEdgesAcc;
          }

          const vancouverCustomerServiceEdge: Edge = {
            ...edgeDefaults,
            id: `${vancouverCustomerServiceSourceId}-${_id}`, // source-target
            source: vancouverCustomerServiceSourceId,
            target: _id,
          };
          vancouverCustomerServiceEdgesAcc.push(vancouverCustomerServiceEdge);

          return vancouverCustomerServiceEdgesAcc;
        },
        [vancouverStoreLocationToVancouverCustomerServiceEdge]
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Customer Service',
          kind: 'nodes',
          data: customerServiceDocsNodes,
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Customer Service',
          kind: 'edges',
          data: [
            ...edmontonCustomerServiceEdges,
            ...calgaryCustomerServiceEdges,
            ...vancouverCustomerServiceEdges,
          ],
        },
      });
    }
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end customer service department ━┛

    // ┏━ begin concurrent fn calls ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    // utilizes the micro-task queue for performance
    async function triggerDepartmentNodesAndEdgesCreation() {
      try {
        await Promise.all([
          setExecutiveManagementEdgesAndNodes(),
          setAdministrativeDepartmentEdgesAndNodes(),
          // setSalesAndMarketingEdgesAndNodes(),
          // setInformationTechnologyEdgesAndNodes(),
          // setRepairTechniciansEdgesAndNodes(),
          // setFieldServiceTechniciansEdgesAndNodes(),
          // setLogisticsAndInventoryEdgesAndNodes(),
          setCustomerServiceEdgesAndNodes(),
        ]);
      } catch (error: any) {
        // TODO: TRIGGER ERROR BOUNDARY HOOK
        console.error(error);
      }
    }

    triggerDepartmentNodesAndEdgesCreation();

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end concurrent fn calls ━┛
  }, [
    triggerSetDepartmentsNodesAndEdges,
    filterByDepartment,
    filterByJobPosition,
    filterByStoreLocation,
    layoutDirection,
  ]);
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end main nodes & edges effect ━┛

  useEffect(() => {
    logState({
      state: directoryState,
      groupLabel: 'directoryState in Directory',
    });
  }, [directoryState]);

  // ┏━ begin input creators info objects ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const filterByDepartmentSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: [...DEPARTMENT_DATA, 'All Departments'],
      description: 'Filter by department',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        directoryDispatch({
          type: directoryAction.setFilterByDepartment,
          payload: event.currentTarget.value as Department,
        });
      },
      value: filterByDepartment,
    };

  const filterByJobPositionSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: [...JOB_POSITION_DATA, 'All Job Positions'],
      description: 'Filter by job position',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        directoryDispatch({
          type: directoryAction.setFilterByJobPosition,
          payload: event.currentTarget.value as JobPosition,
        });
      },
      value: filterByJobPosition,
    };

  const filterByStoreLocationSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: [...STORE_LOCATION_DATA, 'All Store Locations'],
      description: 'Filter by store location',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        directoryDispatch({
          type: directoryAction.setFilterByStoreLocation,
          payload: event.currentTarget.value as StoreLocation,
        });
      },
      value: filterByStoreLocation,
    };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end input creators info objects━┛

  // ┏━ begin input creators ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const [
    createdFilterByDepartmentSelectInput,
    createdFilterByJobPositionSelectInput,
    createdFilterByStoreLocationSelectInput,
  ] = returnAccessibleSelectInputElements([
    filterByDepartmentSelectInputCreatorInfo,
    filterByJobPositionSelectInputCreatorInfo,
    filterByStoreLocationSelectInputCreatorInfo,
  ]);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end input creators ━┛

  // ┏━ begin input display ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const displayFilterSelectInputs = (
    <Flex
      w="100%"
      align="center"
      justify="flex-start"
      wrap="wrap"
      rowGap={rowGap}
      columnGap={rowGap}
      p={padding}
    >
      <Group w={350}>{createdFilterByDepartmentSelectInput}</Group>
      <Group w={350}>{createdFilterByJobPositionSelectInput}</Group>
      <Group w={350}>{createdFilterByStoreLocationSelectInput}</Group>
    </Flex>
  );

  const [initialNodes, initialEdges] = Object.entries(
    departmentsNodesAndEdges
  ).reduce(
    (initialNodesAndEdgesAcc: [Node[], Edge[]], departmentNodesAndEdges) => {
      const [_, nodesAndEdges] = departmentNodesAndEdges;

      const departmentNodes = nodesAndEdges.nodes;
      const departmentEdges = nodesAndEdges.edges;

      departmentNodes.forEach((node: Node) => {
        initialNodesAndEdgesAcc[0].push(node);
      });
      departmentEdges.forEach((edge: Edge) => {
        initialNodesAndEdgesAcc[1].push(edge);
      });

      return initialNodesAndEdgesAcc;
    },
    [[], []]
  );

  const displayNodeBuilder = (
    <NodeBuilder initialNodes={initialNodes} initialEdges={initialEdges} />
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end input display ━┛
  return (
    <Stack w="100%">
      {displayFilterSelectInputs}
      {displayNodeBuilder}
    </Stack>
  );
}

export default Directory;

/**
 * // // set store location edges after executive management nodes and edges are set
  // useEffect(() => {
  //   if (!Object.keys(groupedByDepartment).length) {
  //     return;
  //   }

  //   const storeLocationsNodes =
  //     departmentsNodesAndEdges['Store Locations'].nodes ?? [];
  //   const startingStoreLocationNodeId = storeLocationsNodes.find(
  //     (storeLocationNode: Node) =>
  //       storeLocationNode.id === 'starting-node-storeLocation'
  //   )?.id as string;

  //   //  set edges from starting store location node to each store location node
  //   const edgesFromStartingStoreLocationToEachStoreLocations =
  //     storeLocationsNodes.reduce(
  //       (storeLocationsEdgesAcc: Edge[], storeLocationNode: Node) => {
  //         const { id: storeLocationNodeId } = storeLocationNode;

  //         if (storeLocationNodeId === startingStoreLocationNodeId) {
  //           return storeLocationsEdgesAcc;
  //         }

  //         const storeLocationEdge: Edge = {
  //           id: `${startingStoreLocationNodeId}-${storeLocationNodeId}`,
  //           source: startingStoreLocationNodeId,
  //           target: storeLocationNodeId,
  //           type: 'smoothstep',
  //           animated: true,
  //           // label: jobPosition,
  //           labelBgPadding: [8, 4],
  //           labelBgBorderRadius: 4,
  //           labelBgStyle: { fill: 'white' },
  //           labelStyle: { fill: 'black', fontWeight: 700 },
  //           style: { stroke: 'black' },
  //         };

  //         storeLocationsEdgesAcc.push(storeLocationEdge);

  //         return storeLocationsEdgesAcc;
  //       },
  //       []
  //     );

  //   const executiveManagements =
  //     groupedByDepartment['Executive Management'] ?? [];
  //   // find all ids except ceo
  //   const executiveManagementIds = executiveManagements.reduce(
  //     (
  //       executiveManagementIdsAcc: Record<string, string>,
  //       userDocument: DirectoryUserDocument
  //     ) => {
  //       const { _id, jobPosition } = userDocument;

  //       if (jobPosition === 'Chief Executive Officer') {
  //         return executiveManagementIdsAcc;
  //       }

  //       executiveManagementIdsAcc = addFieldsToObject({
  //         object: executiveManagementIdsAcc,
  //         fieldValuesTuples: [[jobPosition, _id]],
  //       });

  //       return executiveManagementIdsAcc;
  //     },
  //     Object.create(null)
  //   );

  //   // set edges from each executive managements (except ceo) to starting store location node
  //   const storeLocationsEdges = Object.entries(executiveManagementIds).reduce(
  //     (storeLocationsEdgesAcc: Edge[], [_, executiveManagementId]) => {
  //       const storeLocationEdge: Edge = {
  //         id: `${executiveManagementId}-${startingStoreLocationNodeId}`,
  //         source: executiveManagementId,
  //         target: startingStoreLocationNodeId,
  //         type: 'smoothstep',
  //         animated: true,
  //         // label: jobPosition,
  //         labelBgPadding: [8, 4],
  //         labelBgBorderRadius: 4,
  //         labelBgStyle: { fill: 'white' },
  //         labelStyle: { fill: 'black', fontWeight: 700 },
  //         style: { stroke: 'black' },
  //       };

  //       storeLocationsEdgesAcc.push(storeLocationEdge);

  //       return storeLocationsEdgesAcc;
  //     },
  //     [...edgesFromStartingStoreLocationToEachStoreLocations]
  //   );

  //   directoryDispatch({
  //     type: directoryAction.setDepartmentsNodesAndEdges,
  //     payload: {
  //       department: 'Store Locations',
  //       kind: 'edges',
  //       data: storeLocationsEdges,
  //     },
  //   });
  // }, [groupedByDepartment, departmentsNodesAndEdges['Store Locations'].nodes]);
 */
