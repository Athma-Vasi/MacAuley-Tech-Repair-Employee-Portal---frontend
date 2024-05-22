import { Grid } from "@mantine/core";

function GoldenGrid({
  children,
  columns = 100,
  leftSpan = 38,
  rightSpan = 62,
}: {
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
