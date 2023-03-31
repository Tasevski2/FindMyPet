import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { makeStyles } from '@rneui/themed';
import NotificationsScreen from '../../screens/notifications';
import NewSeenLocationMessageScreen from '../../screens/notifications/NewSeenLocationMessageScreen';

const NotificationsStack = createNativeStackNavigator();

const NotificationsScreenNavigation = () => {
  const styles = useStyles();
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen
        options={{ title: 'Нотификации' }}
        name='Notifications'
        component={NotificationsScreen}
      />
      <NotificationsStack.Screen
        options={({ route }) => ({
          title: route.params.details.petName,
          headerTitleStyle: styles.title,
        })}
        name='NewSeenLocationMessage'
        component={NewSeenLocationMessageScreen}
      />
    </NotificationsStack.Navigator>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.lightBlue600,
  },
}));

export default NotificationsScreenNavigation;
