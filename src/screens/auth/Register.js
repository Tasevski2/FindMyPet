import { View, Text } from 'react-native';
import { Button } from '@rneui/themed';
import { useState } from 'react';
import AuthLayout from './Layout';
import AuthInput from '../../components/inputs/AuthInput';
import { useValidation } from '../../hooks';
import { useStyles } from './Login';
import { useNavigation } from '@react-navigation/native';
import { PHONE_NUMBER_LENGTH } from '../../utils/consts';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const styles = useStyles();
  const { validateEmail, validatePassword, validateLength } = useValidation();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const onSubmit = () => {
    const { error: emailError } = validateEmail(email);
    const { error: passwordError } = validatePassword(password);
    const { error: fullNameError } = validateLength(fullName, 'Full Name');
    const { error: phoneError } = validateLength(phone, 'Phone Number', {
      minLength: PHONE_NUMBER_LENGTH,
      noWhiteSpace: true,
    });

    setErrors({
      email: emailError,
      password: passwordError,
      fullName: fullNameError,
      phone: phoneError,
    });
  };

  return (
    <AuthLayout>
      <View>
        <AuthInput
          label='Full Name'
          value={fullName}
          onChangeText={setFullName}
          errorMessage={errors.fullName}
        />
        <AuthInput
          label='Phone Number'
          value={phone}
          onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))}
          errorMessage={errors.phone}
          keyboardType='numeric'
        />
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
          title='Register'
          containerStyle={styles.submitBtn}
          onPress={onSubmit}
        />
        <Text style={styles.text}>
          Already have an account !? Go to{' '}
          <Text
            style={styles.enhancedText}
            onPress={() => navigation.navigate('LogIn')}
          >
            Log In.
          </Text>
        </Text>
      </View>
    </AuthLayout>
  );
};

export default RegisterScreen;
