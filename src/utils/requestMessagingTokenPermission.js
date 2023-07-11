import messaging from '@react-native-firebase/messaging';

// Request permission for notifications
export const requestUserMessagingTokenPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return enabled;
};

// Retrieve the device token
export const getDeviceToken = async () => {
  const token = await messaging().getToken();
  return token;
};
