import {
  Divider,
  Grid,
  Group,
  Loader,
  LoadingOverlay,
  ScrollArea,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { InvalidTokenError } from 'jwt-decode';
import localforage from 'localforage';
import { ChangeEvent, CSSProperties, useEffect, useReducer } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { Edge, Node } from 'reactflow';

import {
  COLORS_SWATCHES,
  DEPARTMENT_JOB_POSITION_MAP,
  PROPERTY_DESCRIPTOR,
} from '../../constants/data';
import { globalAction } from '../../context/globalProvider/state';
import { useAuth, useGlobalState } from '../../hooks';
import {
  returnAccessibleSelectInputElements,
  returnAccessibleSliderInputElements,
} from '../../jsxCreators';
import {
  Department,
  JobPosition,
  SelectInputData,
  StoreLocation,
} from '../../types';
import {
  groupByField,
  logState,
  returnThemeColors,
  urlBuilder,
} from '../../utils';
import CarouselBuilder from '../carouselBuilder/CarouselBuilder';
import { ChartsAndGraphsControlsStacker } from '../charts/utils';
import GraphBuilderWrapper from '../graphBuilder/GraphBuilder';
import {
  AccessibleSelectInputCreatorInfo,
  AccessibleSliderInputCreatorInfo,
} from '../wrappers';
import {
  DAGRE_LAYOUT_RANKALIGN_SELECT_OPTIONS,
  DAGRE_LAYOUT_RANKDIR_SELECT_OPTIONS,
  DAGRE_LAYOUT_RANKER_SELECT_OPTIONS,
  DIRECTORY_DEPARTMENT_SELECT_OPTIONS,
  DIRECTORY_JOB_POSITION_SELECT_OPTIONS,
  DIRECTORY_STORE_LOCATION_SELECT_OPTIONS,
} from './constants';
import {
  directoryAction,
  directoryReducer,
  initialDirectoryState,
} from './state';
import {
  CorporateDepartmentsProfileNodesObject,
  DagreRankAlign,
  DagreRankDir,
  DagreRankerAlgorithm,
  DepartmentsWithDefaultKey,
  DirectoryUserDocument,
  JobPositionsWithDefaultKey,
  StoreDepartmentsProfileNodesObject,
  StoreLocationsWithDefaultKey,
} from './types';
import {
  returnDagreLayoutedElements,
  returnDirectoryProfileCard,
} from './utils';

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

    triggerFetchUsersDirectory,
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

    isLoading,
    isSubmitting,
    isSuccessfull,
    loadingMessage,
    submitMessage,
    successMessage,
  } = directoryState;

  const {
    authState: { accessToken, isAccessTokenExpired },
  } = useAuth();

  const {
    globalDispatch,
    globalState: { padding, rowGap, width, themeObject },
  } = useGlobalState();
  const { colorScheme } = themeObject;

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end hooks ━┛

  useEffect(() => {
    if (isAccessTokenExpired) {
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    async function fetchUsers(): Promise<void> {
      directoryDispatch({
        type: directoryAction.setIsLoading,
        payload: true,
      });
      directoryDispatch({
        type: directoryAction.setLoadingMessage,
        payload: 'Fetching users directory ...',
      });

      const url: URL = urlBuilder({
        path: 'user/directory',
      });

      const request: Request = new Request(url.toString(), {
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

        if (!response.ok) {
          throw new Error(data.message);
        }

        // set data to local forage to prevent refetches on every refresh
        await localforage.setItem<DirectoryUserDocument[]>(
          'directory',
          data.resourceData
        );

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
        if (!isMounted || error.name === 'AbortError') {
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
              navigate('/home/directory');

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
        directoryDispatch({
          type: directoryAction.triggerFetchUsersDirectory,
          payload: false,
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

    if (triggerFetchUsersDirectory) {
      checkLocalForageBeforeFetch();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [triggerFetchUsersDirectory, isAccessTokenExpired]);

  // on every mount, check if there are directory docs in local forage
  useEffect(() => {
    let isMounted = true;

    async function checkLocalForageForDirectoryDocs(): Promise<void> {
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

    checkLocalForageForDirectoryDocs();

    return () => {
      isMounted = false;
    };
  }, []);

  // ┏━ begin defaults ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const {
    directoryGraphThemeColors: {
      nodeBackgroundColor,
      nodeBorderColor,
      nodeTextColor,
      edgeStrokeColor,
    },
    generalColors: { lightSchemeGray },
    scrollBarStyle,
    tablesThemeColors: { tableHeadersBgColor: sectionHeadersBgColor },
    appThemeColors: { backgroundColor, borderColor },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const nodePosition = { x: 0, y: 0 };
  const nodeDimensions = { width: 371, height: 267 };
  const nodeDefaults: Node = {
    // will be overwritten
    id: '',
    position: { ...nodePosition },
    data: { label: '' },
    // defaults shared across all nodes
    style: {
      ...nodeDimensions,
      backgroundColor: nodeBackgroundColor,
      border: nodeBorderColor,
    },
  };
  const edgeDefaults: Edge = {
    // will be overwritten
    id: '',
    source: '',
    target: '',
    // defaults shared across all edges
    type: 'smoothstep',
    animated: true,
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: 'white' },
    labelStyle: { fill: 'black', fontWeight: 700 },
    style: { stroke: edgeStrokeColor },
  };

  const profileCardStyles: CSSProperties = {
    backgroundColor: nodeBackgroundColor,
    border: nodeBorderColor,
    color: nodeTextColor,
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end defaults ━┛

  // ┏━ begin main node & edges effect ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  useEffect(() => {
    let isMounted = true;

    if (!Object.keys(groupedByDepartment).length) {
      return;
    }

    // ┏━ begin executive management ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setExecutiveManagementEdgesAndNodes() {
      const executiveManagementDocs =
        groupedByDepartment['Executive Management'] ?? [];

      console.log('executiveManagementDocs: ', executiveManagementDocs);

      const executiveManagementDocsNodes = executiveManagementDocs.reduce(
        (
          executiveManagementNodesAcc: Node[],
          userDocument: DirectoryUserDocument
        ) => {
          const { jobPosition, preferredName } = userDocument;

          const executiveManagementProfileCard = returnDirectoryProfileCard({
            userDocument,
            padding,
            rowGap,
            style: profileCardStyles,
          });

          const nodeType =
            jobPosition === 'Chief Executive Officer' ? 'input' : 'default';

          const executiveManagementCarousel = (
            <CarouselBuilder
              slideDimensions={nodeDimensions}
              slides={[executiveManagementProfileCard]}
            />
          );

          const executiveManagementNode: Node = {
            ...nodeDefaults,
            id: jobPosition,
            type: nodeType,
            data: { label: executiveManagementCarousel },
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
          const { jobPosition } = userDocument;

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

      console.log(
        'storeAdministrationDocsGroupedByStoreLocation: ',
        storeAdministrationDocsGroupedByStoreLocation
      );

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

            storeAdministrationDocsGroupedByStoreLocationFilteredAcc[
              storeLocation
            ] = filteredStoreAdministrationDocsArr;

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

                const displayProfileCard = returnDirectoryProfileCard({
                  userDocument,
                  padding,
                  rowGap,
                  style: profileCardStyles,
                });

                // grab the array of profile cards for the job position if it exists, otherwise initialize an empty array
                const value = [
                  ...(jobPositionsProfileNodesObjAcc[jobPosition] ?? []),
                  displayProfileCard,
                ] as React.JSX.Element[];

                // add job position field
                jobPositionsProfileNodesObjAcc[jobPosition] = value;

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
                <CarouselBuilder
                  slideDimensions={nodeDimensions}
                  slides={profileCards}
                />
              );

              // create profile node with carousel
              const groupedStoreAdministrationByStoreLocationProfileNode: Node =
                {
                  ...nodeDefaults,
                  id: `${storeLocation}-${jobPosition}`,
                  type: 'default',
                  data: {
                    label: groupedStoreAdministrationByStoreLocationCarousel,
                  },
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

                const displayProfileCard = returnDirectoryProfileCard({
                  userDocument,
                  padding,
                  rowGap,
                  style: profileCardStyles,
                });

                // grab the array of profile cards for the job position if it exists, otherwise initialize an empty array
                const value = [
                  ...(jobPositionsProfileNodesObjAcc[jobPosition] ?? []),
                  displayProfileCard,
                ] as React.JSX.Element[];

                // add job position field
                jobPositionsProfileNodesObjAcc[jobPosition] = value;

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
                <CarouselBuilder
                  slideDimensions={nodeDimensions}
                  slides={profileCards}
                />
              );

              // create profile node with carousel
              const groupedOfficeAdministrationByStoreLocationProfileNode: Node =
                {
                  ...nodeDefaults,
                  id: `${storeLocation}-${jobPosition}`,
                  type: nodeType,
                  data: {
                    label: groupedOfficeAdministrationByStoreLocationCarousel,
                  },
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

    // ┏━ begin corporate departments ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    async function setCorporateDepartmentsEdgesAndNodes() {
      // consolidates logic to set following corporate departments' edges and nodes which were previously set individually and contained duplicate code
      // possible only because the org hierarchy and job positions naming scheme are consistent (superiors contain '... manager', and only one subordinate level)

      // required to link officers to their respective departments' managers
      const CORPORATE_DEPARTMENTS_OFFICER_TUPLE = [
        ['Accounting', 'Chief Financial Officer'],
        ['Human Resources', 'Chief Human Resources Officer'],
        ['Sales', 'Chief Sales Officer'],
        ['Marketing', 'Chief Marketing Officer'],
        ['Information Technology', 'Chief Technology Officer'],
      ] as const;

      const [
        corporateDepartmentsProfileNodesObject,
        corporateDepartmentsEdgesObject,
      ] = CORPORATE_DEPARTMENTS_OFFICER_TUPLE.reduce(
        (
          corporateDepartmentsEdgesAndNodesObjectAcc: [
            Record<Department, CorporateDepartmentsProfileNodesObject>,
            Record<Department, Edge[]>
          ],
          corporateDepartmentOfficerTuple
        ) => {
          const [
            corporateDepartmentsProfileNodesObjectAcc,
            corporateDepartmentsEdgesObjAcc,
          ] = corporateDepartmentsEdgesAndNodesObjectAcc;

          const [corporateDepartment, officerJobPosition] =
            corporateDepartmentOfficerTuple as [Department, JobPosition];

          const corporateDepartmentDocs =
            groupedByDepartment[corporateDepartment] ?? [];

          // ╭───────────────────────────────────────────────────────────────╮
          //   nodes creation
          // ╰───────────────────────────────────────────────────────────────╯
          // group by job positions
          const corporateDepartmentDocsGroupedByJobPosition: Record<
            JobPosition,
            DirectoryUserDocument[]
          > = groupByField<DirectoryUserDocument>({
            objectArray: corporateDepartmentDocs,
            field: 'jobPosition',
          });

          // using the created object structure, create profile nodes
          const jobPositionsProfileNodes = Object.entries(
            corporateDepartmentDocsGroupedByJobPosition
          ).reduce(
            (
              jobPositionsProfileNodesAcc: CorporateDepartmentsProfileNodesObject,
              corporateDepartmentGroupedDocsTuple
            ) => {
              const [jobPosition, groupedCorporateDepartmentByJobPositionArr] =
                corporateDepartmentGroupedDocsTuple as [
                  JobPosition,
                  DirectoryUserDocument[]
                ];

              // create profile cards for each grouped doc
              const profileCards =
                groupedCorporateDepartmentByJobPositionArr.map(
                  (userDocument: DirectoryUserDocument) => {
                    const displayProfileCard = returnDirectoryProfileCard({
                      userDocument,
                      padding,
                      rowGap,
                      style: profileCardStyles,
                    });

                    return displayProfileCard;
                  }
                );

              const groupedCorporateDepartmentByJobPositionCarousel = (
                <CarouselBuilder
                  slideDimensions={nodeDimensions}
                  slides={profileCards}
                />
              );

              const nodeType = jobPosition.toLowerCase().includes('manager')
                ? 'default'
                : 'output';

              // create profile node with carousel
              const groupedCorporateDepartmentByJobPositionProfileNode: Node = {
                ...nodeDefaults,
                id: jobPosition,
                type: nodeType,
                data: {
                  label: groupedCorporateDepartmentByJobPositionCarousel,
                },
              };

              // add job position field with profile node
              jobPositionsProfileNodesAcc[jobPosition] =
                groupedCorporateDepartmentByJobPositionProfileNode;

              return jobPositionsProfileNodesAcc;
            },
            Object.create(null)
          );

          corporateDepartmentsProfileNodesObjectAcc[corporateDepartment] =
            jobPositionsProfileNodes;

          // ╭───────────────────────────────────────────────────────────────╮
          //   edges creation
          // ╰───────────────────────────────────────────────────────────────╯
          // find the corporate department manager profile node id
          const corporateDepartmentManagerId =
            Object.entries(jobPositionsProfileNodes).find(
              (jobPositionAndProfileNodeTuple) => {
                const [jobPosition, _profileNode] =
                  jobPositionAndProfileNodeTuple as [JobPosition, Node];

                return jobPosition.toLowerCase().includes('manager');
              }
            )?.[1].id ?? '';

          // connect officer to corporate department manager
          // [OFFICER] ━━━ [... MANAGER]
          const officerToCorporateDepartmentManagerEdge: Edge = {
            ...edgeDefaults,
            id: `${officerJobPosition}-${corporateDepartmentManagerId}`, // source-target
            source: officerJobPosition,
            target: corporateDepartmentManagerId,
          };

          const corporateDepartmentsEdges = Object.entries(
            jobPositionsProfileNodes
          ).reduce(
            (
              corporateDepartmentsEdgesAcc: Edge[],
              jobPositionAndProfileNode
            ) => {
              const [jobPosition, profileNode] = jobPositionAndProfileNode as [
                JobPosition,
                Node
              ];

              // ignore manager as it is already connected to officer
              if (jobPosition.toLowerCase().includes('manager')) {
                return corporateDepartmentsEdgesAcc;
              }

              // connect employees to corporate department manager
              //                              ┏━ [EMPLOYEE]
              // [OFFICER] ━━━ [... MANAGER] ━━━ [EMPLOYEE]
              //                              ┗━ [EMPLOYEE]
              const corporateDepartmentEmployeeProfileEdge: Edge = {
                ...edgeDefaults,
                id: `${corporateDepartmentManagerId}-${profileNode.id}`, // source-target
                source: corporateDepartmentManagerId,
                target: profileNode.id,
              };

              corporateDepartmentsEdgesAcc.push(
                corporateDepartmentEmployeeProfileEdge
              );

              return corporateDepartmentsEdgesAcc;
            },
            [officerToCorporateDepartmentManagerEdge]
          );

          corporateDepartmentsEdgesObjAcc[corporateDepartment] =
            corporateDepartmentsEdges;

          return corporateDepartmentsEdgesAndNodesObjectAcc;
        },
        [Object.create(null), Object.create(null)]
      );

      // set corporate departments' nodes and dispatch
      Object.entries(corporateDepartmentsProfileNodesObject).forEach(
        (corporateDepartmentAndProfileNodesTuple) => {
          const [corporateDepartment, profileNodes] =
            corporateDepartmentAndProfileNodesTuple as [
              Department,
              CorporateDepartmentsProfileNodesObject
            ];

          const corporateDepartmentProfileNodes = Object.entries(
            profileNodes
          ).map((jobPositionAndProfileNodeTuple) => {
            const [_jobPosition, profileNode] =
              jobPositionAndProfileNodeTuple as [JobPosition, Node];

            return profileNode;
          });

          directoryDispatch({
            type: directoryAction.setDepartmentsNodesAndEdges,
            payload: {
              department: corporateDepartment,
              kind: 'nodes',
              data: corporateDepartmentProfileNodes,
            },
          });
        }
      );

      // set corporate departments' edges and dispatch
      Object.entries(corporateDepartmentsEdgesObject).forEach(
        (corporateDepartmentAndEdgesTuple) => {
          const [corporateDepartment, edges] =
            corporateDepartmentAndEdgesTuple as [Department, Edge[]];

          directoryDispatch({
            type: directoryAction.setDepartmentsNodesAndEdges,
            payload: {
              department: corporateDepartment,
              kind: 'edges',
              data: edges,
            },
          });
        }
      );
    }
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end corporate departments ━┛

    // ┏━ begin store departments ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    // akin to corporate, consolidates logic to set following store departments' edges and nodes which were previously set individually and contained duplicate code
    // possible only because the org hierarchy and job positions naming scheme are consistent (superiors contain '... supervisor', and only one subordinate level)
    async function setStoreDepartmentsEdgesAndNodes() {
      const STORE_DEPARTMENTS: Department[] = [
        'Repair Technicians',
        'Field Service Technicians',
        'Logistics and Inventory',
        'Customer Service',
        'Maintenance',
      ];

      const storeDepartmentsNodesObject = STORE_DEPARTMENTS.reduce(
        (
          storeDepartmentsNodesObjectAcc: Record<
            Department,
            StoreDepartmentsProfileNodesObject
          >,
          department: Department
        ) => {
          const departmentDocs = groupedByDepartment[department] ?? [];

          // group by store locations
          const departmentDocsGroupedByStoreLocation: Record<
            StoreLocation,
            DirectoryUserDocument[]
          > = groupByField<DirectoryUserDocument>({
            objectArray: departmentDocs,
            field: 'storeLocation',
          });

          // using the created object structure, create profile nodes
          const departmentProfileNodesObject = Object.entries(
            departmentDocsGroupedByStoreLocation
          ).reduce(
            (
              departmentProfileNodesObjectAcc: StoreDepartmentsProfileNodesObject,
              departmentGroupedDocsTuple
            ) => {
              const [storeLocation, groupedDepartmentByStoreLocationsArr] =
                departmentGroupedDocsTuple as [
                  StoreLocation,
                  DirectoryUserDocument[]
                ];

              // create store location field
              Object.defineProperty(
                departmentProfileNodesObjectAcc,
                storeLocation,
                {
                  ...PROPERTY_DESCRIPTOR,
                  value: Object.create(null),
                }
              );

              // iterate through docs for each store location and create profile cards for each job position
              const jobPositionsProfileNodesObj =
                groupedDepartmentByStoreLocationsArr.reduce(
                  (
                    jobPositionsProfileNodesObjAcc: Record<
                      JobPosition,
                      React.JSX.Element[]
                    >,
                    userDocument: DirectoryUserDocument
                  ) => {
                    const { jobPosition } = userDocument;

                    const displayProfileCard = returnDirectoryProfileCard({
                      userDocument,
                      padding,
                      rowGap,
                      style: profileCardStyles,
                    });

                    // grab the array of profile cards for the job position if it exists, otherwise initialize an empty array
                    const value = [
                      ...(jobPositionsProfileNodesObjAcc[jobPosition] ?? []),
                      displayProfileCard,
                    ] as React.JSX.Element[];

                    // add job position field
                    jobPositionsProfileNodesObjAcc[jobPosition] = value;

                    return jobPositionsProfileNodesObjAcc;
                  },
                  Object.create(null)
                );

              // for each job position, create a single profile node that will hold a carousel of created profile cards
              Object.entries(jobPositionsProfileNodesObj).forEach(
                (jobPositionGroupedDepartmentTuple) => {
                  const [
                    jobPosition,
                    groupedDepartmentEmployeesForJobPosition,
                  ] = jobPositionGroupedDepartmentTuple as [
                    JobPosition,
                    React.JSX.Element[]
                  ];

                  // create a carousel from said profile cards
                  const groupedDepartmentEmployeesForJobPositionProfileCarousel =
                    (
                      <CarouselBuilder
                        slides={groupedDepartmentEmployeesForJobPosition}
                        slideDimensions={nodeDimensions}
                      />
                    );

                  const nodeType = jobPosition
                    .toLowerCase()
                    .includes('supervisor')
                    ? 'default'
                    : 'output';

                  // create profile node with carousel
                  const groupedDepartmentEmployeesForJobPositionProfileNode: Node =
                    {
                      ...nodeDefaults,
                      id: `${storeLocation}-${jobPosition}`,
                      type: nodeType,
                      data: {
                        label:
                          groupedDepartmentEmployeesForJobPositionProfileCarousel,
                      },
                    };

                  // add job position field with profile node
                  Object.defineProperty(
                    departmentProfileNodesObjectAcc[storeLocation],
                    jobPosition,
                    {
                      ...PROPERTY_DESCRIPTOR,
                      value:
                        groupedDepartmentEmployeesForJobPositionProfileNode,
                    }
                  );

                  return departmentProfileNodesObjectAcc;
                },
                Object.create(null)
              );

              return departmentProfileNodesObjectAcc;
            },
            Object.create(null)
          );

          // set department profile nodes to store departments nodes accumulator
          storeDepartmentsNodesObjectAcc[department] =
            departmentProfileNodesObject;

          return storeDepartmentsNodesObjectAcc;
        },
        Object.create(null)
      );

      // create edges
      const storeDepartmentsEdgesObject = Object.entries(
        storeDepartmentsNodesObject
      ).reduce(
        (
          storeDepartmentsEdgesObjectAcc: Record<Department, Edge[]>,
          departmentAndStoreLocationsProfileNodesTuple
        ) => {
          const [department, storeLocationsProfileNodesObj] =
            departmentAndStoreLocationsProfileNodesTuple as [
              Department,
              StoreDepartmentsProfileNodesObject
            ];

          Object.entries(storeLocationsProfileNodesObj).forEach(
            (storeLocationAndJobPositionProfileNodesTuple) => {
              const [storeLocation, jobPositionsProfileNodesObj] =
                storeLocationAndJobPositionProfileNodesTuple as [
                  StoreLocation,
                  Record<JobPosition, Node>
                ];

              // shift supervisor is superior of all department supervisors
              const shiftSupervisorProfileNodeId = `${storeLocation}-Shift Supervisor`;

              // find the department supervisor profile node id for the store location
              const departmentSupervisorProfileNodeId =
                Object.entries(jobPositionsProfileNodesObj).find(
                  (jobPositionProfileNodeTuple) => {
                    const [jobPosition, _profileNode] =
                      jobPositionProfileNodeTuple as [JobPosition, Node];

                    return jobPosition.toLowerCase().includes('supervisor');
                  }
                )?.[1].id ?? '';

              // connect shift supervisor to department supervisor
              // [SHIFT SUPERVISOR] ━━━ [DEPARTMENT SUPERVISOR]
              const shiftSupervisorToDepartmentSupervisorEdge: Edge = {
                ...edgeDefaults,
                id: `${shiftSupervisorProfileNodeId}-${departmentSupervisorProfileNodeId}`, // source-target
                source: shiftSupervisorProfileNodeId,
                target: departmentSupervisorProfileNodeId,
              };

              // connect department employees to department supervisor
              //                          ┏━ [DEPARTMENT EMPLOYEE]
              // [DEPARTMENT SUPERVISOR] ━━━ [DEPARTMENT EMPLOYEE]
              //                          ┗━ [DEPARTMENT EMPLOYEE]

              const departmentEmployeesProfileEdges = Object.entries(
                jobPositionsProfileNodesObj
              ).reduce(
                (
                  departmentEmployeesProfileEdgesAcc: Edge[],
                  jobPositionProfileNodesTuple
                ) => {
                  const [jobPosition, departmentProfileNode] =
                    jobPositionProfileNodesTuple as [JobPosition, Node];

                  // ignore supervisors
                  if (jobPosition.toLowerCase().includes('supervisor')) {
                    return departmentEmployeesProfileEdgesAcc;
                  }

                  const departmentSubordinateProfileEdge: Edge = {
                    ...edgeDefaults,
                    id: `${departmentSupervisorProfileNodeId}-${departmentProfileNode.id}`, // source-target
                    source: departmentSupervisorProfileNodeId,
                    target: departmentProfileNode.id,
                  };

                  departmentEmployeesProfileEdgesAcc.push(
                    departmentSubordinateProfileEdge
                  );

                  return departmentEmployeesProfileEdgesAcc;
                },
                [shiftSupervisorToDepartmentSupervisorEdge]
              );

              // add department employees edges to store departments edges accumulator
              const prevDepartmentEdges =
                storeDepartmentsEdgesObjectAcc[department] ?? [];
              const newDepartmentEdges = [
                ...prevDepartmentEdges,
                ...departmentEmployeesProfileEdges,
              ] as Edge[];

              storeDepartmentsEdgesObjectAcc[department] = newDepartmentEdges;
            }
          );

          return storeDepartmentsEdgesObjectAcc;
        },
        Object.create(null)
      );

      // iterate through store departments node and dispatch each department's nodes
      Object.entries(storeDepartmentsNodesObject).forEach(
        (departmentAndStoreLocationsProfileNodesTuple) => {
          const [department, storeLocationsProfileNodesObj] =
            departmentAndStoreLocationsProfileNodesTuple as [
              Department,
              StoreDepartmentsProfileNodesObject
            ];

          const allStoreLocationsProfileNodesForDepartment = Object.values(
            storeLocationsProfileNodesObj
          ).reduce(
            (
              allStoreLocationsProfileNodesForDepartmentAcc: Node[],
              storeLocationProfileNodesObj: Record<JobPosition, Node>
            ) => {
              const storeLocationProfileNodes = Object.values(
                storeLocationProfileNodesObj
              );

              allStoreLocationsProfileNodesForDepartmentAcc.push(
                ...storeLocationProfileNodes
              );

              return allStoreLocationsProfileNodesForDepartmentAcc;
            },
            []
          );

          directoryDispatch({
            type: directoryAction.setDepartmentsNodesAndEdges,
            payload: {
              department,
              kind: 'nodes',
              data: allStoreLocationsProfileNodesForDepartment,
            },
          });
        }
      );

      // iterate through store departments edges and dispatch each department's edges
      Object.entries(storeDepartmentsEdgesObject).forEach(
        (departmentAndStoreLocationsProfileEdgesTuple) => {
          const [department, storeLocationsProfileEdges] =
            departmentAndStoreLocationsProfileEdgesTuple as [
              Department,
              Edge[]
            ];

          directoryDispatch({
            type: directoryAction.setDepartmentsNodesAndEdges,
            payload: {
              department,
              kind: 'edges',
              data: storeLocationsProfileEdges,
            },
          });
        }
      );
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end store departments ━┛

    // ┏━ begin concurrent fn calls ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    // utilizes the micro-task queue for performance
    async function triggerDepartmentNodesAndEdgesCreation() {
      directoryDispatch({
        type: directoryAction.setIsLoading,
        payload: true,
      });
      directoryDispatch({
        type: directoryAction.setLoadingMessage,
        payload: `Creating directed graphs for ${filterByDepartment}...`,
      });

      try {
        await Promise.all([
          setExecutiveManagementEdgesAndNodes(),
          setCorporateDepartmentsEdgesAndNodes(),

          setStoreAdministrationEdgesAndNodes(),
          setOfficeAdministrationEdgesAndNodes(),
          setStoreDepartmentsEdgesAndNodes(),
        ]);
      } catch (error: any) {
        if (!isMounted) {
          return;
        }

        const errorMessage =
          error.message ?? 'Unknown error occured. Please try again.';

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate('/home/directory');

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

    triggerDepartmentNodesAndEdgesCreation();

    return () => {
      isMounted = false;
    };
  }, [
    triggerSetDepartmentsNodesAndEdges,
    dagreMinLen,
    dagreNodeSep,
    dagreRankAlign,
    dagreRankDir,
    dagreRankSep,
    dagreRanker,
    colorScheme,
  ]);
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end concurrent fn calls ━┛

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

    // if there is a specific filter by department term, set nodes and edges from that filteredDepartmentNodesAndEdges state
    if (filterByDepartment !== 'All Departments') {
      return;
    }

    // updates all departments nodes and edges when no specific filter terms are present
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
        align: dagreRankAlign === 'undefined' ? void 0 : dagreRankAlign,
        nodesep: dagreNodeSep,
        ranksep: dagreRankSep,
        ranker: dagreRanker,
        minlen: dagreMinLen,
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
    departmentsNodesAndEdges,
    triggerSetLayoutedNodesAndEdges,
    filterByDepartment,
    // colorScheme,
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
        align: dagreRankAlign === 'undefined' ? void 0 : dagreRankAlign,
        nodesep: dagreNodeSep,
        ranksep: dagreRankSep,
        ranker: dagreRanker,
        minlen: dagreMinLen,
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
        align: dagreRankAlign === 'undefined' ? void 0 : dagreRankAlign,
        nodesep: dagreNodeSep,
        ranksep: dagreRankSep,
        ranker: dagreRanker,
        minlen: dagreMinLen,
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
        align: dagreRankAlign === 'undefined' ? void 0 : dagreRankAlign,
        nodesep: dagreNodeSep,
        ranksep: dagreRankSep,
        ranker: dagreRanker,
        minlen: dagreMinLen,
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
      description: '',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        directoryDispatch({
          type: directoryAction.setFilterByDepartment,
          payload: event.currentTarget.value as DepartmentsWithDefaultKey,
        });
      },
      value: filterByDepartment,
      label: '',
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
      description: '',
      disabled: filterByDepartment === 'All Departments',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        directoryDispatch({
          type: directoryAction.setFilterByJobPosition,
          payload: event.currentTarget.value as JobPositionsWithDefaultKey,
        });
      },
      value: filterByJobPosition,
      label: '',
    };

  const isFilterByStoreLocationSelectDisabled = [
    'All Departments',
    'Executive Management',
    'Accounting',
    'Human Resources',
    'Sales',
    'Marketing',
    'Information Technology',
  ].includes(filterByDepartment);

  const filterByStoreLocationSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: DIRECTORY_STORE_LOCATION_SELECT_OPTIONS,
      disabled: isFilterByStoreLocationSelectDisabled,
      description: '',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        directoryDispatch({
          type: directoryAction.setFilterByStoreLocation,
          payload: event.currentTarget.value as StoreLocationsWithDefaultKey,
        });
      },
      value: filterByStoreLocation,
      label: '',
    };

  // sliders
  const sliderWidth =
    width < 480
      ? '217px'
      : width < 768
      ? `${width * 0.38}px`
      : width < 1192
      ? '500px'
      : width < 1600
      ? `${width * 0.38}px`
      : '330px';
  const { gray } = COLORS_SWATCHES;
  const sliderLabelColor = gray[3];

  const dagreNodeSepSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    kind: 'slider',
    ariaLabel: 'node separation',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
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
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
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
    label: (value) => <Text style={{ color: sliderLabelColor }}>{value}</Text>,
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
    sliderDefaultValue: 2,
    width: sliderWidth,
  };

  const dagreRankDirSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: DAGRE_LAYOUT_RANKDIR_SELECT_OPTIONS,
    description: '',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      directoryDispatch({
        type: directoryAction.setDagreRankDir,
        payload: event.currentTarget.value as DagreRankDir,
      });
    },
    value: dagreRankDir,
    label: 'Select Rank Direction',
  };

  const dagreRankAlignSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: DAGRE_LAYOUT_RANKALIGN_SELECT_OPTIONS,
      description: '',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        directoryDispatch({
          type: directoryAction.setDagreRankAlign,
          payload: event.currentTarget.value as DagreRankAlign,
        });
      },
      value: dagreRankAlign,
      label: 'Select Rank Alignment',
    };

  const dagreRankerSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: DAGRE_LAYOUT_RANKER_SELECT_OPTIONS,
    description: '',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      directoryDispatch({
        type: directoryAction.setDagreRanker,
        payload: event.currentTarget.value as DagreRankerAlgorithm,
      });
    },
    value: dagreRanker,
    label: 'Select Ranker Algorithm',
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
  ] = returnAccessibleSliderInputElements([
    dagreNodeSepSliderInputCreatorInfo,
    dagreRankSepSliderInputCreatorInfo,
    dagreMinLenSliderInputCreatorInfo,
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

  // filter section
  const displayFilterGraphsText = (
    <Group
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
    >
      <Title order={5}>Graph Filters</Title>
    </Group>
  );

  const displayFilterByDepartmentSelectInput = (
    <ChartsAndGraphsControlsStacker
      input={createdFilterByDepartmentSelectInputElements}
      label="Filter by department"
      value={filterByDepartment}
      symbol=""
    />
  );

  const displayFilterByJobPositionSelectInput = (
    <ChartsAndGraphsControlsStacker
      input={createdFilterByJobPositionSelectInputElements}
      label="Filter by job position"
      value={
        filterByDepartment === 'All Departments'
          ? 'Not applicable'
          : filterByJobPosition
      }
      symbol=""
    />
  );

  const displayFilterByStoreLocationSelectInput = (
    <ChartsAndGraphsControlsStacker
      input={createdFilterByStoreLocationSelectInputElements}
      label="Filter by store location"
      value={
        isFilterByStoreLocationSelectDisabled
          ? 'Not applicable'
          : filterByStoreLocation
      }
      symbol=""
    />
  );

  const displayFilterSelectsSection = (
    <Stack w="100%">
      {displayFilterGraphsText}
      {displayFilterByDepartmentSelectInput}
      {displayFilterByJobPositionSelectInput}
      {displayFilterByStoreLocationSelectInput}
    </Stack>
  );

  // dagre layout section
  const displayDagreLayoutText = (
    <Group
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
    >
      <Title order={5}>Graph Layouts</Title>
    </Group>
  );

  const displayDagreNodeSepSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdDagreNodeSepSliderInput}
      label="Node Separation"
      value={dagreNodeSep}
      symbol="px"
    />
  );

  const displayDagreRankSepSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdDagreRankSepSliderInput}
      label="Rank Separation"
      value={dagreRankSep}
      symbol="px"
    />
  );

  const displayDagreMinLenSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdDagreMinLenSliderInput}
      label="Min Length"
      value={dagreMinLen}
      symbol=""
    />
  );

  const displayDagreRankDirSelectInput = (
    <ChartsAndGraphsControlsStacker
      input={createdDagreRankDirSelectInput}
      label="Rank Direction"
      value={dagreRankDir}
      symbol=""
    />
  );

  const displayDagreRankAlignSelectInput = (
    <ChartsAndGraphsControlsStacker
      input={createdDagreRankAlignSelectInput}
      label="Rank Alignment"
      value={dagreRankAlign === 'undefined' ? 'Default' : dagreRankAlign}
      symbol=""
    />
  );

  const displayDagreRankerSelectInput = (
    <ChartsAndGraphsControlsStacker
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
      {displayDagreLayoutText}
      {displayDagreLayoutSelectsSection}
      {displayDagreLayoutSlidersSection}
    </Stack>
  );

  const displayGraphControls = (
    <ScrollArea type="hover" styles={() => scrollBarStyle} offsetScrollbars>
      <Stack h={width < 1600 ? '38vh' : '75vh'} p={padding}>
        {displayFilterSelectsSection}
        {displayDagreLayoutSection}
      </Stack>
    </ScrollArea>
  );

  const displayGraphViewport = (
    <GraphBuilderWrapper
      layoutedNodes={layoutedNodes}
      layoutedEdges={layoutedEdges}
    />
  );

  const displayLoadingOverlay = (
    <LoadingOverlay
      loader={
        <Stack align="center">
          <Text>{loadingMessage}</Text>
          <Loader />
        </Stack>
      }
      overlayBlur={3}
      overlayOpacity={1}
      radius={4}
      visible={isLoading}
      zIndex={500}
    />
  );

  const displayLayoutAndGraph = (
    <Grid
      columns={width < 1600 ? 1 : 12}
      w="100%"
      h="75vh"
      gutter={rowGap}
      style={{ position: 'relative' }}
      py={padding}
    >
      <Grid.Col span={width < 1600 ? 1 : 4} h={width < 1600 ? '38vh' : '75vh'}>
        {displayGraphControls}
      </Grid.Col>

      {width < 1600 ? (
        <Grid.Col span={1} p={padding}>
          <Space h={rowGap} />
          <Divider w="100%" size="md" />
        </Grid.Col>
      ) : null}

      <Grid.Col span={width < 1600 ? 1 : 8} h="100%" p={padding}>
        {width < 1600 ? <Space h={rowGap} /> : null}
        {displayLoadingOverlay}
        {displayGraphViewport}
      </Grid.Col>
    </Grid>
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end input display ━┛
  return <Stack w="100%">{displayLayoutAndGraph}</Stack>;
}

export default Directory;
