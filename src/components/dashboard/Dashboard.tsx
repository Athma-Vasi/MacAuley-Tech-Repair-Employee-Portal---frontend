import {
  Button,
  Card,
  Flex,
  Group,
  Loader,
  LoadingOverlay,
  ScrollArea,
  Stack,
  Text,
  Title,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { InvalidTokenError } from 'jwt-decode';
import React, { ReactNode, useEffect, useReducer } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { MdSafetyDivider } from 'react-icons/md';
import {
  TbAddressBook,
  TbCalendarEvent,
  TbCalendarPin,
  TbCashBanknote,
  TbChartArcs,
  TbChartArcs3,
  TbChartBar,
  TbChartPie4,
  TbCircleArrowUp,
  TbCircleArrowUpRight,
  TbGift,
  TbPrinter,
  TbPrinterOff,
  TbReceipt2,
  TbTimelineEventPlus,
  TbUserCheck,
} from 'react-icons/tb';
import { TiThumbsUp } from 'react-icons/ti';
import { useLocation, useNavigate } from 'react-router-dom';

import { COLORS_SWATCHES } from '../../constants/data';
import { globalAction } from '../../context/globalProvider/state';
import { useGlobalState } from '../../hooks';
import { useAuth } from '../../hooks/useAuth';
import {
  returnAccessibleButtonElements,
  returnAccessibleImageElements,
  returnScrollableDocumentInfo,
} from '../../jsxCreators';
import {
  ActionsResourceRequestServerResponse,
  UserDocument,
} from '../../types';
import {
  formatDate,
  logState,
  replaceLastCommaWithAnd,
  returnElapsedTime,
  returnThemeColors,
  returnTimeRemaining,
} from '../../utils';
import CarouselBuilder from '../carouselBuilder/CarouselBuilder';
import DisplayResourceHeader from '../displayResourceHeader/DisplayResourceHeader';
import {
  dashboardAction,
  dashboardReducer,
  initialDashboardState,
} from './state';

function Dashboard() {
  const [dashboardState, dashboardDispatch] = useReducer(
    dashboardReducer,
    initialDashboardState
  );
  const {
    successMessage,
    submitMessage,
    loadingMessage,
    isSuccessful,
    isSubmitting,
    isLoading,
    triggerFetchActionsDocuments,
  } = dashboardState;

  const {
    authState: {
      accessToken,
      isAccessTokenExpired,
      roles,
      userId,
      username,
      isLoggedIn,
    },
  } = useAuth();

  const {
    globalDispatch,
    globalState: {
      padding,
      width,
      themeObject,
      rowGap,
      actionsDocuments,
      userDocument,
    },
  } = useGlobalState();

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    if (isAccessTokenExpired) {
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    async function fetchActionsDocuments() {
      dashboardDispatch({
        type: dashboardAction.setIsLoading,
        payload: true,
      });
      dashboardDispatch({
        type: dashboardAction.setLoadingMessage,
        payload: 'Fetching recent company, general and outreach documents...',
      });

      const url: URL = new URL(
        `http://localhost:5500/api/v1/actions/home${
          roles.includes('Employee') ? `${userId}/` : ''
        }?&newQueryFlag=true&limit=5&totalDocuments=0`
      );
      // const url: URL = roles.includes('Employee')
      //   ? new URL(
      //       `http://localhost:5500/api/v1/actions/dashboard/${userId}/?&newQueryFlag=true&limit=5&totalDocuments=0`
      //     )
      //   : new URL(
      //       'http://localhost:5500/api/v1/actions/dashboard?&limit=5&totalDocuments=0'
      //     );

      const request: Request = new Request(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        signal: controller.signal,
      });

      try {
        const response: Response = await fetch(request);
        const data: ActionsResourceRequestServerResponse =
          await response.json();

        console.log('data', data);

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        const { repairNoteData, companyData, generalData, outreachData } = data;

        const employeeData = new Map<string, UserDocument>();
        data.employeeData.forEach((employee: UserDocument) => {
          employeeData.set(employee._id, employee);
        });

        const actionsDocuments = {
          repairNoteData,
          companyData,
          generalData,
          outreachData,
          employeeData,
        };
        globalDispatch({
          type: globalAction.setActionsDocuments,
          payload: actionsDocuments,
        });
        dashboardDispatch({
          type: dashboardAction.setIsSuccessful,
          payload: true,
        });
        dashboardDispatch({
          type: dashboardAction.setSuccessMessage,
          payload:
            'Successfully fetched recent company, general and outreach documents',
        });
      } catch (error: any) {
        if (!isMounted || error.name === 'AbortError') {
          return;
        }

        const errorMessage =
          error instanceof InvalidTokenError
            ? 'Invalid token. Please login again.'
            : !error.response
            ? 'Network error. Please try again.'
            : error?.message ?? 'Unknown error occurred. Please try again.';

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate('/');

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
        dashboardDispatch({
          type: dashboardAction.setIsLoading,
          payload: false,
        });
        dashboardDispatch({
          type: dashboardAction.setLoadingMessage,
          payload: '',
        });
        dashboardDispatch({
          type: dashboardAction.triggerFetchActionsDocuments,
          payload: false,
        });
      }
    }

    if (triggerFetchActionsDocuments) {
      fetchActionsDocuments();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // useEffect(() => {
  //   dashboardDispatch({
  //     type: dashboardAction.triggerFetchActionsDocuments,
  //     payload: true,
  //   });
  // }, []);

  const {
    appThemeColors: { borderColor, backgroundColor },
    generalColors: { themeColorShade },
    scrollBarStyle,
  } = returnThemeColors({ colorsSwatches: COLORS_SWATCHES, themeObject });

  const imageSrc =
    'https://images.pexels.com/photos/3771110/pexels-photo-3771110.jpeg?auto=compress';
  const imageAlt = 'Reception desk with antique hotel bell';
  const resourceDescription = 'Welcome to the MacAuley dashboard!';
  const resourceTitle = `Hi, ${userDocument?.firstName ?? username}!`;
  const displayWelcomeHeader = (
    <DisplayResourceHeader
      imageAlt={imageAlt}
      imageSrc={imageSrc}
      resourceDescription={resourceDescription}
      resourceTitle={resourceTitle}
    />
  );

  const componentWidth =
    width < 480 // for iPhone 5/SE
      ? width * 0.93
      : width < 768 // for iPhones 6 - 15
      ? width - 40
      : // at 768vw the navbar appears at width of 225px
      width < 1024
      ? (width - 225) * 0.8
      : // at >= 1200vw the navbar width is 300px
      width < 1200
      ? (width - 225) * 0.8
      : 900 - 40;

  const createdRepairNotes =
    actionsDocuments?.repairNoteData.map((repairNote, repairNoteIdx) => {
      const fieldNamesWithDateValues = new Set([
        'dateReceived',
        'estimatedCompletionDate',
      ]);

      const displayRepairNote = returnScrollableDocumentInfo({
        borderColor,
        document: repairNote,
        excludeKeys: [],
        fieldNamesWithDateValues,
        heading: `Assigned to: ${repairNote.username}`,
        queryValuesArray: [],
        rowGap,
        scrollBarStyle,
        scrollViewportHeight: componentWidth * 0.62 - 175,
        textHighlightColor: '',
      });

      const repairNoteCard = (
        <Card
          key={`${repairNote._id}-${repairNoteIdx}`}
          w={componentWidth}
          h="100%"
          // style={{ border: borderColor,  }}
          style={{ outline: '1px solid teal' }}
        >
          <Stack>{displayRepairNote}</Stack>
        </Card>
      );

      return repairNoteCard;
    }) ?? ([] as Array<React.JSX.Element>);

  const displayRepairNotesCarousel = (
    <CarouselBuilder
      slideDimensions={{
        width: componentWidth,
        height: componentWidth * 0.62,
      }}
      slides={createdRepairNotes}
    />
  );

  const [createdVisitRepairNotesPageButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Visit',
      rightIcon: <TbCircleArrowUpRight size={20} />,
      semanticDescription: 'Click to view repair notes',
      semanticName: 'visit repair notes page',
      buttonOnClick: () => {
        navigate('/home/repair-note');
      },
    },
  ]);

  const displayVisitRepairNotesPageButton = (
    <Tooltip label="Visit repair notes page">
      <Group>{createdVisitRepairNotesPageButton}</Group>
    </Tooltip>
  );

  const displayRepairNotesSection = (
    <Stack w={componentWidth}>
      <Group spacing={rowGap}>
        <Title order={4}>Repair Notes awaiting approval</Title>
        {displayVisitRepairNotesPageButton}
      </Group>
      {displayRepairNotesCarousel}
    </Stack>
  );

  const createdAnnouncementsCards =
    actionsDocuments?.outreachData.announcementData.map(
      (announcement, announcementIdx) => {
        const { _id, bannerImageAlt, title, bannerImageSrcCompressed } =
          announcement;

        const [createdImage] = returnAccessibleImageElements([
          {
            imageSrc: bannerImageSrcCompressed,
            imageAlt: bannerImageAlt,
            isCard: true,
            isLoader: true,
            isOverlay: true,
            overlayText: title,
          },
        ]);

        // required to avoid breadcrumbs showing '%20' instead of spaces
        const dynamicPath = title ? title.replace(/ /g, '-') : _id;
        const announcementCard = (
          <UnstyledButton
            key={`${_id}-${announcementIdx}`}
            w={componentWidth}
            h={componentWidth * 0.62 - 50}
            onClick={() => {
              globalDispatch({
                type: globalAction.setAnnouncementDocument,
                payload: announcement,
              });

              navigate(`/home/outreach/announcement/${dynamicPath}`, {
                replace: false,
              });
            }}
          >
            {createdImage}
          </UnstyledButton>
        );

        return announcementCard;
      }
    ) ?? ([] as Array<React.JSX.Element>);

  const displayAnnouncementsCarousel =
    createdAnnouncementsCards.length > 0 ? (
      <CarouselBuilder
        slideDimensions={{
          width: componentWidth,
          height: componentWidth * 0.62,
        }}
        slides={createdAnnouncementsCards}
      />
    ) : null;

  const [createdVisitAnnouncementsPageButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Visit',
      rightIcon: <TbCircleArrowUpRight size={20} />,
      semanticDescription: 'Click to view announcements',
      semanticName: 'visit announcements page',
      buttonOnClick: () => {
        navigate('/home/outreach/announcement');
      },
    },
  ]);

  const displayVisitAnnouncementsPageButton = (
    <Tooltip label="Visit announcements page">
      <Group>{createdVisitAnnouncementsPageButton}</Group>
    </Tooltip>
  );

  const displayAnnouncementsSection = (
    <Stack w={componentWidth}>
      <Group spacing={rowGap}>
        <Title order={4}>Latest Announcements</Title>
        {displayVisitAnnouncementsPageButton}
      </Group>
      {displayAnnouncementsCarousel}
    </Stack>
  );

  const completedSurveyIds = userDocument?.completedSurveys ?? [];
  const uncompletedSurveys = actionsDocuments?.outreachData.surveyData.filter(
    (survey) => !completedSurveyIds.includes(survey._id)
  );
  const createdUncompletedSurveyCards =
    uncompletedSurveys?.map((survey, surveyIdx) => {
      const { surveyTitle, _id } = survey;

      const surveyIcon = <TbChartBar size={20} />;
      const heading = (
        <Group w="100%">
          {surveyIcon}
          <Text size="md">Survey</Text>
        </Group>
      );

      const title = <Title order={5}>{surveyTitle}</Title>;
      const questions = (
        <Flex direction="column" gap="xs">
          {survey.questions.map((question, questionIdx) => (
            <Text
              key={`${question}-${questionIdx}`}
            >{`${question.question.slice(0, 39)}...`}</Text>
          ))}
        </Flex>
      );

      const elapsedTime = (
        <Group position="right" w="100%">
          <Text>{returnElapsedTime(survey.createdAt)}</Text>
        </Group>
      );

      const surveyCard = (
        <Card
          key={`${_id}-${surveyIdx}`}
          w={350}
          style={{ border: borderColor }}
        >
          <Stack>
            {heading}
            {title}
            {questions}
            {elapsedTime}
          </Stack>
        </Card>
      );

      return surveyCard;
    }) ?? ([] as Array<React.JSX.Element>);

  const [createdVisitSurveyPageButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Visit',
      rightIcon: <TbCircleArrowUpRight size={20} />,
      semanticDescription: 'Click to view completed and uncompleted surveys',
      semanticName: 'visit survey page',
      buttonOnClick: () => {
        navigate('/home/outreach/survey');
      },
    },
  ]);
  const displayVisitSurveyPageButton = (
    <Tooltip label="Visit survey page">
      <Group>{createdVisitSurveyPageButton}</Group>
    </Tooltip>
  );

  const displayUncompletedSurveys = (
    <Stack w={componentWidth}>
      <Group spacing={rowGap}>
        <TbChartPie4 size={20} />
        <Title order={4}>Uncompleted Surveys</Title>
        {displayVisitSurveyPageButton}
      </Group>
      <ScrollArea styles={() => scrollBarStyle} type="hover" py={padding}>
        <Flex
          wrap="wrap"
          w={componentWidth}
          h={componentWidth * 0.62 - 160}
          gap={rowGap}
          justify={width < 480 ? 'center' : 'flex-start'}
        >
          {createdUncompletedSurveyCards}
        </Flex>
      </ScrollArea>
    </Stack>
  );

  const upcomingEvents =
    actionsDocuments?.outreachData.eventData.filter((event) => {
      const eventDate = new Date(event.eventStartDate).getTime();
      const currentDate = new Date().getTime();
      return eventDate > currentDate;
    }) ?? [];

  const sortedUpcomingEvents = upcomingEvents.sort((a, b) => {
    const aDate = new Date(a.eventStartDate).getTime();
    const bDate = new Date(b.eventStartDate).getTime();
    return aDate - bDate;
  });

  const createdUpcomingEventCards = sortedUpcomingEvents.map(
    (event, eventIdx) => {
      const {
        _id,
        eventTitle,
        eventStartDate,
        eventEndDate,
        eventStartTime,
        eventEndTime,
        eventLocation,
        rsvpDeadline,
      } = event;

      const eventIcon = <TbCalendarEvent size={20} />;
      const heading = (
        <Group w="100%">
          {eventIcon}
          <Text size="md">Event</Text>
        </Group>
      );

      const formattedStartDate = formatDate({
        date: eventStartDate,
        formatOptions: { dateStyle: 'full' },
        locale: 'en-US',
      });

      const formattedEndDate = formatDate({
        date: eventEndDate,
        formatOptions: { dateStyle: 'full' },
        locale: 'en-US',
      });

      const title = <Title order={5}>{eventTitle}</Title>;

      const startDate = (
        <Flex wrap="wrap">
          <Text>Start:</Text>
          <Text
            pl={padding}
          >{`${formattedStartDate} at ${eventStartTime}`}</Text>
        </Flex>
      );

      const endDate = (
        <Flex wrap="wrap">
          <Text>End:</Text>
          <Text pl={padding}>{`${formattedEndDate} at ${eventEndTime}`}</Text>
        </Flex>
      );

      const location = (
        <Flex wrap="wrap">
          <Text>Location:</Text>
          <Text pl={padding}>{eventLocation}</Text>
        </Flex>
      );

      const formattedRsvpDeadline = formatDate({
        date: rsvpDeadline,
        formatOptions: { dateStyle: 'full' },
        locale: 'en-US',
      });

      const rsvp = (
        <Flex wrap="wrap">
          <Text>RSVP Deadline:</Text>
          <Text pl={padding}>{formattedRsvpDeadline}</Text>
        </Flex>
      );

      const remainingTime = (
        <Group position="right" w="100%">
          <Text>{returnTimeRemaining(eventStartDate)}</Text>
        </Group>
      );

      const displayBody = (
        <Flex direction="column" gap="xs">
          {startDate}
          {endDate}
          {location}
          {rsvp}
        </Flex>
      );

      const eventCard = (
        <Card
          key={`${_id}-${eventIdx}`}
          w={350}
          style={{ border: borderColor }}
        >
          <Stack>
            {heading}
            {title}
            {displayBody}
            {remainingTime}
          </Stack>
        </Card>
      );

      return eventCard;
    }
  );

  const [createdVisitEventPageButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Visit',
      rightIcon: <TbCircleArrowUpRight size={20} />,
      semanticDescription: 'Click to view upcoming events',
      semanticName: 'visit event page',
      buttonOnClick: () => {
        navigate('/home/outreach/event');
      },
    },
  ]);

  const displayVisitEventPageButton = (
    <Tooltip label="Visit event page">
      <Group>{createdVisitEventPageButton}</Group>
    </Tooltip>
  );

  const displayUpcomingEvents = (
    <Stack w={componentWidth}>
      <Group spacing={rowGap}>
        <TbTimelineEventPlus size={20} />
        <Title order={4}>Upcoming Events</Title>
        {displayVisitEventPageButton}
      </Group>
      <ScrollArea styles={() => scrollBarStyle} type="hover" py={padding}>
        <Flex
          wrap="wrap"
          w={componentWidth}
          h={componentWidth * 0.62 - 160}
          gap={rowGap}
          justify={width < 480 ? 'center' : 'flex-start'}
        >
          {createdUpcomingEventCards}
        </Flex>
      </ScrollArea>
    </Stack>
  );

  const outreachSlides = [displayUncompletedSurveys, displayUpcomingEvents];

  const displayOutreachCarousel = (
    <CarouselBuilder
      slideDimensions={{
        width: componentWidth,
        height: componentWidth * 0.62,
      }}
      slides={outreachSlides}
    />
  );

  // company data
  // address change
  const createdAddressChangeCards =
    actionsDocuments?.companyData.addressChangeData.map(
      (addressChangeNote, addressChangeNoteIdx) => {
        const {
          username,
          addressLine,
          city,
          province,
          state,
          country,
          createdAt,
          requestStatus,
        } = addressChangeNote;

        const title = <Title order={5}>{username}</Title>;

        const displayAddressLine = (
          <Flex wrap="wrap">
            <Text>Address line: </Text>
            <Text pl={padding}>{addressLine}</Text>
          </Flex>
        );

        const displayCity = (
          <Flex wrap="wrap">
            <Text>City: </Text>
            <Text pl={padding}>{city}</Text>
          </Flex>
        );

        const displayProvince = province.length ? (
          <Flex wrap="wrap">
            <Text>Province: </Text>
            <Text pl={padding}>{province}</Text>
          </Flex>
        ) : null;

        const displayState = state.length ? (
          <Flex wrap="wrap">
            <Text>State: </Text>
            <Text pl={padding}>{state}</Text>
          </Flex>
        ) : null;

        const displayCountry = (
          <Flex wrap="wrap">
            <Text>Country: </Text>
            <Text pl={padding}>{country}</Text>
          </Flex>
        );

        const displayRequestStatus = (
          <Flex wrap="wrap">
            <Text>Request Status: </Text>
            <Text pl={padding}>{requestStatus}</Text>
          </Flex>
        );

        const address = (
          <Flex direction="column" gap="xs">
            {displayAddressLine}
            {displayCity}
            {displayProvince}
            {displayState}
            {displayCountry}
            {displayRequestStatus}
          </Flex>
        );

        const elapsedTime = (
          <Group position="right" w="100%">
            <Text>{returnElapsedTime(createdAt)}</Text>
          </Group>
        );

        const addressChangeCard = (
          <Card
            key={`${addressChangeNote._id}-${addressChangeNoteIdx}`}
            w={350}
            style={{ border: borderColor }}
          >
            <Stack>
              {title}
              {address}
              {elapsedTime}
            </Stack>
          </Card>
        );

        return addressChangeCard;
      }
    ) ?? ([] as Array<React.JSX.Element>);

  const [createdVisitAddressChangePageButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Visit',
      rightIcon: <TbCircleArrowUpRight size={20} />,
      semanticDescription: 'Click to view address change requests',
      semanticName: 'visit address change page',
      buttonOnClick: () => {
        navigate('/home/company/address-change');
      },
    },
  ]);

  const displayVisitAddressChangePageButton = (
    <Tooltip label="Visit address change page">
      <Group>{createdVisitAddressChangePageButton}</Group>
    </Tooltip>
  );

  const displayAddressChangeSection = (
    <Stack w={componentWidth}>
      <Group spacing={rowGap}>
        <TbAddressBook size={20} />
        <Title order={4}>Address Change Requests</Title>
        {displayVisitAddressChangePageButton}
      </Group>
      <ScrollArea styles={() => scrollBarStyle} type="hover" py={padding}>
        <Flex
          wrap="wrap"
          w={componentWidth}
          h={componentWidth * 0.62 - 160}
          gap={rowGap}
          justify={width < 480 ? 'center' : 'flex-start'}
        >
          {createdAddressChangeCards}
        </Flex>
      </ScrollArea>
    </Stack>
  );

  const createdBenefitsCards = actionsDocuments?.companyData.benefitData.map(
    (benefit, benefitIdx) => {
      const {
        _id,
        planName,
        planKind,
        planStartDate,
        monthlyPremium,
        requestStatus,
        username,
        createdAt,
      } = benefit;

      const title = <Title order={5}>{username}</Title>;

      const displayPlanName = (
        <Flex wrap="wrap">
          <Text>Plan Name: </Text>
          <Text pl={padding}>{planName}</Text>
        </Flex>
      );

      const displayPlanKind = (
        <Flex wrap="wrap">
          <Text>Plan Kind: </Text>
          <Text pl={padding}>{planKind}</Text>
        </Flex>
      );

      const displayPlanStartDate = (
        <Flex wrap="wrap">
          <Text>Plan Start Date: </Text>
          <Text pl={padding}>{planStartDate}</Text>
        </Flex>
      );

      const displayMonthlyPremium = (
        <Flex wrap="wrap">
          <Text>Monthly Premium: </Text>
          <Text pl={padding}>{monthlyPremium}</Text>
        </Flex>
      );

      const displayRequestStatus = (
        <Flex wrap="wrap">
          <Text>Request Status: </Text>
          <Text pl={padding}>{requestStatus}</Text>
        </Flex>
      );

      const displayBenefit = (
        <Flex direction="column" gap="xs">
          {displayPlanName}
          {displayPlanKind}
          {displayPlanStartDate}
          {displayMonthlyPremium}
          {displayRequestStatus}
        </Flex>
      );

      const elapsedTime = (
        <Group position="right" w="100%">
          <Text>{returnElapsedTime(createdAt)}</Text>
        </Group>
      );

      const benefitCard = (
        <Card
          key={`${_id}-${benefitIdx}`}
          w={350}
          style={{ border: borderColor }}
        >
          <Stack>
            {title}
            {displayBenefit}
            {elapsedTime}
          </Stack>
        </Card>
      );

      return benefitCard;
    }
  );

  const [createdVisitBenefitsPageButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Visit',
      rightIcon: <TbCircleArrowUpRight size={20} />,
      semanticDescription: 'Click to view benefits',
      semanticName: 'visit benefits page',
      buttonOnClick: () => {
        navigate('/home/company/benefit');
      },
    },
  ]);

  const displayVisitBenefitsPageButton = (
    <Tooltip label="Visit benefits page">
      <Group>{createdVisitBenefitsPageButton}</Group>
    </Tooltip>
  );

  const displayBenefitsSection = (
    <Stack w={componentWidth}>
      <Group spacing={rowGap}>
        <TbGift size={20} />
        <Title order={4}>Benefit Requests</Title>
        {displayVisitBenefitsPageButton}
      </Group>
      <ScrollArea styles={() => scrollBarStyle} type="hover" py={padding}>
        <Flex
          wrap="wrap"
          w={componentWidth}
          h={componentWidth * 0.62 - 160}
          gap={rowGap}
          justify={width < 480 ? 'center' : 'flex-start'}
        >
          {createdBenefitsCards}
        </Flex>
      </ScrollArea>
    </Stack>
  );

  const createdExpenseClaimCards =
    actionsDocuments?.companyData.expenseClaimData.map(
      (expenseClaim, expenseClaimIdx) => {
        const {
          _id,
          expenseClaimKind,
          expenseClaimAmount,
          expenseClaimCurrency,
          expenseClaimDate,
          requestStatus,
          createdAt,
        } = expenseClaim;

        const title = <Title order={5}>{expenseClaimKind}</Title>;

        const displayExpenseClaimAmount = (
          <Flex wrap="wrap">
            <Text>Amount: </Text>
            <Text pl={padding}>{expenseClaimAmount}</Text>
          </Flex>
        );

        const displayExpenseClaimCurrency = (
          <Flex wrap="wrap">
            <Text>Currency: </Text>
            <Text pl={padding}>{expenseClaimCurrency}</Text>
          </Flex>
        );

        const formattedExpenseClaimDate = formatDate({
          date: expenseClaimDate,
          formatOptions: { dateStyle: 'full' },
          locale: 'en-US',
        });
        const displayExpenseClaimDate = (
          <Flex wrap="wrap">
            <Text>Date: </Text>
            <Text pl={padding}>{formattedExpenseClaimDate}</Text>
          </Flex>
        );

        const displayRequestStatus = (
          <Flex wrap="wrap">
            <Text>Request Status: </Text>
            <Text pl={padding}>{requestStatus}</Text>
          </Flex>
        );

        const displayExpenseClaim = (
          <Flex direction="column" gap="xs">
            {displayExpenseClaimAmount}
            {displayExpenseClaimCurrency}
            {displayExpenseClaimDate}
            {displayRequestStatus}
          </Flex>
        );

        const elapsedTime = (
          <Group position="right" w="100%">
            <Text>{returnElapsedTime(createdAt)}</Text>
          </Group>
        );

        const expenseClaimCard = (
          <Card
            key={`${_id}-${expenseClaimIdx}`}
            w={350}
            style={{ border: borderColor }}
          >
            <Stack>
              {title}
              {displayExpenseClaim}
              {elapsedTime}
            </Stack>
          </Card>
        );

        return expenseClaimCard;
      }
    );

  const [createdVisitExpenseClaimsPageButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Visit',
      rightIcon: <TbCircleArrowUpRight size={20} />,
      semanticDescription: 'Click to view expense claims',
      semanticName: 'visit expense claims page',
      buttonOnClick: () => {
        navigate('/home/company/expense-claim');
      },
    },
  ]);

  const displayVisitExpenseClaimsPageButton = (
    <Tooltip label="Visit expense claims page">
      <Group>{createdVisitExpenseClaimsPageButton}</Group>
    </Tooltip>
  );

  const displayExpenseClaimsSection = (
    <Stack w={componentWidth}>
      <Group spacing={rowGap}>
        <TbReceipt2 size={20} />
        <Title order={4}>Expense Claims</Title>
        {displayVisitExpenseClaimsPageButton}
      </Group>
      <ScrollArea styles={() => scrollBarStyle} type="hover" py={padding}>
        <Flex
          wrap="wrap"
          w={componentWidth}
          h={componentWidth * 0.62 - 160}
          gap={rowGap}
          justify={width < 480 ? 'center' : 'flex-start'}
        >
          {createdExpenseClaimCards}
        </Flex>
      </ScrollArea>
    </Stack>
  );

  // leave requests
  const createdLeaveRequestsCards =
    actionsDocuments?.companyData.leaveRequestData.map(
      (leaveRequest, leaveRequestIdx) => {
        const {
          _id,
          username,
          startDate,
          endDate,
          reasonForLeave,
          requestStatus,
          createdAt,
        } = leaveRequest;

        const title = <Title order={5}>{username}</Title>;

        const formattedStartDate = formatDate({
          date: startDate,
          formatOptions: { dateStyle: 'full' },
          locale: 'en-US',
        });
        const displayStartDate = (
          <Flex wrap="wrap">
            <Text>Start Date: </Text>
            <Text pl={padding}>{formattedStartDate}</Text>
          </Flex>
        );

        const formattedEndDate = formatDate({
          date: endDate,
          formatOptions: { dateStyle: 'full' },
          locale: 'en-US',
        });
        const displayEndDate = (
          <Flex wrap="wrap">
            <Text>End Date: </Text>
            <Text pl={padding}>{formattedEndDate}</Text>
          </Flex>
        );

        const displayReasonForLeave = (
          <Flex wrap="wrap">
            <Text>Reason for Leave: </Text>
            <Text pl={padding}>{reasonForLeave}</Text>
          </Flex>
        );

        const displayRequestStatus = (
          <Flex wrap="wrap">
            <Text>Request Status: </Text>
            <Text pl={padding}>{requestStatus}</Text>
          </Flex>
        );

        const displayLeaveRequest = (
          <Flex direction="column" gap="xs">
            {displayStartDate}
            {displayEndDate}
            {displayReasonForLeave}
            {displayRequestStatus}
          </Flex>
        );

        const elapsedTime = (
          <Group position="right" w="100%">
            <Text>{returnElapsedTime(createdAt)}</Text>
          </Group>
        );

        const leaveRequestCard = (
          <Card
            key={`${_id}-${leaveRequestIdx}`}
            w={350}
            style={{ border: borderColor }}
          >
            <Stack>
              {title}
              {displayLeaveRequest}
              {elapsedTime}
            </Stack>
          </Card>
        );

        return leaveRequestCard;
      }
    );

  const [createdVisitLeaveRequestsPageButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Visit',
      rightIcon: <TbCircleArrowUpRight size={20} />,
      semanticDescription: 'Click to view leave requests',
      semanticName: 'visit leave requests page',
      buttonOnClick: () => {
        navigate('/home/company/leave-request');
      },
    },
  ]);

  const displayVisitLeaveRequestsPageButton = (
    <Tooltip label="Visit leave requests page">
      <Group>{createdVisitLeaveRequestsPageButton}</Group>
    </Tooltip>
  );

  const displayLeaveRequestsSection = (
    <Stack w={componentWidth}>
      <Group spacing={rowGap}>
        <TbCalendarPin size={20} />
        <Title order={4}>Leave Requests</Title>
        {displayVisitLeaveRequestsPageButton}
      </Group>
      <ScrollArea styles={() => scrollBarStyle} type="hover" py={padding}>
        <Flex
          wrap="wrap"
          w={componentWidth}
          h={componentWidth * 0.62 - 160}
          gap={rowGap}
          justify={width < 480 ? 'center' : 'flex-start'}
        >
          {createdLeaveRequestsCards}
        </Flex>
      </ScrollArea>
    </Stack>
  );

  // request resource
  const createdRequestResourceCards =
    actionsDocuments?.companyData.requestResourceData.map(
      (requestResource, requestResourceIdx) => {
        const {
          department,
          resourceType,
          resourceQuantity,
          urgency,
          dateNeededBy,
          requestStatus,
          createdAt,
        } = requestResource;

        const title = <Title order={5}>{department}</Title>;

        const displayResourceType = (
          <Flex wrap="wrap">
            <Text>Resource Type: </Text>
            <Text pl={padding}>{resourceType}</Text>
          </Flex>
        );

        const displayResourceQuantity = (
          <Flex wrap="wrap">
            <Text>Resource Quantity: </Text>
            <Text pl={padding}>{resourceQuantity}</Text>
          </Flex>
        );

        const displayUrgency = (
          <Flex wrap="wrap">
            <Text>Urgency: </Text>
            <Text pl={padding}>{urgency}</Text>
          </Flex>
        );

        const formattedDateNeededBy = formatDate({
          date: dateNeededBy,
          formatOptions: { dateStyle: 'full' },
          locale: 'en-US',
        });
        const displayDateNeededBy = (
          <Flex wrap="wrap">
            <Text>Date Needed By: </Text>
            <Text pl={padding}>{formattedDateNeededBy}</Text>
          </Flex>
        );

        const displayRequestStatus = (
          <Flex wrap="wrap">
            <Text>Request Status: </Text>
            <Text pl={padding}>{requestStatus}</Text>
          </Flex>
        );

        const displayRequestResource = (
          <Flex direction="column" gap="xs">
            {displayResourceType}
            {displayResourceQuantity}
            {displayUrgency}
            {displayDateNeededBy}
            {displayRequestStatus}
          </Flex>
        );

        const elapsedTime = (
          <Group position="right" w="100%">
            <Text>{returnElapsedTime(createdAt)}</Text>
          </Group>
        );

        const requestResourceCard = (
          <Card
            key={`${requestResource._id}-${requestResourceIdx}`}
            w={350}
            style={{ border: borderColor }}
          >
            <Stack>
              {title}
              {displayRequestResource}
              {elapsedTime}
            </Stack>
          </Card>
        );

        return requestResourceCard;
      }
    );

  const [createdVisitRequestResourcePageButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Visit',
        rightIcon: <TbCircleArrowUpRight size={20} />,
        semanticDescription: 'Click to view request resource',
        semanticName: 'visit request resource page',
        buttonOnClick: () => {
          navigate('/home/company/request-resource');
        },
      },
    ]);

  const displayVisitRequestResourcePageButton = (
    <Tooltip label="Visit request resource page">
      <Group>{createdVisitRequestResourcePageButton}</Group>
    </Tooltip>
  );

  const displayRequestResourceSection = (
    <Stack w={componentWidth}>
      <Group spacing={rowGap}>
        <TbCashBanknote size={20} />
        <Title order={4}>Resource Requests</Title>
        {displayVisitRequestResourcePageButton}
      </Group>
      <ScrollArea styles={() => scrollBarStyle} type="hover" py={padding}>
        <Flex
          wrap="wrap"
          w={componentWidth}
          h={componentWidth * 0.62 - 160}
          gap={rowGap}
          justify={width < 480 ? 'center' : 'flex-start'}
        >
          {createdRequestResourceCards}
        </Flex>
      </ScrollArea>
    </Stack>
  );

  const companyDataSlides = [
    displayAddressChangeSection,
    displayBenefitsSection,
    displayExpenseClaimsSection,
    displayLeaveRequestsSection,
    displayRequestResourceSection,
  ];

  const displayCompanyDataCarousel = (
    <CarouselBuilder
      slideDimensions={{
        width: componentWidth,
        height: componentWidth * 0.62,
      }}
      slides={companyDataSlides}
    />
  );

  // general section
  // endorsements
  const createdEndorsementCards =
    actionsDocuments?.generalData.endorsementData.map(
      (endorsement, endorsementIdx) => {
        const {
          _id,
          title,
          userToBeEndorsed,
          username,
          attributeEndorsed,
          requestStatus,
          createdAt,
        } = endorsement;

        const titleElement = <Title order={5}>{title}</Title>;

        const displayUserToBeEndorsed = (
          <Flex wrap="wrap">
            <Text>Endorsed:</Text>
            <Text pl={padding}>{userToBeEndorsed}</Text>
          </Flex>
        );

        const displayUsername = (
          <Flex wrap="wrap">
            <Text>Endorser:</Text>
            <Text pl={padding}>{username}</Text>
          </Flex>
        );

        const uppercasedAttributeEndorsed = attributeEndorsed.map(
          (attribute) =>
            `${attribute.charAt(0).toUpperCase()}${attribute.slice(1)}`
        );
        const displayAttributeEndorsed = (
          <Flex wrap="wrap">
            <Text>Attribute Endorsed:</Text>
            <Text pl={padding}>
              {replaceLastCommaWithAnd(uppercasedAttributeEndorsed.join(', '))}
            </Text>
          </Flex>
        );

        const displayRequestStatus = (
          <Flex wrap="wrap">
            <Text>Request Status:</Text>
            <Text pl={padding}>{requestStatus}</Text>
          </Flex>
        );

        const displayEndorsement = (
          <Flex direction="column" gap="xs">
            {displayUserToBeEndorsed}
            {displayUsername}
            {displayAttributeEndorsed}
            {displayRequestStatus}
          </Flex>
        );

        const elapsedTime = (
          <Group position="right" w="100%">
            <Text>{returnElapsedTime(createdAt)}</Text>
          </Group>
        );

        const endorsementCard = (
          <Card
            key={`${_id}-${endorsementIdx}`}
            w={350}
            style={{ border: borderColor }}
          >
            <Stack>
              {titleElement}
              {displayEndorsement}
              {elapsedTime}
            </Stack>
          </Card>
        );

        return endorsementCard;
      }
    );

  const [createdVisitEndorsementsPageButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Visit',
      rightIcon: <TbCircleArrowUpRight size={20} />,
      semanticDescription: 'Click to view endorsements',
      semanticName: 'visit endorsements page',
      buttonOnClick: () => {
        navigate('/home/general/endorsement');
      },
    },
  ]);

  const displayVisitEndorsementsPageButton = (
    <Tooltip label="Visit endorsements page">
      <Group>{createdVisitEndorsementsPageButton}</Group>
    </Tooltip>
  );

  const displayEndorsementsSection = (
    <Stack w={componentWidth}>
      <Group spacing={rowGap}>
        <TbUserCheck size={20} />
        <Title order={4}>Endorsements</Title>
        {displayVisitEndorsementsPageButton}
      </Group>
      <ScrollArea styles={() => scrollBarStyle} type="hover" py={padding}>
        <Flex
          wrap="wrap"
          w={componentWidth}
          h={componentWidth * 0.62 - 160}
          gap={rowGap}
          justify={width < 480 ? 'center' : 'flex-start'}
        >
          {createdEndorsementCards}
        </Flex>
      </ScrollArea>
    </Stack>
  );

  // printer issue
  const createdPrinterIssueCards =
    actionsDocuments?.generalData.printerIssueData.map(
      (printerIssue, printerIssueIdx) => {
        const {
          _id,
          dateOfOccurrence,
          timeOfOccurrence,
          printerIssueDescription,
          urgency,
          requestStatus,
          createdAt,
        } = printerIssue;

        const formattedDateOfOccurrence = formatDate({
          date: dateOfOccurrence,
          formatOptions: { dateStyle: 'full' },
          locale: 'en-US',
        });

        const title = (
          <Title
            order={5}
          >{`Printer Issue on ${formattedDateOfOccurrence}`}</Title>
        );

        const displayTimeOfOccurrence = (
          <Flex wrap="wrap">
            <Text>Time of Occurrence:</Text>
            <Text pl={padding}>{timeOfOccurrence}</Text>
          </Flex>
        );

        const displayPrinterIssueDescription = (
          <Flex wrap="wrap">
            <Text>Issue Description:</Text>
            <Text pl={padding}>{printerIssueDescription}</Text>
          </Flex>
        );

        const displayUrgency = (
          <Flex wrap="wrap">
            <Text>Urgency:</Text>
            <Text pl={padding}>{urgency}</Text>
          </Flex>
        );

        const displayRequestStatus = (
          <Flex wrap="wrap">
            <Text>Request Status:</Text>
            <Text pl={padding}>{requestStatus}</Text>
          </Flex>
        );

        const displayPrinterIssue = (
          <Flex direction="column" gap="xs">
            {displayTimeOfOccurrence}
            {displayPrinterIssueDescription}
            {displayUrgency}
            {displayRequestStatus}
          </Flex>
        );

        const elapsedTime = (
          <Group position="right" w="100%">
            <Text>{returnElapsedTime(createdAt)}</Text>
          </Group>
        );

        const printerIssueCard = (
          <Card
            key={`${_id}-${printerIssueIdx}`}
            w={350}
            style={{ border: borderColor }}
          >
            <Stack>
              {title}
              {displayPrinterIssue}
              {elapsedTime}
            </Stack>
          </Card>
        );

        return printerIssueCard;
      }
    );

  const [createdVisitPrinterIssuePageButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Visit',
      rightIcon: <TbCircleArrowUpRight size={20} />,
      semanticDescription: 'Click to view printer issues',
      semanticName: 'visit printer issues page',
      buttonOnClick: () => {
        navigate('/home/general/printer-issue');
      },
    },
  ]);

  const displayVisitPrinterIssuePageButton = (
    <Tooltip label="Visit printer issues page">
      <Group>{createdVisitPrinterIssuePageButton}</Group>
    </Tooltip>
  );

  const displayPrinterIssueSection = (
    <Stack w={componentWidth}>
      <Group spacing={rowGap}>
        <TbPrinterOff size={20} />
        <Title order={4}>Printer Issues</Title>
        {displayVisitPrinterIssuePageButton}
      </Group>
      <ScrollArea styles={() => scrollBarStyle} type="hover" py={padding}>
        <Flex
          wrap="wrap"
          w={componentWidth}
          h={componentWidth * 0.62 - 160}
          gap={rowGap}
          justify={width < 480 ? 'center' : 'flex-start'}
        >
          {createdPrinterIssueCards}
        </Flex>
      </ScrollArea>
    </Stack>
  );

  // anonymous requests
  const createdAnonymousRequestCards =
    actionsDocuments?.generalData.anonymousRequestData?.map(
      (anonymousRequest, anonymousRequestIdx) => {
        const {
          _id,
          title,
          requestKind,
          requestDescription,
          urgency,
          requestStatus,
          createdAt,
        } = anonymousRequest;

        const titleElement = <Title order={5}>{title}</Title>;

        const displayRequestKind = (
          <Flex wrap="wrap">
            <Text>Request Kind:</Text>
            <Text pl={padding}>{requestKind}</Text>
          </Flex>
        );

        const displayRequestDescription = (
          <Flex wrap="wrap">
            <Text>Description:</Text>
            <Text pl={padding}>{requestDescription}</Text>
          </Flex>
        );

        const displayUrgency = (
          <Flex wrap="wrap">
            <Text>Urgency:</Text>
            <Text pl={padding}>{urgency}</Text>
          </Flex>
        );

        const displayRequestStatus = (
          <Flex wrap="wrap">
            <Text>Request Status:</Text>
            <Text pl={padding}>{requestStatus}</Text>
          </Flex>
        );

        const displayRequest = (
          <Flex direction="column" gap="xs">
            {displayRequestKind}
            {displayRequestDescription}
            {displayUrgency}
            {displayRequestStatus}
          </Flex>
        );

        const elapsedTime = (
          <Group position="right" w="100%">
            <Text>{returnElapsedTime(createdAt)}</Text>
          </Group>
        );

        const anonymousRequestCard = (
          <Card
            key={`${_id}-${anonymousRequestIdx}`}
            w={350}
            style={{ border: borderColor }}
          >
            <Stack>
              {titleElement}
              {displayRequest}
              {elapsedTime}
            </Stack>
          </Card>
        );

        return anonymousRequestCard;
      }
    );

  const [createdVisitAnonymousRequestsPageButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Visit',
        rightIcon: <TbCircleArrowUpRight size={20} />,
        semanticDescription: 'Click to view anonymous requests',
        semanticName: 'visit anonymous requests page',
        buttonOnClick: () => {
          navigate('/home/general/anonymous-request');
        },
      },
    ]);

  const displayVisitAnonymousRequestsPageButton = (
    <Tooltip label="Visit anonymous requests page">
      <Group>{createdVisitAnonymousRequestsPageButton}</Group>
    </Tooltip>
  );

  const displayAnonymousRequestsSection = (
    <Stack w={componentWidth}>
      <Group spacing={rowGap}>
        <MdSafetyDivider size={20} />
        <Title order={4}>Anonymous Requests</Title>
        {displayVisitAnonymousRequestsPageButton}
      </Group>
      <ScrollArea styles={() => scrollBarStyle} type="hover" py={padding}>
        <Flex
          wrap="wrap"
          w={componentWidth}
          h={componentWidth * 0.62 - 160}
          gap={rowGap}
          justify={width < 480 ? 'center' : 'flex-start'}
        >
          {createdAnonymousRequestCards}
        </Flex>
      </ScrollArea>
    </Stack>
  );

  // referments
  const createdRefermentCards = actionsDocuments?.generalData.refermentData.map(
    (referment, refermentIdx) => {
      const {
        _id,
        candidateFullName,
        candidateCurrentJobTitle,
        departmentReferredFor,
        positionReferredFor,
        requestStatus,
        createdAt,
      } = referment;

      const title = <Title order={5}>{candidateFullName}</Title>;

      const displayCandidateCurrentJobTitle = (
        <Flex wrap="wrap">
          <Text>Current Job Title:</Text>
          <Text pl={padding}>{candidateCurrentJobTitle}</Text>
        </Flex>
      );

      const displayDepartmentReferredFor = (
        <Flex wrap="wrap">
          <Text>Department Referred For:</Text>
          <Text pl={padding}>{departmentReferredFor}</Text>
        </Flex>
      );

      const displayPositionReferredFor = (
        <Flex wrap="wrap">
          <Text>Position Referred For:</Text>
          <Text pl={padding}>{positionReferredFor}</Text>
        </Flex>
      );

      const displayRequestStatus = (
        <Flex wrap="wrap">
          <Text>Request Status:</Text>
          <Text pl={padding}>{requestStatus}</Text>
        </Flex>
      );

      const displayReferment = (
        <Flex direction="column" gap="xs">
          {displayCandidateCurrentJobTitle}
          {displayDepartmentReferredFor}
          {displayPositionReferredFor}
          {displayRequestStatus}
        </Flex>
      );

      const elapsedTime = (
        <Group position="right" w="100%">
          <Text>{returnElapsedTime(createdAt)}</Text>
        </Group>
      );

      const refermentCard = (
        <Card
          key={`${_id}-${refermentIdx}`}
          w={350}
          style={{ border: borderColor }}
        >
          <Stack>
            {title}
            {displayReferment}
            {elapsedTime}
          </Stack>
        </Card>
      );

      return refermentCard;
    }
  );

  const [createdVisitRefermentsPageButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Visit',
      rightIcon: <TbCircleArrowUpRight size={20} />,
      semanticDescription: 'Click to view referments',
      semanticName: 'visit referments page',
      buttonOnClick: () => {
        navigate('/home/general/referment');
      },
    },
  ]);

  const displayVisitRefermentsPageButton = (
    <Tooltip label="Visit referments page">
      <Group>{createdVisitRefermentsPageButton}</Group>
    </Tooltip>
  );

  const displayRefermentsSection = (
    <Stack w={componentWidth}>
      <Group spacing={rowGap}>
        <TiThumbsUp size={20} />
        <Title order={4}>Referments</Title>
        {displayVisitRefermentsPageButton}
      </Group>
      <ScrollArea styles={() => scrollBarStyle} type="hover" py={padding}>
        <Flex
          wrap="wrap"
          w={componentWidth}
          h={componentWidth * 0.62 - 160}
          gap={rowGap}
          justify={width < 480 ? 'center' : 'flex-start'}
        >
          {createdRefermentCards}
        </Flex>
      </ScrollArea>
    </Stack>
  );

  const generalDataSlides = [
    displayEndorsementsSection,
    displayPrinterIssueSection,
    displayAnonymousRequestsSection,
    displayRefermentsSection,
  ];

  const displayGeneralDataCarousel = (
    <CarouselBuilder
      slideDimensions={{
        width: componentWidth,
        height: componentWidth * 0.62,
      }}
      slides={generalDataSlides}
    />
  );

  const displayLoadingOverlay = (
    <LoadingOverlay
      visible={isLoading}
      zIndex={1000}
      overlayBlur={9}
      overlayOpacity={0.99}
      radius={4}
      loader={
        <Stack align="center">
          <Text>{loadingMessage}</Text>
          <Loader />
        </Stack>
      }
    />
  );

  useEffect(() => {
    logState({
      state: dashboardState,
      groupLabel: 'dashboard state in Dashboard',
    });
  }, [dashboardState]);

  return (
    <Stack
      w="100%"
      align="center"
      style={{ position: 'relative' }}
      spacing="xl"
    >
      {displayLoadingOverlay}
      <Text>{`Access token is ${
        accessToken ? 'present' : 'not present'
      }`}</Text>

      <Button
        onClick={() => {
          dashboardDispatch({
            type: dashboardAction.triggerFetchActionsDocuments,
            payload: true,
          });
        }}
      >
        FETCH
      </Button>

      {displayWelcomeHeader}

      {displayRepairNotesSection}

      {displayAnnouncementsSection}

      {displayOutreachCarousel}

      {displayCompanyDataCarousel}

      {displayGeneralDataCarousel}
    </Stack>
  );
}

export default Dashboard;
