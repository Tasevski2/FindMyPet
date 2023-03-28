import { makeStyles, useTheme, Input } from '@rneui/themed';

const AuthInput = ({ value, onChangeText, errorMessage, label, ...rest }) => {
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <Input
      label={label}
      value={value}
      onChangeText={onChangeText}
      errorMessage={errorMessage}
      selectionColor={theme.colors.white}
      autoCapitalize='none'
      {...styles}
      {...rest}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  labelStyle: {
    color: theme.colors.white,
  },
  inputStyle: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  inputContainerStyle: {
    borderColor: theme.colors.white,
  },
}));

export default AuthInput;
