import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddScreenNavigation from './AddScreenNavigation';
import HomeScreenNavigation from './HomeScreenNavigation';
import MapScreenNavigation from './MapScreenNavigation';
import NotificationsScreenNavigation from './NotificationsScreenNavigation';
import SettingsScreenNavigation from './SettingsScreenNavigation';

const TabNavigation = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <TabNavigation.Navigator>
      <TabNavigation.Screen
        name='Home'
        components={HomeScreenNavigation}
      ></TabNavigation.Screen>
      <TabNavigation.Screen
        name='Map'
        components={MapScreenNavigation}
      ></TabNavigation.Screen>
      <TabNavigation.Screen
        name='Add'
        components={AddScreenNavigation}
      ></TabNavigation.Screen>
      <TabNavigation.Screen
        name='Notification'
        components={NotificationsScreenNavigation}
      ></TabNavigation.Screen>
      <TabNavigation.Screen
        name='Profile'
        components={SettingsScreenNavigation}
      ></TabNavigation.Screen>
    </TabNavigation.Navigator>
  );
};

export default MainNavigation;
