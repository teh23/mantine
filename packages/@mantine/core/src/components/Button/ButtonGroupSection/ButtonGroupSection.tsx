import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getFontSize,
  getRadius,
  getSize,
  MantineGradient,
  MantineRadius,
  MantineSize,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../../core';
import type { ButtonVariant } from '../Button';
import classes from '../Button.module.css';

export type ButtonGroupSectionStylesNames = 'groupSection';
export type ButtonGroupSectionCssVariables = {
  groupSection:
    | '--section-radius'
    | '--section-bg'
    | '--section-color'
    | '--section-bd'
    | '--section-height'
    | '--section-padding-x'
    | '--section-fz';
};

export interface ButtonGroupSectionProps
  extends BoxProps,
    StylesApiProps<ButtonGroupSectionFactory>,
    ElementProps<'div'> {
  /** Key of `theme.radius` or any valid CSS value to set `border-radius` @default `theme.defaultRadius` */
  radius?: MantineRadius;

  /** Gradient configuration used when `variant="gradient"` @default `theme.defaultGradient` */
  gradient?: MantineGradient;

  /** If set, adjusts text color based on background color for `filled` variant */
  autoContrast?: boolean;

  /** Controls section `height`, `font-size` and horizontal `padding` @default `'sm'` */
  size?: MantineSize | `compact-${MantineSize}` | (string & {});
}

export type ButtonGroupSectionFactory = Factory<{
  props: ButtonGroupSectionProps;
  ref: HTMLDivElement;
  stylesNames: ButtonGroupSectionStylesNames;
  vars: ButtonGroupSectionCssVariables;
  variant: ButtonVariant;
}>;

const varsResolver = createVarsResolver<ButtonGroupSectionFactory>(
  (theme, { radius, color, gradient, variant, autoContrast, size }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || 'filled',
      autoContrast,
    });

    return {
      groupSection: {
        '--section-height': getSize(size, 'section-height'),
        '--section-padding-x': getSize(size, 'section-padding-x'),
        '--section-fz': size?.includes('compact')
          ? getFontSize(size.replace('compact-', ''))
          : getFontSize(size),
        '--section-radius': radius === undefined ? undefined : getRadius(radius),
        '--section-bg': color || variant ? colors.background : undefined,
        '--section-color': colors.color,
        '--section-bd': color || variant ? colors.border : undefined,
      },
    };
  }
);

export const ButtonGroupSection = factory<ButtonGroupSectionFactory>((_props, ref) => {
  const props = useProps('ButtonGroupSection', null, _props);
  const {
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    variant,
    gradient,
    radius,
    autoContrast,
    attributes,
    ...others
  } = props;

  const getStyles = useStyles<ButtonGroupSectionFactory>({
    name: 'ButtonGroupSection',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver,
    rootSelector: 'groupSection',
  });

  return <Box {...getStyles('groupSection')} ref={ref} variant={variant} {...others} />;
});

ButtonGroupSection.classes = classes;
ButtonGroupSection.displayName = '@mantine/core/ButtonGroupSection';
