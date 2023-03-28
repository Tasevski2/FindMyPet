import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AddStack = createNativeStackNavigator();

const AddScreenNavigation = () => {
  return (
    <AddStack.Navigator>
      <AddStack.Screen name='Add' component={null} />
    </AddStack.Navigator>
  );
};

export default AddScreenNavigation;
