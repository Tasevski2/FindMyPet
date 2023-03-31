import { SearchBar, makeStyles, Icon, useTheme } from '@rneui/themed';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SearchBarHeader = ({ value, onChangeText }) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useStyles({ insetsPaddingTop: insets.top });

  return (
    <View style={styles.container}>
      <SearchBar
        value={value}
        onChangeText={onChangeText}
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        searchIcon={
          <Icon
            type='font-awesome'
            name='search'
            color={theme.colors.white}
            size={20}
          />
        }
        clearIcon={
          <Icon type='ionicon' name='close' onPress={() => onChangeText('')} />
        }
        placeholder='Пребарај...'
        placeholderTextColor={styles.placeholder.color}
        selectionColor={theme.colors.white}
      />
    </View>
  );
};

const useStyles = makeStyles((theme, props) => ({
  container: {
    height: 110,
    paddingTop: props.insetsPaddingTop,
    alignItems: 'center',
    backgroundColor: theme.colors.lightBlue600,
  },
  containerStyle: {
    width: '90%',
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  inputContainerStyle: {
    backgroundColor: 'transparent',
  },
  inputStyle: {
    borderBottomColor: theme.colors.white,
    borderBottomWidth: 1,
    color: theme.colors.white,
  },
  placeholder: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
}));

export default SearchBarHeader;
