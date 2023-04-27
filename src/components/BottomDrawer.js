import { Icon, makeStyles } from '@rneui/themed';
import { Dimensions, Modal, TouchableOpacity, View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const BottomDrawer = ({ isVisible, onClose, close, title, children }) => {
  const styles = useStyles();
  return (
    <Modal
      visible={isVisible}
      animationType='slide'
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <TouchableOpacity
          onPress={close}
          style={{ flex: 1 }}
        ></TouchableOpacity>
      </View>
      <View style={styles.bottomSheet}>
        <View style={styles.titleWrapper}>
          <Icon
            type='material'
            name='close'
            containerStyle={styles.closeIconWrapper}
            iconStyle={styles.closeIcon}
            onPress={close}
          />
          <Text style={styles.title}>Промени {title}</Text>
        </View>
        <View style={styles.childrenWrapper}>{children}</View>
      </View>
    </Modal>
  );
};

const useStyles = makeStyles((theme) => ({
  bottomSheet: {
    height: Dimensions.get('window').height * 0.6,
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 23,
    bottom: 0,
    borderWidth: 1,
    borderColor: theme.colors.greyOutline,
    zIndex: 100,
  },
  childrenWrapper: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    width: '100%',
  },
  backdrop: {
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: theme.colors.grey2,
    opacity: 0.6,
    zIndex: 10,
  },
  titleWrapper: {
    width: '100%',
    backgroundColor: theme.colors.grey5,
    position: 'relative',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 7,
  },
  title: {
    color: theme.colors.black,
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
  closeIconWrapper: {
    position: 'absolute',
    top: 8,
    left: 10,
    zIndex: 102,
  },
  closeIcon: {
    fontSize: 26,
  },
}));

export default BottomDrawer;
