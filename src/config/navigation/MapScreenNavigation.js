import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MapStack = createNativeStackNavigator();

const MapScreenNavigation = () => {
  return (
    <MapStack.Navigator>
      <MapStack.Screen name='Map' component={null} />
    </MapStack.Navigator>
  );
};

export default MapScreenNavigation;
