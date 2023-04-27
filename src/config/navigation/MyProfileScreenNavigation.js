import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfileScreen from '../../screens/my-profile';
import MessagesScreen from '../../screens/my-profile/MessagesScreen';
import ChatScreen from '../../screens/my-profile/ChatScreen';
import MyPostsScreen from '../../screens/my-profile/MyPostsScreen';
import SettingsScreen from '../../screens/my-profile/SettingsScreen';
import MyProfileEditScreen from '../../screens/my-profile/MyProfileEdit';

const MyProfileStack = createNativeStackNavigator();

const MyProfileScreenNavigation = () => {
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
        options={{ headerTitle: 'Налогодувања' }}
        name='Settings'
        component={SettingsScreen}
      />
      <MyProfileStack.Screen
        options={{ headerTitle: 'Профил' }}
        name='MyProfileEdit'
        component={MyProfileEditScreen}
      />
    </MyProfileStack.Navigator>
  );
};

export default MyProfileScreenNavigation;
