type NivoColorScheme =
  | 'nivo'
  | 'category10'
  | 'accent'
  | 'dark2'
  | 'paired'
  | 'pastel1'
  | 'pastel2'
  | 'set1'
  | 'set2'
  | 'set3'
  | 'brown_blueGreen'
  | 'purpleRed_green'
  | 'pink_yellowGreen'
  | 'purple_orange'
  | 'red_blue'
  | 'red_grey'
  | 'red_yellow_blue'
  | 'red_yellow_green'
  | 'spectral'
  | 'blues'
  | 'greens'
  | 'greys'
  | 'oranges'
  | 'purples'
  | 'reds'
  | 'blue_green'
  | 'blue_purple'
  | 'green_blue'
  | 'orange_red'
  | 'purple_blue_green'
  | 'purple_blue'
  | 'purple_red'
  | 'red_purple'
  | 'yellow_green_blue'
  | 'yellow_green'
  | 'yellow_orange_brown'
  | 'yellow_orange_red';

type NivoMotionConfig =
  | 'default'
  | 'gentle'
  | 'wobbly'
  | 'stiff'
  | 'slow'
  | 'molasses';

type NivoTransitionMode =
  | 'startAngle'
  | 'middleAngle'
  | 'endAngle'
  | 'innerRadius'
  | 'centerRadius'
  | 'outerRadius'
  | 'pushIn'
  | 'pushOut';

type FillPatternObject = {
  match: {
    id: string;
  };
  id: string;
};

type NivoLegendAnchor =
  | 'top'
  | 'top-right'
  | 'right'
  | 'bottom-right'
  | 'bottom'
  | 'bottom-left'
  | 'left'
  | 'top-left'
  | 'center';

type NivoLegendDirection = 'row' | 'column';

type NivoLegendItemDirection =
  | 'left-to-right'
  | 'right-to-left'
  | 'top-to-bottom'
  | 'bottom-to-top';

type NivoLegendSymbolShape = 'circle' | 'diamond' | 'square' | 'triangle';

type NivoLineCurve =
  | 'basis'
  | 'cardinal'
  | 'catmullRom'
  | 'linear'
  | 'monotoneX'
  | 'monotoneY'
  | 'monotone'
  | 'natural'
  | 'step'
  | 'stepAfter'
  | 'stepBefore';

type NivoLineAreaBlendMode =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity';

type NivoLineCrosshairType =
  | 'x'
  | 'y'
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'right'
  | 'bottom-right'
  | 'bottom'
  | 'bottom-left'
  | 'left'
  | 'cross';

type NivoColor = string | { from: 'color'; modifiers: string[] };

export type {
  FillPatternObject,
  NivoColor,
  NivoColorScheme,
  NivoLegendAnchor,
  NivoLegendDirection,
  NivoLegendItemDirection,
  NivoLegendSymbolShape,
  NivoLineAreaBlendMode,
  NivoLineCrosshairType,
  NivoLineCurve,
  NivoMotionConfig,
  NivoTransitionMode,
};
