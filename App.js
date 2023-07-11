import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navigation from './src/config/navigation';
import SplashScreen from './src/screens/SplashScreen';
import { MIN_SPLASH_SCREEN_TIME_MS } from './src/utils/consts';
import { useCheckIfLoggedIn } from './src/hooks';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useCheckIfLoggedIn();
  const { user, isLoading } = useSelector((store) => store.user);
  const [shouldShowSplashScreen, setShouldShowSplashScreen] = useState(true);

  useEffect(() => {
    if (Platform.OS === 'android') {
      (async () => {
        const permissionsPostNotificationsAndroid =
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
      })();
    }

    const timeout = setTimeout(
      () => setShouldShowSplashScreen(false),
      MIN_SPLASH_SCREEN_TIME_MS
    );
    const msgSub = messaging().onMessage((message) => {
      Alert.alert(message.notification.title, message.notification.body);
    });
    return () => {
      clearTimeout(timeout);
      msgSub();
    };
  }, []);

  return shouldShowSplashScreen || isLoading ? (
    <SplashScreen />
  ) : (
    <Navigation isAuth={Boolean(user)} />
  );
};

export default App;
