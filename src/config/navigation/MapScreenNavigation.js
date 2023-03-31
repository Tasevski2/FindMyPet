import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '../../screens/map';

const MapStack = createNativeStackNavigator();

const MapScreenNavigation = () => {
  return (
    <MapStack.Navigator>
      <MapStack.Screen
        options={{ headerShown: false }}
        name='Map'
        component={MapScreen}
      />
    </MapStack.Navigator>
  );
};

export default MapScreenNavigation;
