import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfileScreen from '../../screens/my-profile';
import MessagesScreen from '../../screens/my-profile/MessagesScreen';
import ChatScreen from '../../screens/my-profile/ChatScreen';
import MyPostsScreen from '../../screens/my-profile/MyPostsScreen';
import SettingsScreen from '../../screens/my-profile/SettingsScreen';
import MyProfileEditScreen from '../../screens/my-profile/MyProfileEdit';
import PetAdditionalInfoScreen from '../../screens/home/PetAdditionalInfoScreen';
import PetLocationsScreen from '../../screens/home/PetLocationsScreen';
import { makeStyles } from '@rneui/themed';
import PetSeenLocationInfoScreen from '../../screens/home/PetSeenLocationInfoScreen';

const MyProfileStack = createNativeStackNavigator();

const MyProfileScreenNavigation = () => {
  const styles = useStyles();
  return (
    <MyProfileStack.Navigator>
      <MyProfileStack.Screen
        options={{ headerShown: false }}
        name='MyProfile'
        component={MyProfileScreen}
      />
      <MyProfileStack.Screen
        options={{
          headerTitle: 'Пораки',
        }}
        name='Messages'
        component={MessagesScreen}
      />
      <MyProfileStack.Screen
        options={({ route }) => ({ headerTitle: route.params.fullName })}
        name='Chat'
        component={ChatScreen}
      />
      <MyProfileStack.Screen
        options={{}}
        name='MyPosts'
        component={MyPostsScreen}
      />
      <MyProfileStack.Screen
        component={PetAdditionalInfoScreen}
        name='PetAdditionalInfo'
        options={({ route }) => ({
          headerTitle: route.params.name,
          headerTitleStyle: styles.title,
        })}
      />
      <MyProfileStack.Screen
        component={PetLocationsScreen}
        name='PetLocations'
        options={({ route }) => ({
          headerTitle: route.params.name,
          headerTitleStyle: styles.title,
        })}
      />
      <MyProfileStack.Screen
        options={{ headerTitle: 'Налогодувања' }}
        name='Settings'
        component={SettingsScreen}
      />
      <MyProfileStack.Screen
        options={{ headerTitle: 'Профил' }}
        name='MyProfileEdit'
        component={MyProfileEditScreen}
      />
      <MyProfileStack.Screen
        component={PetSeenLocationInfoScreen}
        name='PetSeenLocationInfoScreen'
        options={({ route }) => ({
          headerTitle: route.params.name,
          headerTitleStyle: styles.title,
        })}
      />
    </MyProfileStack.Navigator>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.lightBlue600,
  },
}));

export default MyProfileScreenNavigation;
