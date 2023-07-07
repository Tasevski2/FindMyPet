import messaging from '@react-native-firebase/messaging';

// Request permission for notifications
export const requestUserMessagingTokenPermission = async () => {
  const authStatus = await messaging().requestPermission();
  console.log({ authStatus });
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return Boolean(authStatus);
};

// Retrieve the device token
export const getDeviceToken = async () => {
  const token = await messaging().getToken();
  console.log('Device Token:', token);
  return token;
};
