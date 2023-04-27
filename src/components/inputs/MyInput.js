import { makeStyles, useTheme, Input, Icon } from '@rneui/themed';

const MyInput = ({
  value,
  onChangeText,
  errorMessage,
  label,
  icon,
  reverseColor = false,
  ...rest
}) => {
  const { theme } = useTheme();
  const mainColor = reverseColor
    ? theme.colors.lightBlue200
    : theme.colors.white;
  const styles = useStyles({ mainColor });
  return (
    <Input
      label={label}
      value={value}
      onChangeText={onChangeText}
      errorMessage={errorMessage}
      selectionColor={mainColor}
      autoCapitalize='none'
      rightIcon={
        icon?.type &&
        icon?.name && (
          <Icon type={icon.type} name={icon.name} color={mainColor} />
        )
      }
      {...styles}
      {...rest}
    />
  );
};

const useStyles = makeStyles((theme, { mainColor }) => ({
  labelStyle: {
    color: mainColor,
  },
  inputStyle: {
    color: mainColor,
    fontWeight: 'bold',
  },
  inputContainerStyle: {
    borderColor: mainColor,
  },
}));

export default MyInput;
