import { View, Text, Image, Dimensions } from 'react-native';
import AppLayout from '../../layouts/AppLayout';
import Animated, {
  FadeOutLeft,
  SlideInLeft,
  SlideInRight,
} from 'react-native-reanimated';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Icon, makeStyles, useTheme } from '@rneui/themed';
import Map from '../../components/Map';
import TakeOrChoosePhoto from '../../components/TakeOrChoosePhoto';
import MyInput from '../../components/inputs/MyInput';
import { useValidation } from '../../hooks';
import { PHONE_NUMBER_LENGTH } from '../../utils/consts';

const ReportNewSeenLocationForPetScreen = (props) => {
  const { name } = props.route.params;
  const user = useSelector((store) => store.user.user);
  const [activeTab, setActiveTab] = useState(0);
  const prevTabRef = useRef(0);
  const [formData, setFormData] = useState({
    location: null,
    image: null,
    fullName: user.fullName,
    phoneNumber: user.phoneNumber,
  });

  const onNext = (tabId, _formData) => {
    if (tabId === 2) {
      // _formData is send only by the last tab
      const lostPetData = { ...formData, ..._formData };
      console.log({ lostPetData });
    } else {
      // _formData not needed
      prevTabRef.current = tabId;
      setActiveTab(tabId + 1);
    }
  };

  const onBack = (tabId) => {
    if (tabId === 0) {
      return;
    }
    prevTabRef.current = tabId;
    setActiveTab(tabId - 1);
  };

  const updateFormData = (_formData) => {
    setFormData((prevData) => ({ ...prevData, ..._formData }));
  };

  return (
    <AppLayout>
      {activeTab === 0 && (
        <ChooseLocation
          tabId={0}
          prevTabId={prevTabRef.current}
          initLocation={formData.location}
          onNext={onNext}
          onBack={onBack}
          submitData={updateFormData}
        />
      )}
      {activeTab === 1 && (
        <ChooseImage
          tabId={1}
          prevTabId={prevTabRef.current}
          initImage={formData.image}
          onNext={onNext}
          onBack={onBack}
          submitData={updateFormData}
        />
      )}
      {activeTab === 2 && (
        <ContactAndPreview
          tabId={2}
          initFullName={formData.fullName}
          initPhoneNumber={formData.phoneNumber}
          petName={name}
          location={formData.location}
          onNext={onNext}
          onBack={onBack}
          submitData={updateFormData}
        />
      )}
    </AppLayout>
  );
};

export const ChooseLocation = ({
  tabId,
  prevTabId,
  onNext,
  onBack,
  submitData,
  initLocation,
}) => {
  const styles = useStyles();
  const [location, setLocation] = useState(initLocation);

  useEffect(() => {
    return () => submitData({ location });
  }, [location]);

  const onMapPress = (event) => {
    const coordinates = event.nativeEvent.coordinate;
    setLocation(coordinates);
  };

  return (
    <Animated.View
      entering={prevTabId > tabId ? SlideInLeft : SlideInRight}
      exiting={FadeOutLeft}
      style={styles.card}
    >
      <Text style={styles.cardTitle}>Локација:</Text>
      <View style={styles.mapContaiener}>
        <Map
          onMapPress={onMapPress}
          markers={location ? [{ coordinates: location }] : []}
        />
      </View>
      <ActionsBtns
        tabId={tabId}
        onBack={onBack}
        onNext={onNext}
        disableNext={!location}
      />
    </Animated.View>
  );
};

export const ChooseImage = ({
  tabId,
  prevTabId,
  onNext,
  onBack,
  submitData,
  initImage,
}) => {
  const styles = useStyles();
  const [image, setImage] = useState(initImage);

  useEffect(() => {
    return () => submitData({ image });
  }, [image]);

  return (
    <Animated.View
      entering={prevTabId > tabId ? SlideInLeft : SlideInRight}
      exiting={FadeOutLeft}
      style={styles.card}
    >
      <Text style={styles.cardTitle}>Слика:</Text>
      <TakeOrChoosePhoto setImage={setImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode='stretch'
        />
      )}
      <ActionsBtns tabId={tabId} onBack={onBack} onNext={onNext} />
    </Animated.View>
  );
};

const ContactAndPreview = ({
  tabId,
  onNext,
  onBack,
  submitData,
  initFullName,
  initPhoneNumber,
  petName,
  location,
}) => {
  const styles = useStyles();
  const { validateLength } = useValidation();
  const [fullName, setFullName] = useState(initFullName);
  const [phoneNumber, setPhoneNumber] = useState(initPhoneNumber);
  const [errors, setErrors] = useState();

  const onSend = () => {
    // check validity
    const _errors = {};
    const { error: fullNameError } = validateLength(fullName, 'Име');
    if (fullNameError) _errors.fullName = fullNameError;

    const { error: phoneNumberError } = validateLength(phoneNumber, 'Телефон', {
      minLength: PHONE_NUMBER_LENGTH,
      noWhiteSpace: true,
    });
    if (phoneNumberError) _errors.phoneNumber = phoneNumberError;

    if (Object.keys(_errors).length > 0) {
      setErrors(_errors);
      return;
    }

    onNext(tabId, { fullName, phoneNumber });
  };

  useEffect(() => {
    return () => submitData({ fullName, phoneNumber });
  }, [fullName, phoneNumber]);

  return (
    <Animated.View
      entering={SlideInRight}
      exiting={FadeOutLeft}
      style={styles.card}
    >
      <Text style={styles.cardTitle}>Контакт:</Text>
      {/* owner info */}
      <View style={styles.contactOwner}>
        <View style={styles.row}>
          <Text style={styles.key}>Име:</Text>
          <MyInput
            value={fullName}
            onChangeText={setFullName}
            reverseColor
            fontSize={16}
            errorMessage={errors?.fullName}
            containerStyle={styles.inputContainer}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Телефон:</Text>
          <MyInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            reverseColor
            fontSize={16}
            errorMessage={errors?.phoneNumber}
            containerStyle={styles.inputContainer}
          />
        </View>
      </View>
      {/* pet info */}
      <View style={styles.hr}></View>
      <View>
        <View style={{ ...styles.row, opacity: 0.6 }}>
          <Text style={styles.key}>Изгубен миленик:</Text>
          <Text style={styles.value}>{petName}</Text>
        </View>
      </View>
      <Text
        style={{ ...styles.key, marginBottom: 5, marginTop: 10, opacity: 0.6 }}
      >
        Нова локација:
      </Text>
      <View style={styles.mapContaiener}>
        <Map markers={[{ coordinates: location }]} />
      </View>
      <ActionsBtns tabId={tabId} onBack={onBack} onNext={onSend} />
    </Animated.View>
  );
};

export const ActionsBtns = ({ tabId, onBack, onNext, disableNext }) => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View style={styles.actionBtnsContainer}>
      {tabId !== 0 && (
        <Button
          title='Назад'
          icon={
            <Icon
              type='material'
              name='arrow-back-ios'
              color={theme.colors.white}
            />
          }
          onPress={() => onBack(tabId)}
          containerStyle={styles.actionBtnContainer}
          buttonStyle={styles.defaultActionBtn}
          titleStyle={styles.defaultActionBtnTitle}
        />
      )}
      {tabId === 2 ? (
        <Button
          title={'Додади'}
          onPress={() => onNext(tabId)}
          icon={
            <Icon
              type='ionicon'
              name='add'
              color={theme.colors.white}
              style={{ marginLeft: 7 }}
            />
          }
          iconPosition='right'
          containerStyle={{
            ...styles.actionBtnContainer,
            marginLeft: 'auto',
          }}
          buttonStyle={styles.sendActionBtn}
          titleStyle={styles.sendActionBtnTitle}
          disabled={disableNext}
        />
      ) : (
        <Button
          title={'Следно'}
          icon={
            <Icon
              type='material'
              name='arrow-forward-ios'
              color={theme.colors.white}
            />
          }
          iconPosition='right'
          onPress={() => onNext(tabId)}
          containerStyle={{ ...styles.actionBtnContainer, marginLeft: 'auto' }}
          buttonStyle={styles.defaultActionBtn}
          titleStyle={styles.defaultActionBtnTitle}
          disabled={disableNext}
        />
      )}
    </View>
  );
};

export const useStyles = makeStyles((theme) => ({
  card: {
    flex: 1,
    margin: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: theme.colors.whiteSmoke,
    position: 'relative',
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.lightBlue600,
    textAlign: 'center',
    marginBottom: 20,
  },
  actionBtnsContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 15,
    left: 15,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionBtnContainer: {
    borderRadius: 10,
  },
  defaultActionBtn: {
    backgroundColor: theme.colors.blue800,
    paddingVertical: 10,
    disabled: {
      color: 'white',
    },
  },
  defaultActionBtnTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  sendActionBtn: {
    backgroundColor: theme.colors.blue900,
    paddingVertical: 12,
  },
  sendActionBtnTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  mapContaiener: {
    flex: 1,
    marginBottom: 60,
  },
  image: {
    flex: 1,
    marginTop: 20,
    marginBottom: 60,
    borderRadius: 10,
  },
  contactOwner: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  key: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.lightBlue500,
    marginRight: 7,
  },
  value: {
    fontSize: 18,
    fontWeight: 500,
    color: theme.colors.lightBlue500,
  },
  hr: {
    marginLeft: -15,
    marginBottom: 10,
    width: Dimensions.get('window').width,
    height: 1.2,
    opacity: 0.3,
    backgroundColor: theme.colors.lightBlue500,
  },
  inputContainer: {
    flex: 1,
  },
}));

export default ReportNewSeenLocationForPetScreen;
