import { Accordion, Card, Grid, Space, Stack, Text, Title } from "@mantine/core";

import { COLORS_SWATCHES } from "../../../constants/data";
import { useGlobalState } from "../../../hooks";
import { returnThemeColors, splitCamelCase } from "../../../utils";
import { ComponentQueryData } from "../../queryBuilder";

type DisplayQueryCardsProps = {
  /**
   * - Query data object containing fields specific to a resource.
   * - Used here to grab the label (camelcased) value for groupedByQueryResponseData (lowercased values)
   */
  componentQueryData: ComponentQueryData[];

  /** radio data labels used to exclude certain fields from having sort arrows displayed */
  groupByRadioData: Array<{ label: string; value: string }>;
  groupedByQueryResponseData: Map<
    string | number | boolean | symbol,
    Record<string, any>[]
  >;
  groupBySelection: string;
};

function Entry({ obj }: { obj: Record<string | number | symbol, any> }) {
  const {
    globalState: { themeObject, padding },
  } = useGlobalState();

  const {
    appThemeColors: { borderColor },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  return (
    <Stack>
      {Object.entries(obj).map(([key, value], index) => {
        const rowBackgroundColorLight = index % 2 === 0 ? "#f9f9f9" : "transparent";
        const rowBackgroundColorDark = "transparent";
        const rowBackgroundColor =
          themeObject.colorScheme === "dark"
            ? rowBackgroundColorDark
            : rowBackgroundColorLight;

        return typeof value === "object" && value !== null && !Array.isArray(value) ? (
          <Stack>
            <Space h="xs" />
            <Text size="lg">{splitCamelCase(key)}</Text>
            <Stack p={padding}>
              <Entry obj={value} />
            </Stack>
            <Space h="xs" />
          </Stack>
        ) : (
          <Grid columns={10} w="100%" style={{ borderBottom: borderColor }}>
            <Grid.Col span={4} style={{ background: rowBackgroundColor }}>
              <Text>{splitCamelCase(key)}</Text>
            </Grid.Col>
            <Grid.Col span={6} style={{ background: rowBackgroundColor }}>
              <Text>{value}</Text>
            </Grid.Col>
          </Grid>
        );
      })}
    </Stack>
  );
}

function DisplayQueryCards({
  componentQueryData,
  groupByRadioData,
  groupBySelection,
  groupedByQueryResponseData,
}: DisplayQueryCardsProps) {
  const displayQueryCards = Array.from(groupedByQueryResponseData).map(
    (responseDataTuple) => {
      console.log("responseDataTuple", responseDataTuple);
      const [groupedFieldTerm, responseData] = responseDataTuple;

      const queryCards = responseData.map((document) => {
        const queryCard = (
          <Card key={document._id} withBorder radius="md">
            <Space h="xl" />
            <Space h="xl" />
            <Entry obj={document} />
          </Card>
        );

        return queryCard;
      });

      return (
        <Accordion w="100%">
          <Accordion.Item value={groupedFieldTerm.toString()}>
            <Accordion.Control>
              <Title order={3}>{groupedFieldTerm.toString()}</Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack w="100%">{queryCards}</Stack>
            c </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      );
    }
  );

  return <Stack w="100%">{displayQueryCards}</Stack>;
}

export default DisplayQueryCards;
