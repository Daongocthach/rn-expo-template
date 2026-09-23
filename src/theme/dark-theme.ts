import type { ThemeColors } from './types';

export const darkColors: ThemeColors = {
  mode: 'dark',

  brand: {
    primary: '#1447E6',
    secondary: '#C7D7FF',
    tertiary: '#FFB34D',
    primaryVariant: '#3B82F6',
    secondaryVariant: '#E0E9FF',
    onBrand: '#FFFFFF',
  },

  background: {
    app: '#08111F',
    surface: '#0D172A',
    surfaceAlt: '#12203A',
    section: '#142848',
    elevated: '#10203A',
    input: '#162948',
    disabled: '#0A1424',
    modal: '#0D172A',
  },

  text: {
    primary: '#F5F9FF',
    secondary: '#C8D6F0',
    tertiary: '#92A8CC',
    muted: '#63789E',
    inverse: '#0F172A',
    accent: '#FFB34D',
    link: '#7EA5FF',
    linkHover: '#A9C3FF',
    onBrand: '#FFFFFF',
  },

  border: {
    default: '#21395E',
    subtle: '#14233D',
    strong: '#3B568A',
    focus: '#3B82F6',
    disabled: '#0A1424',
  },

  icon: {
    primary: '#F5F9FF',
    secondary: '#C8D6F0',
    tertiary: '#9AB2D8',
    muted: '#60759A',
    inverse: '#0F172A',
    accent: '#FFB34D',
    onBrand: '#FFFFFF',
  },

  state: {
    success: '#4ADE80',
    successBg: 'rgba(74, 222, 128, 0.18)',
    warning: '#FFD84C',
    warningBg: 'rgba(255, 216, 76, 0.2)',
    error: '#F87171',
    errorBg: 'rgba(248, 113, 113, 0.2)',
    info: '#60A5FA',
    infoBg: 'rgba(96, 165, 250, 0.2)',
    disabled: '#5B6B4A',
    disabledBg: 'rgba(91, 107, 74, 0.1)',
  },

  overlay: {
    modal: 'rgba(0, 0, 0, 0.7)',
    pressed: 'rgba(20, 71, 230, 0.18)',
    hover: 'rgba(20, 71, 230, 0.1)',
    focus: 'rgba(59, 130, 246, 0.24)',
    ripple: 'rgba(255, 255, 255, 0.2)',
    shadow: 'rgba(0, 0, 0, 0.5)',
  },

  gradient: {
    primary: ['#2E63F5', '#1447E6'],
    secondary: ['#4C7DFF', '#2859B8'],
    accent: ['#5A3A0A', '#C97B1F'],
    success: ['#14532D', '#4ADE80'],
    error: ['#7F1D1D', '#F87171'],
    warning: ['#7A5A12', '#FFD84C'],
    highlight: ['#1B2433', '#3A475D'],
  },

  shadow: {
    color: 'rgba(0, 0, 0, 0.5)',
    elevation: 6,
    elevationSmall: 2,
    elevationMedium: 6,
    elevationLarge: 12,
  },
};

export default darkColors;
