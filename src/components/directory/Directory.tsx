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
        type: 'default',
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

    // edmonton store location node id
    const edmontonStoreLocationSourceId = storeLocationsNodes.find(
      (storeLocationNode: Node) =>
        storeLocationNode.id === 'storeLocation-Edmonton'
    )?.id as string;

    // edmonton administrative node id
    const edmontonAdministrativeSourceId =
      edmontonAdministrativeStartingNode.id;

    // edge from edmonton store location to edmonton administrative node
    const edmontonStoreLocationToEdmontonAdministrativeEdge: Edge = {
      id: `${edmontonStoreLocationSourceId}-${edmontonAdministrativeSourceId}`, // source-target
      source: edmontonStoreLocationSourceId,
      target: edmontonAdministrativeSourceId,
      type: 'smoothstep',
      animated: true,
      // label: 'has subordinates',
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: 'white' },
      labelStyle: { fill: 'black', fontWeight: 700 },
      style: { stroke: 'black' },
    };

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
      [edmontonStoreLocationToEdmontonAdministrativeEdge]
    );

    // calgary store location node id
    const calgaryStoreLocationSourceId = storeLocationsNodes.find(
      (storeLocationNode: Node) =>
        storeLocationNode.id === 'storeLocation-Calgary'
    )?.id as string;

    // calgary administrative node id
    const calgaryAdministrativeSourceId = calgaryAdministrativeStartingNode.id;

    // edge from calgary store location to calgary administrative node
    const calgaryStoreLocationToCalgaryAdministrativeEdge: Edge = {
      id: `${calgaryStoreLocationSourceId}-${calgaryAdministrativeSourceId}`, // source-target
      source: calgaryStoreLocationSourceId,
      target: calgaryAdministrativeSourceId,
      type: 'smoothstep',
      animated: true,
      // label: 'has subordinates',
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: 'white' },
      labelStyle: { fill: 'black', fontWeight: 700 },
      style: { stroke: 'black' },
    };

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
      [calgaryStoreLocationToCalgaryAdministrativeEdge]
    );

    // vancouver store location node id
    const vancouverStoreLocationSourceId = storeLocationsNodes.find(
      (storeLocationNode: Node) =>
        storeLocationNode.id === 'storeLocation-Vancouver'
    )?.id as string;

    // vancouver administrative node id
    const vancouverAdministrativeSourceId =
      vancouverAdministrativeStartingNode.id;

    // edge from vancouver store location to vancouver administrative node
    const vancouverStoreLocationToVancouverAdministrativeEdge: Edge = {
      id: `${vancouverStoreLocationSourceId}-${vancouverAdministrativeSourceId}`, // source-target
      source: vancouverStoreLocationSourceId,
      target: vancouverAdministrativeSourceId,
      type: 'smoothstep',
      animated: true,
      // label: 'has subordinates',
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: 'white' },
      labelStyle: { fill: 'black', fontWeight: 700 },
      style: { stroke: 'black' },
    };

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
  }, [groupedByDepartment, padding, rowGap, storeLocationsNodes]);

  // set sales and marketing nodes
  useEffect(() => {
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
        position: { x: 0, y: 0 },
        style: { width: 500, height: 309 },
      };

      return initialSalesAndMarketingDepartmentDocNode;
    });

    const nodePosition = { x: 0, y: 0 };

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

    // edmonton store location node id
    const edmontonStoreLocationSourceId = storeLocationsNodes.find(
      (storeLocationNode: Node) =>
        storeLocationNode.id === 'storeLocation-Edmonton'
    )?.id as string;

    // edmonton sales and marketing node id
    const edmontonSalesAndMarketingSourceId =
      edmontonSalesAndMarketingStartingNode.id;

    // edge from edmonton store location to edmonton sales and marketing node
    const edmontonStoreLocationToEdmontonSalesAndMarketingEdge: Edge = {
      id: `${edmontonStoreLocationSourceId}-${edmontonSalesAndMarketingSourceId}`, // source-target
      source: edmontonStoreLocationSourceId,
      target: edmontonSalesAndMarketingSourceId,
      type: 'smoothstep',
      animated: true,
      // label: 'has subordinates',
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: 'white' },
      labelStyle: { fill: 'black', fontWeight: 700 },
      style: { stroke: 'black' },
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
          id: `${edmontonSalesAndMarketingSourceId}-${_id}`, // source-target
          source: edmontonSalesAndMarketingSourceId,
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
        edmontonSalesAndMarketingEdgesAcc.push(edmontonSalesAndMarketingEdge);

        return edmontonSalesAndMarketingEdgesAcc;
      },
      [edmontonStoreLocationToEdmontonSalesAndMarketingEdge]
    );

    // calgary store location node id
    const calgaryStoreLocationSourceId = storeLocationsNodes.find(
      (storeLocationNode: Node) =>
        storeLocationNode.id === 'storeLocation-Calgary'
    )?.id as string;

    // calgary sales and marketing node id
    const calgarySalesAndMarketingSourceId =
      calgarySalesAndMarketingStartingNode.id;

    // edge from calgary store location to calgary sales and marketing node
    const calgaryStoreLocationToCalgarySalesAndMarketingEdge: Edge = {
      id: `${calgaryStoreLocationSourceId}-${calgarySalesAndMarketingSourceId}`, // source-target
      source: calgaryStoreLocationSourceId,
      target: calgarySalesAndMarketingSourceId,
      type: 'smoothstep',
      animated: true,
      // label: 'has subordinates',
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: 'white' },
      labelStyle: { fill: 'black', fontWeight: 700 },
      style: { stroke: 'black' },
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
          id: `${calgarySalesAndMarketingSourceId}-${_id}`, // source-target
          source: calgarySalesAndMarketingSourceId,
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
        calgarySalesAndMarketingEdgesAcc.push(calgarySalesAndMarketingEdge);

        return calgarySalesAndMarketingEdgesAcc;
      },
      [calgaryStoreLocationToCalgarySalesAndMarketingEdge]
    );

    // vancouver store location node id
    const vancouverStoreLocationSourceId = storeLocationsNodes.find(
      (storeLocationNode: Node) =>
        storeLocationNode.id === 'storeLocation-Vancouver'
    )?.id as string;

    // vancouver sales and marketing node id
    const vancouverSalesAndMarketingSourceId =
      vancouverSalesAndMarketingStartingNode.id;

    // edge from vancouver store location to vancouver sales and marketing node
    const vancouverStoreLocationToVancouverSalesAndMarketingEdge: Edge = {
      id: `${vancouverStoreLocationSourceId}-${vancouverSalesAndMarketingSourceId}`, // source-target
      source: vancouverStoreLocationSourceId,
      target: vancouverSalesAndMarketingSourceId,
      type: 'smoothstep',
      animated: true,
      // label: 'has subordinates',
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: 'white' },
      labelStyle: { fill: 'black', fontWeight: 700 },
      style: { stroke: 'black' },
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
          id: `${vancouverSalesAndMarketingSourceId}-${_id}`, // source-target
          source: vancouverSalesAndMarketingSourceId,
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
        vancouverSalesAndMarketingEdgesAcc.push(vancouverSalesAndMarketingEdge);

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
  }, [groupedByDepartment, padding, rowGap, storeLocationsNodes]);

  // set information technology nodes
  useEffect(() => {
    const informationTechnologyDocs =
      groupedByDepartment['Information Technology'] ?? [];

    // starting information technology node
    const initialInformationTechnologyDepartmentDocNode: FlowNode = {
      id: 'information-technology-department',
      type: 'input',
      data: { label: 'Information Technology Department' },
      position: { x: 0, y: 0 },
      style: { width: 500, height: 309 },
    };

    const nodePosition = { x: 0, y: 0 };

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
          id: `${informationTechnologyDepartmentSourceId}-${_id}`, // source-target
          source: informationTechnologyDepartmentSourceId,
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
  }, [groupedByDepartment, padding, rowGap]);

  // set repair technicians nodes
  useEffect(() => {
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
        position: { x: 0, y: 0 },
        style: { width: 500, height: 309 },
      };

      return initialRepairTechniciansDepartmentDocNode;
    });

    const nodePosition = { x: 0, y: 0 };

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

    // edmonton store location node id
    const edmontonStoreLocationSourceId = storeLocationsNodes.find(
      (storeLocationNode: Node) =>
        storeLocationNode.id === 'storeLocation-Edmonton'
    )?.id as string;

    // edmonton repair technicians node id
    const edmontonRepairTechniciansSourceId =
      edmontonRepairTechniciansStartingNode.id;

    // edge from edmonton store location to edmonton repair technicians node
    const edmontonStoreLocationToEdmontonRepairTechniciansEdge: Edge = {
      id: `${edmontonStoreLocationSourceId}-${edmontonRepairTechniciansSourceId}`, // source-target
      source: edmontonStoreLocationSourceId,
      target: edmontonRepairTechniciansSourceId,
      type: 'smoothstep',
      animated: true,
      // label: 'has subordinates',
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: 'white' },
      labelStyle: { fill: 'black', fontWeight: 700 },
      style: { stroke: 'black' },
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
          id: `${edmontonRepairTechniciansSourceId}-${_id}`, // source-target
          source: edmontonRepairTechniciansSourceId,
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
        edmontonRepairTechniciansEdgesAcc.push(edmontonRepairTechniciansEdge);

        return edmontonRepairTechniciansEdgesAcc;
      },
      [edmontonStoreLocationToEdmontonRepairTechniciansEdge]
    );

    // calgary store location node id
    const calgaryStoreLocationSourceId = storeLocationsNodes.find(
      (storeLocationNode: Node) =>
        storeLocationNode.id === 'storeLocation-Calgary'
    )?.id as string;

    // calgary repair technicians node id
    const calgaryRepairTechniciansSourceId =
      calgaryRepairTechniciansStartingNode.id;

    // edge from calgary store location to calgary repair technicians node
    const calgaryStoreLocationToCalgaryRepairTechniciansEdge: Edge = {
      id: `${calgaryStoreLocationSourceId}-${calgaryRepairTechniciansSourceId}`, // source-target
      source: calgaryStoreLocationSourceId,
      target: calgaryRepairTechniciansSourceId,
      type: 'smoothstep',
      animated: true,
      // label: 'has subordinates',
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: 'white' },
      labelStyle: { fill: 'black', fontWeight: 700 },
      style: { stroke: 'black' },
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
          id: `${calgaryRepairTechniciansSourceId}-${_id}`, // source-target
          source: calgaryRepairTechniciansSourceId,
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
        calgaryRepairTechniciansEdgesAcc.push(calgaryRepairTechniciansEdge);

        return calgaryRepairTechniciansEdgesAcc;
      },
      [calgaryStoreLocationToCalgaryRepairTechniciansEdge]
    );

    // vancouver store location node id
    const vancouverStoreLocationSourceId = storeLocationsNodes.find(
      (storeLocationNode: Node) =>
        storeLocationNode.id === 'storeLocation-Vancouver'
    )?.id as string;

    // vancouver repair technicians node id
    const vancouverRepairTechniciansSourceId =
      vancouverRepairTechniciansStartingNode.id;

    // edge from vancouver store location to vancouver repair technicians node
    const vancouverStoreLocationToVancouverRepairTechniciansEdge: Edge = {
      id: `${vancouverStoreLocationSourceId}-${vancouverRepairTechniciansSourceId}`, // source-target
      source: vancouverStoreLocationSourceId,
      target: vancouverRepairTechniciansSourceId,
      type: 'smoothstep',
      animated: true,
      // label: 'has subordinates',
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: 'white' },
      labelStyle: { fill: 'black', fontWeight: 700 },
      style: { stroke: 'black' },
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
          id: `${vancouverRepairTechniciansSourceId}-${_id}`, // source-target
          source: vancouverRepairTechniciansSourceId,
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
        vancouverRepairTechniciansEdgesAcc.push(vancouverRepairTechniciansEdge);

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
  }, [groupedByDepartment, padding, rowGap, storeLocationsNodes]);

  // field service technicians nodes and edges
  useEffect(() => {
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
        position: { x: 0, y: 0 },
        style: { width: 500, height: 309 },
      };

      return initialFieldServiceTechniciansDepartmentDocNode;
    });

    const nodePosition = { x: 0, y: 0 };

    const fieldServiceTechniciansDocsNodes = fieldServiceTechniciansDocs.reduce(
      (fieldServiceTechniciansNodesAcc: Node[], userDocument: UserDocument) => {
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

    // edmonton store location node id
    const edmontonStoreLocationSourceId = storeLocationsNodes.find(
      (storeLocationNode: Node) =>
        storeLocationNode.id === 'storeLocation-Edmonton'
    )?.id as string;

    // edmonton field service technicians node id
    const edmontonFieldServiceTechniciansSourceId =
      edmontonFieldServiceTechniciansStartingNode.id;

    // edge from edmonton store location to edmonton field service technicians node
    const edmontonStoreLocationToEdmontonFieldServiceTechniciansEdge: Edge = {
      id: `${edmontonStoreLocationSourceId}-${edmontonFieldServiceTechniciansSourceId}`, // source-target
      source: edmontonStoreLocationSourceId,
      target: edmontonFieldServiceTechniciansSourceId,
      type: 'smoothstep',
      animated: true,
      // label: 'has subordinates',
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: 'white' },
      labelStyle: { fill: 'black', fontWeight: 700 },
      style: { stroke: 'black' },
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
            id: `${edmontonFieldServiceTechniciansSourceId}-${_id}`, // source-target
            source: edmontonFieldServiceTechniciansSourceId,
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
          edmontonFieldServiceTechniciansEdgesAcc.push(
            edmontonFieldServiceTechniciansEdge
          );

          return edmontonFieldServiceTechniciansEdgesAcc;
        },
        [edmontonStoreLocationToEdmontonFieldServiceTechniciansEdge]
      );

    // calgary store location node id
    const calgaryStoreLocationSourceId = storeLocationsNodes.find(
      (storeLocationNode: Node) =>
        storeLocationNode.id === 'storeLocation-Calgary'
    )?.id as string;

    // calgary field service technicians node id
    const calgaryFieldServiceTechniciansSourceId =
      calgaryFieldServiceTechniciansStartingNode.id;

    // edge from calgary store location to calgary field service technicians node
    const calgaryStoreLocationToCalgaryFieldServiceTechniciansEdge: Edge = {
      id: `${calgaryStoreLocationSourceId}-${calgaryFieldServiceTechniciansSourceId}`, // source-target
      source: calgaryStoreLocationSourceId,
      target: calgaryFieldServiceTechniciansSourceId,
      type: 'smoothstep',
      animated: true,
      // label: 'has subordinates',
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: 'white' },
      labelStyle: { fill: 'black', fontWeight: 700 },
      style: { stroke: 'black' },
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
            id: `${calgaryFieldServiceTechniciansSourceId}-${_id}`, // source-target
            source: calgaryFieldServiceTechniciansSourceId,
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
          calgaryFieldServiceTechniciansEdgesAcc.push(
            calgaryFieldServiceTechniciansEdge
          );

          return calgaryFieldServiceTechniciansEdgesAcc;
        },
        [calgaryStoreLocationToCalgaryFieldServiceTechniciansEdge]
      );

    // vancouver store location node id
    const vancouverStoreLocationSourceId = storeLocationsNodes.find(
      (storeLocationNode: Node) =>
        storeLocationNode.id === 'storeLocation-Vancouver'
    )?.id as string;

    // vancouver field service technicians node id
    const vancouverFieldServiceTechniciansSourceId =
      vancouverFieldServiceTechniciansStartingNode.id;

    // edge from vancouver store location to vancouver field service technicians node
    const vancouverStoreLocationToVancouverFieldServiceTechniciansEdge: Edge = {
      id: `${vancouverStoreLocationSourceId}-${vancouverFieldServiceTechniciansSourceId}`, // source-target
      source: vancouverStoreLocationSourceId,
      target: vancouverFieldServiceTechniciansSourceId,
      type: 'smoothstep',
      animated: true,
      // label: 'has subordinates',
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: 'white' },
      labelStyle: { fill: 'black', fontWeight: 700 },
      style: { stroke: 'black' },
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
            id: `${vancouverFieldServiceTechniciansSourceId}-${_id}`, // source-target
            source: vancouverFieldServiceTechniciansSourceId,
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
  }, [groupedByDepartment, padding, rowGap, storeLocationsNodes]);

  // logistics and inventory nodes and edges
  useEffect(() => {
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
        position: { x: 0, y: 0 },
        style: { width: 500, height: 309 },
      };

      return initialLogisticsAndInventoryDepartmentDocNode;
    });

    const nodePosition = { x: 0, y: 0 };

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

    // edmonton store location node id
    const edmontonStoreLocationSourceId = storeLocationsNodes.find(
      (storeLocationNode: Node) =>
        storeLocationNode.id === 'storeLocation-Edmonton'
    )?.id as string;

    // edmonton logistics and inventory node id
    const edmontonLogisticsAndInventorySourceId =
      edmontonLogisticsAndInventoryStartingNode.id;

    // edge from edmonton store location to edmonton logistics and inventory node
    const edmontonStoreLocationToEdmontonLogisticsAndInventoryEdge: Edge = {
      id: `${edmontonStoreLocationSourceId}-${edmontonLogisticsAndInventorySourceId}`, // source-target
      source: edmontonStoreLocationSourceId,
      target: edmontonLogisticsAndInventorySourceId,
      type: 'smoothstep',
      animated: true,
      // label: 'has subordinates',
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: 'white' },
      labelStyle: { fill: 'black', fontWeight: 700 },
      style: { stroke: 'black' },
    };

    const edmontonLogisticsAndInventoryEdges = logisticsAndInventoryDocs.reduce(
      (
        edmontonLogisticsAndInventoryEdgesAcc: Edge[],
        userDocument: UserDocument
      ) => {
        const { _id, storeLocation } = userDocument;

        if (storeLocation === 'Vancouver' || storeLocation === 'Calgary') {
          return edmontonLogisticsAndInventoryEdgesAcc;
        }

        const edmontonLogisticsAndInventoryEdge: Edge = {
          id: `${edmontonLogisticsAndInventorySourceId}-${_id}`, // source-target
          source: edmontonLogisticsAndInventorySourceId,
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
        edmontonLogisticsAndInventoryEdgesAcc.push(
          edmontonLogisticsAndInventoryEdge
        );

        return edmontonLogisticsAndInventoryEdgesAcc;
      },
      [edmontonStoreLocationToEdmontonLogisticsAndInventoryEdge]
    );

    // calgary store location node id
    const calgaryStoreLocationSourceId = storeLocationsNodes.find(
      (storeLocationNode: Node) =>
        storeLocationNode.id === 'storeLocation-Calgary'
    )?.id as string;

    // calgary logistics and inventory node id
    const calgaryLogisticsAndInventorySourceId =
      calgaryLogisticsAndInventoryStartingNode.id;

    // edge from calgary store location to calgary logistics and inventory node
    const calgaryStoreLocationToCalgaryLogisticsAndInventoryEdge: Edge = {
      id: `${calgaryStoreLocationSourceId}-${calgaryLogisticsAndInventorySourceId}`, // source-target
      source: calgaryStoreLocationSourceId,
      target: calgaryLogisticsAndInventorySourceId,
      type: 'smoothstep',
      animated: true,
      // label: 'has subordinates',
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: 'white' },
      labelStyle: { fill: 'black', fontWeight: 700 },
      style: { stroke: 'black' },
    };

    const calgaryLogisticsAndInventoryEdges = logisticsAndInventoryDocs.reduce(
      (
        calgaryLogisticsAndInventoryEdgesAcc: Edge[],
        userDocument: UserDocument
      ) => {
        const { _id, storeLocation } = userDocument;

        if (storeLocation === 'Vancouver' || storeLocation === 'Edmonton') {
          return calgaryLogisticsAndInventoryEdgesAcc;
        }

        const calgaryLogisticsAndInventoryEdge: Edge = {
          id: `${calgaryLogisticsAndInventorySourceId}-${_id}`, // source-target
          source: calgaryLogisticsAndInventorySourceId,
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
        calgaryLogisticsAndInventoryEdgesAcc.push(
          calgaryLogisticsAndInventoryEdge
        );

        return calgaryLogisticsAndInventoryEdgesAcc;
      },
      [calgaryStoreLocationToCalgaryLogisticsAndInventoryEdge]
    );

    // vancouver store location node id
    const vancouverStoreLocationSourceId = storeLocationsNodes.find(
      (storeLocationNode: Node) =>
        storeLocationNode.id === 'storeLocation-Vancouver'
    )?.id as string;

    // vancouver logistics and inventory node id
    const vancouverLogisticsAndInventorySourceId =
      vancouverLogisticsAndInventoryStartingNode.id;

    // edge from vancouver store location to vancouver logistics and inventory node
    const vancouverStoreLocationToVancouverLogisticsAndInventoryEdge: Edge = {
      id: `${vancouverStoreLocationSourceId}-${vancouverLogisticsAndInventorySourceId}`, // source-target
      source: vancouverStoreLocationSourceId,
      target: vancouverLogisticsAndInventorySourceId,
      type: 'smoothstep',
      animated: true,
      // label: 'has subordinates',
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: 'white' },
      labelStyle: { fill: 'black', fontWeight: 700 },
      style: { stroke: 'black' },
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
            id: `${vancouverLogisticsAndInventorySourceId}-${_id}`, // source-target
            source: vancouverLogisticsAndInventorySourceId,
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
  }, [groupedByDepartment, padding, rowGap, storeLocationsNodes]);

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
        ]}
        initialEdges={[
          ...executiveManagementEdges,
          ...administrativeDepartmentEdges,
          ...salesAndMarketingEdges,
          ...informationTechnologyEdges,
          ...repairTechniciansEdges,
          ...fieldServiceTechniciansEdges,
          ...logisticsAndInventoryEdges,
        ]}
      />
    </Group>
  );
}

export default Directory;
