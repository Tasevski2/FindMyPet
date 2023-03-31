import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, useTheme } from '@rneui/themed';
import AddScreenNavigation from './AddScreenNavigation';
import HomeScreenNavigation from './HomeScreenNavigation';
import MapScreenNavigation from './MapScreenNavigation';
import NotificationsScreenNavigation from './NotificationsScreenNavigation';
import MyProfileScreenNavigation from './MyProfileScreenNavigation';

const TabNavigator = createBottomTabNavigator();

const MainNavigation = () => {
  const {
    theme: { colors },
  } = useTheme();
  return (
    <TabNavigator.Navigator
      initialRouteName='HomeTab'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.lightBlue50,
        },
      }}
    >
      <TabNavigator.Screen
        name='HomeTab'
        component={HomeScreenNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              type='material'
              name='pets'
              color={getIconColor(colors, focused)}
            />
          ),
        }}
      ></TabNavigator.Screen>
      <TabNavigator.Screen
        name='MapTab'
        component={MapScreenNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              type='font-awesome'
              name='map-marker'
              color={getIconColor(colors, focused)}
            />
          ),
        }}
      ></TabNavigator.Screen>
      <TabNavigator.Screen
        name='AddTab'
        component={AddScreenNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              type='font-awesome-5'
              name='plus'
              color={getIconColor(colors, focused)}
            />
          ),
        }}
      ></TabNavigator.Screen>
      <TabNavigator.Screen
        name='NotificationTab'
        component={NotificationsScreenNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              type='material-community'
              name='bell'
              color={getIconColor(colors, focused)}
            />
          ),
        }}
      ></TabNavigator.Screen>
      <TabNavigator.Screen
        name='MyProfileTab'
        component={MyProfileScreenNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              type='material-community'
              name='account'
              color={getIconColor(colors, focused)}
            />
          ),
        }}
      ></TabNavigator.Screen>
    </TabNavigator.Navigator>
  );
};

const getIconColor = (colors, focused) =>
  focused ? colors.lightBlue600 : colors.lightBlue100;

export default MainNavigation;
