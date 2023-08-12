import { Button, Flex, Image, Spoiler, Text, Title } from '@mantine/core';
import { AxiosRequestConfig } from 'axios';
import { compress, compressAccurately } from 'image-conversion';
import { useEffect, useReducer, useState } from 'react';

import { axiosInstance } from '../../api/axios';
import { COLORS } from '../../constants/data';
import { useAuth } from '../../hooks/useAuth';
import { useGlobalState } from '../../hooks/useGlobalState';
import { dashboardReducer, initialDashboardState } from './state';
import { logState, urlBuilder } from '../../utils';
import { ResourceRequestServerResponse, UserDocument } from '../../types';
import { globalAction } from '../../context/globalProvider/state';
import { useNavigate } from 'react-router-dom';
import { CustomNotification } from '../customNotification';

function Dashboard() {
  const [dashboardState, dashboardDispatch] = useReducer(
    dashboardReducer,
    initialDashboardState
  );
  const {
    errorMessage,
    isError,
    isLoading,
    isSubmitting,
    isSuccessful,
    loadingMessage,
    submitMessage,
    successMessage,
  } = dashboardState;
  const { globalState, globalDispatch } = useGlobalState();
  const {
    authState: { accessToken, userId },
  } = useAuth();

  useEffect(() => {
    dashboardDispatch({
      type: 'setIsLoading',
      payload: false,
    });

    dashboardDispatch({
      type: 'setLoadingMessage',
      payload: '',
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function getUserData() {
      const url: URL = urlBuilder({
        path: `/api/v1/users/${userId}`,
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
        const data: {
          message: string;
          resourceData: [Omit<UserDocument, '__v' | 'password'>];
        } = await response.json();
        const { message, resourceData } = data;

        if (!isMounted) {
          return;
        }
        const { ok } = response;
        if (ok) {
          globalDispatch({
            type: globalAction.setUserDocument,
            payload: resourceData[0],
          });
        } else {
          dashboardDispatch({
            type: 'setErrorMessage',
            payload: message,
          });

          dashboardDispatch({
            type: 'setIsError',
            payload: true,
          });
        }
      } catch (error: any) {
        if (isMounted) {
          dashboardDispatch({
            type: 'setErrorMessage',
            payload: error?.message ?? 'Unknown error occurred.',
          });

          dashboardDispatch({
            type: 'setIsError',
            payload: true,
          });
        }
      } finally {
        if (isMounted) {
        }
      }
    }

    if (accessToken) {
      getUserData();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    console.log('accessToken in dashboard: ', accessToken);
    logState({
      state: globalState,
      groupLabel: 'globalState in Dashboard',
    });
  }, [accessToken, globalState]);

  useEffect(() => {
    function timeToReadCalc(text: string[]) {
      return Math.ceil(text.join(' ').split(' ').length / 200);
    }

    const welcomeSectionTimeToRead = timeToReadCalc([
      `
      Greetings and Welcome to MacAuley Tech Repair!

With genuine enthusiasm, we extend a heartfelt welcome to each esteemed member of our exceptional team. Your intricate expertise, unwavering dedication, and fervent passion for the realm of technology repair serve as the bedrock of our accomplishments. We profoundly acknowledge and hold in high esteem the valuable contributions you render to our enterprise on a daily basis.

At MacAuley Tech Repair, we recognize the pivotal role you play in swiftly and proficiently restoring our customers' devices to their optimal functionality. Your unwavering commitment to delivering an unparalleled level of service and harnessing your technical acumen positions us uniquely within the industry landscape.

This employee portal stands as your portal to a vast repository of resources, unfaltering support, and seamless collaboration. Within these virtual walls, you will discover a comprehensive array of tools meticulously curated to foster excellence within your role. From meticulously crafted training materials to our company's guiding policies, alongside real-time updates, this platform serves as the hub where knowledge converges, competencies evolve, and innovative concepts take root.

Our conviction lies in nurturing a constructive work environment that acts as a crucible for growth, fostering innovation, and propagating teamwork. Your steadfast commitment and resolute efforts in ensuring unparalleled customer experiences serve as the fulcrum upon which our accomplishments pivot. Together, we pledge to perpetually transcend expectations and to forge enduring bonds with our esteemed clientele.

Embarking upon this thrilling journey with MacAuley Tech Repair, we entreat you to recognize your status as an integral member of our extended family. We ardently invite you to contribute your insights, engage in synergistic collaborations with your peers, and embark on the pursuit of new horizons in both personal and professional capacities. Your unique talents and resplendent expertise serve as the cornerstone upon which we erect our reputation as an illustrious leader in the tech repair domain.

In reiteration, we extend a resounding welcome to you at MacAuley Tech Repair! Our anticipation brims as we share the prospect of achieving remarkable feats in collaboration.

Warm regards,

[Your Name]
CEO, MacAuley Tech Repair`,
    ]);

    console.log({ welcomeSectionTimeToRead });
  }, []);

  if (isLoading || isSubmitting || isSuccessful || isError) {
    return (
      <CustomNotification
        isError={isError}
        isLoading={isLoading}
        isSubmitting={isSubmitting}
        isSuccessful={isSuccessful}
        errorMessage={errorMessage}
        loadingMessage={loadingMessage}
        submitMessage={submitMessage}
        successMessage={successMessage}
        parentDispatch={dashboardDispatch}
        navigateTo={{
          errorPath: '/portal',
          successPath: '/portal',
        }}
      />
    );
  }

  const welcomeSection = (
    <Flex w="100%" direction="column" rowGap="sm">
      <Title color="dark" order={3}>
        Welcome
      </Title>
      <Image
        src="https://images.pexels.com/photos/7792804/pexels-photo-7792804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Triumphant colleagues doing a fist bump"
        withPlaceholder
        h="100%"
        w="100%"
        fit="contain"
      />
      <Spoiler
        maxHeight={200}
        showLabel={<Button type="button">Read More</Button>}
        hideLabel={<Button type="button">Read Less</Button>}
        transitionDuration={250}
      >
        <Flex
          direction="column"
          align="flex-start"
          justify="center"
          rowGap="md"
        >
          <Text color="dark">Welcome to MacAuley Tech Repair!</Text>

          <Text color="dark">
            We are thrilled to extend a warm and heartfelt welcome to each and
            every member of our exceptional team. Your expertise, dedication,
            and passion for technology repair are invaluable to our success, and
            we truly appreciate the contributions you make to our business every
            day.
          </Text>
          <Text color="dark">
            This employee portal is designed to be your gateway to a wealth of
            resources, support, and collaboration. Here, you'll find everything
            you need to excel in your role, including training materials,
            company policies, and the latest updates. It's a place where
            knowledge is shared, skills are honed, and new ideas flourish.
          </Text>
          <Text color="dark">
            We believe in fostering a positive work environment that encourages
            growth, innovation, and teamwork. Your dedication and commitment to
            providing outstanding customer experiences are the driving force
            behind our success. Together, we'll continue to exceed expectations
            and build lasting relationships with our valued clients. We are
            thrilled to have you on board, and we look forward to achieving
            great things together.
          </Text>
        </Flex>
      </Spoiler>
    </Flex>
  );

  const announcementSection_Expansion = (
    <Flex direction="column">
      <Title color="dark" order={3}>
        Company Expansion
      </Title>

      <Image
        src="https://images.pexels.com/photos/3184429/pexels-photo-3184429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Photo of people doing handshake"
        withPlaceholder
        h="100%"
        w="100%"
        fit="contain"
      />

      <Text color="dark">
        {`We are thrilled and honored to announce a significant stride in the journey of MacAuley Tech Repair. It is with great excitement that we unveil our strategic expansion plans. In the wake of our unwavering commitment to meeting and exceeding customer expectations, we are set to establish a new branch in a strategically selected prime downtown location.

This expansion endeavor is grounded in our ceaseless pursuit of excellence, underpinned by our steadfast dedication to better serve our burgeoning customer base. The selection of this premier downtown locale is a testament to our vision of accessibility and convenience for our valued clientele.

The ramifications of this expansion are profound, promising a new chapter of growth and achievement. The formidable potential for increased synergy and the enhancement of our service portfolio stands as a testament to the opportunities that lie ahead for our team. It is our fervent belief that this expansion is a springboard for the elevation of our business to unprecedented heights of success and recognition.

The fervor with which we embark upon this new phase is matched only by our eagerness to deliver unparalleled service, combining technical prowess with convenience. As we continue to build our legacy, we remain dedicated to fostering a culture of innovation and excellence, reinforcing our position as a frontrunner in the tech repair industry.

With the launch of this new branch, we anticipate the creation of an ecosystem of collaboration, both within our team and with our esteemed clientele. As we chart the course towards this expansion, we extend our gratitude to all who have contributed to our journey thus far, and we welcome the new opportunities that this growth affords us.

Sincerely,

[Your Name]
[Your Position]
MacAuley Tech Repair`}
      </Text>
    </Flex>
  );

  const announcementSection_UpdatedRepairPolicy = (
    <Flex direction="column">
      <Title color="dark" order={3}>
        Updated Company Repair Policy
      </Title>

      <Image
        src="https://images.pexels.com/photos/159220/printed-circuit-board-print-plate-via-macro-159220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Green Computer Circuit Board"
        withPlaceholder
        h="100%"
        w="100%"
        fit="contain"
      />

      <Text color="dark">
        {`
        In our unyielding commitment to perpetually elevate service excellence, we are pleased to apprise our esteemed team members of a pivotal development. Effective immediately, a refined iteration of our repair policies has been meticulously formulated and implemented, signaling a transformative shift in our operational framework.

        These revised policies stand as a blueprint of optimal practices and uncompromising standards, intricately charted to orchestrate the complete spectrum of diagnosing, repairing, and quality assurance procedures. It is paramount that each technician within our cadre comprehends the intricate nuances of these policies, as they are an embodiment of our commitment to delivering a seamless and standardized service.
        
        We earnestly urge all our technicians to embark upon the journey of familiarizing themselves with these updated policies. This endeavor ensures an unswerving alignment with our collective commitment to providing a service that mirrors excellence, consistency, and precision. Through this concerted effort, we harmonize our actions, thereby fortifying our reputation for delivering nothing short of the exemplary.
        
        This recalibration of our repair policies is a resolute step towards refining our service caliber, underscored by our unwavering pursuit of innovation and client contentment. As we forge ahead, enacting these policies will be an embodiment of our pledge to steer the course of MacAuley Tech Repair towards the zenith of industry leadership.
        
        Thank you for your unwavering dedication to our shared pursuit of excellence.
        
        Best regards,
        
        [Your Name]
        [Your Position]
        MacAuley Tech Repair`}
      </Text>
    </Flex>
  );

  const announcementSection_EmployeeAppreciation = (
    <Flex direction="column">
      <Title color="dark" order={3}>
        Employee Appreciation Event
      </Title>

      <Image
        src="https://images.pexels.com/photos/6518674/pexels-photo-6518674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Photo of people at a party"
        withPlaceholder
        h="100%"
        w="100%"
        fit="contain"
      />

      <Text color="dark">
        {`
        As an earnest demonstration of our profound appreciation for your unrelenting dedication and unwavering commitment, we are delighted to unveil a forthcoming event that marks a pivotal milestone on our organizational calendar.

        On the upcoming Friday, we shall convene for an employee appreciation soirée. This convivial gathering is a testament to our recognition of exceptional achievements, a toast to significant milestones, and a celebration of collective accomplishments. It is our ardent desire to come together in an ambiance of camaraderie and merriment.
        
        Details of this event shall be communicated in due course. We encourage you to anticipate an evening that promises camaraderie, jubilant festivities, and a symphony of well-deserved relaxation. Prepare to relinquish the workaday rigors and partake in an atmosphere designed to reinvigorate the spirit and foster connections beyond the confines of our professional endeavors.
        
        As we march forward towards this commemorative event, let us embrace the anticipation of an evening that is more than just a celebration; it is an acknowledgment of the fabric of contributions woven together to create the success story of MacAuley Tech Repair.
        
        Stay tuned for forthcoming communication, as we collectively look forward to sharing in this jubilant occasion.
        
        Sincerely,
        
        [Your Name]
        [Your Position]
        MacAuley Tech Repair`}
      </Text>
    </Flex>
  );

  const announcementSection_TeamBuildingWorkshop = (
    <Flex direction="column">
      <Title color="dark" order={3}>
        Team Building Workshop
      </Title>

      <Image
        src="https://images.pexels.com/photos/2962245/pexels-photo-2962245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Photo of people doing team building activities"
        withPlaceholder
        h="100%"
        w="100%"
        fit="contain"
      />

      <Text color="dark">
        {`
        With a profound commitment to amplifying collaboration and nurturing a seamlessly integrated workforce, we are privileged to unveil an upcoming initiative designed to fortify our collective cohesion.

        Mark your calendars for the upcoming month as we present a comprehensive team-building workshop. This workshop, meticulously curated to enhance our existing synergies, is poised to transcend the boundaries of mere professional partnerships and encapsulate the ethos of a cohesive and united family.
        
        At its core, this workshop is poised to cultivate an environment that promotes a positive workplace culture. Central to its design is the enhancement of communication acumen, a crucial component in our pursuit of effective collaboration. By fostering open lines of dialogue and embracing active listening, we aspire to lay the groundwork for an ecosystem of robust understanding.
        
        Furthermore, the workshop will act as a crucible for the incubation of trust, a quintessential cornerstone of any closely-knit team. This trust, once established, forms the bedrock upon which we can collectively construct remarkable feats, driving us towards the attainment of unprecedented milestones.
        
        We firmly believe that a cohesive team serves as the catalyst for an exceptional working milieu and, inevitably, yields extraordinary outcomes. The unity we cultivate within our ranks is not merely a conceptual ideal; rather, it is the driving force propelling us towards our zenith of achievement.
        
        In line with our convictions, we wholeheartedly encourage each and every member of our esteemed team to partake in this transformative experience. With anticipation, we envisage an engaging, productive, and enlightening session, poised to elevate our collaborative prowess to unprecedented heights.
        
        Stay tuned for forthcoming communications outlining the specifics of this workshop. Together, we are poised to craft a new chapter of teamwork and shared accomplishments.
        
        Warm regards,
        
        [Your Name]
        [Your Position]
        MacAuley Tech Repair
        `}
      </Text>
    </Flex>
  );

  const announcementSection_employeeSurvey = (
    <Flex direction="column">
      <Title color="dark" order={3}>
        Employee Survey
      </Title>

      <Image
        src="https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Photo of successful multiethnic business colleagues on their way to a survey"
        withPlaceholder
        h="100%"
        w="100%"
        fit="contain"
      />

      <Text color="dark">
        {`
        Acknowledging the immense significance of your perspectives and insights, we are embarking upon a paramount initiative to cultivate a more enriched and effective work environment. It is with great anticipation that we unveil the forthcoming implementation of an employee survey, a platform through which we earnestly seek your input to sculpt a more optimal professional landscape.

        Scheduled for the imminent week, this survey is ingeniously crafted to be a conduit for your observations, suggestions, and reflections. The insights garnered from this collaborative endeavor will be instrumental in steering our operational refinement, augmenting the employee experience, and elevating overall workplace contentment to unprecedented heights.
        
        We cordially extend our sincere encouragement for each valued member of our team to actively partake in this endeavor. Your contribution serves as a vital pillar in our collective aspiration to foster a dynamic setting that nurtures growth and bolsters an atmosphere conducive to both personal and professional advancement.
        
        Through this collective effort, we aim not only to embrace the intricate nuances of your needs but to transcend them, actualizing a realm wherein every individual thrives. By accentuating this commitment, we aim to construct a workplace that thrives on your ideas, for it is your ideas that ultimately sculpt our shared journey.
        
        As we embark on this collaborative venture, we wish to express our gratitude in advance for your earnest participation. It is your engagement that serves as the lodestar guiding us towards the pinnacle of excellence in the domain of workplace satisfaction.
        
        With gratitude and optimism,
        
        [Your Name]
        [Your Position]
        MacAuley Tech Repair`}
      </Text>
    </Flex>
  );

  const announcementSection_customerSatisfactionAward = (
    <Flex direction="column">
      <Title color="dark" order={3}>
        Customer Satisfaction Award
      </Title>

      <Image
        src="https://images.pexels.com/photos/3767397/pexels-photo-3767397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Photo of happy young couple doing purchase on the internet together at home"
        withPlaceholder
        h="100%"
        w="100%"
        fit="contain"
      />

      <Text color="dark">
        {`
        It is with immense pride and profound satisfaction that we unveil a noteworthy achievement: MacAuley Tech Repair has once again secured the esteemed 2023 Customer Satisfaction Award, marking a consecutive triumph. This remarkable accolade stands as a resounding testament to our unrelenting dedication to excellence, the hallmark of our service ethos, and our unwavering commitment to cultivating extraordinary customer experiences.

        This prestigious recognition is the fruition of our collective effort, a true testament to the diligence, expertise, and unwavering devotion displayed by each member of our esteemed family. Your relentless pursuit of service par excellence and your fervent dedication to surpassing customer expectations have propelled us to this commendable pinnacle.
        
        At this juncture, we wish to extend our deepest gratitude to every individual whose tireless endeavor has contributed to this accolade. It is your consistent commitment to the ideals of service quality that has led us to this distinguished achievement.
        
        However, let us not forget that this is not merely an endpoint but a stepping stone towards perpetual excellence. Our journey continues, fortified by the foundation of this accomplishment. We look forward to scripting many more chapters of customer delight, surpassing benchmarks, and establishing lasting alliances with our esteemed clientele.
        
        In acknowledgment of this accolade and in view of the path that lies ahead, we convey our heartfelt gratitude to each member of our exceptional team for their role in scripting this remarkable achievement.
        
        With sincere appreciation,
        
        [Your Name]
        [Your Position]
        MacAuley Tech Repair`}
      </Text>
    </Flex>
  );

  const announcementSection_updatedTrainingModules = (
    <Flex direction="column">
      <Title color="dark" order={3}>
        Updated Training Modules
      </Title>

      <Image
        src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Photo of people happily updating their training modules"
        withPlaceholder
        h="100%"
        w="100%"
        fit="contain"
      />

      <Text color="dark">
        {`
          Embracing our unwavering commitment to perpetual advancement, knowledge enrichment, and professional growth, we are thrilled to announce a significant enhancement to our training framework. This augmentation is meticulously designed to align our team with the latest evolutions within the tech repair landscape.

Our updated training modules serve as a cornerstone of this endeavor, meticulously tailored to incorporate cutting-edge industry trends and innovative repair methodologies. These modules have been meticulously crafted to delineate best practices and exacting standards encompassing each facet of diagnosis, repair, and quality assurance procedures.

I am elated to convey that these invaluable resources shall be seamlessly accessible via the portal's dedicated training section. Herein lies a reservoir of transformative knowledge, poised to empower each technician with a profound understanding of contemporary intricacies and techniques.

In alignment with our ceaseless pursuit of excellence, I earnestly encourage every technician within our esteemed ranks to delve into these updated training modules. By immersing yourself in these reservoirs of expertise, you shall be endowed with a reservoir of the most current knowledge and adept skills, instrumental in manifesting an unparalleled echelon of service quality.

Our collective dedication to knowledge absorption is an embodiment of our commitment to our customers—a pledge to consistently deliver superlative service. The fruition of this commitment results not only in satisfied clients but also in each one of you becoming a torchbearer of industry advancement.

As we converge upon this voyage of continuous learning, I extend my utmost appreciation for your unwavering dedication to achieving excellence and remaining at the vanguard of industry dynamics.

Best regards,

[Your Name]
[Your Position]
MacAuley Tech Repair`}
      </Text>
    </Flex>
  );

  const employeeRecognitionSection = (
    <Flex direction="column" rowGap="xl">
      <Title color="dark" order={3}>
        Employee of the Month
      </Title>

      <Image
        src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Photo of visible minority woman wearing black eyeglasses and smiling"
        withPlaceholder
        h="100%"
        w="100%"
        fit="contain"
      />

      <Text color="dark">
        {`
          MacAuley Tech Repair stands poised with pride to cast a luminous spotlight upon those among us who consistently transcend expectations and tread the path of excellence. These remarkable team members exemplify an unwavering commitment that extends far beyond their roles, etching a significant imprint on both our business and the satisfaction of our cherished patrons.

Our organizational ethos champions the culture of honoring achievements, rejoicing in milestones, and extending due reverence to the untiring dedication demonstrated by our exceptionally talented employees. Today, the momentous occasion arrives for us to amplify this sentiment as we bestow well-deserved recognition upon an extraordinary individual.

With a sense of pride and admiration, we officially declare Ravna Bergsndot as the esteemed Employee of the Month for August. Ravna's ascendancy to this commendable accolade underscores the exceptional commitment and contributions she has unfailingly extended to propel our shared success to higher echelons.

Allow me to extend my heartfelt congratulations to Ravna for this well-earned laurel. Your dedication, diligence, and unwavering commitment to our valued customers have earned you this distinction, and it is with immense anticipation that we look forward to your future accomplishments.

In an effort to glean insights into Ravna's journey, we engaged in an interview. Ravna's words underscored a fundamental truth that resonates deeply within us: we are not merely a team; we are, indeed, a family. This sentiment, underpinned by mutual respect and shared aspirations, underscores our ethos. Within this familial construct, our endeavors transcend mere technological repairs; they infuse life's intricate fibers with newfound vitality. This very passion propels us towards the pinnacle of achievement, much like a racecar fueled by burning ardor, sprinting toward the finish line of triumph.

As we celebrate Ravna's accomplishments, let her triumph serve as an inspiration and reminder that each one of us possesses the power to ignite sparks that light the path of success.

With a resounding applause for Ravna's success and the anticipation of the milestones that await us, I extend my heartfelt regards to each member of our distinguished family.

Warm regards,

[Your Name]
[Your Position]
MacAuley Tech Repair`}
      </Text>
    </Flex>
  );

  return (
    <Flex direction="column" rowGap="xl">
      {welcomeSection}
      {announcementSection_Expansion}
      {announcementSection_UpdatedRepairPolicy}
      {announcementSection_EmployeeAppreciation}
      {announcementSection_TeamBuildingWorkshop}
      {announcementSection_employeeSurvey}
      {announcementSection_customerSatisfactionAward}
      {announcementSection_updatedTrainingModules}
      {employeeRecognitionSection}
    </Flex>
  );
}

export { Dashboard };
