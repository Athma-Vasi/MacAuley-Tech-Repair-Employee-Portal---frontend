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
import { UserDocument } from '../../types';
import { fetchData, logState, urlBuilder, wrapPromise } from '../../utils';
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
          type: 'input',
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

  // set executive management nodes and edges
  useEffect(() => {
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
          type: jobPosition === 'Chief Executive Officer' ? 'input' : 'output',
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
          id: `${ceoId}-${_id}`, // source-target
          source: ceoId,
          target: _id,
          type: 'smoothstep',
          animated: true,
          // label: 'has subordinates',
          labelBgPadding: [8, 4],
          labelBgBorderRadius: 4,
          labelBgStyle: { fill: 'white' },
          labelStyle: { fill: 'black', fontWeight: 700 },
          style: { stroke: 'black' },
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
  }, [groupedByDepartment, padding, rowGap, layoutDirection]);

  // set administrative department nodes
  useEffect(() => {
    const administrativeDepartmentDocs =
      groupedByDepartment.Administrative ?? [];

    // starting administrative nodes for each store location
    const [
      edmontonAdministrativeStartingNode,
      calgaryAdministrativeStartingNode,
      vancouverAdministrativeStartingNode,
    ]: FlowNode[] = ['Edmonton', 'Calgary', 'Vancouver'].map((store) => {
      const initialAdministrativeDepartmentDocNode: FlowNode = {
        id: `administrative-department-${store}`,
        type: 'input',
        data: { label: `${store} Administrative Department` },
        position: { x: 0, y: 0 },
        style: { width: 500, height: 309 },
      };

      return initialAdministrativeDepartmentDocNode;
    });

    const nodePosition = { x: 0, y: 0 };

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

    const edmontonAdministrativeSourceId =
      edmontonAdministrativeStartingNode.id;
    const edmontonAdministrativeEdges = administrativeDepartmentDocs.reduce(
      (edmontonAdministrativeEdgesAcc: Edge[], userDocument: UserDocument) => {
        const { _id, storeLocation } = userDocument;

        if (storeLocation === 'Vancouver' || storeLocation === 'Calgary') {
          return edmontonAdministrativeEdgesAcc;
        }

        const edmontonAdministrativeEdge: Edge = {
          id: `${edmontonAdministrativeSourceId}-${_id}`, // source-target
          source: edmontonAdministrativeSourceId,
          target: _id,
          type: 'smoothstep',
          animated: true,
          // label: 'has subordinates',
          labelBgPadding: [8, 4],
          labelBgBorderRadius: 4,
          labelBgStyle: { fill: 'white' },
          labelStyle: { fill: 'black', fontWeight: 700 },
          style: { stroke: 'black' },
        };
        edmontonAdministrativeEdgesAcc.push(edmontonAdministrativeEdge);

        return edmontonAdministrativeEdgesAcc;
      },
      []
    );

    const calgaryAdministrativeSourceId = calgaryAdministrativeStartingNode.id;
    const calgaryAdministrativeEdges = administrativeDepartmentDocs.reduce(
      (calgaryAdministrativeEdgesAcc: Edge[], userDocument: UserDocument) => {
        const { _id, storeLocation } = userDocument;

        if (storeLocation === 'Vancouver' || storeLocation === 'Edmonton') {
          return calgaryAdministrativeEdgesAcc;
        }

        const calgaryAdministrativeEdge: Edge = {
          id: `${calgaryAdministrativeSourceId}-${_id}`, // source-target
          source: calgaryAdministrativeSourceId,
          target: _id,
          type: 'smoothstep',
          animated: true,
          // label: 'has subordinates',
          labelBgPadding: [8, 4],
          labelBgBorderRadius: 4,
          labelBgStyle: { fill: 'white' },
          labelStyle: { fill: 'black', fontWeight: 700 },
          style: { stroke: 'black' },
        };
        calgaryAdministrativeEdgesAcc.push(calgaryAdministrativeEdge);

        return calgaryAdministrativeEdgesAcc;
      },
      []
    );

    const vancouverAdministrativeSourceId =
      vancouverAdministrativeStartingNode.id;
    const vancouverAdministrativeEdges = administrativeDepartmentDocs.reduce(
      (vancouverAdministrativeEdgesAcc: Edge[], userDocument: UserDocument) => {
        const { _id, storeLocation } = userDocument;

        if (storeLocation === 'Edmonton' || storeLocation === 'Calgary') {
          return vancouverAdministrativeEdgesAcc;
        }

        const vancouverAdministrativeEdge: Edge = {
          id: `${vancouverAdministrativeSourceId}-${_id}`, // source-target
          source: vancouverAdministrativeSourceId,
          target: _id,
          type: 'smoothstep',
          animated: true,
          // label: 'has subordinates',
          labelBgPadding: [8, 4],
          labelBgBorderRadius: 4,
          labelBgStyle: { fill: 'white' },
          labelStyle: { fill: 'black', fontWeight: 700 },
          style: { stroke: 'black' },
        };
        vancouverAdministrativeEdgesAcc.push(vancouverAdministrativeEdge);

        return vancouverAdministrativeEdgesAcc;
      },
      []
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
  }, [groupedByDepartment, padding, rowGap]);

  // set sales and marketing nodes
  useEffect(() => {}, [groupedByDepartment, padding, rowGap]);

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
          ...executiveManagementNodes,
          ...administrativeDepartmentNodes,
        ]}
        initialEdges={[
          ...executiveManagementEdges,
          ...administrativeDepartmentEdges,
        ]}
      />
    </Group>
  );
}

export default Directory;
