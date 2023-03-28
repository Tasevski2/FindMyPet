import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navigation from './src/config/navigation';
import SplashScreen from './src/screens/SplashScreen';
import { MIN_SPLASH_SCREEN_TIME_MS } from './src/utils/consts';

const App = () => {
  const { user, isLoading } = useSelector((store) => store.user);
  const [shouldShowSplashScreen, setShouldShowSplashScreen] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(
      () => setShouldShowSplashScreen(false),
      MIN_SPLASH_SCREEN_TIME_MS
    );
    return () => clearTimeout(timeout);
  }, []);

  return shouldShowSplashScreen || isLoading ? (
    <SplashScreen />
  ) : (
    <Navigation isAuth={Boolean(user)} />
  );
};

export default App;
