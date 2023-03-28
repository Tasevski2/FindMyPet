import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './src/store';
import { ThemeProvider } from '@rneui/themed';
import theme from './src/config/theme';
import App from './App.js';
import { registerRootComponent } from 'expo';

function FindMyPet() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

registerRootComponent(FindMyPet);
