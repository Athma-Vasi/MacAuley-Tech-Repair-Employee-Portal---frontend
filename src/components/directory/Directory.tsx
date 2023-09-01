import {
  Accordion,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import { InvalidTokenError } from 'jwt-decode';
import localforage from 'localforage';
import { ChangeEvent, useEffect, useReducer } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { Edge, Node } from 'reactflow';

import {
  DEPARTMENT_DATA,
  DEPARTMENT_JOB_POSITION_MAP,
  JOB_POSITION_DATA,
  PROPERTY_DESCRIPTOR,
  STORE_LOCATION_DATA,
} from '../../constants/data';
import { globalAction } from '../../context/globalProvider/state';
import { useAuth, useGlobalState } from '../../hooks';
import {
  returnAccessibleCheckboxGroupInputsElements,
  returnAccessibleSelectInputElements,
  returnAccessibleSelectedDeselectedTextElements,
  returnAccessibleSliderInputElements,
} from '../../jsxCreators';
import {
  Department,
  JobPosition,
  SelectInputData,
  StoreLocation,
} from '../../types';
import {
  addFieldsToObject,
  groupByField,
  logState,
  replaceLastCommaWithAnd,
  urlBuilder,
} from '../../utils';
import {
  AccessibleCheckboxGroupInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleSliderInputCreatorInfo,
} from '../wrappers';
import {
  directoryAction,
  directoryReducer,
  initialDirectoryState,
} from './state';
import {
  DagreLabelPos,
  DagreRankAlign,
  DagreRankDir,
  DagreRankerAlgorithm,
  DepartmentsWithDefaultKey,
  DirectoryUserDocument,
  JobPositionsWithDefaultKey,
  RemoteDepartmentsProfileNodesObject,
  StoreDepartmentsProfileNodesObject,
  StoreLocationsWithDefaultKey,
} from './types';
import {
  returnDagreLayoutedElements,
  returnDirectoryProfileCard,
} from './utils';
import {
  DAGRE_LAYOUT_RANKALIGN_SELECT_OPTIONS,
  DAGRE_LAYOUT_RANKDIR_SELECT_OPTIONS,
  DAGRE_LAYOUT_RANKER_SELECT_OPTIONS,
  DIRECTORY_DEPARTMENT_SELECT_OPTIONS,
  DIRECTORY_JOB_POSITION_SELECT_OPTIONS,
  DIRECTORY_STORE_LOCATION_SELECT_OPTIONS,
} from './constants';
import CarouselBuilder from '../carouselBuilder/CarouselBuilder';
import GraphBuilderWrapper from '../graphBuilder/GraphBuilder';

import { PieChartControlsStack } from '../displayStatistics/responsivePieChart/utils';

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
    filteredDepartmentsNodesAndEdges,
    filterByJobPosition,
    filteredJobPositionsNodesAndEdges,
    filterByStoreLocation,
    filteredStoreLocationsNodesAndEdges,

    triggerSetDepartmentsNodesAndEdges,
    departmentsNodesAndEdges,

    layoutedNodes,
    layoutedEdges,
    triggerSetLayoutedNodesAndEdges,

    // dagre layout options
    dagreRankDir,
    dagreRankAlign,
    dagreNodeSep, // default 50
    dagreRankSep, // default 50
    dagreRanker, // default 'network-simplex'
    dagreMinLen, // minimum edge length default
    dagreWeight, // default: 1
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

  // // once groupedByDepartment is set, trigger effect to set departments nodes and edges
  // useEffect(() => {
  //   if (!Object.keys(groupedByDepartment).length) {
  //     return;
  //   }

  //   directoryDispatch({
  //     type: directoryAction.triggerSetDepartmentsNodesAndEdges,
  //     payload: true,
  //   });
  // }, [groupedByDepartment]);

  // ┏━ begin main node & edges effect ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  useEffect(() => {
    if (!Object.keys(groupedByDepartment).length) {
      return;
    }

    // ┏━ begin defaults ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end defaults ━┛

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

          const executiveManagementNode: Node = {
            id: jobPosition,
            type:
              jobPosition === 'Chief Executive Officer' ? 'input' : 'default',
            data: { label: directoryProfileCard },
            position: { x: 0, y: 0 },
            style: nodeDimensions,
          };
          executiveManagementNodesAcc.push(executiveManagementNode);

          return executiveManagementNodesAcc;
        },
        []
      );

      const ceoId =
        executiveManagementDocsNodes.find(
          (executiveManagementDocNode) =>
            executiveManagementDocNode.id === 'Chief Executive Officer'
        )?.id ?? '';

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
            id: `${ceoId}-${jobPosition}`, // source-target
            source: ceoId,
            target: jobPosition,
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

    // ┏━ begin store administration department ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setStoreAdministrationEdgesAndNodes() {
      const storeAdministrationDocs =
        groupedByDepartment['Store Administration'] ?? [];

      // group by store locations
      const storeAdministrationDocsGroupedByStoreLocation: Record<
        StoreLocation,
        DirectoryUserDocument[]
      > = groupByField<DirectoryUserDocument>({
        objectArray: storeAdministrationDocs,
        field: 'storeLocation',
      });

      // TODO: REMOVE THIS FILTER FUNCTION IN PRODUCTION
      // filter out manager account used for development
      const storeAdministrationDocsGroupedByStoreLocationFiltered =
        Object.entries(storeAdministrationDocsGroupedByStoreLocation).reduce(
          (
            storeAdministrationDocsGroupedByStoreLocationFilteredAcc: Record<
              StoreLocation,
              DirectoryUserDocument[]
            >,
            storeLocationAndDocsTuple
          ) => {
            const [storeLocation, storeAdministrationDocsArr] =
              storeLocationAndDocsTuple as [
                StoreLocation,
                DirectoryUserDocument[]
              ];

            const filteredStoreAdministrationDocsArr =
              storeAdministrationDocsArr.filter(
                (userDocument: DirectoryUserDocument) =>
                  userDocument.lastName !== 'Vorkosigan'
              );

            Object.defineProperty(
              storeAdministrationDocsGroupedByStoreLocationFilteredAcc,
              storeLocation,
              {
                ...PROPERTY_DESCRIPTOR,
                value: filteredStoreAdministrationDocsArr,
              }
            );

            return storeAdministrationDocsGroupedByStoreLocationFilteredAcc;
          },
          Object.create(null)
        );

      // using the created object structure, create profile nodes
      const storeAdministrationProfileNodesObject = Object.entries(
        storeAdministrationDocsGroupedByStoreLocationFiltered
      ).reduce(
        (
          storeAdministrationProfileNodesObjectAcc: StoreDepartmentsProfileNodesObject,
          storeAdministrationGroupedDocsTuple
        ) => {
          const [storeLocation, groupedStoreAdministrationByStoreLocationArr] =
            storeAdministrationGroupedDocsTuple as [
              StoreLocation,
              DirectoryUserDocument[]
            ];

          // create store location field
          Object.defineProperty(
            storeAdministrationProfileNodesObjectAcc,
            storeLocation,
            {
              ...PROPERTY_DESCRIPTOR,
              value: Object.create(null),
            }
          );

          // // create store location heading card for better visual differentiation
          // const storesHeadingCard = (
          //   <Group
          //     w="100%"
          //     h="100%"
          //     onClick={() => {
          //       console.log('stores heading card clicked');
          //     }}
          //   >
          //     <Card shadow="sm" padding={padding} radius="md" w="100%" h="100%">
          //       <Text size="sm" weight={700}>
          //         {storeLocation}
          //       </Text>
          //     </Card>
          //   </Group>
          // );

          // // assign it to the store location field
          // Object.defineProperty(
          //   storeAdministrationProfileNodesObjectAcc[storeLocation],
          //   'heading',
          //   {
          //     ...PROPERTY_DESCRIPTOR,
          //     value: {
          //       id: `${storeLocation}-heading`,
          //       type: 'default',
          //       data: { label: storesHeadingCard },
          //       position: nodePosition,
          //       style: nodeDimensions,
          //     },
          //   }
          // );

          // iterate through docs for each store location and create profile cards for each job position
          const jobPositionsProfileNodesObj =
            groupedStoreAdministrationByStoreLocationArr.reduce(
              (
                jobPositionsProfileNodesObjAcc: Record<
                  JobPosition,
                  React.JSX.Element[]
                >,
                userDocument: DirectoryUserDocument
              ) => {
                const { jobPosition } = userDocument;

                // create profile card
                const displayProfileCard = returnDirectoryProfileCard({
                  userDocument,
                  padding,
                  rowGap,
                });

                // grab the array of profile cards for the job position if it exists, otherwise initialize an empty array
                const value = [
                  ...(jobPositionsProfileNodesObjAcc[jobPosition] ?? []),
                  displayProfileCard,
                ] as React.JSX.Element[];

                // add job position field
                Object.defineProperty(
                  jobPositionsProfileNodesObjAcc,
                  jobPosition,
                  {
                    ...PROPERTY_DESCRIPTOR,
                    value,
                  }
                );

                return jobPositionsProfileNodesObjAcc;
              },
              Object.create(null)
            );

          // for each job position, create a single profile node that will hold a carousel of created profile cards
          Object.entries(jobPositionsProfileNodesObj).forEach(
            (jobPositionAndProfileCardsTuple) => {
              const [jobPosition, profileCards] =
                jobPositionAndProfileCardsTuple as [
                  JobPosition,
                  React.JSX.Element[]
                ];

              const groupedStoreAdministrationByStoreLocationCarousel = (
                <CarouselBuilder carouselProps={{}} slides={profileCards} />
              );

              // create profile node with carousel
              const groupedStoreAdministrationByStoreLocationProfileNode: Node =
                {
                  id: `${storeLocation}-${jobPosition}`,
                  type: 'default',
                  data: {
                    label: groupedStoreAdministrationByStoreLocationCarousel,
                  },
                  position: nodePosition,
                  style: nodeDimensions,
                };

              // add job position field with profile node
              Object.defineProperty(
                storeAdministrationProfileNodesObjectAcc[storeLocation],
                jobPosition,
                {
                  ...PROPERTY_DESCRIPTOR,
                  value: groupedStoreAdministrationByStoreLocationProfileNode,
                }
              );
            },
            Object.create(null)
          );

          return storeAdministrationProfileNodesObjectAcc;
        },
        Object.create(null)
      );

      console.log(
        'storeAdministrationProfileNodesObject',
        storeAdministrationProfileNodesObject
      );

      // create edges
      const storeAdministrationProfileEdges = Object.entries(
        storeAdministrationProfileNodesObject
      ).reduce(
        (
          storeAdministrationProfileEdgesAcc: Edge[],
          storeLocationAndJobPositionProfileNodesTuple
        ) => {
          const [_storeLocation, jobPositionsProfileNodesObj] =
            storeLocationAndJobPositionProfileNodesTuple as [
              StoreLocation,
              Record<JobPosition, Node>
            ];

          // find the coo profile node id
          const cooProfileNodeId = 'Chief Operations Officer';

          // find the store manager profile node id for the store location
          const storeManagerProfileNodeId =
            Object.entries(jobPositionsProfileNodesObj).find(
              (jobPositionAndProfileNodeTuple) => {
                const [jobPosition, _profileNode] =
                  jobPositionAndProfileNodeTuple as [JobPosition, Node];

                return jobPosition.toLowerCase().includes('store manager');
              }
            )?.[1].id ?? '';

          // connect coo to store manager
          // [COO] ━━━ [STORE MANAGER]
          const cooToStoreManagerEdge: Edge = {
            ...edgeDefaults,
            id: `${cooProfileNodeId}-${storeManagerProfileNodeId}`, // source-target
            source: cooProfileNodeId,
            target: storeManagerProfileNodeId,
          };

          // connect store manager to subordinates
          //        ┏━  [STORE MANAGER]
          // [COO] ━━━ [STORE MANAGER]
          //        ┗━ [STORE MANAGER]

          const storeSubordinatesProfileEdges = Object.entries(
            jobPositionsProfileNodesObj
          ).reduce(
            (
              storeSubordinatesProfileEdgesAcc: Edge[],
              jobPositionProfileNodesTuple
            ) => {
              const [jobPosition, storeProfileNode] =
                jobPositionProfileNodesTuple as [JobPosition, Node];

              if (jobPosition.toLowerCase().includes('store manager')) {
                return storeSubordinatesProfileEdgesAcc;
              }

              const storeSubordinateProfileEdge: Edge = {
                ...edgeDefaults,
                id: `${storeManagerProfileNodeId}-${storeProfileNode.id}`, // source-target
                source: storeManagerProfileNodeId,
                target: storeProfileNode.id,
              };

              storeSubordinatesProfileEdgesAcc.push(
                storeSubordinateProfileEdge
              );

              return storeSubordinatesProfileEdgesAcc;
            },
            [cooToStoreManagerEdge]
          );

          storeAdministrationProfileEdgesAcc.push(
            ...storeSubordinatesProfileEdges
          );

          return storeAdministrationProfileEdgesAcc;
        },
        []
      );

      // set store administration profile nodes for dispatch
      const storeAdministrationProfileNodes = Object.entries(
        storeAdministrationProfileNodesObject
      ).reduce(
        (
          storeAdministrationProfileNodesAcc: Node[],
          storeLocationAndJobPositionProfileNodesTuple
        ) => {
          const [_, jobPositionsProfileNodesObj] =
            storeLocationAndJobPositionProfileNodesTuple as [
              StoreLocation,
              Record<JobPosition, Node>
            ];

          const jobPositionsProfileNodes = Object.values(
            jobPositionsProfileNodesObj
          );

          storeAdministrationProfileNodesAcc.push(...jobPositionsProfileNodes);

          return storeAdministrationProfileNodesAcc;
        },
        []
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Store Administration',
          kind: 'nodes',
          data: storeAdministrationProfileNodes,
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Store Administration',
          kind: 'edges',
          data: storeAdministrationProfileEdges,
        },
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end store administration department ━┛

    // ┏━ end office administration department ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setOfficeAdministrationEdgesAndNodes() {
      const officeAdministrationDocs =
        groupedByDepartment['Office Administration'] ?? [];

      // group by store locations
      const officeAdministrationDocsGroupedByStoreLocation: Record<
        StoreLocation,
        DirectoryUserDocument[]
      > = groupByField<DirectoryUserDocument>({
        objectArray: officeAdministrationDocs,
        field: 'storeLocation',
      });

      // using the created object structure, create profile nodes
      const officeAdministrationProfileNodesObject = Object.entries(
        officeAdministrationDocsGroupedByStoreLocation
      ).reduce(
        (
          officeAdministrationProfileNodesObjectAcc: StoreDepartmentsProfileNodesObject,
          officeAdministrationGroupedDocsTuple
        ) => {
          const [storeLocation, groupedOfficeAdministrationByStoreLocationArr] =
            officeAdministrationGroupedDocsTuple as [
              StoreLocation,
              DirectoryUserDocument[]
            ];

          // create store location field
          Object.defineProperty(
            officeAdministrationProfileNodesObjectAcc,
            storeLocation,
            {
              ...PROPERTY_DESCRIPTOR,
              value: Object.create(null),
            }
          );

          // iterate through docs for each store location and create profile cards for each job position
          const jobPositionsProfileNodesObj =
            groupedOfficeAdministrationByStoreLocationArr.reduce(
              (
                jobPositionsProfileNodesObjAcc: Record<
                  JobPosition,
                  React.JSX.Element[]
                >,
                userDocument: DirectoryUserDocument
              ) => {
                const { jobPosition } = userDocument;

                // create profile card
                const displayProfileCard = returnDirectoryProfileCard({
                  userDocument,
                  padding,
                  rowGap,
                });

                // grab the array of profile cards for the job position if it exists, otherwise initialize an empty array
                const value = [
                  ...(jobPositionsProfileNodesObjAcc[jobPosition] ?? []),
                  displayProfileCard,
                ] as React.JSX.Element[];

                // add job position field
                Object.defineProperty(
                  jobPositionsProfileNodesObjAcc,
                  jobPosition,
                  {
                    ...PROPERTY_DESCRIPTOR,
                    value,
                  }
                );

                return jobPositionsProfileNodesObjAcc;
              },
              Object.create(null)
            );

          // for each job position, create a single profile node that will hold a carousel of created profile cards
          Object.entries(jobPositionsProfileNodesObj).forEach(
            (jobPositionAndProfileCardsTuple) => {
              const [jobPosition, profileCards] =
                jobPositionAndProfileCardsTuple as [
                  JobPosition,
                  React.JSX.Element[]
                ];

              const nodeType = jobPosition
                .toLowerCase()
                .includes('administrator')
                ? 'default'
                : 'output';

              const groupedOfficeAdministrationByStoreLocationCarousel = (
                <CarouselBuilder carouselProps={{}} slides={profileCards} />
              );

              // create profile node with carousel
              const groupedOfficeAdministrationByStoreLocationProfileNode: Node =
                {
                  id: `${storeLocation}-${jobPosition}`,
                  type: nodeType,
                  data: {
                    label: groupedOfficeAdministrationByStoreLocationCarousel,
                  },
                  position: nodePosition,
                  style: nodeDimensions,
                };

              // add job position field with profile node
              Object.defineProperty(
                officeAdministrationProfileNodesObjectAcc[storeLocation],
                jobPosition,
                {
                  ...PROPERTY_DESCRIPTOR,
                  value: groupedOfficeAdministrationByStoreLocationProfileNode,
                }
              );
            },
            Object.create(null)
          );

          return officeAdministrationProfileNodesObjectAcc;
        },
        Object.create(null)
      );

      console.log(
        'officeAdministrationProfileNodesObject',
        officeAdministrationProfileNodesObject
      );

      // create edges
      const officeAdministrationProfileEdges = Object.entries(
        officeAdministrationProfileNodesObject
      ).reduce(
        (
          officeAdministrationProfileEdgesAcc: Edge[],
          storeLocationAndJobPositionProfileNodesTuple
        ) => {
          const [storeLocation, jobPositionsProfileNodesObj] =
            storeLocationAndJobPositionProfileNodesTuple as [
              StoreLocation,
              Record<JobPosition, Node>
            ];

          const officeManagerProfileNodeId = `${storeLocation}-Office Manager`;

          // find the office administrator profile node id for the store location
          const officeAdministratorProfileNodeId =
            Object.entries(jobPositionsProfileNodesObj).find(
              (jobPositionAndProfileNodeTuple) => {
                const [jobPosition, _profileNode] =
                  jobPositionAndProfileNodeTuple as [JobPosition, Node];

                return jobPosition.toLowerCase().includes('administrator');
              }
            )?.[1].id ?? '';

          // connect office manager to office administrator
          // [OFFICE MANAGER] ━━━ [OFFICE ADMINISTRATOR]
          const officeManagerToOfficeAdministratorEdge: Edge = {
            ...edgeDefaults,
            id: `${officeManagerProfileNodeId}-${officeAdministratorProfileNodeId}`, // source-target
            source: officeManagerProfileNodeId,
            target: officeAdministratorProfileNodeId,
          };

          // connect office administrator to subordinates
          //           ┏━ [EDMONTON] ━━━ [O.M] ━━━ [OFFICE ADMIN...]
          // [STORES] ━━━ [CALGARY] ━━━ [O.M] ━━━ [OFFICE ADMIN...]
          //           ┗━ [VANCOUVER] ━━━ [O.M] ━━━ [OFFICE ADMIN...]
          const officeSubordinatesProfileEdges = Object.entries(
            jobPositionsProfileNodesObj
          ).reduce(
            (
              officeSubordinatesProfileEdgesAcc: Edge[],
              jobPositionProfileNodesTuple
            ) => {
              const [jobPosition, officeProfileNode] =
                jobPositionProfileNodesTuple as [JobPosition, Node];

              if (jobPosition.toLowerCase().includes('administrator')) {
                return officeSubordinatesProfileEdgesAcc;
              }

              const officeSubordinateProfileEdge: Edge = {
                ...edgeDefaults,
                id: `${officeAdministratorProfileNodeId}-${officeProfileNode.id}`, // source-target
                source: officeAdministratorProfileNodeId,
                target: officeProfileNode.id,
              };

              officeSubordinatesProfileEdgesAcc.push(
                officeSubordinateProfileEdge
              );

              return officeSubordinatesProfileEdgesAcc;
            },
            [officeManagerToOfficeAdministratorEdge]
          );

          officeAdministrationProfileEdgesAcc.push(
            ...officeSubordinatesProfileEdges
          );

          return officeAdministrationProfileEdgesAcc;
        },
        []
      );

      // set office administration profile nodes for dispatch
      const officeAdministrationProfileNodes = Object.entries(
        officeAdministrationProfileNodesObject
      ).reduce(
        (
          officeAdministrationProfileNodesAcc: Node[],
          storeLocationAndJobPositionProfileNodesTuple
        ) => {
          const [_, jobPositionsProfileNodesObj] =
            storeLocationAndJobPositionProfileNodesTuple as [
              StoreLocation,
              Record<JobPosition, Node>
            ];

          const jobPositionsProfileNodes = Object.values(
            jobPositionsProfileNodesObj
          );

          officeAdministrationProfileNodesAcc.push(...jobPositionsProfileNodes);

          return officeAdministrationProfileNodesAcc;
        },
        []
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Office Administration',
          kind: 'nodes',
          data: officeAdministrationProfileNodes,
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Office Administration',
          kind: 'edges',
          data: officeAdministrationProfileEdges,
        },
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end office administration department ━┛

    // ┏━ begin human resources department ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setHumanResourcesEdgesAndNodes() {
      const humanResourcesDocs = groupedByDepartment['Human Resources'] ?? [];

      // group by job positions
      const humanResourcesDocsGroupedByJobPosition: Record<
        JobPosition,
        DirectoryUserDocument[]
      > = groupByField<DirectoryUserDocument>({
        objectArray: humanResourcesDocs,
        field: 'jobPosition',
      });

      // using the created object structure, create profile nodes
      const humanResourcesProfileNodesObject = Object.entries(
        humanResourcesDocsGroupedByJobPosition
      ).reduce(
        (
          humanResourcesProfileNodesObjectAcc: RemoteDepartmentsProfileNodesObject,
          humanResourcesGroupedDocsTuple
        ) => {
          const [jobPosition, groupedHumanResourcesByJobPositionArr] =
            humanResourcesGroupedDocsTuple as [
              JobPosition,
              DirectoryUserDocument[]
            ];

          // create profile cards for each grouped doc
          const profileCards = groupedHumanResourcesByJobPositionArr.map(
            (userDocument: DirectoryUserDocument) =>
              returnDirectoryProfileCard({
                userDocument,
                padding,
                rowGap,
              })
          );

          const nodeType = jobPosition.toLowerCase().includes('manager')
            ? 'default'
            : 'output';

          // create profile node with carousel
          const groupedHumanResourcesByJobPositionProfileNode: Node = {
            id: jobPosition,
            type: nodeType,
            data: {
              label: (
                <CarouselBuilder
                  carouselProps={{}}
                  slides={profileCards}
                  // slides={groupedHumanResourcesByJobPositionProfileCards}
                />
              ),
            },
            position: nodePosition,
            style: nodeDimensions,
          };

          // add job position field with profile node
          Object.defineProperty(
            humanResourcesProfileNodesObjectAcc,
            jobPosition,
            {
              ...PROPERTY_DESCRIPTOR,
              value: groupedHumanResourcesByJobPositionProfileNode,
            }
          );

          return humanResourcesProfileNodesObjectAcc;
        },
        Object.create(null)
      );

      console.log(
        'humanResourcesProfileNodesObject',
        humanResourcesProfileNodesObject
      );

      // create edges
      // find the chief human resources officer profile node id
      const chiefHumanResourcesOfficerId = 'Chief Human Resources Officer';

      // find the human resources manager profile node id
      const humanResourcesManagerId =
        Object.entries(humanResourcesProfileNodesObject).find(
          (jobPositionAndProfileNodeTuple) => {
            const [jobPosition, _profileNode] =
              jobPositionAndProfileNodeTuple as [JobPosition, Node];

            return jobPosition.toLowerCase().includes('manager');
          }
        )?.[1].id ?? '';

      // connect chief human resources officer to human resources manager
      // [CHRO] ━━━ [HR MANAGER]
      const chiefHumanResourcesOfficerToHumanResourcesManagerEdge: Edge = {
        ...edgeDefaults,
        id: `${chiefHumanResourcesOfficerId}-${humanResourcesManagerId}`, // source-target
        source: chiefHumanResourcesOfficerId,
        target: humanResourcesManagerId,
      };

      const humanResourcesProfileEdges = Object.entries(
        humanResourcesProfileNodesObject
      ).reduce(
        (
          humanResourcesProfileEdgesAcc: Edge[],
          jobPositionAndProfileNodeTuple
        ) => {
          const [jobPosition, profileNode] = jobPositionAndProfileNodeTuple as [
            JobPosition,
            Node
          ];

          if (jobPosition.toLowerCase().includes('manager')) {
            return humanResourcesProfileEdgesAcc;
          }

          // connect subordinates to human resources manager
          //                          ┏━ [CB&M MANAGER] ━━━ [CB&M SPECIALIST]
          //                          ┏━ [H&S MANAGER]  ━━━ [H&S SPECIALIST]
          // [CHRO] ━━━ [HR MANAGER] ━━━ [TR. MANAGER]  ━━━ [TR. SPECIALIST]
          //                          ┗━ [REC. MANAGER] ━━━ [REC. SPECIALIST]
          const humanResourcesSubordinateProfileEdge: Edge = {
            ...edgeDefaults,
            id: `${humanResourcesManagerId}-${profileNode.id}`, // source-target
            source: humanResourcesManagerId,
            target: profileNode.id,
          };

          humanResourcesProfileEdgesAcc.push(
            humanResourcesSubordinateProfileEdge
          );

          return humanResourcesProfileEdgesAcc;
        },
        [chiefHumanResourcesOfficerToHumanResourcesManagerEdge]
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Human Resources',
          kind: 'nodes',
          data: Object.values(humanResourcesProfileNodesObject),
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Human Resources',
          kind: 'edges',
          data: humanResourcesProfileEdges,
        },
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end human resources department ━┛

    // ┏━ begin sales department ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setSalesEdgesAndNodes() {
      const salesDocs = groupedByDepartment.Sales ?? [];

      // group by job positions
      const salesDocsGroupedByJobPosition: Record<
        JobPosition,
        DirectoryUserDocument[]
      > = groupByField<DirectoryUserDocument>({
        objectArray: salesDocs,
        field: 'jobPosition',
      });

      // using the created object structure, create profile nodes
      const salesProfileNodesObject = Object.entries(
        salesDocsGroupedByJobPosition
      ).reduce(
        (
          salesProfileNodesObjectAcc: RemoteDepartmentsProfileNodesObject,
          salesGroupedDocsTuple
        ) => {
          const [jobPosition, groupedSalesByJobPositionArr] =
            salesGroupedDocsTuple as [JobPosition, DirectoryUserDocument[]];

          // create profile cards for each grouped doc
          const profileCards = groupedSalesByJobPositionArr.map(
            (userDocument: DirectoryUserDocument) =>
              returnDirectoryProfileCard({
                userDocument,
                padding,
                rowGap,
              })
          );

          const nodeType = jobPosition.toLowerCase().includes('manager')
            ? 'default'
            : 'output';

          // create profile node with carousel
          const groupedSalesByJobPositionProfileNode: Node = {
            id: jobPosition,
            type: nodeType,
            data: {
              label: (
                <CarouselBuilder
                  carouselProps={{}}
                  slides={profileCards}
                  // slides={groupedSalesByJobPositionProfileCards}
                />
              ),
            },
            position: nodePosition,
            style: nodeDimensions,
          };

          // add job position field with profile node
          Object.defineProperty(salesProfileNodesObjectAcc, jobPosition, {
            ...PROPERTY_DESCRIPTOR,
            value: groupedSalesByJobPositionProfileNode,
          });

          return salesProfileNodesObjectAcc;
        },
        Object.create(null)
      );

      console.log('salesProfileNodesObject', salesProfileNodesObject);

      // create edges
      // find the chief sales officer profile node id
      const chiefSalesOfficerId = 'Chief Sales Officer';

      // find the sales manager profile node id
      const salesManagerId =
        Object.entries(salesProfileNodesObject).find(
          (jobPositionAndProfileNodeTuple) => {
            const [jobPosition, _profileNode] =
              jobPositionAndProfileNodeTuple as [JobPosition, Node];

            return jobPosition.toLowerCase().includes('manager');
          }
        )?.[1].id ?? '';

      // connect chief sales officer to sales manager
      // [CSO] ━━━ [SALES MANAGER]
      const chiefSalesOfficerToSalesManagerEdge: Edge = {
        ...edgeDefaults,
        id: `${chiefSalesOfficerId}-${salesManagerId}`, // source-target
        source: chiefSalesOfficerId,
        target: salesManagerId,
      };

      const salesProfileEdges = Object.entries(salesProfileNodesObject).reduce(
        (salesProfileEdgesAcc: Edge[], jobPositionAndProfileNodeTuple) => {
          const [jobPosition, profileNode] = jobPositionAndProfileNodeTuple as [
            JobPosition,
            Node
          ];

          if (jobPosition.toLowerCase().includes('manager')) {
            return salesProfileEdgesAcc;
          }

          // connect subordinates to sales manager
          //                            ┏━ [SALES REPRESENTATIVE]
          // [CSO] ━━━ [SALES MANAGER] ━━━ [BUSINESS DEVELOPMENT SPECIALIST]
          //                            ┗━ [SALES SUPPORT SPECIALIST]
          //                            ┗━ [SALES OPERATIONS ANALYST]
          const salesSubordinateProfileEdge: Edge = {
            ...edgeDefaults,
            id: `${salesManagerId}-${profileNode.id}`, // source-target
            source: salesManagerId,
            target: profileNode.id,
          };
          salesProfileEdgesAcc.push(salesSubordinateProfileEdge);

          return salesProfileEdgesAcc;
        },
        [chiefSalesOfficerToSalesManagerEdge]
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Sales',
          kind: 'nodes',
          data: Object.values(salesProfileNodesObject),
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Sales',
          kind: 'edges',
          data: salesProfileEdges,
        },
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end sales  department ━┛

    // ┏━ begin marketing department ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setMarketingEdgesAndNodes() {
      const marketingDocs = groupedByDepartment.Marketing ?? [];

      // group by job positions
      const marketingDocsGroupedByJobPosition: Record<
        JobPosition,
        DirectoryUserDocument[]
      > = groupByField<DirectoryUserDocument>({
        objectArray: marketingDocs,
        field: 'jobPosition',
      });

      // using the created object structure, create profile nodes
      const marketingProfileNodesObject = Object.entries(
        marketingDocsGroupedByJobPosition
      ).reduce(
        (
          marketingProfileNodesObjectAcc: RemoteDepartmentsProfileNodesObject,
          marketingGroupedDocsTuple
        ) => {
          const [jobPosition, groupedMarketingByJobPositionArr] =
            marketingGroupedDocsTuple as [JobPosition, DirectoryUserDocument[]];

          // create profile cards for each grouped doc
          const profileCards = groupedMarketingByJobPositionArr.map(
            (userDocument: DirectoryUserDocument) =>
              returnDirectoryProfileCard({
                userDocument,
                padding,
                rowGap,
              })
          );

          const nodeType = jobPosition.toLowerCase().includes('manager')
            ? 'default'
            : 'output';

          // create profile node with carousel
          const groupedMarketingByJobPositionProfileNode: Node = {
            id: jobPosition,
            type: nodeType,
            data: {
              label: (
                <CarouselBuilder
                  carouselProps={{}}
                  slides={profileCards}
                  // slides={groupedMarketingByJobPositionProfileCards}
                />
              ),
            },
            position: nodePosition,
            style: nodeDimensions,
          };

          // add job position field with profile node
          Object.defineProperty(marketingProfileNodesObjectAcc, jobPosition, {
            ...PROPERTY_DESCRIPTOR,
            value: groupedMarketingByJobPositionProfileNode,
          });

          return marketingProfileNodesObjectAcc;
        },
        Object.create(null)
      );

      console.log('marketingProfileNodesObject', marketingProfileNodesObject);

      // create edges
      // find the chief marketing officer profile node id
      const chiefMarketingOfficerId = 'Chief Marketing Officer';

      // find the marketing manager profile node id
      const marketingManagerId =
        Object.entries(marketingProfileNodesObject).find(
          (jobPositionAndProfileNodeTuple) => {
            const [jobPosition, _profileNode] =
              jobPositionAndProfileNodeTuple as [JobPosition, Node];

            return jobPosition.toLowerCase().includes('manager');
          }
        )?.[1].id ?? '';

      // connect chief marketing officer to marketing manager
      // [CMO] ━━━ [MARKETING MANAGER]
      const chiefMarketingOfficerToMarketingManagerEdge: Edge = {
        ...edgeDefaults,
        id: `${chiefMarketingOfficerId}-${marketingManagerId}`, // source-target
        source: chiefMarketingOfficerId,
        target: marketingManagerId,
      };

      const marketingProfileEdges = Object.entries(
        marketingProfileNodesObject
      ).reduce(
        (marketingProfileEdgesAcc: Edge[], jobPositionAndProfileNodeTuple) => {
          const [jobPosition, profileNode] = jobPositionAndProfileNodeTuple as [
            JobPosition,
            Node
          ];

          if (jobPosition.toLowerCase().includes('manager')) {
            return marketingProfileEdgesAcc;
          }

          // connect subordinates to marketing manager
          //                                ┏━ [DIGITAL MARKETING SPECIALIST]
          // [CSO] ━━━ [MARKETING MANAGER] ━━━ [GRAPHIC DESIGNER]
          //                                ┗━ [PUBLIC RELATIONS SPECIALIST]
          //                                ┗━ [MARKETING ANALYST]
          const marketingSubordinateProfileEdge: Edge = {
            ...edgeDefaults,
            id: `${marketingManagerId}-${profileNode.id}`, // source-target
            source: marketingManagerId,
            target: profileNode.id,
          };
          marketingProfileEdgesAcc.push(marketingSubordinateProfileEdge);

          return marketingProfileEdgesAcc;
        },
        [chiefMarketingOfficerToMarketingManagerEdge]
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Marketing',
          kind: 'nodes',
          data: Object.values(marketingProfileNodesObject),
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Marketing',
          kind: 'edges',
          data: marketingProfileEdges,
        },
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end marketing department ━┛

    // ┏━ begin information technology department ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setInformationTechnologyEdgesAndNodes() {
      const informationTechnologyDocs =
        groupedByDepartment['Information Technology'] ?? [];

      // group by job positions
      const informationTechnologyDocsGroupedByJobPosition: Record<
        JobPosition,
        DirectoryUserDocument[]
      > = groupByField<DirectoryUserDocument>({
        objectArray: informationTechnologyDocs,
        field: 'jobPosition',
      });

      // using the created object structure, create profile nodes
      const informationTechnologyProfileNodesObject = Object.entries(
        informationTechnologyDocsGroupedByJobPosition
      ).reduce(
        (
          informationTechnologyProfileNodesObjectAcc: RemoteDepartmentsProfileNodesObject,
          informationTechnologyGroupedDocsTuple
        ) => {
          const [jobPosition, groupedInformationTechnologyByJobPositionArr] =
            informationTechnologyGroupedDocsTuple as [
              JobPosition,
              DirectoryUserDocument[]
            ];

          // create profile cards for each grouped doc
          const profileCards = groupedInformationTechnologyByJobPositionArr.map(
            (userDocument: DirectoryUserDocument) =>
              returnDirectoryProfileCard({
                userDocument,
                padding,
                rowGap,
              })
          );

          const nodeType = jobPosition.toLowerCase().includes('manager')
            ? 'default'
            : 'output';

          // create profile node with carousel
          const groupedInformationTechnologyByJobPositionProfileNode: Node = {
            id: jobPosition,
            type: nodeType,
            data: {
              label: (
                <CarouselBuilder
                  carouselProps={{}}
                  slides={profileCards}
                  // slides={groupedInformationTechnologyByJobPositionProfileCards}
                />
              ),
            },
            position: nodePosition,
            style: nodeDimensions,
          };

          // add job position field with profile node
          Object.defineProperty(
            informationTechnologyProfileNodesObjectAcc,
            jobPosition,
            {
              ...PROPERTY_DESCRIPTOR,
              value: groupedInformationTechnologyByJobPositionProfileNode,
            }
          );

          return informationTechnologyProfileNodesObjectAcc;
        },
        Object.create(null)
      );

      console.log(
        'informationTechnologyProfileNodesObject',
        informationTechnologyProfileNodesObject
      );

      // create edges
      // find the chief technology officer profile node id
      const chiefTechnologyOfficerId = 'Chief Technology Officer';

      // find the information technology manager profile node id
      const informationTechnologyManagerId =
        Object.entries(informationTechnologyProfileNodesObject).find(
          (jobPositionAndProfileNodeTuple) => {
            const [jobPosition, _profileNode] =
              jobPositionAndProfileNodeTuple as [JobPosition, Node];

            return jobPosition.toLowerCase().includes('manager');
          }
        )?.[1].id ?? '';

      // connect chief technology officer to information technology manager
      // [CTO] ━━━ [INFORMATION TECHNOLOGY MANAGER]
      const chiefTechnologyOfficerToInformationTechnologyManagerEdge: Edge = {
        ...edgeDefaults,
        id: `${chiefTechnologyOfficerId}-${informationTechnologyManagerId}`, // source-target
        source: chiefTechnologyOfficerId,
        target: informationTechnologyManagerId,
      };

      const informationTechnologyProfileEdges = Object.entries(
        informationTechnologyProfileNodesObject
      ).reduce(
        (
          informationTechnologyProfileEdgesAcc: Edge[],
          jobPositionAndProfileNodeTuple
        ) => {
          const [jobPosition, profileNode] = jobPositionAndProfileNodeTuple as [
            JobPosition,
            Node
          ];

          if (jobPosition.toLowerCase().includes('manager')) {
            return informationTechnologyProfileEdgesAcc;
          }

          // connect subordinates to information technology manager
          //                         ┏━ [SYSTEMS ADMINISTRATOR]
          //                         ┏━ [IT SUPPORT SPECIALIST]
          //                         ┏━ [DATABASE ADMINISTRATOR]
          // [CTO] ━━━ [IT MANAGER] ━━━ [WEB DEVELOPER]
          //                         ┗━ [SOFTWARE DEVELOPER]
          //                         ┗━ [SOFTWARE ENGINEER]
          const informationTechnologySubordinateProfileEdge: Edge = {
            ...edgeDefaults,
            id: `${informationTechnologyManagerId}-${profileNode.id}`, // source-target
            source: informationTechnologyManagerId,
            target: profileNode.id,
          };
          informationTechnologyProfileEdgesAcc.push(
            informationTechnologySubordinateProfileEdge
          );

          return informationTechnologyProfileEdgesAcc;
        },
        [chiefTechnologyOfficerToInformationTechnologyManagerEdge]
      );

      const informationTechnologyProfileNodes = Object.values(
        informationTechnologyProfileNodesObject
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Information Technology',
          kind: 'nodes',
          data: informationTechnologyProfileNodes,
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Information Technology',
          kind: 'edges',
          data: informationTechnologyProfileEdges,
        },
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end information technology department ━┛

    // ┏━ begin accounting department ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    async function setAccountingEdgesAndNodes() {
      const accountingDocs = groupedByDepartment.Accounting ?? [];

      // group by job positions
      const accountingDocsGroupedByJobPosition: Record<
        JobPosition,
        DirectoryUserDocument[]
      > = groupByField<DirectoryUserDocument>({
        objectArray: accountingDocs,
        field: 'jobPosition',
      });

      // using the created object structure, create profile nodes
      const accountingProfileNodesObject = Object.entries(
        accountingDocsGroupedByJobPosition
      ).reduce(
        (
          accountingProfileNodesObjectAcc: RemoteDepartmentsProfileNodesObject,
          accountingGroupedDocsTuple
        ) => {
          const [jobPosition, groupedAccountingByJobPositionArr] =
            accountingGroupedDocsTuple as [
              JobPosition,
              DirectoryUserDocument[]
            ];

          // create profile cards for each grouped doc
          const profileCards = groupedAccountingByJobPositionArr.map(
            (userDocument: DirectoryUserDocument) =>
              returnDirectoryProfileCard({
                userDocument,
                padding,
                rowGap,
              })
          );

          const nodeType = jobPosition.toLowerCase().includes('manager')
            ? 'default'
            : 'output';

          // create profile node with carousel
          const groupedAccountingByJobPositionProfileNode: Node = {
            id: jobPosition,
            type: nodeType,
            data: {
              label: (
                <CarouselBuilder
                  carouselProps={{}}
                  slides={profileCards}
                  // slides={groupedAccountingByJobPositionProfileCards}
                />
              ),
            },
            position: nodePosition,
            style: nodeDimensions,
          };

          // add job position field with profile node
          Object.defineProperty(accountingProfileNodesObjectAcc, jobPosition, {
            ...PROPERTY_DESCRIPTOR,
            value: groupedAccountingByJobPositionProfileNode,
          });

          return accountingProfileNodesObjectAcc;
        },
        Object.create(null)
      );

      // create edges
      // find the chief financial officer profile node id
      const chiefFinancialOfficerId = 'Chief Financial Officer';

      // find the accounting manager profile node id
      const accountingManagerId =
        Object.entries(accountingProfileNodesObject).find(
          (accountingProfileNodeTuple) => {
            const [jobPosition, _profileNode] = accountingProfileNodeTuple as [
              JobPosition,
              Node
            ];

            return jobPosition.toLowerCase().includes('manager');
          }
        )?.[1].id ?? '';

      // connect chief financial officer to accounting manager
      // [CFO] ━━━ [ACCOUNTING MANAGER]
      const chiefFinancialOfficerToAccountingManagerEdge: Edge = {
        ...edgeDefaults,
        id: `${chiefFinancialOfficerId}-${accountingManagerId}`, // source-target
        source: chiefFinancialOfficerId,
        target: accountingManagerId,
      };

      const accountingProfileEdges = Object.entries(
        accountingProfileNodesObject
      ).reduce(
        (accountingProfileEdgesAcc: Edge[], jobPositionAndProfileNodeTuple) => {
          const [jobPosition, profileNode] = jobPositionAndProfileNodeTuple as [
            JobPosition,
            Node
          ];

          if (jobPosition.toLowerCase().includes('manager')) {
            return accountingProfileEdgesAcc;
          }

          // connect subordinates to accounting manager
          //                                 ┏━ [ACCOUNTS PAYABLE CLERK]
          // [CFO] ━━━ [ACCOUNTING MANAGER] ━━━ [FINANCIAL ANALYIST]
          //                                 ┗━ [ACCOUNTS RECEIVABLE CLERK]
          const accountingSubordinateProfileEdge: Edge = {
            ...edgeDefaults,
            id: `${accountingManagerId}-${profileNode.id}`, // source-target
            source: accountingManagerId,
            target: profileNode.id,
          };
          accountingProfileEdgesAcc.push(accountingSubordinateProfileEdge);

          return accountingProfileEdgesAcc;
        },
        [chiefFinancialOfficerToAccountingManagerEdge]
      );

      const accountingProfileNodes = Object.values(
        accountingProfileNodesObject
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Accounting',
          kind: 'nodes',
          data: accountingProfileNodes,
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Accounting',
          kind: 'edges',
          data: accountingProfileEdges,
        },
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end accounting department ━┛

    // ┏━ begin repair technicians department ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setRepairTechniciansEdgesAndNodes() {
      const repairTechniciansDocs =
        groupedByDepartment['Repair Technicians'] ?? [];

      // group by store locations
      const repairTechniciansDocsGroupedByStoreLocation: Record<
        StoreLocation,
        DirectoryUserDocument[]
      > = groupByField<DirectoryUserDocument>({
        objectArray: repairTechniciansDocs,
        field: 'storeLocation',
      });

      // using the created object structure, create profile nodes
      const repairTechniciansProfileNodesObject = Object.entries(
        repairTechniciansDocsGroupedByStoreLocation
      ).reduce(
        (
          repairTechniciansProfileNodesObjectAcc: StoreDepartmentsProfileNodesObject,
          repairTechniciansGroupedDocsTuple
        ) => {
          const [storeLocation, groupedRepairTechniciansByStoreLocationsArr] =
            repairTechniciansGroupedDocsTuple as [
              StoreLocation,
              DirectoryUserDocument[]
            ];

          // create store location field
          Object.defineProperty(
            repairTechniciansProfileNodesObjectAcc,
            storeLocation,
            {
              ...PROPERTY_DESCRIPTOR,
              value: Object.create(null),
            }
          );

          // iterate through docs for each store location and create profile cards for each job position
          const jobPositionsProfileNodesObj =
            groupedRepairTechniciansByStoreLocationsArr.reduce(
              (
                jobPositionsProfileNodesObjAcc: Record<
                  JobPosition,
                  React.JSX.Element[]
                >,
                userDocument: DirectoryUserDocument
              ) => {
                const { jobPosition } = userDocument;

                // create profile card
                const displayProfileCard = returnDirectoryProfileCard({
                  userDocument,
                  padding,
                  rowGap,
                });

                // grab the array of profile cards for the job position if it exists, otherwise initialize an empty array
                const value = [
                  ...(jobPositionsProfileNodesObjAcc[jobPosition] ?? []),
                  displayProfileCard,
                ] as React.JSX.Element[];

                // add job position field
                Object.defineProperty(
                  jobPositionsProfileNodesObjAcc,
                  jobPosition,
                  {
                    ...PROPERTY_DESCRIPTOR,
                    value,
                  }
                );

                return jobPositionsProfileNodesObjAcc;
              },
              Object.create(null)
            );

          // for each job position, create a single profile node that will hold a carousel of created profile cards
          Object.entries(jobPositionsProfileNodesObj).forEach(
            (jobPositionGroupedRepairTechniciansTuple) => {
              const [jobPosition, groupedRepairEmployeesForJobPosition] =
                jobPositionGroupedRepairTechniciansTuple as [
                  JobPosition,
                  React.JSX.Element[]
                ];

              // create a carousel from said profile cards
              const groupedRepairEmployeesForJobPositionProfileCarousel = (
                <CarouselBuilder
                  carouselProps={{}}
                  slides={groupedRepairEmployeesForJobPosition}
                />
              );

              const nodeType = jobPosition.toLowerCase().includes('supervisor')
                ? 'default'
                : 'output';

              // create profile node with carousel
              const groupedRepairEmployeesForJobPositionProfileNode: Node = {
                id: `${storeLocation}-${jobPosition}`,
                type: nodeType,
                data: {
                  label: groupedRepairEmployeesForJobPositionProfileCarousel,
                },
                position: nodePosition,
                style: nodeDimensions,
              };

              // add job position field with profile node
              Object.defineProperty(
                repairTechniciansProfileNodesObjectAcc[storeLocation],
                jobPosition,
                {
                  ...PROPERTY_DESCRIPTOR,
                  value: groupedRepairEmployeesForJobPositionProfileNode,
                }
              );
            }
          );

          return repairTechniciansProfileNodesObjectAcc;
        },
        Object.create(null)
      );

      // create edges
      const repairTechniciansProfileEdges = Object.entries(
        repairTechniciansProfileNodesObject
      ).reduce(
        (
          repairTechniciansProfileEdgesAcc: Edge[],
          storeLocationAndJobPositionProfileNodesTuple
        ) => {
          const [storeLocation, jobPositionsProfileNodesObj] =
            storeLocationAndJobPositionProfileNodesTuple as [
              StoreLocation,
              Record<JobPosition, Node>
            ];

          const shiftSupervisorProfileNodeId = `${storeLocation}-Shift Supervisor`;

          // find the repair technician supervisor profile node id for the store location
          const repairTechSupervisorProfileNodeId =
            Object.entries(jobPositionsProfileNodesObj).find(
              (jobPositionProfileNodeTuple) => {
                const [jobPosition, _profileNode] =
                  jobPositionProfileNodeTuple as [JobPosition, Node];

                return jobPosition.toLowerCase().includes('supervisor');
              }
            )?.[1].id ?? '';

          // connect shift supervisor to repair technician supervisor
          // [SHIFT SUPERVISOR] ━━━ [REPAIR TECHNICIAN SUPERVISOR]
          const shiftSupervisorToRepairTechSupervisorEdge: Edge = {
            ...edgeDefaults,
            id: `${shiftSupervisorProfileNodeId}-${repairTechSupervisorProfileNodeId}`, // source-target
            source: shiftSupervisorProfileNodeId,
            target: repairTechSupervisorProfileNodeId,
          };

          // connect repair technicians to repair technician supervisor
          //                                 ┏━ [A/V EQUIP. TECH.]
          //                                 ┏━ [COMP. TECH.]
          // [REPAIR TECHNICIAN SUPERVISOR] ━━━ [ELECTRONICS TECH.]
          //                                 ┗━ [SMARTPHONE TECH.]
          //                                 ┗━ [TABLET TECH.]
          const repairSubordinatesProfileEdges = Object.entries(
            jobPositionsProfileNodesObj
          ).reduce(
            (
              repairSubordinatesProfileEdgesAcc: Edge[],
              jobPositionProfileNodesTuple
            ) => {
              const [jobPosition, repairTechnicianProfileNode] =
                jobPositionProfileNodesTuple as [JobPosition, Node];

              if (jobPosition.toLowerCase().includes('supervisor')) {
                return repairSubordinatesProfileEdgesAcc;
              }

              const repairSubordinateProfileEdge: Edge = {
                ...edgeDefaults,
                id: `${repairTechSupervisorProfileNodeId}-${repairTechnicianProfileNode.id}`, // source-target
                source: repairTechSupervisorProfileNodeId,
                target: repairTechnicianProfileNode.id,
              };

              repairSubordinatesProfileEdgesAcc.push(
                repairSubordinateProfileEdge
              );

              return repairSubordinatesProfileEdgesAcc;
            },
            [shiftSupervisorToRepairTechSupervisorEdge]
          );

          repairTechniciansProfileEdgesAcc.push(
            ...repairSubordinatesProfileEdges
          );

          return repairTechniciansProfileEdgesAcc;
        },
        []
      );

      // set repair technicians profile nodes for dispatch
      const repairTechniciansProfileNodes = Object.entries(
        repairTechniciansProfileNodesObject
      ).reduce(
        (
          repairTechniciansProfileNodesAcc: Node[],
          storeLocationAndJobPositionProfileNodesTuple
        ) => {
          const [_, jobPositionsProfileNodesObj] =
            storeLocationAndJobPositionProfileNodesTuple as [
              StoreLocation,
              Record<JobPosition, Node>
            ];

          const jobPositionsProfileNodes = Object.values(
            jobPositionsProfileNodesObj
          );
          repairTechniciansProfileNodesAcc.push(...jobPositionsProfileNodes);

          return repairTechniciansProfileNodesAcc;
        },
        []
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Repair Technicians',
          kind: 'nodes',
          data: repairTechniciansProfileNodes,
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Repair Technicians',
          kind: 'edges',
          data: repairTechniciansProfileEdges,
        },
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end repair technicians department ━┛

    // ┏━ begin field service technicians department ━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setFieldServiceTechniciansEdgesAndNodes() {
      const fieldServiceTechniciansDocs =
        groupedByDepartment['Field Service Technicians'] ?? [];

      // group by store locations
      const fieldServiceTechniciansDocsGroupedByStoreLocation: Record<
        StoreLocation,
        DirectoryUserDocument[]
      > = groupByField<DirectoryUserDocument>({
        objectArray: fieldServiceTechniciansDocs,
        field: 'storeLocation',
      });

      // using the created object structure, create profile nodes
      const fieldServiceTechniciansProfileNodesObject = Object.entries(
        fieldServiceTechniciansDocsGroupedByStoreLocation
      ).reduce(
        (
          fieldServiceTechniciansProfileNodesObjectAcc: StoreDepartmentsProfileNodesObject,
          fieldServiceTechniciansGroupedDocsTuple
        ) => {
          const [
            storeLocation,
            groupedFieldServiceTechniciansByStoreLocationsArr,
          ] = fieldServiceTechniciansGroupedDocsTuple as [
            StoreLocation,
            DirectoryUserDocument[]
          ];

          // create store location field
          Object.defineProperty(
            fieldServiceTechniciansProfileNodesObjectAcc,
            storeLocation,
            {
              ...PROPERTY_DESCRIPTOR,
              value: Object.create(null),
            }
          );

          // iterate through docs for each store location and create profile cards for each job position
          const jobPositionsProfileNodesObj =
            groupedFieldServiceTechniciansByStoreLocationsArr.reduce(
              (
                jobPositionsProfileNodesObjAcc: Record<
                  JobPosition,
                  React.JSX.Element[]
                >,
                userDocument: DirectoryUserDocument
              ) => {
                const { jobPosition } = userDocument;

                // create profile card
                const displayProfileCard = returnDirectoryProfileCard({
                  userDocument,
                  padding,
                  rowGap,
                });

                // grab the array of profile cards for the job position if it exists, otherwise initialize an empty array
                const value = [
                  ...(jobPositionsProfileNodesObjAcc[jobPosition] ?? []),
                  displayProfileCard,
                ] as React.JSX.Element[];

                // add job position field
                Object.defineProperty(
                  jobPositionsProfileNodesObjAcc,
                  jobPosition,
                  {
                    ...PROPERTY_DESCRIPTOR,
                    value,
                  }
                );

                return jobPositionsProfileNodesObjAcc;
              },
              Object.create(null)
            );

          // for each job position, create a single profile node that will hold a carousel of created profile cards
          Object.entries(jobPositionsProfileNodesObj).forEach(
            (jobPositionGroupedFieldServiceTechniciansTuple) => {
              const [jobPosition, groupedFieldServiceEmployeesForJobPosition] =
                jobPositionGroupedFieldServiceTechniciansTuple as [
                  JobPosition,
                  React.JSX.Element[]
                ];

              // create a carousel from said profile cards
              const groupedFieldServiceEmployeesForJobPositionProfileCarousel =
                (
                  <CarouselBuilder
                    carouselProps={{}}
                    slides={groupedFieldServiceEmployeesForJobPosition}
                  />
                );

              const nodeType = jobPosition.toLowerCase().includes('supervisor')
                ? 'default'
                : 'output';

              // create profile node with carousel
              const groupedFieldServiceEmployeesForJobPositionProfileNode: Node =
                {
                  id: `${storeLocation}-${jobPosition}`,
                  type: nodeType,
                  data: {
                    label:
                      groupedFieldServiceEmployeesForJobPositionProfileCarousel,
                  },
                  position: nodePosition,
                  style: nodeDimensions,
                };

              // add job position field with profile node
              Object.defineProperty(
                fieldServiceTechniciansProfileNodesObjectAcc[storeLocation],
                jobPosition,
                {
                  ...PROPERTY_DESCRIPTOR,
                  value: groupedFieldServiceEmployeesForJobPositionProfileNode,
                }
              );
            },
            Object.create(null)
          );

          return fieldServiceTechniciansProfileNodesObjectAcc;
        },
        Object.create(null)
      );

      // create edges
      const fieldServiceTechniciansProfileEdges = Object.entries(
        fieldServiceTechniciansProfileNodesObject
      ).reduce(
        (
          fieldServiceTechniciansProfileEdgesAcc: Edge[],
          storeLocationAndJobPositionProfileNodesTuple
        ) => {
          const [storeLocation, jobPositionsProfileNodesObj] =
            storeLocationAndJobPositionProfileNodesTuple as [
              StoreLocation,
              Record<JobPosition, Node>
            ];

          const shiftSupervisorProfileNodeId = `${storeLocation}-Shift Supervisor`;

          // find the field service technician supervisor profile node id for the store location
          const fieldServiceTechSupervisorProfileNodeId =
            Object.entries(jobPositionsProfileNodesObj).find(
              (jobPositionProfileNodeTuple) => {
                const [jobPosition, _profileNode] =
                  jobPositionProfileNodeTuple as [JobPosition, Node];

                return jobPosition.toLowerCase().includes('supervisor');
              }
            )?.[1].id ?? '';

          // connect shift supervisor to field service technician supervisor
          // [SHIFT SUPERVISOR] ━━━ [FIELD SERVICE TECHNICIAN SUPERVISOR]
          const shiftSupervisorToFieldServiceTechSupervisorEdge: Edge = {
            ...edgeDefaults,
            id: `${shiftSupervisorProfileNodeId}-${fieldServiceTechSupervisorProfileNodeId}`, // source-target
            source: shiftSupervisorProfileNodeId,
            target: fieldServiceTechSupervisorProfileNodeId,
          };

          // connect field service technicians to field service technician supervisor
          // [FS SUPERVISOR] ━━━ [ON-SITE TECHNICIAN]

          const fieldServiceSubordinatesProfileEdges = Object.entries(
            jobPositionsProfileNodesObj
          ).reduce(
            (
              fieldServiceSubordinatesProfileEdgesAcc: Edge[],
              jobPositionProfileNodesTuple
            ) => {
              const [jobPosition, fieldServiceTechnicianProfileNode] =
                jobPositionProfileNodesTuple as [JobPosition, Node];

              if (jobPosition.toLowerCase().includes('supervisor')) {
                return fieldServiceSubordinatesProfileEdgesAcc;
              }

              const fieldServiceSubordinateProfileEdge: Edge = {
                ...edgeDefaults,
                id: `${fieldServiceTechSupervisorProfileNodeId}-${fieldServiceTechnicianProfileNode.id}`, // source-target
                source: fieldServiceTechSupervisorProfileNodeId,
                target: fieldServiceTechnicianProfileNode.id,
              };

              fieldServiceSubordinatesProfileEdgesAcc.push(
                fieldServiceSubordinateProfileEdge
              );

              return fieldServiceSubordinatesProfileEdgesAcc;
            },
            [shiftSupervisorToFieldServiceTechSupervisorEdge]
          );

          fieldServiceTechniciansProfileEdgesAcc.push(
            ...fieldServiceSubordinatesProfileEdges
          );

          return fieldServiceTechniciansProfileEdgesAcc;
        },
        []
      );

      // set field service technicians profile nodes for dispatch
      const fieldServiceTechniciansProfileNodes = Object.entries(
        fieldServiceTechniciansProfileNodesObject
      ).reduce(
        (
          fieldServiceTechniciansProfileNodesAcc: Node[],
          storeLocationAndJobPositionProfileNodesTuple
        ) => {
          const [_, jobPositionsProfileNodesObj] =
            storeLocationAndJobPositionProfileNodesTuple as [
              StoreLocation,
              Record<JobPosition, Node>
            ];

          const jobPositionsProfileNodes = Object.values(
            jobPositionsProfileNodesObj
          );

          fieldServiceTechniciansProfileNodesAcc.push(
            ...jobPositionsProfileNodes
          );

          return fieldServiceTechniciansProfileNodesAcc;
        },
        []
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Field Service Technicians',
          kind: 'nodes',
          data: fieldServiceTechniciansProfileNodes,
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Field Service Technicians',
          kind: 'edges',
          data: fieldServiceTechniciansProfileEdges,
        },
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━ end field service technicians department ━┛

    // ┏━ begin logistics and inventory department ━━━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setLogisticsAndInventoryEdgesAndNodes() {
      const logisticsAndInventoryDocs =
        groupedByDepartment['Logistics and Inventory'] ?? [];

      // group by store locations
      const logisticsAndInventoryDocsGroupedByStoreLocation: Record<
        StoreLocation,
        DirectoryUserDocument[]
      > = groupByField<DirectoryUserDocument>({
        objectArray: logisticsAndInventoryDocs,
        field: 'storeLocation',
      });

      // using the created object structure, create profile nodes
      const logisticsAndInventoryProfileNodesObject = Object.entries(
        logisticsAndInventoryDocsGroupedByStoreLocation
      ).reduce(
        (
          logisticsAndInventoryProfileNodesObjectAcc: StoreDepartmentsProfileNodesObject,
          logisticsAndInventoryGroupedDocsTuple
        ) => {
          const [
            storeLocation,
            groupedLogisticsAndInventoryByStoreLocationsArr,
          ] = logisticsAndInventoryGroupedDocsTuple as [
            StoreLocation,
            DirectoryUserDocument[]
          ];

          // create store location field
          Object.defineProperty(
            logisticsAndInventoryProfileNodesObjectAcc,
            storeLocation,
            {
              ...PROPERTY_DESCRIPTOR,
              value: Object.create(null),
            }
          );

          // iterate through docs for each store location and create profile cards for each job position
          const jobPositionsProfileNodesObj =
            groupedLogisticsAndInventoryByStoreLocationsArr.reduce(
              (
                jobPositionsProfileNodesObjAcc: Record<
                  JobPosition,
                  React.JSX.Element[]
                >,
                userDocument: DirectoryUserDocument
              ) => {
                const { jobPosition } = userDocument;

                // create profile card
                const displayProfileCard = returnDirectoryProfileCard({
                  userDocument,
                  padding,
                  rowGap,
                });

                // grab the array of profile cards for the job position if it exists, otherwise initialize an empty array
                const value = [
                  ...(jobPositionsProfileNodesObjAcc[jobPosition] ?? []),
                  displayProfileCard,
                ] as React.JSX.Element[];

                // add job position field
                Object.defineProperty(
                  jobPositionsProfileNodesObjAcc,
                  jobPosition,
                  {
                    ...PROPERTY_DESCRIPTOR,
                    value,
                  }
                );

                return jobPositionsProfileNodesObjAcc;
              },
              Object.create(null)
            );

          // for each job position, create a single profile node that will hold a carousel of created profile cards
          Object.entries(jobPositionsProfileNodesObj).forEach(
            (jobPositionGroupedLogisticsAndInventoryTuple) => {
              const [
                jobPosition,
                groupedLogisticsAndInventoryEmployeesForJobPosition,
              ] = jobPositionGroupedLogisticsAndInventoryTuple as [
                JobPosition,
                React.JSX.Element[]
              ];

              // create a carousel from said profile cards
              const groupedLogisticsAndInventoryEmployeesForJobPositionProfileCarousel =
                (
                  <CarouselBuilder
                    carouselProps={{}}
                    slides={groupedLogisticsAndInventoryEmployeesForJobPosition}
                  />
                );

              const nodeType = jobPosition.toLowerCase().includes('supervisor')
                ? 'default'
                : 'output';

              // create profile node with carousel
              const groupedLogisticsAndInventoryEmployeesForJobPositionProfileNode: Node =
                {
                  id: `${storeLocation}-${jobPosition}`,
                  type: nodeType,
                  data: {
                    label:
                      groupedLogisticsAndInventoryEmployeesForJobPositionProfileCarousel,
                  },
                  position: nodePosition,
                  style: nodeDimensions,
                };

              // add job position field with profile node
              Object.defineProperty(
                logisticsAndInventoryProfileNodesObjectAcc[storeLocation],
                jobPosition,
                {
                  ...PROPERTY_DESCRIPTOR,
                  value:
                    groupedLogisticsAndInventoryEmployeesForJobPositionProfileNode,
                }
              );
            },
            Object.create(null)
          );

          return logisticsAndInventoryProfileNodesObjectAcc;
        },
        Object.create(null)
      );

      // create edges
      const logisticsAndInventoryProfileEdges = Object.entries(
        logisticsAndInventoryProfileNodesObject
      ).reduce(
        (
          logisticsAndInventoryProfileEdgesAcc: Edge[],
          storeLocationAndJobPositionProfileNodesTuple
        ) => {
          const [storeLocation, jobPositionsProfileNodesObj] =
            storeLocationAndJobPositionProfileNodesTuple as [
              StoreLocation,
              Record<JobPosition, Node>
            ];

          const shiftSupervisorProfileNodeId = `${storeLocation}-Shift Supervisor`;

          // find the logistics and inventory supervisor profile node id for the store location
          const logisticsAndInventorySupervisorProfileNodeId =
            Object.entries(jobPositionsProfileNodesObj).find(
              (jobPositionProfileNodeTuple) => {
                const [jobPosition, _profileNode] =
                  jobPositionProfileNodeTuple as [JobPosition, Node];

                return jobPosition.toLowerCase().includes('supervisor');
              }
            )?.[1].id ?? '';

          // connect shift supervisor to logistics and inventory supervisor
          // [SHIFT SUPERVISOR] ━━━ [WAREHOUSE SUPERVISOR]
          const shiftSupervisorToLogisticsAndInventorySupervisorEdge: Edge = {
            ...edgeDefaults,
            id: `${shiftSupervisorProfileNodeId}-${logisticsAndInventorySupervisorProfileNodeId}`, // source-target
            source: shiftSupervisorProfileNodeId,
            target: logisticsAndInventorySupervisorProfileNodeId,
          };

          // connect logistics and inventory employees to logistics and inventory supervisor
          //                         ┏━ [INVENTORY CLERK]
          // [WAREHOUSE SUPERVISOR] ━━━ [DELIVERY DRIVER]
          //                         ┗━ [PARTS AND MATERIALS HANDLER]
          //                         ┗━ [SHIPPER/RECEIVER]

          const logisticsAndInventorySubordinatesProfileEdges = Object.entries(
            jobPositionsProfileNodesObj
          ).reduce(
            (
              logisticsAndInventorySubordinatesProfileEdgesAcc: Edge[],
              jobPositionProfileNodesTuple
            ) => {
              const [jobPosition, logisticsAndInventoryProfileNode] =
                jobPositionProfileNodesTuple as [JobPosition, Node];

              if (jobPosition.toLowerCase().includes('supervisor')) {
                return logisticsAndInventorySubordinatesProfileEdgesAcc;
              }

              const logisticsAndInventorySubordinateProfileEdge: Edge = {
                ...edgeDefaults,
                id: `${logisticsAndInventorySupervisorProfileNodeId}-${logisticsAndInventoryProfileNode.id}`, // source-target
                source: logisticsAndInventorySupervisorProfileNodeId,
                target: logisticsAndInventoryProfileNode.id,
              };

              logisticsAndInventorySubordinatesProfileEdgesAcc.push(
                logisticsAndInventorySubordinateProfileEdge
              );

              return logisticsAndInventorySubordinatesProfileEdgesAcc;
            },
            [shiftSupervisorToLogisticsAndInventorySupervisorEdge]
          );

          logisticsAndInventoryProfileEdgesAcc.push(
            ...logisticsAndInventorySubordinatesProfileEdges
          );

          return logisticsAndInventoryProfileEdgesAcc;
        },
        []
      );

      // set logistics and inventory profile nodes for dispatch
      const logisticsAndInventoryProfileNodes = Object.entries(
        logisticsAndInventoryProfileNodesObject
      ).reduce(
        (
          logisticsAndInventoryProfileNodesAcc: Node[],
          storeLocationAndJobPositionProfileNodesTuple
        ) => {
          const [_, jobPositionsProfileNodesObj] =
            storeLocationAndJobPositionProfileNodesTuple as [
              StoreLocation,
              Record<JobPosition, Node>
            ];

          const jobPositionsProfileNodes = Object.values(
            jobPositionsProfileNodesObj
          );

          logisticsAndInventoryProfileNodesAcc.push(
            ...jobPositionsProfileNodes
          );

          return logisticsAndInventoryProfileNodesAcc;
        },
        []
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Logistics and Inventory',
          kind: 'nodes',
          data: logisticsAndInventoryProfileNodes,
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Logistics and Inventory',
          kind: 'edges',
          data: logisticsAndInventoryProfileEdges,
        },
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end logistics and inventory department ━┛

    // ┏━ begin customer service department ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setCustomerServiceEdgesAndNodes() {
      const customerServiceDocs = groupedByDepartment['Customer Service'] ?? [];

      // group by store locations
      const customerServiceDocsGroupedByStoreLocation: Record<
        StoreLocation,
        DirectoryUserDocument[]
      > = groupByField<DirectoryUserDocument>({
        objectArray: customerServiceDocs,
        field: 'storeLocation',
      });

      // using the created object structure, create profile nodes
      const customerServiceProfileNodesObject = Object.entries(
        customerServiceDocsGroupedByStoreLocation
      ).reduce(
        (
          customerServiceProfileNodesObjectAcc: StoreDepartmentsProfileNodesObject,
          customerServiceGroupedDocsTuple
        ) => {
          const [storeLocation, groupedCustomerServiceByStoreLocationsArr] =
            customerServiceGroupedDocsTuple as [
              StoreLocation,
              DirectoryUserDocument[]
            ];

          // create store location field
          Object.defineProperty(
            customerServiceProfileNodesObjectAcc,
            storeLocation,
            {
              ...PROPERTY_DESCRIPTOR,
              value: Object.create(null),
            }
          );

          // iterate through docs for each store location and create profile cards for each job position
          const jobPositionsProfileNodesObj =
            groupedCustomerServiceByStoreLocationsArr.reduce(
              (
                jobPositionsProfileNodesObjAcc: Record<
                  JobPosition,
                  React.JSX.Element[]
                >,
                userDocument: DirectoryUserDocument
              ) => {
                const { jobPosition } = userDocument;

                // create profile card
                const displayProfileCard = returnDirectoryProfileCard({
                  userDocument,
                  padding,
                  rowGap,
                });

                // grab the array of profile cards for the job position if it exists, otherwise initialize an empty array
                const value = [
                  ...(jobPositionsProfileNodesObjAcc[jobPosition] ?? []),
                  displayProfileCard,
                ] as React.JSX.Element[];

                // add job position field
                Object.defineProperty(
                  jobPositionsProfileNodesObjAcc,
                  jobPosition,
                  {
                    ...PROPERTY_DESCRIPTOR,
                    value,
                  }
                );

                return jobPositionsProfileNodesObjAcc;
              },
              Object.create(null)
            );

          // for each job position, create a single profile node that will hold a carousel of created profile cards
          Object.entries(jobPositionsProfileNodesObj).forEach(
            (jobPositionGroupedCustomerServiceTuple) => {
              const [
                jobPosition,
                groupedCustomerServiceEmployeesForJobPosition,
              ] = jobPositionGroupedCustomerServiceTuple as [
                JobPosition,
                React.JSX.Element[]
              ];

              // create a carousel from said profile cards
              const groupedCustomerServiceEmployeesForJobPositionProfileCarousel =
                (
                  <CarouselBuilder
                    carouselProps={{}}
                    slides={groupedCustomerServiceEmployeesForJobPosition}
                  />
                );

              const nodeType = jobPosition.toLowerCase().includes('supervisor')
                ? 'default'
                : 'output';

              // create profile node with carousel
              const groupedCustomerServiceEmployeesForJobPositionProfileNode: Node =
                {
                  id: `${storeLocation}-${jobPosition}`,
                  type: nodeType,
                  data: {
                    label:
                      groupedCustomerServiceEmployeesForJobPositionProfileCarousel,
                  },
                  position: nodePosition,
                  style: nodeDimensions,
                };

              // add job position field with profile node
              Object.defineProperty(
                customerServiceProfileNodesObjectAcc[storeLocation],
                jobPosition,
                {
                  ...PROPERTY_DESCRIPTOR,
                  value:
                    groupedCustomerServiceEmployeesForJobPositionProfileNode,
                }
              );
            },
            Object.create(null)
          );

          return customerServiceProfileNodesObjectAcc;
        },
        Object.create(null)
      );

      // create edges
      const customerServiceProfileEdges = Object.entries(
        customerServiceProfileNodesObject
      ).reduce(
        (
          customerServiceProfileEdgesAcc: Edge[],
          storeLocationAndJobPositionProfileNodesTuple
        ) => {
          const [storeLocation, jobPositionsProfileNodesObj] =
            storeLocationAndJobPositionProfileNodesTuple as [
              StoreLocation,
              Record<JobPosition, Node>
            ];

          const shiftSupervisorProfileNodeId = `${storeLocation}-Shift Supervisor`;

          // find the customer service supervisor profile node id for the store location
          const customerServiceSupervisorProfileNodeId =
            Object.entries(jobPositionsProfileNodesObj).find(
              (jobPositionProfileNodeTuple) => {
                const [jobPosition, _profileNode] =
                  jobPositionProfileNodeTuple as [JobPosition, Node];

                return jobPosition.toLowerCase().includes('supervisor');
              }
            )?.[1].id ?? '';

          // connect shift supervisor to customer service supervisor
          // [SHIFT SUPERVISOR] ━━━ [CUSTOMER SERVICE SUPERVISOR]
          const shiftSupervisorToCustomerServiceSupervisorEdge: Edge = {
            ...edgeDefaults,
            id: `${shiftSupervisorProfileNodeId}-${customerServiceSupervisorProfileNodeId}`, // source-target
            source: shiftSupervisorProfileNodeId,
            target: customerServiceSupervisorProfileNodeId,
          };

          // connect customer service employees to customer service supervisor
          //                         ┏━ [CUSTOMER SERVICE ASSOCIATE]
          // [CUSTOMER SERVICE SUPERVISOR] ━━━ [CUSTOMER SERVICE ASSOCIATE]
          //                         ┗━ [CUSTOMER SERVICE ASSOCIATE]
          //                         ┗━ [CUSTOMER SERVICE ASSOCIATE]

          const customerServiceSubordinatesProfileEdges = Object.entries(
            jobPositionsProfileNodesObj
          ).reduce(
            (
              customerServiceSubordinatesProfileEdgesAcc: Edge[],
              jobPositionProfileNodesTuple
            ) => {
              const [jobPosition, customerServiceProfileNode] =
                jobPositionProfileNodesTuple as [JobPosition, Node];

              if (jobPosition.toLowerCase().includes('supervisor')) {
                return customerServiceSubordinatesProfileEdgesAcc;
              }

              const customerServiceSubordinateProfileEdge: Edge = {
                ...edgeDefaults,
                id: `${customerServiceSupervisorProfileNodeId}-${customerServiceProfileNode.id}`, // source-target
                source: customerServiceSupervisorProfileNodeId,
                target: customerServiceProfileNode.id,
              };

              customerServiceSubordinatesProfileEdgesAcc.push(
                customerServiceSubordinateProfileEdge
              );

              return customerServiceSubordinatesProfileEdgesAcc;
            },
            [shiftSupervisorToCustomerServiceSupervisorEdge]
          );

          customerServiceProfileEdgesAcc.push(
            ...customerServiceSubordinatesProfileEdges
          );

          return customerServiceProfileEdgesAcc;
        },
        []
      );

      // set customer service profile nodes for dispatch
      const customerServiceProfileNodes = Object.entries(
        customerServiceProfileNodesObject
      ).reduce(
        (
          customerServiceProfileNodesAcc: Node[],
          storeLocationAndJobPositionProfileNodesTuple
        ) => {
          const [_, jobPositionsProfileNodesObj] =
            storeLocationAndJobPositionProfileNodesTuple as [
              StoreLocation,
              Record<JobPosition, Node>
            ];

          const jobPositionsProfileNodes = Object.values(
            jobPositionsProfileNodesObj
          );

          customerServiceProfileNodesAcc.push(...jobPositionsProfileNodes);

          return customerServiceProfileNodesAcc;
        },
        []
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Customer Service',
          kind: 'nodes',
          data: customerServiceProfileNodes,
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Customer Service',
          kind: 'edges',
          data: customerServiceProfileEdges,
        },
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end customer service department ━┛

    // ┏━ begin maintenance department ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setMaintenanceEdgesAndNodes() {
      const maintenanceDocs = groupedByDepartment.Maintenance ?? [];

      // group by store locations
      const maintenanceDocsGroupedByStoreLocation: Record<
        StoreLocation,
        DirectoryUserDocument[]
      > = groupByField<DirectoryUserDocument>({
        objectArray: maintenanceDocs,
        field: 'storeLocation',
      });

      // using the created object structure, create profile nodes
      const maintenanceProfileNodesObject = Object.entries(
        maintenanceDocsGroupedByStoreLocation
      ).reduce(
        (
          maintenanceProfileNodesObjectAcc: StoreDepartmentsProfileNodesObject,
          maintenanceGroupedDocsTuple
        ) => {
          const [storeLocation, groupedMaintenanceByStoreLocationsArr] =
            maintenanceGroupedDocsTuple as [
              StoreLocation,
              DirectoryUserDocument[]
            ];

          // create store location field
          Object.defineProperty(
            maintenanceProfileNodesObjectAcc,
            storeLocation,
            {
              ...PROPERTY_DESCRIPTOR,
              value: Object.create(null),
            }
          );

          // iterate through docs for each store location and create profile cards for each job position
          const jobPositionsProfileNodesObj =
            groupedMaintenanceByStoreLocationsArr.reduce(
              (
                jobPositionsProfileNodesObjAcc: Record<
                  JobPosition,
                  React.JSX.Element[]
                >,
                userDocument: DirectoryUserDocument
              ) => {
                const { jobPosition } = userDocument;

                // create profile card
                const displayProfileCard = returnDirectoryProfileCard({
                  userDocument,
                  padding,
                  rowGap,
                });

                // grab the array of profile cards for the job position if it exists, otherwise initialize an empty array
                const value = [
                  ...(jobPositionsProfileNodesObjAcc[jobPosition] ?? []),
                  displayProfileCard,
                ] as React.JSX.Element[];

                // add job position field
                Object.defineProperty(
                  jobPositionsProfileNodesObjAcc,
                  jobPosition,
                  {
                    ...PROPERTY_DESCRIPTOR,
                    value,
                  }
                );

                return jobPositionsProfileNodesObjAcc;
              },
              Object.create(null)
            );

          // for each job position, create a single profile node that will hold a carousel of created profile cards
          Object.entries(jobPositionsProfileNodesObj).forEach(
            (jobPositionGroupedMaintenanceTuple) => {
              const [jobPosition, groupedMaintenanceEmployeesForJobPosition] =
                jobPositionGroupedMaintenanceTuple as [
                  JobPosition,
                  React.JSX.Element[]
                ];

              // create a carousel from said profile cards
              const groupedMaintenanceEmployeesForJobPositionProfileCarousel = (
                <CarouselBuilder
                  carouselProps={{}}
                  slides={groupedMaintenanceEmployeesForJobPosition}
                />
              );

              const nodeType = jobPosition.toLowerCase().includes('supervisor')
                ? 'default'
                : 'output';

              // create profile node with carousel
              const groupedMaintenanceEmployeesForJobPositionProfileNode: Node =
                {
                  id: `${storeLocation}-${jobPosition}`,
                  type: nodeType,
                  data: {
                    label:
                      groupedMaintenanceEmployeesForJobPositionProfileCarousel,
                  },
                  position: nodePosition,
                  style: nodeDimensions,
                };

              // add job position field with profile node
              Object.defineProperty(
                maintenanceProfileNodesObjectAcc[storeLocation],
                jobPosition,
                {
                  ...PROPERTY_DESCRIPTOR,
                  value: groupedMaintenanceEmployeesForJobPositionProfileNode,
                }
              );

              return maintenanceProfileNodesObjectAcc;
            },
            Object.create(null)
          );

          return maintenanceProfileNodesObjectAcc;
        },
        Object.create(null)
      );

      // create edges
      const maintenanceProfileEdges = Object.entries(
        maintenanceProfileNodesObject
      ).reduce(
        (
          maintenanceProfileEdgesAcc: Edge[],
          storeLocationAndJobPositionProfileNodesTuple
        ) => {
          const [storeLocation, jobPositionsProfileNodesObj] =
            storeLocationAndJobPositionProfileNodesTuple as [
              StoreLocation,
              Record<JobPosition, Node>
            ];

          const shiftSupervisorProfileNodeId = `${storeLocation}-Shift Supervisor`;

          // find the maintenance supervisor profile node id for the store location
          const maintenanceSupervisorProfileNodeId =
            Object.entries(jobPositionsProfileNodesObj).find(
              (jobPositionProfileNodeTuple) => {
                const [jobPosition, _profileNode] =
                  jobPositionProfileNodeTuple as [JobPosition, Node];

                return jobPosition.toLowerCase().includes('supervisor');
              }
            )?.[1].id ?? '';

          // connect shift supervisor to maintenance supervisor
          // [SHIFT SUPERVISOR] ━━━ [MAINTENANCE SUPERVISOR]
          const shiftSupervisorToMaintenanceSupervisorEdge: Edge = {
            ...edgeDefaults,
            id: `${shiftSupervisorProfileNodeId}-${maintenanceSupervisorProfileNodeId}`, // source-target
            source: shiftSupervisorProfileNodeId,
            target: maintenanceSupervisorProfileNodeId,
          };

          // connect maintenance employees to maintenance supervisor

          // [MAINTENANCE SUPERVISOR] ━━━ [MAINTENANCE WORKER]
          //                           ┗━ [CUSTODIAN]

          const maintenanceSubordinatesProfileEdges = Object.entries(
            jobPositionsProfileNodesObj
          ).reduce(
            (
              maintenanceSubordinatesProfileEdgesAcc: Edge[],
              jobPositionProfileNodesTuple
            ) => {
              const [jobPosition, maintenanceProfileNode] =
                jobPositionProfileNodesTuple as [JobPosition, Node];

              if (jobPosition.toLowerCase().includes('supervisor')) {
                return maintenanceSubordinatesProfileEdgesAcc;
              }

              const maintenanceSubordinateProfileEdge: Edge = {
                ...edgeDefaults,
                id: `${maintenanceSupervisorProfileNodeId}-${maintenanceProfileNode.id}`, // source-target
                source: maintenanceSupervisorProfileNodeId,
                target: maintenanceProfileNode.id,
              };

              maintenanceSubordinatesProfileEdgesAcc.push(
                maintenanceSubordinateProfileEdge
              );

              return maintenanceSubordinatesProfileEdgesAcc;
            },
            [shiftSupervisorToMaintenanceSupervisorEdge]
          );

          maintenanceProfileEdgesAcc.push(
            ...maintenanceSubordinatesProfileEdges
          );

          return maintenanceProfileEdgesAcc;
        },
        []
      );

      // set maintenance profile nodes for dispatch
      const maintenanceProfileNodes = Object.entries(
        maintenanceProfileNodesObject
      ).reduce(
        (
          maintenanceProfileNodesAcc: Node[],
          storeLocationAndJobPositionProfileNodesTuple
        ) => {
          const [_, jobPositionsProfileNodesObj] =
            storeLocationAndJobPositionProfileNodesTuple as [
              StoreLocation,
              Record<JobPosition, Node>
            ];

          const jobPositionsProfileNodes = Object.values(
            jobPositionsProfileNodesObj
          );

          maintenanceProfileNodesAcc.push(...jobPositionsProfileNodes);

          return maintenanceProfileNodesAcc;
        },
        []
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Maintenance',
          kind: 'nodes',
          data: maintenanceProfileNodes,
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Maintenance',
          kind: 'edges',
          data: maintenanceProfileEdges,
        },
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end maintenance department ━┛
    // ┏━ begin concurrent fn calls ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    // utilizes the micro-task queue for performance
    async function triggerDepartmentNodesAndEdgesCreation() {
      try {
        console.log('triggerDepartmentNodesAndEdgesCreation');
        await Promise.all([
          setExecutiveManagementEdgesAndNodes(),
          setStoreAdministrationEdgesAndNodes(),
          setOfficeAdministrationEdgesAndNodes(),
          setHumanResourcesEdgesAndNodes(),
          setSalesEdgesAndNodes(),
          setMarketingEdgesAndNodes(),
          setInformationTechnologyEdgesAndNodes(),
          setAccountingEdgesAndNodes(),
          setRepairTechniciansEdgesAndNodes(),
          setFieldServiceTechniciansEdgesAndNodes(),
          setLogisticsAndInventoryEdgesAndNodes(),
          setCustomerServiceEdgesAndNodes(),
          setMaintenanceEdgesAndNodes(),
        ]);
      } catch (error: any) {
        // TODO: TRIGGER ERROR BOUNDARY HOOK
        console.error(error);
      } finally {
        // set trigger to false
        directoryDispatch({
          type: directoryAction.triggerSetDepartmentsNodesAndEdges,
          payload: false,
        });

        // triggers state update when filterBy${department, jobPosition, storeLocation} value is changed
        directoryDispatch({
          type: directoryAction.setFilterByDepartment,
          payload: filterByDepartment,
        });
        directoryDispatch({
          type: directoryAction.setFilterByJobPosition,
          payload: filterByJobPosition,
        });
        directoryDispatch({
          type: directoryAction.setFilterByStoreLocation,
          payload: filterByStoreLocation,
        });

        // set trigger layouted elements to true
        directoryDispatch({
          type: directoryAction.triggerSetLayoutedNodesAndEdges,
          payload: true,
        });
      }
    }

    triggerDepartmentNodesAndEdgesCreation();

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end concurrent fn calls ━┛
  }, [
    triggerSetDepartmentsNodesAndEdges,
    dagreMinLen,
    dagreNodeSep,
    dagreRankAlign,
    dagreRankDir,
    dagreRankSep,
    dagreRanker,
    dagreWeight,
  ]);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end main nodes & edges effect ━┛

  useEffect(() => {
    // only update state when the following are not null
    if (
      filteredDepartmentsNodesAndEdges ||
      filteredJobPositionsNodesAndEdges ||
      filteredStoreLocationsNodesAndEdges
    ) {
      return;
    }

    // if there is a filter by department term, set nodes and edges from that filteredDepartmentNodesAndEdges state
    if (filterByDepartment !== 'All Departments') {
      return;
    }

    // updates all departments nodes and edges when no filter terms are present
    const [initialNodes, initialEdges] = Object.entries(
      departmentsNodesAndEdges
    ).reduce(
      (initialNodesAndEdgesAcc: [Node[], Edge[]], departmentNodesAndEdges) => {
        const [_department, nodesAndEdges] = departmentNodesAndEdges as [
          Department,
          { nodes: Node[]; edges: Edge[] }
        ];

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

    const { nodes: layoutedNodes, edges: layoutedEdges } =
      returnDagreLayoutedElements({
        edges: initialEdges,
        nodes: initialNodes,
        rankdir: dagreRankDir,
        align: dagreRankAlign === 'undefined' ? undefined : dagreRankAlign,
        nodesep: dagreNodeSep,
        ranksep: dagreRankSep,
        ranker: dagreRanker,
        minlen: dagreMinLen,
        weight: dagreWeight,
      });

    directoryDispatch({
      type: directoryAction.setLayoutedNodes,
      payload: layoutedNodes,
    });

    directoryDispatch({
      type: directoryAction.setLayoutedEdges,
      payload: layoutedEdges,
    });

    // set trigger to false
    directoryDispatch({
      type: directoryAction.triggerSetLayoutedNodesAndEdges,
      payload: false,
    });
  }, [
    dagreMinLen,
    dagreNodeSep,
    dagreRankAlign,
    dagreRankDir,
    dagreRankSep,
    dagreRanker,
    dagreWeight,
    departmentsNodesAndEdges,
    triggerSetLayoutedNodesAndEdges,
    filterByDepartment,
  ]);

  // update filteredDepartmentsNodesAndEdges
  useEffect(() => {
    if (!filteredDepartmentsNodesAndEdges) {
      return;
    }

    const initialNodes = filteredDepartmentsNodesAndEdges.nodes;
    const initialEdges = filteredDepartmentsNodesAndEdges.edges;

    const { nodes: layoutedNodes, edges: layoutedEdges } =
      returnDagreLayoutedElements({
        edges: initialEdges,
        nodes: initialNodes,
        rankdir: dagreRankDir,
        align: dagreRankAlign === 'undefined' ? undefined : dagreRankAlign,
        nodesep: dagreNodeSep,
        ranksep: dagreRankSep,
        ranker: dagreRanker,
        minlen: dagreMinLen,
        weight: dagreWeight,
      });

    directoryDispatch({
      type: directoryAction.setLayoutedNodes,
      payload: layoutedNodes,
    });

    directoryDispatch({
      type: directoryAction.setLayoutedEdges,
      payload: layoutedEdges,
    });

    // set trigger to false
    directoryDispatch({
      type: directoryAction.triggerSetLayoutedNodesAndEdges,
      payload: false,
    });
  }, [
    dagreMinLen,
    dagreNodeSep,
    dagreRankAlign,
    dagreRankDir,
    dagreRankSep,
    dagreRanker,
    dagreWeight,
    filterByDepartment,
    filteredDepartmentsNodesAndEdges,
    triggerSetLayoutedNodesAndEdges,
  ]);

  // update filteredJobPositionsNodesAndEdges
  useEffect(() => {
    console.log('update filteredJobPositionsNodesAndEdges effect entered');

    if (!filteredJobPositionsNodesAndEdges) {
      return;
    }

    const initialNodes = filteredJobPositionsNodesAndEdges.nodes;
    const initialEdges = filteredJobPositionsNodesAndEdges.edges;

    const { nodes: layoutedNodes, edges: layoutedEdges } =
      returnDagreLayoutedElements({
        edges: initialEdges,
        nodes: initialNodes,
        rankdir: dagreRankDir,
        align: dagreRankAlign === 'undefined' ? undefined : dagreRankAlign,
        nodesep: dagreNodeSep,
        ranksep: dagreRankSep,
        ranker: dagreRanker,
        minlen: dagreMinLen,
        weight: dagreWeight,
      });

    directoryDispatch({
      type: directoryAction.setLayoutedNodes,
      payload: layoutedNodes,
    });

    directoryDispatch({
      type: directoryAction.setLayoutedEdges,
      payload: layoutedEdges,
    });

    // set trigger to false
    directoryDispatch({
      type: directoryAction.triggerSetLayoutedNodesAndEdges,
      payload: false,
    });
  }, [
    dagreMinLen,
    dagreNodeSep,
    dagreRankAlign,
    dagreRankDir,
    dagreRankSep,
    dagreRanker,
    dagreWeight,
    filterByJobPosition,
    filteredJobPositionsNodesAndEdges,
    triggerSetLayoutedNodesAndEdges,
  ]);

  // update filteredStoreLocationsNodesAndEdges
  useEffect(() => {
    if (!filteredStoreLocationsNodesAndEdges) {
      return;
    }

    const initialNodes = filteredStoreLocationsNodesAndEdges.nodes;
    const initialEdges = filteredStoreLocationsNodesAndEdges.edges;

    const { nodes: layoutedNodes, edges: layoutedEdges } =
      returnDagreLayoutedElements({
        edges: initialEdges,
        nodes: initialNodes,
        rankdir: dagreRankDir,
        align: dagreRankAlign === 'undefined' ? undefined : dagreRankAlign,
        nodesep: dagreNodeSep,
        ranksep: dagreRankSep,
        ranker: dagreRanker,
        minlen: dagreMinLen,
        weight: dagreWeight,
      });

    directoryDispatch({
      type: directoryAction.setLayoutedNodes,
      payload: layoutedNodes,
    });

    directoryDispatch({
      type: directoryAction.setLayoutedEdges,
      payload: layoutedEdges,
    });

    // set trigger to false
    directoryDispatch({
      type: directoryAction.triggerSetLayoutedNodesAndEdges,
      payload: false,
    });
  }, [
    dagreMinLen,
    dagreNodeSep,
    dagreRankAlign,
    dagreRankDir,
    dagreRankSep,
    dagreRanker,
    dagreWeight,
    filterByStoreLocation,
    filteredStoreLocationsNodesAndEdges,
    triggerSetLayoutedNodesAndEdges,
  ]);

  useEffect(() => {
    logState({
      state: directoryState,
      groupLabel: 'directoryState in Directory',
    });
  }, [directoryState]);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end useEffect ━┛

  // ┏━ begin input creators info objects ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const filterByDepartmentSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: DIRECTORY_DEPARTMENT_SELECT_OPTIONS,
      description: 'Show department employees',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        directoryDispatch({
          type: directoryAction.setFilterByDepartment,
          payload: event.currentTarget.value as DepartmentsWithDefaultKey,
        });
      },
      value: filterByDepartment,
      label: 'Filter by department',
    };

  let filterByJobPositionSelectData =
    filterByDepartment === 'All Departments'
      ? DIRECTORY_JOB_POSITION_SELECT_OPTIONS
      : DEPARTMENT_JOB_POSITION_MAP.get(filterByDepartment) ??
        DIRECTORY_JOB_POSITION_SELECT_OPTIONS;

  // add 'All Job Positions' default to select data when a filterByDepartment value is chosen
  filterByJobPositionSelectData =
    filterByDepartment === 'All Departments'
      ? filterByJobPositionSelectData
      : ([
          ...filterByJobPositionSelectData,
          { label: 'All Job Positions', value: 'All Job Positions' },
        ] as SelectInputData);

  const filterByJobPositionSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: filterByJobPositionSelectData,
      description: 'Show job position employees',
      disabled: filterByDepartment === 'All Departments',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        directoryDispatch({
          type: directoryAction.setFilterByJobPosition,
          payload: event.currentTarget.value as JobPositionsWithDefaultKey,
        });
      },
      value: filterByJobPosition,
      label: 'Filter by job position',
    };

  // const filterByStoreLocationCheckboxGroupCreatorInfo: AccessibleCheckboxGroupInputCreatorInfo =
  //   {
  //     dataObjectArray: DIRECTORY_STORE_LOCATION_CHECKBOX_DATA,
  //     description: {
  //       selected: filterByStoreLocationSelectedText,
  //       deselected: filterByStoreLocationDeselectedText,
  //     },
  //     onChange: (value: string[]) => {
  //       directoryDispatch({
  //         type: directoryAction.setFilterByStoreLocation,
  //         payload: value as StoreLocation[],
  //       });
  //     },
  //     value: filterByStoreLocation,
  //     semanticName: 'filter by store location',
  //   };

  const isFilterByStoreLocationSelectDisabled = [
    'All Departments',
    'Executive Management',
    'Accounting',
    'Human Resources',
    'Sales and Marketing',
    'Information Technology',
  ].includes(filterByDepartment);

  const filterByStoreLocationSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: DIRECTORY_STORE_LOCATION_SELECT_OPTIONS,
      disabled: isFilterByStoreLocationSelectDisabled,
      description: 'Show store location employees',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        directoryDispatch({
          type: directoryAction.setFilterByStoreLocation,
          payload: event.currentTarget.value as StoreLocationsWithDefaultKey,
        });
      },
      value: filterByStoreLocation,
      label: 'Filter by store location',
    };

  // sliders
  const sliderWidth =
    width < 480
      ? '217px'
      : width < 768
      ? `${width * 0.38}px`
      : width < 1192
      ? '500px'
      : `${width * 0.15}px`;

  const dagreNodeSepSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    kind: 'slider',
    ariaLabel: 'node separation',
    label: (value) => <Text>{value} px</Text>,
    max: 300,
    min: 25,
    step: 1,
    value: dagreNodeSep,
    onChangeSlider: (value: number) => {
      directoryDispatch({
        type: directoryAction.setDagreNodeSep,
        payload: value,
      });
    },
    sliderDefaultValue: 50,
    width: sliderWidth,
  };

  const dagreRankSepSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    kind: 'slider',
    ariaLabel: 'rank separation',
    label: (value) => <Text>{value} px</Text>,
    max: 300,
    min: 25,
    step: 1,
    value: dagreRankSep,
    onChangeSlider: (value: number) => {
      directoryDispatch({
        type: directoryAction.setDagreRankSep,
        payload: value,
      });
    },
    sliderDefaultValue: 50,
    width: sliderWidth,
  };

  const dagreMinLenSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    kind: 'slider',
    ariaLabel: 'min length',
    label: (value) => <Text>{value}</Text>,
    max: 10,
    min: 1,
    step: 1,
    value: dagreMinLen,
    onChangeSlider: (value: number) => {
      directoryDispatch({
        type: directoryAction.setDagreMinLen,
        payload: value,
      });
    },
    sliderDefaultValue: 1,
    width: sliderWidth,
  };

  const dagreWeightSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    kind: 'slider',
    ariaLabel: 'weight',
    label: (value) => <Text>{value}</Text>,
    max: 10,
    min: 1,
    step: 1,
    value: dagreWeight,
    onChangeSlider: (value: number) => {
      directoryDispatch({
        type: directoryAction.setDagreWeight,
        payload: value,
      });
    },
    sliderDefaultValue: 1,
    width: sliderWidth,
  };

  const dagreRankDirSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: DAGRE_LAYOUT_RANKDIR_SELECT_OPTIONS,
    description: 'Select the rank direction',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      directoryDispatch({
        type: directoryAction.setDagreRankDir,
        payload: event.currentTarget.value as DagreRankDir,
      });
    },
    value: dagreRankDir,
    label: 'Rank Direction',
  };

  const dagreRankAlignSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: DAGRE_LAYOUT_RANKALIGN_SELECT_OPTIONS,
      description: 'Select the rank alignment',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        directoryDispatch({
          type: directoryAction.setDagreRankAlign,
          payload: event.currentTarget.value as DagreRankAlign,
        });
      },
      value: dagreRankAlign,
      label: 'Rank Alignment',
    };

  const dagreRankerSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: DAGRE_LAYOUT_RANKER_SELECT_OPTIONS,
    description: 'Select the ranker algorithm',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      directoryDispatch({
        type: directoryAction.setDagreRanker,
        payload: event.currentTarget.value as DagreRankerAlgorithm,
      });
    },
    value: dagreRanker,
    label: 'Ranker Algorithm',
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end input creators info objects━┛

  // ┏━ begin input creators ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const [
    createdFilterByDepartmentSelectInputElements,
    createdFilterByJobPositionSelectInputElements,
    createdFilterByStoreLocationSelectInputElements,
  ] = returnAccessibleSelectInputElements([
    filterByDepartmentSelectInputCreatorInfo,
    filterByJobPositionSelectInputCreatorInfo,
    filterByStoreLocationSelectInputCreatorInfo,
  ]);

  const [
    createdDagreNodeSepSliderInput,
    createdDagreRankSepSliderInput,
    createdDagreMinLenSliderInput,
    createdDagreWeightSliderInput,
  ] = returnAccessibleSliderInputElements([
    dagreNodeSepSliderInputCreatorInfo,
    dagreRankSepSliderInputCreatorInfo,
    dagreMinLenSliderInputCreatorInfo,
    dagreWeightSliderInputCreatorInfo,
  ]);

  const [
    createdDagreRankDirSelectInput,
    createdDagreRankAlignSelectInput,
    createdDagreRankerSelectInput,
  ] = returnAccessibleSelectInputElements([
    dagreRankDirSelectInputCreatorInfo,
    dagreRankAlignSelectInputCreatorInfo,
    dagreRankerSelectInputCreatorInfo,
  ]);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end input creators ━┛

  // ┏━ begin input display ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const displayDagreNodeSepSliderInput = (
    <PieChartControlsStack
      input={createdDagreNodeSepSliderInput}
      label="Node Separation"
      value={dagreNodeSep}
      symbol="px"
    />
  );

  const displayDagreRankSepSliderInput = (
    <PieChartControlsStack
      input={createdDagreRankSepSliderInput}
      label="Rank Separation"
      value={dagreRankSep}
      symbol="px"
    />
  );

  const displayDagreMinLenSliderInput = (
    <PieChartControlsStack
      input={createdDagreMinLenSliderInput}
      label="Min Length"
      value={dagreMinLen}
      symbol=""
    />
  );

  const displayDagreWeightSliderInput = (
    <PieChartControlsStack
      input={createdDagreWeightSliderInput}
      label="Weight"
      value={dagreWeight}
      symbol=""
    />
  );

  const displayDagreRankDirSelectInput = (
    <PieChartControlsStack
      input={createdDagreRankDirSelectInput}
      label="Rank Direction"
      value={dagreRankDir}
      symbol=""
    />
  );

  const displayDagreRankAlignSelectInput = (
    <PieChartControlsStack
      input={createdDagreRankAlignSelectInput}
      label="Rank Alignment"
      value={dagreRankAlign === 'undefined' ? 'Default' : dagreRankAlign}
      symbol=""
    />
  );

  const displayDagreRankerSelectInput = (
    <PieChartControlsStack
      input={createdDagreRankerSelectInput}
      label="Ranker Algorithm"
      value={dagreRanker}
      symbol=""
    />
  );

  const displayDagreLayoutSlidersSection = (
    <Stack w="100%">
      {displayDagreNodeSepSliderInput}
      {displayDagreRankSepSliderInput}
      {displayDagreMinLenSliderInput}
      {displayDagreWeightSliderInput}
    </Stack>
  );

  const displayDagreLayoutSelectsSection = (
    <Stack w="100%">
      {displayDagreRankerSelectInput}
      {displayDagreRankDirSelectInput}
      {displayDagreRankAlignSelectInput}
    </Stack>
  );

  const displayDagreLayoutSection = (
    <Stack w="100%">
      {displayDagreLayoutSelectsSection}
      {displayDagreLayoutSlidersSection}
    </Stack>
  );

  // filter selects section
  const displayFilterByDepartmentSelectInput = (
    <PieChartControlsStack
      input={createdFilterByDepartmentSelectInputElements}
      label="Filter by department"
      value={filterByDepartment}
      symbol=""
    />
  );

  const displayFilterByJobPositionSelectInput = (
    <PieChartControlsStack
      input={createdFilterByJobPositionSelectInputElements}
      label="Filter by job position"
      value={filterByJobPosition}
      symbol=""
    />
  );

  const displayFilterByStoreLocationSelectInput = (
    <PieChartControlsStack
      input={createdFilterByStoreLocationSelectInputElements}
      label="Filter by store location"
      value={filterByStoreLocation}
      symbol=""
    />
  );

  const displayFilterSelectsSection = (
    <Stack w="100%">
      {displayFilterByDepartmentSelectInput}
      {displayFilterByJobPositionSelectInput}
      {displayFilterByStoreLocationSelectInput}
    </Stack>
  );

  const displayGraphControls = (
    <Stack
      h={width < 1192 ? '38vh' : '70vh'}
      style={{
        overflowY: 'scroll',
        borderRight: '1px solid #e0e0e0',
        borderBottom: width < 1192 ? '1px solid #e0e0e0' : '',
      }}
      py={padding}
    >
      {displayFilterSelectsSection}
      {displayDagreLayoutSection}
    </Stack>
  );

  const displayGraphViewport = (
    <GraphBuilderWrapper
      layoutedNodes={layoutedNodes}
      layoutedEdges={layoutedEdges}
    />
  );

  const displayLayoutAndGraph = (
    <Grid columns={width < 1192 ? 1 : 12} w="100%" h="70vh">
      <Grid.Col span={width < 1192 ? 1 : 4} h={width < 1192 ? '38vh' : '70vh'}>
        {displayGraphControls}
      </Grid.Col>
      <Grid.Col span={width < 1192 ? 1 : 8} h="100%">
        {displayGraphViewport}
      </Grid.Col>
    </Grid>
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end input display ━┛
  return <Stack w="100%">{displayLayoutAndGraph}</Stack>;
}

export default Directory;

/**
 * const displayGraphOptionsAccordion = (
    <Accordion w="100%">
      <Accordion.Item value="Filter by Departments, Job Positions or Store Locations">
        <Accordion.Control>
          <Text color="dark">
            {'Filter by Departments, Job Positions or Store Locations'}
          </Text>
        </Accordion.Control>
        <Accordion.Panel>
          <Flex
            w="100%"
            align="center"
            justify="flex-start"
            wrap="wrap"
            rowGap={rowGap}
            columnGap={rowGap}
            p={padding}
          >
            <Group w={350}>
              {createdFilterByDepartmentSelectInputElements}
            </Group>
            <Group w={350}>
              {createdFilterByJobPositionSelectInputElements}
            </Group>
            <Group w={350}>
              {createdFilterByStoreLocationSelectInputElements}
            </Group>
          </Flex>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
 */

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

/**
   * async function setAdministrativeDepartmentEdgesAndNodes() {
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
   */

/**
     * async function setSalesAndMarketingEdgesAndNodes() {
      const salesAndMarketingDocs =
        groupedByDepartment['Sales and Marketing'] ?? [];

      // starting sales and marketing nodes for each store location
      const [
        edmontonSalesAndMarketingStartingNode,
        calgarySalesAndMarketingStartingNode,
        vancouverSalesAndMarketingStartingNode,
      ]: FlowNode[] = STORE_LOCATION_DATA.map((store) => {
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

     */

/**
     * useEffect(() => {
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

     */

/**
   * async function setRepairTechniciansEdgesAndNodes() {
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
   */

/**
     * async function setFieldServiceTechniciansEdgesAndNodes() {
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
     */

/**
 * async function setLogisticsAndInventoryEdgesAndNodes() {
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
  */

/**
     * async function setCustomerServiceEdgesAndNodes() {
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
     */

/**
     * // group by key: store location and value: (key: job position, value: docs)
      const repairTechniciansDocsGroupedByStoreLocationAndJobPosition =
        Object.entries(repairTechniciansDocsGroupedByStoreLocation).reduce(
          (
            repairTechniciansDocsGroupedByStoreLocationAndJobPositionAcc: Record<
              StoreLocation,
              Record<JobPosition, DirectoryUserDocument[]>
            >,
            storeLocationGroupedRepairTechniciansDocsTuple
          ) => {
            const [storeLocation, groupedRepairTechniciansDocs] =
              storeLocationGroupedRepairTechniciansDocsTuple as [
                StoreLocation,
                DirectoryUserDocument[]
              ];

            // add store location field
            Object.defineProperty(
              repairTechniciansDocsGroupedByStoreLocationAndJobPositionAcc,
              storeLocation,
              {
                ...PROPERTY_DESCRIPTOR,
                value: Object.create(null),
              }
            );

            // for each store location, group by job position
            groupedRepairTechniciansDocs.forEach(
              (userDocument: DirectoryUserDocument) => {
                const { jobPosition } = userDocument;

                const obj =
                  repairTechniciansDocsGroupedByStoreLocationAndJobPositionAcc[
                    storeLocation
                  ];
                const key = jobPosition;
                const newValue = [
                  ...(obj[key] ?? []),
                  userDocument,
                ] as DirectoryUserDocument[];

                Object.defineProperty(obj, key, {
                  ...PROPERTY_DESCRIPTOR,
                  value: newValue,
                });
              }
            );

            return repairTechniciansDocsGroupedByStoreLocationAndJobPositionAcc;
          },
          Object.create(null)
        );
     *  
     * // // for each job position, create a single profile node that will hold a carousel of profile cards that correspond to employees with that job position
          // Object.entries(groupedRepairTechniciansByJobPositionsObj).forEach(
          //   (jobPositionGroupedRepairTechniciansTuple) => {
          //     const [jobPosition, groupedRepairEmployeesForJobPosition] =
          //       jobPositionGroupedRepairTechniciansTuple as [
          //         JobPosition,
          //         DirectoryUserDocument[]
          //       ];

          //     // create profile cards for each grouped repair technician
          //     const groupedRepairEmployeesForJobPositionProfileCards: React.JSX.Element[] =
          //       groupedRepairEmployeesForJobPosition.map(
          //         (userDocument: DirectoryUserDocument) => {
          //           const displayProfileCard = returnDirectoryProfileCard({
          //             userDocument,
          //             padding,
          //             rowGap,
          //           });

          //           return displayProfileCard;
          //         }
          //       );

          //     // create a carousel from said profile cards
          //     const groupedRepairEmployeesForJobPositionProfileCarousel = (
          //       <CarouselBuilder
          //         carouselProps={{}}
          //         slides={groupedRepairEmployeesForJobPositionProfileCards}
          //       />
          //     );

          //     const nodeType = jobPosition.toLowerCase().includes('supervisor')
          //       ? 'default'
          //       : 'output';

          //     // create profile node with carousel
          //     const groupedRepairEmployeesForJobPositionProfileNode: Node = {
          //       id: `${storeLocation}-${jobPosition}`,
          //       type: nodeType,
          //       data: {
          //         label: groupedRepairEmployeesForJobPositionProfileCarousel,
          //       },
          //       position: nodePosition,
          //       style: nodeDimensions,
          //     };

          //     // add job position field with profile node
          //     Object.defineProperty(
          //       repairTechniciansProfileNodesObjectAcc[storeLocation],
          //       jobPosition,
          //       {
          //         ...PROPERTY_DESCRIPTOR,
          //         value: groupedRepairEmployeesForJobPositionProfileNode,
          //       }
          //     );
          //   }
          // );

     */

/**
 * // // create accounting profile nodes
      // const [accountingManagerProfileNode, accountingSpecialistsProfileNodes] =
      //   accountingDocs.reduce(
      //     (
      //       accountingNodesAcc: [Node, Node[]],
      //       userDocument: DirectoryUserDocument
      //     ) => {
      //       const { _id, jobPosition } = userDocument;

      //       const nodeType = jobPosition
      //         .toLowerCase()
      //         .includes('accounting manager')
      //         ? 'default'
      //         : 'output';

      //       const displayProfileCard = returnDirectoryProfileCard({
      //         userDocument,
      //         padding,
      //         rowGap,
      //       });

      //       const salesNode: Node = {
      //         id: _id,
      //         type: nodeType,
      //         data: { label: displayProfileCard },
      //         position: nodePosition,
      //         style: nodeDimensions,
      //       };

      //       if (jobPosition.toLowerCase().includes('accounting manager')) {
      //         accountingNodesAcc[0] = salesNode;
      //         return accountingNodesAcc;
      //       }

      //       accountingNodesAcc[1].push(salesNode);

      //       return accountingNodesAcc;
      //     },
      //     [{} as Node, []]
      //   );

      // // chief financial officer node id
      // const chiefFinancialOfficerId =
      //   groupedByDepartment['Executive Management'].find(
      //     (userDocument: DirectoryUserDocument) =>
      //       userDocument.jobPosition === 'Chief Financial Officer'
      //   )?._id ?? '';

      // // connect accounting manager to cfo
      // // [CFO] ━━━ [ACCOUNTING MANAGER]
      // const accountingManagerProfileNodeId = accountingManagerProfileNode.id;

      // const cfoToAccountingManagerEdge: Edge = {
      //   ...edgeDefaults,
      //   id: `${chiefFinancialOfficerId}-${accountingManagerProfileNodeId}`, // source-target
      //   source: chiefFinancialOfficerId,
      //   target: accountingManagerProfileNodeId,
      // };

      // // connect accounting manager to accounting specialists profile nodes
      // //                                 ┏━ [ACCOUNTS PAYABLE CLERK]
      // // [CFO] ━━━ [ACCOUNTING MANAGER] ━━━ [FINANCIAL ANALYST]
      // //                                 ┗━ [ACCOUNTS RECEIVABLE CLERK]

      // const accountingSpecialistsProfileEdges = accountingDocs.reduce(
      //   (
      //     accountingSpecialistsProfileEdgesAcc: Edge[],
      //     userDocument: DirectoryUserDocument
      //   ) => {
      //     const { _id, jobPosition } = userDocument;

      //     if (jobPosition.toLowerCase().includes('accounting manager')) {
      //       return accountingSpecialistsProfileEdgesAcc;
      //     }

      //     const accountingSpecialistProfileEdge: Edge = {
      //       ...edgeDefaults,
      //       id: `${accountingManagerProfileNodeId}-${_id}`, // source-target
      //       source: accountingManagerProfileNodeId,
      //       target: _id,
      //     };

      //     accountingSpecialistsProfileEdgesAcc.push(
      //       accountingSpecialistProfileEdge
      //     );

      //     return accountingSpecialistsProfileEdgesAcc;
      //   },
      //   [cfoToAccountingManagerEdge]
      // );

      // directoryDispatch({
      //   type: directoryAction.setDepartmentsNodesAndEdges,
      //   payload: {
      //     department: 'Accounting',
      //     kind: 'nodes',
      //     data: [
      //       accountingManagerProfileNode,
      //       ...accountingSpecialistsProfileNodes,
      //     ],
      //   },
      // });

      // directoryDispatch({
      //   type: directoryAction.setDepartmentsNodesAndEdges,
      //   payload: {
      //     department: 'Accounting',
      //     kind: 'edges',
      //     data: accountingSpecialistsProfileEdges,
      //   },
      // });
 */
/**
 * async function setInformationTechnologyEdgesAndNodes() {
      const informationTechnologyDocs =
        groupedByDepartment['Information Technology'] ?? [];

      // create information technology profile nodes
      const [
        informationTechnologyManagerProfileNode,
        informationTechnologySpecialistsProfileNodes,
      ] = informationTechnologyDocs.reduce(
        (
          informationTechnologyNodesAcc: [Node, Node[]],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, jobPosition } = userDocument;

          const nodeType = jobPosition.toLowerCase().includes('it manager')
            ? 'default'
            : 'output';

          const displayProfileCard = returnDirectoryProfileCard({
            userDocument,
            padding,
            rowGap,
          });

          const salesNode: Node = {
            id: _id,
            type: nodeType,
            data: { label: displayProfileCard },
            position: nodePosition,
            style: nodeDimensions,
          };

          if (jobPosition.toLowerCase().includes('it manager')) {
            informationTechnologyNodesAcc[0] = salesNode;
            return informationTechnologyNodesAcc;
          }

          informationTechnologyNodesAcc[1].push(salesNode);

          return informationTechnologyNodesAcc;
        },
        [{} as Node, []]
      );

      // chief technology officer node id
      const chiefTechnologyOfficerId =
        groupedByDepartment['Executive Management'].find(
          (userDocument: DirectoryUserDocument) =>
            userDocument.jobPosition === 'Chief Technology Officer'
        )?._id ?? '';

      // connect information technology manager to cto
      // [CTO] ━━━ [IT MANAGER]
      const informationTechnologyManagerProfileNodeId =
        informationTechnologyManagerProfileNode.id;

      const ctoToInformationTechnologyManagerEdge: Edge = {
        ...edgeDefaults,
        id: `${chiefTechnologyOfficerId}-${informationTechnologyManagerProfileNodeId}`, // source-target
        source: chiefTechnologyOfficerId,
        target: informationTechnologyManagerProfileNodeId,
      };

      // connect information technology manager to information technology specialists profile nodes
      //                         ┏━ [SYSTEMS ADMINISTRATOR]
      //                         ┏━ [IT SUPPORT SPECIALIST]
      //                         ┏━ [DATABASE ADMINISTRATOR]
      //                         ┏━ [WEB DEVELOPER]
      // [CTO] ━━━ [IT MANAGER] ━━━ [SOFTWARE DEVELOPER]
      //                         ┗━ [SOFTWARE ENGINEER]

      const informationTechnologySpecialistsProfileEdges =
        informationTechnologyDocs.reduce(
          (
            informationTechnologySpecialistsProfileEdgesAcc: Edge[],
            userDocument: DirectoryUserDocument
          ) => {
            const { _id, jobPosition } = userDocument;

            if (jobPosition.toLowerCase().includes('it manager')) {
              return informationTechnologySpecialistsProfileEdgesAcc;
            }

            const informationTechnologySpecialistProfileEdge: Edge = {
              ...edgeDefaults,
              id: `${informationTechnologyManagerProfileNodeId}-${_id}`, // source-target
              source: informationTechnologyManagerProfileNodeId,
              target: _id,
            };

            informationTechnologySpecialistsProfileEdgesAcc.push(
              informationTechnologySpecialistProfileEdge
            );

            return informationTechnologySpecialistsProfileEdgesAcc;
          },
          [ctoToInformationTechnologyManagerEdge]
        );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Information Technology',
          kind: 'nodes',
          data: [
            informationTechnologyManagerProfileNode,
            ...informationTechnologySpecialistsProfileNodes,
          ],
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Information Technology',
          kind: 'edges',
          data: informationTechnologySpecialistsProfileEdges,
        },
      });
    }
 */

/**
 * async function setMarketingEdgesAndNodes() {
      const marketingDocs = groupedByDepartment.Marketing ?? [];

      // create marketing profile nodes
      const [marketingManagerProfileNode, marketingSpecialistsProfileNodes] =
        marketingDocs.reduce(
          (
            marketingNodesAcc: [Node, Node[]],
            userDocument: DirectoryUserDocument
          ) => {
            const { _id, jobPosition } = userDocument;

            const nodeType = jobPosition.toLowerCase().includes('manager')
              ? 'default'
              : 'output';

            const displayProfileCard = returnDirectoryProfileCard({
              userDocument,
              padding,
              rowGap,
            });

            const salesNode: Node = {
              id: _id,
              type: nodeType,
              data: { label: displayProfileCard },
              position: nodePosition,
              style: nodeDimensions,
            };

            if (jobPosition.toLowerCase().includes('marketing manager')) {
              marketingNodesAcc[0] = salesNode;
              return marketingNodesAcc;
            }

            marketingNodesAcc[1].push(salesNode);

            return marketingNodesAcc;
          },
          [{} as Node, []]
        );

      // chief marketing officer node id
      const chiefMarketingOfficerId =
        groupedByDepartment['Executive Management'].find(
          (userDocument: DirectoryUserDocument) =>
            userDocument.jobPosition === 'Chief Marketing Officer'
        )?._id ?? '';

      // connect marketing manager to cso
      // [CSO] ━━━ [MARKETING MANAGER]
      const marketingManagerProfileNodeId = marketingManagerProfileNode.id;

      const cmoToMarketingManagerEdge: Edge = {
        ...edgeDefaults,
        id: `${chiefMarketingOfficerId}-${marketingManagerProfileNodeId}`, // source-target
        source: chiefMarketingOfficerId,
        target: marketingManagerProfileNodeId,
      };

      // connect marketing manager to marketing specialists profile nodes
      //                                ┏━ [DIGITAL MARKETING SPECIALIST]
      // [CSO] ━━━ [MARKETING MANAGER] ━━━ [GRAPHIC DESIGNER]
      //                                ┗━ [PUBLIC RELATIONS SPECIALIST]
      //                                ┗━ [MARKETING ANALYST]

      const marketingSubordinatesProfileEdges = marketingDocs.reduce(
        (
          marketingSubordinatesProfileEdgesAcc: Edge[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, jobPosition } = userDocument;

          if (jobPosition.toLowerCase().includes('marketing manager')) {
            return marketingSubordinatesProfileEdgesAcc;
          }

          const marketingSubordinateProfileEdge: Edge = {
            ...edgeDefaults,
            id: `${marketingManagerProfileNodeId}-${_id}`, // source-target
            source: marketingManagerProfileNodeId,
            target: _id,
          };

          marketingSubordinatesProfileEdgesAcc.push(
            marketingSubordinateProfileEdge
          );

          return marketingSubordinatesProfileEdgesAcc;
        },
        [cmoToMarketingManagerEdge]
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Marketing',
          kind: 'nodes',
          data: [
            marketingManagerProfileNode,
            ...marketingSpecialistsProfileNodes,
          ],
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Marketing',
          kind: 'edges',
          data: marketingSubordinatesProfileEdges,
        },
      });
    }
 */

/**
 * async function setSalesEdgesAndNodes() {
      const salesDocs = groupedByDepartment.Sales ?? [];

      // create sales profile nodes
      const [salesManagerProfileNode, salesSpecialistsProfileNodes] =
        salesDocs.reduce(
          (
            salesNodesAcc: [Node, Node[]],
            userDocument: DirectoryUserDocument
          ) => {
            const { _id, jobPosition } = userDocument;

            const nodeType = jobPosition.toLowerCase().includes('manager')
              ? 'default'
              : 'output';

            const displayProfileCard = returnDirectoryProfileCard({
              userDocument,
              padding,
              rowGap,
            });

            const salesNode: Node = {
              id: _id,
              type: nodeType,
              data: { label: displayProfileCard },
              position: nodePosition,
              style: nodeDimensions,
            };

            if (jobPosition.toLowerCase().includes('sales manager')) {
              salesNodesAcc[0] = salesNode;
              return salesNodesAcc;
            }

            salesNodesAcc[1].push(salesNode);

            return salesNodesAcc;
          },
          [{} as Node, []]
        );

      // chief sales officer node id
      const chiefSalesOfficerId =
        groupedByDepartment['Executive Management'].find(
          (userDocument: DirectoryUserDocument) =>
            userDocument.jobPosition === 'Chief Sales Officer'
        )?._id ?? '';

      // connect sales manager to cso
      // [CSO] ━━━ [SALES MANAGER]
      const salesManagerProfileNodeId = salesManagerProfileNode.id;

      const csoToSalesManagerEdge: Edge = {
        ...edgeDefaults,
        id: `${chiefSalesOfficerId}-${salesManagerProfileNodeId}`, // source-target
        source: chiefSalesOfficerId,
        target: salesManagerProfileNodeId,
      };

      // connect sales manager to sales specialists profile nodes
      //                            ┏━ [SALES REPRESENTATIVE]
      // [CSO] ━━━ [SALES MANAGER] ━━━ [BUSINESS DEVELOPMENT SPECIALIST]
      //                            ┗━ [SALES SUPPORT SPECIALIST]
      //                            ┗━ [SALES OPERATIONS ANALYST]

      const salesSubordinatesProfileEdges = salesDocs.reduce(
        (
          salesSubordinatesProfileEdgesAcc: Edge[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, jobPosition } = userDocument;

          if (jobPosition.toLowerCase().includes('sales manager')) {
            return salesSubordinatesProfileEdgesAcc;
          }

          const salesSubordinateProfileEdge: Edge = {
            ...edgeDefaults,
            id: `${salesManagerProfileNodeId}-${_id}`, // source-target
            source: salesManagerProfileNodeId,
            target: _id,
          };

          salesSubordinatesProfileEdgesAcc.push(salesSubordinateProfileEdge);

          return salesSubordinatesProfileEdgesAcc;
        },
        [csoToSalesManagerEdge]
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Sales',
          kind: 'nodes',
          data: [salesManagerProfileNode, ...salesSpecialistsProfileNodes],
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Sales',
          kind: 'edges',
          data: salesSubordinatesProfileEdges,
        },
      });
    }
 */

/**
 * async function setHumanResourcesEdgesAndNodes() {
      const humanResourcesDocs = groupedByDepartment['Human Resources'] ?? [];

      // create human resources profile nodes
      const [
        hrManagerProfileNode,
        hrSubManagersProfileNodes,
        hrSpecialistsProfileNodes,
      ] = humanResourcesDocs.reduce(
        (
          humanResourcesNodesAcc: [Node, Node[], Node[]],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, jobPosition } = userDocument;

          const nodeType = jobPosition.toLowerCase().includes('specialist')
            ? 'output'
            : 'default';

          const displayProfileCard = returnDirectoryProfileCard({
            userDocument,
            padding,
            rowGap,
          });

          const humanResourcesNode: Node = {
            id: _id,
            type: nodeType,
            data: { label: displayProfileCard },
            position: nodePosition,
            style: nodeDimensions,
          };

          if (jobPosition.toLowerCase().includes('human resources manager')) {
            humanResourcesNodesAcc[0] = humanResourcesNode;
            return humanResourcesNodesAcc;
          }

          if (jobPosition.toLowerCase().includes('specialist')) {
            humanResourcesNodesAcc[2].push(humanResourcesNode);
            return humanResourcesNodesAcc;
          }

          humanResourcesNodesAcc[1].push(humanResourcesNode);

          return humanResourcesNodesAcc;
        },
        [{} as Node, [], []]
      );

      // chief human resources officer node id
      const chiefHumanResourcesOfficerId =
        groupedByDepartment['Executive Management'].find(
          (userDocument: DirectoryUserDocument) =>
            userDocument.jobPosition === 'Chief Human Resources Officer'
        )?._id ?? '';

      // connect hr manager to chro
      // [CHRO] ━━━ [HR MANAGER]
      const hrManagerProfileNodeId = hrManagerProfileNode.id;

      const chroToHrManagerEdge: Edge = {
        ...edgeDefaults,
        id: `${chiefHumanResourcesOfficerId}-${hrManagerProfileNodeId}`, // source-target
        source: chiefHumanResourcesOfficerId,
        target: hrManagerProfileNodeId,
      };

      // connect HR manager to HR sub managers profile nodes
      //                          ┏━ [COMPENSATION & BENEFITS MANAGER]
      //                          ┏━ [HEALTH & SAFETY MANAGER]
      // [CHRO] ━━━ [HR MANAGER] ━━━ [TRAINING MANAGER]
      //                          ┗━ [RECRUITING MANAGER]
      const hrSubManagersProfileNodesIds = hrSubManagersProfileNodes.map(
        (node: Node) => node.id
      );

      const hrManagerToHrSubManagersEdges = hrSubManagersProfileNodesIds.reduce(
        (
          hrManagerToHrSubManagersEdgesAcc: Edge[],
          hrSubManagerProfileNodeId: string
        ) => {
          const hrManagerToHrSubManagerEdge: Edge = {
            ...edgeDefaults,
            id: `${hrManagerProfileNodeId}-${hrSubManagerProfileNodeId}`, // source-target
            source: hrManagerProfileNodeId,
            target: hrSubManagerProfileNodeId,
          };

          hrManagerToHrSubManagersEdgesAcc.push(hrManagerToHrSubManagerEdge);

          return hrManagerToHrSubManagersEdgesAcc;
        },
        [chroToHrManagerEdge]
      );

      // connect HR sub managers to HR specialists profile nodes
      //                          ┏━ [CB&M MANAGER] ━━━ [CB&M SPECIALIST]
      //                          ┏━ [H&S MANAGER]  ━━━ [H&S SPECIALIST]
      // [CHRO] ━━━ [HR MANAGER] ━━━ [TR. MANAGER]  ━━━ [TR. SPECIALIST]
      //                          ┗━ [REC. MANAGER] ━━━ [REC. SPECIALIST]
      const hrSpecialistsProfileNodesIds = hrSpecialistsProfileNodes.map(
        (node: Node) => node.id
      );

      // as the nodes are created from an obj array, the order is guaranteed
      const hrSubManagersToHrSpecialistsProfileEdges =
        hrSubManagersProfileNodesIds.reduce(
          (
            hrSubManagersToHrSpecialistsProfileEdgesAcc,
            hrSubManagerProfileNodeId,
            index
          ) => {
            const hrSpecialistProfileNodeId =
              hrSpecialistsProfileNodesIds[index];

            const hrSubManagerToHrSpecialistEdge: Edge = {
              ...edgeDefaults,
              id: `${hrSubManagerProfileNodeId}-${hrSpecialistProfileNodeId}`, // source-target
              source: hrSubManagerProfileNodeId,
              target: hrSpecialistProfileNodeId,
            };

            hrSubManagersToHrSpecialistsProfileEdgesAcc.push(
              hrSubManagerToHrSpecialistEdge
            );

            return hrSubManagersToHrSpecialistsProfileEdgesAcc;
          },
          [...hrManagerToHrSubManagersEdges]
        );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Human Resources',
          kind: 'nodes',
          data: [
            hrManagerProfileNode,
            ...hrSubManagersProfileNodes,
            ...hrSpecialistsProfileNodes,
          ],
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Human Resources',
          kind: 'edges',
          data: hrSubManagersToHrSpecialistsProfileEdges, // contains all edges
        },
      });

      
    }
 */

/**
     *  async function setOfficeAdministrationEdgesAndNodes() {
      const officeAdministrationDocs =
        groupedByDepartment['Office Administration'] ?? [];

      // sets the shape of acc object passed in reduce
      // why? store locations may change
      const officeAdministrationProfileNodesInitialAcc =
        STORE_LOCATION_DATA.reduce(
          (
            // officeAdministrationNodesAcc: OfficeAdministrationProfileNodesObject,
            officeAdministrationNodesAcc,
            storeLocation: StoreLocation
          ) => {
            const value = {
              administrator: {} as Node,
              specialists: [],
            };

            Object.defineProperty(officeAdministrationNodesAcc, storeLocation, {
              ...PROPERTY_DESCRIPTOR,
              value,
            });

            return officeAdministrationNodesAcc;
          },
          Object.create(null)
        );

      // create office administration profile nodes
      const officeAdministrationProfileNodesObject =
        officeAdministrationDocs.reduce(
          (
            // officeAdministrationNodesAcc: OfficeAdministrationProfileNodesObject,
            officeAdministrationNodesAcc,
            userDocument: DirectoryUserDocument
          ) => {
            const { _id, jobPosition, storeLocation } = userDocument;

            if (!storeLocation) {
              return officeAdministrationNodesAcc;
            }

            const nodeType = jobPosition
              .toLowerCase()
              .includes('office administrator')
              ? 'default'
              : 'output';

            const displayProfileCard = returnDirectoryProfileCard({
              userDocument,
              padding,
              rowGap,
            });

            const officeAdministrationNode: Node = {
              id: _id,
              type: nodeType,
              data: { label: displayProfileCard },
              position: nodePosition,
              style: nodeDimensions,
            };

            if (jobPosition.toLowerCase().includes('office administrator')) {
              Object.defineProperty(
                officeAdministrationNodesAcc[storeLocation],
                'administrator',
                {
                  ...PROPERTY_DESCRIPTOR,
                  value: officeAdministrationNode,
                }
              );
              return officeAdministrationNodesAcc;
            }

            Object.defineProperty(
              officeAdministrationNodesAcc[storeLocation],
              'specialists',
              {
                ...PROPERTY_DESCRIPTOR,
                value: [
                  ...officeAdministrationNodesAcc[storeLocation].specialists,
                  officeAdministrationNode,
                ],
              }
            );

            return officeAdministrationNodesAcc;
          },
          officeAdministrationProfileNodesInitialAcc
        );

      // connect each store location's office manager to office administrator to subordinates
      //           ┏━ [EDMONTON] ━━━ [OFFICE MANAGER] ━━━ [OFFICE ADMIN...]
      // [STORES] ━━━ [CALGARY] ━━━ [OFFICE MANAGER] ━━━ [OFFICE ADMIN...]
      //           ┗━ [VANCOUVER] ━━━ [OFFICE MANAGER] ━━━ [OFFICE ADMIN...]

      // connect each store location's office administrator to office manager, and subordinates to administrator
      const officeAdministrationProfileEdges = STORE_LOCATION_DATA.reduce(
        (
          officeAdministrationEdgesAcc: Edge[],
          storeLocation: StoreLocation
        ) => {
          // find office manager profile node id for this store location
          const storeAdministrationDocs =
            groupedByDepartment['Store Administration'] ?? [];

          const officeManagerProfileNodeId =
            storeAdministrationDocs.find(
              (userDocument: DirectoryUserDocument) =>
                userDocument.storeLocation === storeLocation &&
                userDocument.jobPosition === 'Office Manager'
            )?._id ?? '';

          // find office administrators profile node id for this store location
          const officeAdministratorProfileNodeId =
            officeAdministrationProfileNodesObject[storeLocation].administrator
              .id;

          // connect office manager to office administrator
          const officeManagerToOfficeAdministratorEdge: Edge = {
            ...edgeDefaults,
            id: `${officeManagerProfileNodeId}-${officeAdministratorProfileNodeId}`, // source-target
            source: officeManagerProfileNodeId,
            target: officeAdministratorProfileNodeId,
          };

          officeAdministrationEdgesAcc.push(
            officeManagerToOfficeAdministratorEdge
          );

          // find specialists profile nodes for this store location
          const specialistsProfileNodes =
            officeAdministrationProfileNodesObject[storeLocation].specialists;

          // connect office administrator to specialists
          const officeAdministratorToSpecialistsEdges =
            specialistsProfileNodes.map((node: Node) => {
              const officeAdministratorToSpecialistEdge: Edge = {
                ...edgeDefaults,
                id: `${officeAdministratorProfileNodeId}-${node.id}`, // source-target
                source: officeAdministratorProfileNodeId,
                target: node.id,
              };

              return officeAdministratorToSpecialistEdge;
            });

          officeAdministrationEdgesAcc.push(
            ...officeAdministratorToSpecialistsEdges
          );

          return officeAdministrationEdgesAcc;
        },
        []
      );

      const officeAdministrationProfileNodes = Object.entries(
        officeAdministrationProfileNodesObject
      ).reduce(
        (
          officeAdministrationProfileNodesAcc: Node[],
          [_, hierarchicalDivisor]
        ) => {
          const { administrator, specialists } = hierarchicalDivisor as {
            administrator: Node;
            specialists: Node[];
          };

          officeAdministrationProfileNodesAcc.push(administrator);
          specialists.forEach((node: Node) => {
            officeAdministrationProfileNodesAcc.push(node);
          });

          return officeAdministrationProfileNodesAcc;
        },
        []
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Office Administration',
          kind: 'nodes',
          data: officeAdministrationProfileNodes,
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Office Administration',
          kind: 'edges',
          data: officeAdministrationProfileEdges,
        },
      });
    }
     */

/**
 * async function setStoreAdministrationEdgesAndNodes() {
      const storeAdministrationDocs =
        groupedByDepartment['Store Administration'] ?? [];

      // starting stores heading node [STORES]
      const initialStoresHeadingNode: FlowNode = {
        id: 'stores-heading',
        type: 'default',
        data: { label: 'Stores' },
        position: nodePosition,
        style: nodeDimensions,
      };

      // store administration heading node for each store location
      const storeLocationsHeadingNodes: FlowNode[] = STORE_LOCATION_DATA.map(
        (store) => {
          const initialStoreLocationsHeadingNode: FlowNode = {
            id: `store-location-heading-${store}`,
            type: 'default',
            data: { label: `${store} Store Administration` },
            position: nodePosition,
            style: nodeDimensions,
          };

          return initialStoreLocationsHeadingNode;
        }
      );

      // store administration profile nodes for each store location
      const storeAdministrationProfileNodes = storeAdministrationDocs.reduce(
        (
          storeAdministrationNodesAcc: Node[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, jobPosition } = userDocument;

          const displayProfileCard = returnDirectoryProfileCard({
            userDocument,
            padding,
            rowGap,
          });

          const storeAdministrationNode: Node = {
            id: _id,
            type: 'default',
            data: { label: displayProfileCard },
            position: nodePosition,
            style: nodeDimensions,
          };
          storeAdministrationNodesAcc.push(storeAdministrationNode);

          return storeAdministrationNodesAcc;
        },
        [initialStoresHeadingNode, ...storeLocationsHeadingNodes]
      );

      // connecting initial store heading node to each store location heading node
      //           ┏━ [EDMONTON]
      // [STORES] ━━━ [CALGARY]
      //           ┗━ [VANCOUVER]
      const storesHeadingNodeId = initialStoresHeadingNode.id;
      const edgesFromStoresHeadingToEachStoreLocationsHeading =
        storeLocationsHeadingNodes.reduce(
          (
            storeLocationsHeadingEdgesAcc: Edge[],
            storeLocationHeadingNode: FlowNode
          ) => {
            const { id: storeLocationHeadingNodeId } = storeLocationHeadingNode;

            const storeLocationHeadingEdge: Edge = {
              id: `${storesHeadingNodeId}-${storeLocationHeadingNodeId}`,
              source: storesHeadingNodeId,
              target: storeLocationHeadingNodeId,
              type: 'smoothstep',
              animated: true,
              // label: jobPosition,
              labelBgPadding: [8, 4],
              labelBgBorderRadius: 4,
              labelBgStyle: { fill: 'white' },
              labelStyle: { fill: 'black', fontWeight: 700 },
              style: { stroke: 'black' },
            };

            storeLocationsHeadingEdgesAcc.push(storeLocationHeadingEdge);

            return storeLocationsHeadingEdgesAcc;
          },
          []
        );

      // connect each store location heading node to its store manager profile node
      //
      //           ┏━ [EDMONTON]  ━━━ [STORE MANAGER]
      // [STORES] ━━━ [CALGARY]   ━━━ [STORE MANAGER]
      //           ┗━ [VANCOUVER] ━━━ [STORE MANAGER]

      const storeAdministrationEdges = storeAdministrationDocs.reduce(
        (
          storeAdministrationEdgesAcc: Edge[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, storeLocation, jobPosition } = userDocument;

          const storeLocationHeadingNodeId = storeLocationsHeadingNodes.find(
            (storeLocationHeadingNode: FlowNode) =>
              storeLocationHeadingNode.id ===
              `store-location-heading-${storeLocation}`
          )?.id as string;

          //  edge from store location heading node to store manager profile node
          if (jobPosition === 'Store Manager') {
            const storeAdministrationEdge: Edge = {
              ...edgeDefaults,
              id: `${storeLocationHeadingNodeId}-${_id}`, // source-target
              source: storeLocationHeadingNodeId,
              target: _id,
            };
            storeAdministrationEdgesAcc.push(storeAdministrationEdge);
          }

          return storeAdministrationEdgesAcc;
        },
        [...edgesFromStoresHeadingToEachStoreLocationsHeading]
      );

      // connect store managers to their subordinates
      //                                               ┏━ [OFFICE MANAGER]
      //           ┏━ [EDMONTON]  ━━━ [STORE MANAGER] ━━━ [SHIFT SUPERVISOR]
      // [STORES] ━━━ [CALGARY]   ━━━ [STORE MANAGER] ━━━ // same
      //           ┗━ [VANCOUVER] ━━━ [STORE MANAGER] ━━━ // same

      // find store managers node ids
      const [
        edmontonStoreManagerNodeId,
        calgaryStoreManagerNodeId,
        vancouverStoreManagerNodeId,
      ] = storeAdministrationDocs.reduce(
        (
          storeManagersNodeIdsAcc: string[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, storeLocation, jobPosition } = userDocument;

          if (storeLocation === 'Edmonton' && jobPosition === 'Store Manager') {
            // find the store manager node id
            const edmontonStoreManagerNodeId =
              storeAdministrationProfileNodes.find(
                (node: Node) => node.id === _id
              )?.id as string;
            storeManagersNodeIdsAcc[0] = edmontonStoreManagerNodeId;
          }

          if (storeLocation === 'Calgary' && jobPosition === 'Store Manager') {
            // find the store manager node id
            const calgaryStoreManagerNodeId =
              storeAdministrationProfileNodes.find(
                (node: Node) => node.id === _id
              )?.id as string;
            storeManagersNodeIdsAcc[1] = calgaryStoreManagerNodeId;
          }

          if (
            storeLocation === 'Vancouver' &&
            jobPosition === 'Store Manager'
          ) {
            // find the store manager node id
            const vancouverStoreManagerNodeId =
              storeAdministrationProfileNodes.find(
                (node: Node) => node.id === _id
              )?.id as string;
            storeManagersNodeIdsAcc[2] = vancouverStoreManagerNodeId;
          }
          return storeManagersNodeIdsAcc;
        },
        ['', '', '']
      );

      // for edmonton store location
      const edmontonStoreAdministrationEdges = storeAdministrationDocs.reduce(
        (
          edmontonStoreAdministrationEdgesAcc: Edge[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, storeLocation, jobPosition } = userDocument;

          if (storeLocation !== 'Edmonton' || jobPosition === 'Store Manager') {
            return edmontonStoreAdministrationEdgesAcc;
          }

          // edge from store manager profile node to subordinate profile node
          const edmontonStoreAdministrationEdge: Edge = {
            ...edgeDefaults,
            id: `${edmontonStoreManagerNodeId}-${_id}`, // source-target
            source: edmontonStoreManagerNodeId,
            target: _id,
          };
          edmontonStoreAdministrationEdgesAcc.push(
            edmontonStoreAdministrationEdge
          );

          return edmontonStoreAdministrationEdgesAcc;
        },
        [...storeAdministrationEdges]
      );

      // for calgary store location with accumulated edges from edmonton store location
      const calgaryStoreAdministrationEdges = storeAdministrationDocs.reduce(
        (
          calgaryStoreAdministrationEdgesAcc: Edge[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, storeLocation, jobPosition } = userDocument;

          if (storeLocation !== 'Calgary' || jobPosition === 'Store Manager') {
            return calgaryStoreAdministrationEdgesAcc;
          }

          // edge from store manager profile node to subordinate profile node
          const calgaryStoreAdministrationEdge: Edge = {
            ...edgeDefaults,
            id: `${calgaryStoreManagerNodeId}-${_id}`, // source-target
            source: calgaryStoreManagerNodeId,
            target: _id,
          };

          calgaryStoreAdministrationEdgesAcc.push(
            calgaryStoreAdministrationEdge
          );

          return calgaryStoreAdministrationEdgesAcc;
        },
        []
      );

      // for vancouver store location with accumulated edges from edmonton and calgary store locations
      const vancouverStoreAdministrationEdges = storeAdministrationDocs.reduce(
        (
          vancouverStoreAdministrationEdgesAcc: Edge[],
          userDocument: DirectoryUserDocument
        ) => {
          const { _id, storeLocation, jobPosition } = userDocument;

          if (
            storeLocation !== 'Vancouver' ||
            jobPosition === 'Store Manager'
          ) {
            return vancouverStoreAdministrationEdgesAcc;
          }

          // edge from store manager profile node to subordinate profile node
          const vancouverStoreAdministrationEdge: Edge = {
            ...edgeDefaults,
            id: `${vancouverStoreManagerNodeId}-${_id}`, // source-target
            source: vancouverStoreManagerNodeId,
            target: _id,
          };

          vancouverStoreAdministrationEdgesAcc.push(
            vancouverStoreAdministrationEdge
          );

          return vancouverStoreAdministrationEdgesAcc;
        },
        []
      );

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Store Administration',
          kind: 'nodes',
          data: storeAdministrationProfileNodes,
        },
      });

      directoryDispatch({
        type: directoryAction.setDepartmentsNodesAndEdges,
        payload: {
          department: 'Store Administration',
          kind: 'edges',
          data: [
            ...edmontonStoreAdministrationEdges,
            ...calgaryStoreAdministrationEdges,
            ...vancouverStoreAdministrationEdges,
          ],
        },
      });
    }
 */
