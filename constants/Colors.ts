import { createTheme } from '@rneui/themed';

const darkColors = {
  primary: '#34577C',
  secondary: '#82AABE',
  background: '#34577C',
  success: '#6EAA6B',
  warning: '#FFD700',
};

const lightColors = {
  primary: '#5C8ABA',
  secondary: '#C5D8E1',
  background: '#5C8ABA',
  success: '#6EAA6B',
  warning: '#FFD700',
};

export const CreateTheme = (mode: 'dark' | 'light') => createTheme({ darkColors, lightColors, mode });