import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfileScreen from '../../screens/my-profile';

const MyProfileStack = createNativeStackNavigator();

const MyProfileScreenNavigation = () => {
  return (
    <MyProfileStack.Navigator>
      <MyProfileStack.Screen
        options={{ headerShown: false }}
        name='MyProfile'
        component={MyProfileScreen}
      />
    </MyProfileStack.Navigator>
  );
};

export default MyProfileScreenNavigation;
