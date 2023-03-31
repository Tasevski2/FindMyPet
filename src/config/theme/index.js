import { createTheme } from '@rneui/themed';

const blueColor = {
  blue200: '#90caf9',
  blue500: '#2196f3',
  blue600: '#1e88e5',
  blue800: '#1565c0',
  blue900: '#0d47a1',
};

const lightBlueColor = {
  lightBlue50: '#e1f5fe',
  lightBlue100: '#b3e5fc',
  lightBlue200: '#81d4fa',
  lightBlue300: '#4fc3f7',
  lightBlue400: '#29b6f6',
  lightBlue500: '#03a9f4',
  lightBlue600: '#039be5',
};

const redColor = {
  red300: '#e57373',
  red500: '#f44336',
};

const yellowColor = {
  yellow300: '#fff176',
  yellow500: '#ffeb3b',
};

const greenColor = {
  greenA400: '#00e676',
};

const theme = createTheme({
  lightColors: {
    ...blueColor,
    ...lightBlueColor,
    ...redColor,
    ...yellowColor,
    ...greenColor,
    appBackground: lightBlueColor.lightBlue200,
    cardBackground: lightBlueColor.lightBlue300,
  },
  mode: 'light',
});

export default theme;
