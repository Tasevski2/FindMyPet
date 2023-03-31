import { Button, makeStyles, useTheme } from '@rneui/themed';
import { useState } from 'react';
import { FlatList } from 'react-native';

const HorizontalBtnCategorySelection = ({
  categories = [],
  selected = [],
  onChange,
}) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const [_selected, setSelected] = useState(selected);

  const onPress = (category) => {
    const isSelected = _selected.includes(category);
    let _s = [..._selected];
    if (isSelected) {
      _s = _s.filter((c) => c !== category);
    } else {
      _s.push(category);
    }
    setSelected(_s);
    onChange(_s);
  };

  return (
    <FlatList
      horizontal
      keyExtractor={(item) => item}
      data={categories}
      style={styles.list}
      renderItem={({ item }) => (
        <Button
          title={item}
          titleStyle={styles.buttonTitle}
          buttonStyle={{
            ...styles.button,
            backgroundColor: _selected.includes(item)
              ? theme.colors.lightBlue100
              : theme.colors.white,
          }}
          containerStyle={styles.buttonContainer}
          onPress={() => onPress(item)}
        />
      )}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  list: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    maxHeight: 80,
  },
  buttonContainer: { height: 60 },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderWidth: 2,
    backgroundColor: theme.colors.lightBlue100,
    borderRadius: 50,
    fontSize: 12,
    marginRight: 10,
  },
  buttonTitle: {
    fontSize: 14,
    color: theme.colors.blue600,
    fontWeight: 'bold',
  },
}));

export default HorizontalBtnCategorySelection;
