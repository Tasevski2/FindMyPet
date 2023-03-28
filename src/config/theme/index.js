import { createTheme } from '@rneui/themed';

const blueColor = {
  blue200: '#90caf9',
  blue500: '#2196f3',
  blue600: '#1e88e5',
  blue800: '#1565c0',
  blue900: '#0d47a1',
};

const lightBlueColor = {
  lightBlue200: '#81d4fa',
  lightBlue300: '#4fc3f7',
};

const theme = createTheme({
  lightColors: {
    ...blueColor,
    ...lightBlueColor,
    cardBackground: lightBlueColor.lightBlue300,
  },
  mode: 'light',
});

export default theme;
