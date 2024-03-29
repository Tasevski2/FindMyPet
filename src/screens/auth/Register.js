import { View, Text, ActivityIndicator } from 'react-native';
import { Button, useTheme } from '@rneui/themed';
import { useState } from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import MyInput from '../../components/inputs/MyInput';
import { useValidation } from '../../hooks';
import { useStyles } from './Login';
import { useNavigation } from '@react-navigation/native';
import { PHONE_NUMBER_LENGTH } from '../../utils/consts';
import { useMutation } from '@tanstack/react-query';
import { API } from '../../api';
import { isEmpty } from 'lodash';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const styles = useStyles();
  const { theme } = useTheme();
  const { validateEmail, validatePassword, validateLength } = useValidation();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const registerUserMutation = useMutation({
    mutationFn: async (userData) => await API.registerUser(userData),
    onSuccess: () => navigation.navigate('LogIn'),
    onError: (err) => console.log(err),
  });

  const onSubmit = () => {
    const { error: emailError } = validateEmail(email);
    const { error: passwordError } = validatePassword(password);
    const { error: fullNameError } = validateLength(fullName, 'Име и Презиме');
    const { error: phoneError } = validateLength(phone, 'Телефон', {
      minLength: PHONE_NUMBER_LENGTH,
      noWhiteSpace: true,
    });

    if (
      !(
        isEmpty(emailError) &&
        isEmpty(passwordError) &&
        isEmpty(fullNameError) &&
        isEmpty(phoneError)
      )
    ) {
      setErrors({
        email: emailError,
        password: passwordError,
        fullName: fullNameError,
        phone: phoneError,
      });
      return;
    }
    registerUserMutation.mutate({
      email,
      password,
      fullName,
      phoneNumber: phone,
    });
  };

  return (
    <AuthLayout>
      <View>
        <MyInput
          label='Име и Презиме'
          value={fullName}
          onChangeText={setFullName}
          icon={{ type: 'material-community', name: 'account' }}
          errorMessage={errors.fullName}
        />
        <MyInput
          label='Телефон'
          value={phone}
          onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))}
          errorMessage={errors.phone}
          keyboardType='numeric'
          icon={{ type: 'font-awesome-5', name: 'phone' }}
        />
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
          title={
            registerUserMutation.isLoading ? (
              <ActivityIndicator color={theme.colors.appBackground} />
            ) : (
              'Регистрирај се'
            )
          }
          containerStyle={styles.submitBtn}
          onPress={onSubmit}
          disabled={registerUserMutation.isLoading}
        />
        <Text style={styles.text}>
          Имате профил?{' '}
          <Text
            style={styles.enhancedText}
            onPress={() => navigation.navigate('LogIn')}
          >
            Најавете се!
          </Text>
        </Text>
      </View>
    </AuthLayout>
  );
};

export default RegisterScreen;
