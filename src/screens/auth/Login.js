import { Button, makeStyles } from '@rneui/themed';
import { useState } from 'react';
import { View, Text } from 'react-native';
import AuthLayout from '../../layouts/AuthLayout';
import MyInput from '../../components/inputs/MyInput';
import { useValidation } from '../../hooks';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { API } from '../../api';
import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const styles = useStyles();
  const { validateEmail, validatePassword } = useValidation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const loginMutation = useMutation({
    mutationFn: async (userData) => await API.loginUser(userData),
    onSuccess: (res) => dispatch(login(res.data)),
    onError: (err) => console.log(err.message),
  });

  const onSubmit = () => {
    const { error: emailError } = validateEmail(email);
    const { error: passwordError } = validatePassword(password);
    if (!(isEmpty(emailError) && isEmpty(passwordError))) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    loginMutation.mutate({ email, password }); // TODO device token for cloud messages
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
        <Text style={styles.text}>
          Ја заборавивте лозинката?{' '}
          <Text
            style={styles.enhancedText}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            Кликнете тука!
          </Text>
        </Text>
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
