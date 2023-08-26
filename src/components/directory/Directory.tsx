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
import { ComponentType, Suspense, useEffect, useReducer } from 'react';
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
import { Department, JobPosition, UserDocument } from '../../types';
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
import { FetchUsersDirectoryResponse } from './types';
import { returnDirectoryProfileCard } from './utils';
import { create } from 'domain';

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

    layoutDirection,

    storeLocationsNodes,
    storeLocationsEdges,

    executiveManagementNodes,
    executiveManagementEdges,

    administrativeDepartmentNodes,
    administrativeDepartmentEdges,

    salesAndMarketingNodes,
    salesAndMarketingEdges,

    informationTechnologyNodes,
    informationTechnologyEdges,

    repairTechniciansNodes,
    repairTechniciansEdges,

    fieldServiceTechniciansNodes,
    fieldServiceTechniciansEdges,

    logisticsAndInventoryNodes,
    logisticsAndInventoryEdges,

    customerServiceNodes,
    customerServiceEdges,
  } = directoryState;

  const {
    authState: { accessToken },
  } = useAuth();

  const {
    globalDispatch,
    globalState: { padding, rowGap, width },
  } = useGlobalState();

  const { showBoundary } = useErrorBoundary();

  const navigate = useNavigate();

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end hooks ━┛

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchUsers() {
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
        const data = await response.json();
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

    fetchUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // set store locations nodes and edges
  useEffect(() => {
    const storeLocations = ['Edmonton', 'Calgary', 'Vancouver'];

    const storeLocationsNodes = storeLocations.reduce(
      (storeLocationsNodesAcc: Node[], storeLocation: string) => {
        const storeLocationNode: Node = {
          id: `storeLocation-${storeLocation}`,
          type: 'default',
          data: { label: storeLocation },
          position: { x: 0, y: 0 },
          style: { width: 500, height: 309 },
        };
        storeLocationsNodesAcc.push(storeLocationNode);

        return storeLocationsNodesAcc;
      },
      []
    );

    directoryDispatch({
      type: directoryAction.setStoreLocationsNodes,
      payload: storeLocationsNodes,
    });
  }, [groupedByStoreLocation, padding, rowGap]);

  // set store location edges after executive management nodes and edges are set
  useEffect(() => {
    const executiveManagements =
      groupedByDepartment['Executive Management'] ?? [];
    // find all ids except ceo
    const executiveManagementIds = executiveManagements.reduce(
      (
        executiveManagementIdsAcc: Record<string, string>,
        userDocument: UserDocument
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

    const storeLocations = ['Edmonton', 'Calgary', 'Vancouver'];

    // set edges from each executive managements to all store locations
    const storeLocationsEdges = Object.entries(executiveManagementIds).reduce(
      (
        storeLocationsEdgesAcc: Edge[],
        [jobPosition, executiveManagementId]
      ) => {
        const storeLocationsEdges = storeLocations.map((storeLocation) => {
          const storeLocationEdge: Edge = {
            id: `${executiveManagementId}-${storeLocation}`,
            source: executiveManagementId,
            target: `storeLocation-${storeLocation}`,
            type: 'smoothstep',
            animated: true,
            // label: jobPosition,
            labelBgPadding: [8, 4],
            labelBgBorderRadius: 4,
            labelBgStyle: { fill: 'white' },
            labelStyle: { fill: 'black', fontWeight: 700 },
            style: { stroke: 'black' },
          };

          return storeLocationEdge;
        });

        storeLocationsEdgesAcc.push(...storeLocationsEdges);

        return storeLocationsEdgesAcc;
      },
      []
    );

    directoryDispatch({
      type: directoryAction.setStoreLocationsEdges,
      payload: storeLocationsEdges,
    });
  }, [
    executiveManagementNodes,
    executiveManagementEdges,
    groupedByDepartment,
    storeLocationsNodes,
  ]);

  // ┏━ begin main node & edges effect ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  useEffect(() => {
    // ┏━ begin defaults ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    const storeLocations = ['Edmonton', 'Calgary', 'Vancouver'];
    const nodePosition = { x: 0, y: 0 };
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
        (executiveManagementNodesAcc: Node[], userDocument: UserDocument) => {
          const { _id, jobPosition } = userDocument;

          const displayProfileCard = returnDirectoryProfileCard({
            userDocument,
            padding,
            rowGap,
          });

          const executiveManagementNode: Node = {
            id: _id,
            type:
              jobPosition === 'Chief Executive Officer' ? 'input' : 'default',
            extent: 'parent',
            data: { label: displayProfileCard },
            position: { x: 0, y: 0 },
            style: { width: 500, height: 309 },
          };
          executiveManagementNodesAcc.push(executiveManagementNode);

          return executiveManagementNodesAcc;
        },
        []
      );

      const ceoId =
        executiveManagementDocs.find(
          (userDocument: UserDocument) =>
            userDocument.jobPosition === 'Chief Executive Officer'
        )?._id ?? '';

      const executiveManagementEdges = executiveManagementDocs.reduce(
        (executiveManagementEdgesAcc: Edge[], userDocument: UserDocument) => {
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
        type: directoryAction.setExecutiveManagementNodes,
        payload: executiveManagementDocsNodes,
      });

      directoryDispatch({
        type: directoryAction.setExecutiveManagementEdges,
        payload: executiveManagementEdges,
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end executive management ━┛

    // ┏━ begin administrative department ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setAdministrativeDepartmentEdgesAndNodes() {
      const administrativeDepartmentDocs =
        groupedByDepartment.Administrative ?? [];

      const xPosition =
        layoutDirection === 'LR' || layoutDirection === 'RL'
          ? 0
          : 500 * 4 + 100;
      const yPosition =
        layoutDirection === 'TB' || layoutDirection === 'BT'
          ? 0
          : 309 * 4 + 100;
      const startingPosition = { x: xPosition, y: yPosition };

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
          position: startingPosition,
          style: { width: 500, height: 309 },
        };

        return initialAdministrativeDepartmentDocNode;
      });

      const administrativeDepartmentDocsNodes =
        administrativeDepartmentDocs.reduce(
          (
            administrativeDepartmentNodesAcc: Node[],
            userDocument: UserDocument
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
              style: { width: 500, height: 309 },
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
          userDocument: UserDocument
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
        (calgaryAdministrativeEdgesAcc: Edge[], userDocument: UserDocument) => {
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
          userDocument: UserDocument
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
        type: directoryAction.setAdministrativeDepartmentNodes,
        payload: administrativeDepartmentDocsNodes,
      });

      directoryDispatch({
        type: directoryAction.setAdministrativeDepartmentEdges,
        payload: [
          ...edmontonAdministrativeEdges,
          ...calgaryAdministrativeEdges,
          ...vancouverAdministrativeEdges,
        ],
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
      ]: FlowNode[] = ['Edmonton', 'Calgary', 'Vancouver'].map((store) => {
        const initialSalesAndMarketingDepartmentDocNode: FlowNode = {
          id: `sales-and-marketing-department-${store}`,
          type: 'default',
          data: { label: `${store} Sales and Marketing Department` },
          position: nodePosition,
          style: { width: 500, height: 309 },
        };

        return initialSalesAndMarketingDepartmentDocNode;
      });

      const salesAndMarketingDocsNodes = salesAndMarketingDocs.reduce(
        (salesAndMarketingNodesAcc: Node[], userDocument: UserDocument) => {
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
            style: { width: 500, height: 309 },
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
          userDocument: UserDocument
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
          userDocument: UserDocument
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
          userDocument: UserDocument
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
        type: directoryAction.setSalesAndMarketingNodes,
        payload: salesAndMarketingDocsNodes,
      });

      directoryDispatch({
        type: directoryAction.setSalesAndMarketingEdges,
        payload: [
          ...edmontonSalesAndMarketingEdges,
          ...calgarySalesAndMarketingEdges,
          ...vancouverSalesAndMarketingEdges,
        ],
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
        type: 'input',
        data: { label: 'Information Technology Department' },
        position: nodePosition,
        style: { width: 500, height: 309 },
      };

      const informationTechnologyDocsNodes = informationTechnologyDocs.reduce(
        (informationTechnologyNodesAcc: Node[], userDocument: UserDocument) => {
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
            style: { width: 500, height: 309 },
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
        (informationTechnologyEdgesAcc: Edge[], userDocument: UserDocument) => {
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

      directoryDispatch({
        type: directoryAction.setInformationTechnologyNodes,
        payload: informationTechnologyDocsNodes,
      });

      directoryDispatch({
        type: directoryAction.setInformationTechnologyEdges,
        payload: informationTechnologyEdges,
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
      ]: FlowNode[] = ['Edmonton', 'Calgary', 'Vancouver'].map((store) => {
        const initialRepairTechniciansDepartmentDocNode: FlowNode = {
          id: `repair-technicians-department-${store}`,
          type: 'default',
          data: { label: `${store} Repair Technicians Department` },
          position: nodePosition,
          style: { width: 500, height: 309 },
        };

        return initialRepairTechniciansDepartmentDocNode;
      });

      const repairTechniciansDocsNodes = repairTechniciansDocs.reduce(
        (repairTechniciansNodesAcc: Node[], userDocument: UserDocument) => {
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
            style: { width: 500, height: 309 },
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
          userDocument: UserDocument
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
          userDocument: UserDocument
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
          userDocument: UserDocument
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
        type: directoryAction.setRepairTechniciansNodes,
        payload: repairTechniciansDocsNodes,
      });

      directoryDispatch({
        type: directoryAction.setRepairTechniciansEdges,
        payload: [
          ...edmontonRepairTechniciansEdges,
          ...calgaryRepairTechniciansEdges,
          ...vancouverRepairTechniciansEdges,
        ],
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
      ]: FlowNode[] = ['Edmonton', 'Calgary', 'Vancouver'].map((store) => {
        const initialFieldServiceTechniciansDepartmentDocNode: FlowNode = {
          id: `field-service-technicians-department-${store}`,
          type: 'default',
          data: { label: `${store} Field Service Technicians Department` },
          position: nodePosition,
          style: { width: 500, height: 309 },
        };

        return initialFieldServiceTechniciansDepartmentDocNode;
      });

      const fieldServiceTechniciansDocsNodes =
        fieldServiceTechniciansDocs.reduce(
          (
            fieldServiceTechniciansNodesAcc: Node[],
            userDocument: UserDocument
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
              style: { width: 500, height: 309 },
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
            userDocument: UserDocument
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
            userDocument: UserDocument
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
            userDocument: UserDocument
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
        type: directoryAction.setFieldServiceTechniciansNodes,
        payload: fieldServiceTechniciansDocsNodes,
      });

      directoryDispatch({
        type: directoryAction.setFieldServiceTechniciansEdges,
        payload: [
          ...edmontonFieldServiceTechniciansEdges,
          ...calgaryFieldServiceTechniciansEdges,
          ...vancouverFieldServiceTechniciansEdges,
        ],
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
      ]: FlowNode[] = ['Edmonton', 'Calgary', 'Vancouver'].map((store) => {
        const initialLogisticsAndInventoryDepartmentDocNode: FlowNode = {
          id: `logistics-and-inventory-department-${store}`,
          type: 'default',
          data: { label: `${store} Logistics and Inventory Department` },
          position: nodePosition,
          style: { width: 500, height: 309 },
        };

        return initialLogisticsAndInventoryDepartmentDocNode;
      });

      const logisticsAndInventoryDocsNodes = logisticsAndInventoryDocs.reduce(
        (logisticsAndInventoryNodesAcc: Node[], userDocument: UserDocument) => {
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
            style: { width: 500, height: 309 },
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
            userDocument: UserDocument
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
            userDocument: UserDocument
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
            userDocument: UserDocument
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
        type: directoryAction.setLogisticsAndInventoryNodes,
        payload: logisticsAndInventoryDocsNodes,
      });

      directoryDispatch({
        type: directoryAction.setLogisticsAndInventoryEdges,
        payload: [
          ...edmontonLogisticsAndInventoryEdges,
          ...calgaryLogisticsAndInventoryEdges,
          ...vancouverLogisticsAndInventoryEdges,
        ],
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
      ]: FlowNode[] = ['Edmonton', 'Calgary', 'Vancouver'].map((store) => {
        const initialCustomerServiceDepartmentDocNode: FlowNode = {
          id: `customer-service-department-${store}`,
          type: 'default',
          data: { label: `${store} Customer Service Department` },
          position: nodePosition,
          style: { width: 500, height: 309 },
        };

        return initialCustomerServiceDepartmentDocNode;
      });

      const customerServiceDocsNodes = customerServiceDocs.reduce(
        (customerServiceNodesAcc: Node[], userDocument: UserDocument) => {
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
            style: { width: 500, height: 309 },
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
          userDocument: UserDocument
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
          userDocument: UserDocument
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
          userDocument: UserDocument
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
        type: directoryAction.setCustomerServiceNodes,
        payload: customerServiceDocsNodes,
      });

      directoryDispatch({
        type: directoryAction.setCustomerServiceEdges,
        payload: [
          ...edmontonCustomerServiceEdges,
          ...calgaryCustomerServiceEdges,
          ...vancouverCustomerServiceEdges,
        ],
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
          // setCustomerServiceEdgesAndNodes(),
        ]);
      } catch (error: any) {
        // TODO: TRIGGER ERROR BOUNDARY HOOK
        console.error(error);
      }
    }

    triggerDepartmentNodesAndEdgesCreation();

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end concurrent fn calls ━┛
  }, [
    groupedByDepartment,
    padding,
    rowGap,
    layoutDirection,
    storeLocationsNodes,
  ]);
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end main nodes & edges effect ━┛

  useEffect(() => {
    logState({
      state: directoryState,
      groupLabel: 'directoryState in Directory',
    });
  }, [directoryState]);

  return (
    <Group>
      <NodeBuilder
        initialNodes={[
          ...storeLocationsNodes,
          ...executiveManagementNodes,
          ...administrativeDepartmentNodes,
          ...salesAndMarketingNodes,
          ...informationTechnologyNodes,
          ...repairTechniciansNodes,
          ...fieldServiceTechniciansNodes,
          ...logisticsAndInventoryNodes,
          ...customerServiceNodes,
        ]}
        initialEdges={[
          ...storeLocationsEdges,
          ...executiveManagementEdges,
          ...administrativeDepartmentEdges,
          ...salesAndMarketingEdges,
          ...informationTechnologyEdges,
          ...repairTechniciansEdges,
          ...fieldServiceTechniciansEdges,
          ...logisticsAndInventoryEdges,
          ...customerServiceEdges,
        ]}
      />
    </Group>
  );
}

export default Directory;
