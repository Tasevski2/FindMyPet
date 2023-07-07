import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/store';
import { ThemeProvider } from '@rneui/themed';
import theme from './src/config/theme';
import App from './App.js';
import { registerRootComponent } from 'expo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import messaging from '@react-native-firebase/messaging';

const queryClient = new QueryClient();

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

function FindMyPet() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <SafeAreaProvider>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </SafeAreaProvider>
        </ReduxProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

registerRootComponent(FindMyPet);
