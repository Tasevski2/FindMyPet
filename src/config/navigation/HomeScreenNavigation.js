import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home';

const HomeStack = createNativeStackNavigator();

const HomeScreenNavigation = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        component={HomeScreen}
        name='Home'
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeScreenNavigation;
