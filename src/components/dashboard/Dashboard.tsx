import { Button, Flex, Image, Spoiler, Text, Title } from '@mantine/core';
import { AxiosRequestConfig } from 'axios';
import { compress, compressAccurately } from 'image-conversion';
import { useEffect, useState } from 'react';

import { axiosInstance } from '../../api/axios';
import { COLORS } from '../../constants/data';
import { useAuth } from '../../hooks/useAuth';
import { useGlobalState } from '../../hooks/useGlobalState';

function Dashboard() {
  const {
    globalState: { colorScheme, width },
  } = useGlobalState();
  const {
    authState: { accessToken },
  } = useAuth();

  const {
    lightTextColor,
    buttonTextColor,
    darkTextColor,
    lightRowBGColor,
    darkRowBGColor,
  } = COLORS;
  const textColor = colorScheme === 'dark' ? lightTextColor : darkTextColor;

  useEffect(() => {
    function timeToReadCalc(text: string[]) {
      return Math.ceil(text.join(' ').split(' ').length / 200);
    }

    const welcomeSectionTimeToRead = timeToReadCalc([
      'Welcome to MacAuley Tech Repair!',

      'We are thrilled to extend a warm and heartfelt welcome to each and every member of our exceptional team. Your expertise, dedication, and passion for technology repair are invaluable to our success, and we truly appreciate the contributions you make to our business every day.',

      "At MacAuley Tech Repair, we understand the vital role you play in ensuring our customers' devices are repaired swiftly and effectively. Your commitment to delivering top-notch service and technical expertise is what sets us apart in the industry.",

      "This employee portal is designed to be your gateway to a wealth of resources, support, and collaboration. Here, you'll find everything you need to excel in your role, including training materials, company policies, and the latest updates. It's a place where knowledge is shared, skills are honed, and new ideas flourish.",

      "We believe in fostering a positive work environment that encourages growth, innovation, and teamwork. Your dedication and commitment to providing outstanding customer experiences are the driving force behind our success. Together, we'll continue to exceed expectations and build lasting relationships with our valued clients.",

      'As you embark on this exciting journey with MacAuley Tech Repair, remember that you are an essential part of our family. We encourage you to share your insights, collaborate with your colleagues, and explore new opportunities for personal and professional development. Your talents and expertise are the foundation upon which we build our reputation as a leading tech repair business.',

      'Once again, welcome to MacAuley Tech Repair! We are thrilled to have you on board, and we look forward to achieving great things together.',

      'Sincerely,',

      'Michael Scott',

      'CEO, MacAuley Tech Repair',
    ]);

    console.log({ welcomeSectionTimeToRead });
  }, []);

  const welcomeSection = (
    <Flex w="100%" direction="column" rowGap="sm">
      <Title color={buttonTextColor} order={3}>
        Welcome
      </Title>
      <Image
        src="https://images.pexels.com/photos/7792804/pexels-photo-7792804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Triumphant Colleagues doing a Fist Bump"
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
          <Text color={textColor}>Welcome to MacAuley Tech Repair!</Text>

          <Text color={textColor}>
            We are thrilled to extend a warm and heartfelt welcome to each and
            every member of our exceptional team. Your expertise, dedication,
            and passion for technology repair are invaluable to our success, and
            we truly appreciate the contributions you make to our business every
            day.
          </Text>
          <Text color={textColor}>
            This employee portal is designed to be your gateway to a wealth of
            resources, support, and collaboration. Here, you'll find everything
            you need to excel in your role, including training materials,
            company policies, and the latest updates. It's a place where
            knowledge is shared, skills are honed, and new ideas flourish.
          </Text>
          <Text color={textColor}>
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
      <Title color={buttonTextColor} order={3}>
        Company Expansion
      </Title>

      <Image
        src="https://images.pexels.com/photos/3184429/pexels-photo-3184429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Photo Of People Doing Handshake"
        withPlaceholder
        h="100%"
        w="100%"
        fit="contain"
      />

      <Text color={textColor}>
        We are excited to announce that MacAuley Tech Repair is expanding its
        operations! We will be opening a new branch in a prime location downtown
        to better serve our growing customer base. This expansion presents
        exciting opportunities for our team, and we look forward to the
        continued success and growth of our business.
      </Text>
    </Flex>
  );

  const announcementSection_UpdatedRepairPolicy = (
    <Flex direction="column">
      <Title color={buttonTextColor} order={3}>
        Updated Repair Policy
      </Title>

      <Image
        src="https://images.pexels.com/photos/159220/printed-circuit-board-print-plate-via-macro-159220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Green Computer Circuit Board"
        withPlaceholder
        h="100%"
        w="100%"
        fit="contain"
      />

      <Text color={textColor}>
        To enhance our service quality and streamline operations, we have
        implemented updated repair policies. These policies outline the best
        practices and standards for diagnosing, repairing, and quality assurance
        processes. We encourage all technicians to familiarize themselves with
        the updated policies to ensure consistent service delivery.
      </Text>
    </Flex>
  );

  const announcementSection_EmployeeAppreciation = (
    <Flex direction="column">
      <Title color={buttonTextColor} order={3}>
        Employee Appreciation Event
      </Title>

      <Image
        src="https://images.pexels.com/photos/6518674/pexels-photo-6518674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Photo Of People At A Party"
        withPlaceholder
        h="100%"
        w="100%"
        fit="contain"
      />

      <Text color={textColor}>
        As a token of our gratitude for your hard work and dedication, we will
        be hosting an employee appreciation event next Friday, where we will
        recognize outstanding achievements, celebrate milestones, and enjoy a
        fun-filled evening together. Stay tuned for more details and get ready
        to let loose and unwind!
      </Text>
    </Flex>
  );

  const announcementSection_TeamBuildingWorkshop = (
    <Flex direction="column">
      <Title color={buttonTextColor} order={3}>
        Team Building Workshop
      </Title>

      <Image
        src="https://images.pexels.com/photos/2962245/pexels-photo-2962245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Photo Of People Doing Team Building Activities"
        withPlaceholder
        h="100%"
        w="100%"
        fit="contain"
      />

      <Text color={textColor}>
        To strengthen collaboration and foster a cohesive family, we are pleased
        to announce that we will be hosting a team building workshop next month.
        This workshop will focus on fostering a positive work environment,
        enhance communication skills, building trust, and strengthen our bonds
        as a family. We believe that a united team creates an exceptional work
        environment and delivers exceptional results. We encourage all team
        members to attend and look forward to a productive and engaging session.
      </Text>
    </Flex>
  );

  const announcementSection_employeeSurvey = (
    <Flex direction="column">
      <Title color={buttonTextColor} order={3}>
        Employee Survey
      </Title>

      <Image
        src="https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Photo Of Successful multiethnic business colleagues on their way to survey"
        withPlaceholder
        h="100%"
        w="100%"
        fit="contain"
      />

      <Text color={textColor}>
        We value your feedback and opinions. We will be conducting an employee
        survey next week to gather insights and suggestions on how we can
        improve our processes, employee experience, and overall workplace
        satisfaction. Your participation is highly encouraged as we strive to
        create an environment where everyone can thrive and grow and ensure that
        we are providing the best possible experience for our team. Thank you
        for your participation!
      </Text>
    </Flex>
  );

  const announcementSection_customerSatisfactionAward = (
    <Flex direction="column">
      <Title color={buttonTextColor} order={3}>
        Customer Satisfaction Award
      </Title>

      <Image
        src="https://images.pexels.com/photos/3767397/pexels-photo-3767397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Photo Of Happy young couple doing purchase on Internet together at home"
        withPlaceholder
        h="100%"
        w="100%"
        fit="contain"
      />

      <Text color={textColor}>
        We are delighted to announce that MacAuley Tech Repair has been awarded
        the 2023 Customer Satisfaction Award for the second year in a row. This
        award is a testament to our commitment to providing exceptional service
        and delivering outstanding customer experiences. We would like to thank
        our family for their hard work and dedication to our customers. We look
        forward to continuing to exceed expectations and building lasting
        relationships with our valued clients.
      </Text>
    </Flex>
  );

  const announcementSection_updatedTrainingModules = (
    <Flex direction="column">
      <Title color={buttonTextColor} order={3}>
        Updated Training Modules
      </Title>

      <Image
        src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Photo Of People Updating their Training Modules"
        withPlaceholder
        h="100%"
        w="100%"
        fit="contain"
      />

      <Text color={textColor}>
        In our pursuit of continuous learning and professional development, we
        have updated our training modules to incorporate the latest industry
        trends and repair techniques. These modules outline the best practices
        and standards for diagnosing, repairing, and quality assurance
        processes. These resources will be available on the portal's training
        section and we encourage all technicians to familiarize themselves with
        the updated training modules to ensure that you have access to the most
        up-to-date knowledge and skills necessary to deliver top-notch service
        to our valued customers.
      </Text>
    </Flex>
  );

  const employeeRecognitionSection = (
    <Flex direction="column" rowGap="xl">
      <Title color={buttonTextColor} order={3}>
        Employee Recognition
      </Title>

      <Image
        src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Photo Of Woman Wearing Black Eyeglasses Smiling"
        withPlaceholder
        h="100%"
        w="100%"
        fit="contain"
      />

      <Text color={textColor}>
        MacAuley Tech Repair is proud to shine a spotlight on our exceptional
        team members who consistently go above and beyond in their roles,
        delivering outstanding results and making a significant impact on our
        business and customers. We believe in celebrating achievements,
        milestones, and the dedication of our talented employees. Today, we
        recognize one outstanding individual who has demonstrated exceptional
        commitment and outstanding contributions to our success.
      </Text>

      <Text color={textColor}>
        We are pleased to announce that the Employee of the Month for August is
        <Text color={buttonTextColor}>Ravna Bergsndot</Text>. Congratulations on
        this well-deserved recognition! We appreciate your hard work and
        dedication to our customers and look forward to your continued success.
      </Text>

      <Text color={textColor}>
        We interviewed Ravna and here is what Ravna had to say regarding her
        success:
      </Text>
      <Text color={textColor}>
        You see, we're not just a team—we're family. Remember, in this family,
        we don't just fix tech—we ignite a spark in people's lives. And with
        that burning passion, we'll race to the finish line of success.
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
