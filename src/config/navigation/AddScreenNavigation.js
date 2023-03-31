import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddScreen from '../../screens/add';

const AddStack = createNativeStackNavigator();

const AddScreenNavigation = () => {
  return (
    <AddStack.Navigator>
      <AddStack.Screen name='Add' component={AddScreen} />
    </AddStack.Navigator>
  );
};

export default AddScreenNavigation;
