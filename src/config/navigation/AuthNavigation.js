import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/auth/Login';
import RegisterScreen from '../../screens/auth/Register';
import ForgotPasswordScreen from '../../screens/auth/ForgotPassword';

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name='LogIn'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name='Register'
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name='ForgotPassword'
        component={ForgotPasswordScreen}
        options={{ title: 'Заборавена лозинка' }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
