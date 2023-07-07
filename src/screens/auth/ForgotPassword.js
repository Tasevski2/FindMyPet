import { View, Text, ActivityIndicator } from 'react-native';
import AuthLayout from '../../layouts/AuthLayout';
import MyInput from '../../components/inputs/MyInput';
import { useState } from 'react';
import { useValidation } from '../../hooks';
import { isEmpty } from 'lodash';
import { Button } from '@rneui/themed';
import { useStyles as useLoginStyles } from './Login';
import { useMutation } from '@tanstack/react-query';
import { API } from '../../api';

const states = {
  INIT: 'INIT',
  SENDING: 'SENDING',
  SENT: 'SENT',
};

const ForgotPasswordScreen = () => {
  const styles = useLoginStyles();
  const { validateEmail } = useValidation();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [state, setState] = useState(states.INIT);
  const resetPasswordMutation = useMutation({
    mutationFn: async (userEmail) => (await API.resetPassword(userEmail)).data,
    onSuccess: (res) => {
      setState(states.SENT);
    },
    onError: () => setState(states.INIT),
  });

  const onSubmit = () => {
    if (state === states.SENDING) return;
    const { error: emailError } = validateEmail(email);
    if (!isEmpty(emailError)) {
      setErrors({ email: emailError });
      return;
    }
    setState(states.SENDING);
    resetPasswordMutation.mutate(email);
  };

  return (
    <AuthLayout>
      <View>
        <MyInput
          label='Емаил'
          value={email}
          onChangeText={setEmail}
          errorMessage={errors.email}
          icon={
            state === states.INIT ? (
              { type: 'material-community', name: 'email' }
            ) : state === states.SENDING ? (
              <ActivityIndicator color={'white'} size={'small'} />
            ) : (
              { type: 'entypo', name: 'check' }
            )
          }
          isIconANode={state === states.SENDING}
        />
      </View>
      <Button
        disabled={state === states.SENT}
        title={
          state === states.SENT
            ? 'Линкот за ресетирање е испратен!'
            : 'Испрати линк за ресетирање!'
        }
        containerStyle={styles.submitBtn}
        onPress={onSubmit}
      />
    </AuthLayout>
  );
};

export default ForgotPasswordScreen;
