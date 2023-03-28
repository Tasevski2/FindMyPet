import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SettingsStack = createNativeStackNavigator();

const SettingsScreenNavigation = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name='Settings' component={null} />
    </SettingsStack.Navigator>
  );
};

export default SettingsScreenNavigation;
