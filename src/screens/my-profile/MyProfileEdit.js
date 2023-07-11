import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import AppLayout from '../../layouts/AppLayout';
import {
  Avatar,
  Button,
  Card,
  Dialog,
  Icon,
  makeStyles,
  useTheme,
} from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import BottomDrawer from '../../components/BottomDrawer';
import MyInput from '../../components/inputs/MyInput';
import { useValidation } from '../../hooks';
import { PHONE_NUMBER_LENGTH } from '../../utils/consts';
import TakeOrChoosePhoto from '../../components/TakeOrChoosePhoto';
import defaultAvatar from '../../assets/avatar.png';
import { useMutation } from '@tanstack/react-query';
import { API } from '../../api';
import { logout, updateUserDetailsAction } from '../../store/actions';

const editableFieldsEnum = {
  photo: 'photo',
  fullName: 'fullName',
  phoneNumber: 'phoneNumber',
  password: 'password',
};

const editableFieldsTitles = {
  photo: 'Слика',
  fullName: 'Целосно Име',
  phoneNumber: 'Телефонски Број',
  password: 'Лозинка',
};

const userFields = [
  {
    canEdit: false,
    label: 'Слика',
    getRightComponent: (user, styles) => (
      <Avatar
        source={user.photo ?? defaultAvatar}
        rounded
        size={50}
        containerStyle={styles.avatarContainer}
      />
    ),
    field: editableFieldsEnum.photo,
  },
  {
    canEdit: false,
    label: 'Емаил',
    getRightComponent: (user) => <Text>{user.email}</Text>,
  },
  {
    canEdit: true,
    label: 'Име и Презиме',
    getRightComponent: (user) => <Text>{user.fullName}</Text>,
    field: editableFieldsEnum.fullName,
  },

  {
    canEdit: true,
    label: 'Телефон',
    getRightComponent: (user) => <Text>{user.phoneNumber}</Text>,
    field: editableFieldsEnum.phoneNumber,
  },
  {
    canEdit: true,
    label: 'Лозинка',
    getRightComponent: () => <Text>********</Text>,
    field: editableFieldsEnum.password,
  },
];

const fieldToEditCmp = {
  fullName: (props) => <FullNameBottomDrawerContent {...props} />,
  phoneNumber: (props) => <PhoneNumberBottomDrawerContent {...props} />,
  password: (props) => <PasswordBottomDrawerContent {...props} />,
  photo: (props) => <PhotoBottomDrawerContent {...props} />,
};

const MyProfileEditScreen = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDrawerVisible, setDrawerVisibility] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState();
  const updateUserDetailsMutation = useMutation({
    mutationFn: async (userData) =>
      (await API.updateUserDetails(userData)).data,
    onSuccess: (res, userData) => {
      if (!userData.newPassword) {
        dispatch(updateUserDetailsAction(userData));
      }
      setDrawerVisibility(false);
    },
  });
  const deleteUserProfileMutation = useMutation({
    mutationFn: async () => (await API.deleteProfile()).data,
    onSuccess: (res, userData) => {
      setShowDeleteDialog(false);
      dispatch(logout());
    },
  });

  const deleteProfile = () => {
    deleteUserProfileMutation.mutate();
  };

  const onFieldPress = (canEdit, field) => {
    if (!canEdit) return;
    setFieldToEdit(field);
    setDrawerVisibility(true);
  };

  const onSaveChanges = (fieldsObj) => {
    updateUserDetailsMutation.mutate(fieldsObj);
  };

  const getFieldToEditCmp = () => {
    if (!fieldToEdit) return null;

    return fieldToEditCmp[fieldToEdit]({
      oldValue: user[fieldToEdit],
      saveChanges: onSaveChanges,
      isUpdating: updateUserDetailsMutation.isLoading,
    });
  };

  return (
    <AppLayout>
      <View style={styles.container}>
        {userFields.map(({ canEdit, label, getRightComponent, field }, ind) => (
          <TouchableWithoutFeedback
            key={ind}
            onPress={() => onFieldPress(canEdit, field)}
            disabled={!canEdit}
          >
            <Card
              wrapperStyle={styles.cardWrapper}
              containerStyle={styles.cardContainer}
            >
              <Text style={styles.label}>{label}</Text>
              <View style={styles.cardRightSide}>
                {getRightComponent(user, styles)}
                {!canEdit ? null : (
                  <Icon
                    type='material'
                    name='arrow-forward-ios'
                    iconStyle={styles.icon}
                  />
                )}
              </View>
            </Card>
          </TouchableWithoutFeedback>
        ))}
        <Button
          containerStyle={styles.deleteBtnContainer}
          buttonStyle={styles.deleteButton}
          titleStyle={styles.btnTitle}
          title='Избриши профил'
          onPress={() => setShowDeleteDialog(true)}
        />
      </View>
      <Dialog
        isVisible={showDeleteDialog}
        onBackdropPress={() => setShowDeleteDialog(false)}
      >
        <Dialog.Title title='Избриши профил' />
        <Text>Дали сте сигурни дека сакате да го избришете профилот?</Text>
        <Dialog.Actions>
          {!deleteUserProfileMutation.isLoading && (
            <Dialog.Button
              title='Не'
              onPress={() => setShowDeleteDialog(false)}
            />
          )}
          <Dialog.Button
            title={
              deleteUserProfileMutation.isLoading ? (
                <ActivityIndicator color={theme.colors.appBackground} />
              ) : (
                'Да'
              )
            }
            onPress={deleteProfile}
            disabled={deleteUserProfileMutation.isLoading}
          />
        </Dialog.Actions>
      </Dialog>
      <BottomDrawer
        isVisible={isDrawerVisible}
        close={() => setDrawerVisibility(false)}
        title={editableFieldsTitles[fieldToEdit]}
      >
        <View style={styles.bottomDrawerContentWrapper}>
          {getFieldToEditCmp()}
        </View>
      </BottomDrawer>
    </AppLayout>
  );
};

const SaveChangesButton = ({ onPress, loading }) => {
  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <Button
      containerStyle={styles.saveChangesBtnContainer}
      buttonStyle={styles.saveChangesBtn}
      titleStyle={styles.btnTitle}
      title='Сочувај ги промените'
      onPress={onPress}
      icon={
        loading && (
          <ActivityIndicator
            color={theme.colors.appBackground}
            style={{ marginLeft: 7 }}
          />
        )
      }
      iconPosition='right'
      disabled={loading}
    />
  );
};

const FullNameBottomDrawerContent = ({
  oldValue = '',
  saveChanges,
  isUpdating,
}) => {
  const { validateLength } = useValidation();
  const [fullName, setFullName] = useState(oldValue);
  const [error, setError] = useState(null);

  const onSubmit = () => {
    const { error: fullNameError } = validateLength(fullName, 'Име и Презиме');
    if (fullNameError) setError(fullNameError);
    else saveChanges({ fullName });
  };

  return (
    <>
      <MyInput
        value={fullName}
        onChangeText={setFullName}
        errorMessage={error}
        icon={{ type: 'material-community', name: 'email' }}
        reverseColor
      />
      <SaveChangesButton onPress={onSubmit} loading={isUpdating} />
    </>
  );
};

const PhoneNumberBottomDrawerContent = ({
  oldValue = '',
  saveChanges,
  isUpdating,
}) => {
  const { validateLength } = useValidation();
  const [phoneNumber, setPhoneNumber] = useState(oldValue);
  const [error, setError] = useState(null);

  const onSubmit = () => {
    const { error: phoneNumberError } = validateLength(phoneNumber, 'Телефон', {
      minLength: PHONE_NUMBER_LENGTH,
      noWhiteSpace: true,
    });
    if (phoneNumberError) setError(phoneNumberError);
    else saveChanges({ phoneNumber });
  };

  return (
    <>
      <MyInput
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ''))}
        errorMessage={error}
        icon={{ type: 'font-awesome-5', name: 'phone' }}
        reverseColor
      />
      <SaveChangesButton onPress={onSubmit} loading={isUpdating} />
    </>
  );
};

const PasswordBottomDrawerContent = ({ saveChanges, isUpdating }) => {
  const { validatePassword } = useValidation();
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = () => {
    const { error: passwordError } = validatePassword(password);
    if (passwordError) {
      setError({ password: passwordError });
      return;
    }
    if (password !== repeatPassword) {
      setError({ repeatPassword: 'Лозинките не се еднакви!' });
      return;
    }
    saveChanges({ newPassword: password });
  };

  return (
    <>
      <MyInput
        label='Лозинка'
        value={password}
        onChangeText={setPassword}
        errorMessage={error?.password}
        icon={{ type: 'font-awesome-5', name: 'lock' }}
        secureTextEntry
        reverseColor
      />
      <MyInput
        label='Повтори лозинката'
        value={repeatPassword}
        onChangeText={setRepeatPassword}
        errorMessage={error?.repeatPassword}
        icon={{ type: 'font-awesome-5', name: 'lock' }}
        secureTextEntry
        reverseColor
      />
      <SaveChangesButton onPress={onSubmit} loading={isUpdating} />
    </>
  );
};

const PhotoBottomDrawerContent = ({ oldValue, saveChanges, isUpdating }) => {
  const [image, setImage] = useState(null);
  const onSubmit = () => {};
  return (
    <>
      <TakeOrChoosePhoto setImage={setImage} />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 100, height: 100, borderRadius: 50, marginTop: 20 }}
        />
      )}
      <SaveChangesButton onPress={onSubmit} loading={isUpdating} />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    position: 'relative',
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContainer: {
    margin: 0,
  },
  cardRightSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
  },
  icon: {
    marginLeft: 5,
    fontSize: 20,
  },
  deleteBtnContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: '80%',
  },
  deleteButton: {
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: theme.colors.red500,
  },
  btnTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatarContainer: {
    backgroundColor: theme.colors.lightBlue100,
  },
  saveChangesBtnContainer: {
    marginTop: 30,
    width: '100%',
  },
  saveChangesBtn: {
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: theme.colors.greenA400,
  },
  bottomDrawerContentWrapper: {
    alignItems: 'center',
  },
}));

export default MyProfileEditScreen;
