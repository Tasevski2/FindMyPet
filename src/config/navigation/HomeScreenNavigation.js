import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeStack = createNativeStackNavigator();

const HomeScreenNavigation = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='Home' component={null} />
    </HomeStack.Navigator>
  );
};

export default HomeScreenNavigation;
