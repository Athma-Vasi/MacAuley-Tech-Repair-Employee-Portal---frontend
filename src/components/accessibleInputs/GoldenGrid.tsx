import { Grid } from "@mantine/core";

function GoldenGrid({
  children,
  columns = 50,
  leftSpan = 19,
  rightSpan = 31,
}: {
  /** must be a tuple: [left side, right side] */
  children: [React.ReactNode, React.ReactNode];
  columns?: number;
  leftSpan?: number;
  rightSpan?: number;
}) {
  return (
    <Grid columns={columns}>
      <Grid.Col span={leftSpan}>{children[0]}</Grid.Col>
      <Grid.Col span={rightSpan}>{children[1]}</Grid.Col>
    </Grid>
  );
}

export { GoldenGrid };
