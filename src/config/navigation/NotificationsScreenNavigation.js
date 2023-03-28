import { createNativeStackNavigator } from '@react-navigation/native-stack';

const NotificationsStack = createNativeStackNavigator();

const NotificationsScreenNavigation = () => {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen name='Notifications' component={null} />
    </NotificationsStack.Navigator>
  );
};

export default NotificationsScreenNavigation;
