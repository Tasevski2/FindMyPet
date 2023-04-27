import { Button, makeStyles } from '@rneui/themed';
import { useState } from 'react';
import { View, Text } from 'react-native';
import AuthLayout from '../../layouts/AuthLayout';
import MyInput from '../../components/inputs/MyInput';
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
        <MyInput
          label='Емаил'
          value={email}
          onChangeText={setEmail}
          errorMessage={errors.email}
          icon={{ type: 'material-community', name: 'email' }}
        />
        <MyInput
          label='Лозинка'
          value={password}
          onChangeText={setPassword}
          errorMessage={errors.password}
          icon={{ type: 'font-awesome-5', name: 'lock' }}
          secureTextEntry
        />
      </View>
      <View>
        <Button
          title='Најави се'
          containerStyle={styles.submitBtn}
          onPress={onSubmit}
        />
        <Text style={styles.text}>
          Немате профил?{' '}
          <Text
            style={styles.enhancedText}
            onPress={() => navigation.navigate('Register')}
          >
            Регистрирајте се!
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
