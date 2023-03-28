import { Button, makeStyles } from '@rneui/themed';
import { useState } from 'react';
import { View, Text } from 'react-native';
import AuthLayout from './Layout';
import AuthInput from '../../components/inputs/AuthInput';
import { useValidation } from '../../hooks';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const styles = useStyles();
  const { validateEmail, validatePassword } = useValidation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const onSubmit = () => {
    const { error: emailError } = validateEmail(email);
    const { error: passwordError } = validatePassword(password);

    setErrors({ email: emailError, password: passwordError });
  };

  return (
    <AuthLayout>
      <View>
        <AuthInput
          label='Email'
          value={email}
          onChangeText={setEmail}
          errorMessage={errors.email}
        />
        <AuthInput
          label='Password'
          value={password}
          onChangeText={setPassword}
          errorMessage={errors.password}
          secureTextEntry
        />
      </View>
      <View>
        <Button
          title='Log In'
          containerStyle={styles.submitBtn}
          onPress={onSubmit}
        />
        <Text style={styles.text}>
          No account !? Go to{' '}
          <Text
            style={styles.enhancedText}
            onPress={() => navigation.navigate('Register')}
          >
            Register.
          </Text>
        </Text>
      </View>
    </AuthLayout>
  );
};

export const useStyles = makeStyles((theme) => ({
  submitBtn: {
    borderRadius: 30,
    marginBottom: 20,
    paddingVertical: 8,
  },
  text: {
    color: theme.colors.white,
    alignSelf: 'center',
  },
  enhancedText: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
}));

export default LoginScreen;
