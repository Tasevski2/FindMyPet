import { makeStyles, useTheme, Input, Icon } from '@rneui/themed';

const MyInput = ({
  value,
  onChangeText,
  errorMessage,
  fontSize = 18,
  label,
  icon,
  reverseColor = false,
  containerStyle = {},
  keyboardType = 'default',
  ...rest
}) => {
  const { theme } = useTheme();
  const mainColor = reverseColor
    ? theme.colors.lightBlue500
    : theme.colors.white;
  const styles = useStyles({ mainColor, fontSize });

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
      keyboardType={keyboardType}
      containerStyle={containerStyle}
      {...styles}
      {...rest}
    />
  );
};

const useStyles = makeStyles((theme, { mainColor, fontSize }) => ({
  labelStyle: {
    color: mainColor,
  },
  inputStyle: {
    color: mainColor,
    fontWeight: 'bold',
    fontSize: fontSize,
  },
  inputContainerStyle: {
    borderColor: mainColor,
  },
}));

export default MyInput;
