import { makeStyles, useTheme, Input, Icon } from '@rneui/themed';

const AuthInput = ({
  value,
  onChangeText,
  errorMessage,
  label,
  icon = { type, name },
  ...rest
}) => {
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
      rightIcon={
        icon?.type &&
        icon?.name && (
          <Icon type={icon.type} name={icon.name} color={theme.colors.white} />
        )
      }
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
