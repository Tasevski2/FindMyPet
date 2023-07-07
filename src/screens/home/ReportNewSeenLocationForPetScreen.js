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
import { API } from '../../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const minReportSeenPetDate = new Date(
  new Date().getTime() - 1 * 24 * 60 * 60 * 1000
);

const ReportNewSeenLocationForPetScreen = (props) => {
  const queryClient = useQueryClient();
  const { name, id } = props.route.params;
  const navigation = useNavigation();
  const user = useSelector((store) => store.user.user);
  const [activeTab, setActiveTab] = useState(0);
  const prevTabRef = useRef(0);
  const [formData, setFormData] = useState({
    location: null,
    image: null,
    fullName: user.fullName,
    phoneNumber: user.phoneNumber,
    seenAtTime: new Date(),
  });
  const reportLostPetMutation = useMutation({
    mutationFn: async ({ formDataToBeSend, fieldsToBeSend }) =>
      (
        await API.reportForNewLocationOfLostPet(
          formDataToBeSend,
          fieldsToBeSend
        )
      ).data,
    onSuccess: (res, userData) => {
      queryClient.invalidateQueries({ queryKey: ['all-pet-locations', id] });
      navigation.goBack();
    },
    onError: (err) => console.log(err),
  });

  const onNext = (tabId, _formData) => {
    if (tabId === 2) {
      // _formData is send only by the last tab
      const seenPetData = { ...formData, ..._formData };
      const fieldsToBeSend = {
        lostPetId: id,
        seenAtTime: seenPetData.seenAtTime.toISOString(),
        longitude: seenPetData.location.longitude,
        latitude: seenPetData.location.latitude,
      };
      const formDataToBeSend = new FormData();
      if (seenPetData.image) {
        formDataToBeSend.append('photo', {
          uri: seenPetData.image.uri,
          type: 'image/' + seenPetData.image.type,
          name: 'seen-pet-' + Date.now() + '.' + seenPetData.image.type,
        });
      }
      reportLostPetMutation.mutate({ formDataToBeSend, fieldsToBeSend });
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
    console.log({ onMapPress: coordinates });
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
          allowCurrentLocation
          currentLocationCb={({ coordinates }) => {
            console.log({ onCurrentPress: coordinates });
            setLocation(coordinates);
          }}
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
  required = false,
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
      <View style={styles.imageWrapper}>
        {image && (
          <>
            <Image
              source={{ uri: image.uri }}
              style={styles.image}
              resizeMode='stretch'
            />
            <Icon
              containerStyle={styles.removeImageContainer}
              style={styles.removeImageIcon}
              type='material-community'
              name='close-thick'
              color={'red'}
              size={35}
              onPress={() => setImage(null)}
            />
          </>
        )}
      </View>
      <ActionsBtns
        tabId={tabId}
        onBack={onBack}
        onNext={onNext}
        disableNext={required && !image}
      />
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
  const [dateSeen, setDateSeen] = useState(new Date());
  const [timeSeen, setTimeSeen] = useState(new Date());
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

    onNext(tabId, {
      fullName,
      phoneNumber,
      seenAtTime: getSeenAtDateAndTime(),
    });
  };

  const getSeenAtDateAndTime = () => {
    var year = dateSeen.getFullYear();
    var month = dateSeen.getMonth();
    var day = dateSeen.getDate();
    var hours = timeSeen.getHours();
    var minutes = timeSeen.getMinutes();
    var seconds = timeSeen.getSeconds();

    return new Date(year, month, day, hours, minutes, seconds);
  };

  useEffect(() => {
    return () =>
      submitData({ fullName, phoneNumber, seenAtTime: getSeenAtDateAndTime() });
  }, [fullName, phoneNumber, dateSeen, timeSeen]);

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
      <View style={{ ...styles.row, marginBottom: 15 }}>
        <Text style={{ ...styles.key }}>Виден на:</Text>
        <View style={styles.row}>
          {/* WE MUST HAVE 2 DATETIMEPICKER BECAUSE WITH MODE DATETIME IT ONLY WILL WORK ON IOS */}
          <View style={{ width: 85, marginRight: 2 }}>
            <DateTimePicker
              value={dateSeen}
              mode='date'
              minimumDate={minReportSeenPetDate}
              maximumDate={new Date()}
              onChange={(e, date) => setDateSeen(date)}
            />
          </View>
          <View style={{ width: 150 }}>
            <DateTimePicker
              value={timeSeen}
              mode='time'
              maximumDate={new Date()}
              onChange={(e, date) => setTimeSeen(date)}
            />
          </View>
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
  imageWrapper: {
    flex: 1,
    marginTop: 20,
    marginBottom: 60,
    position: 'relative',
  },
  image: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  removeImageContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 10,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  removeImageIcon: {},
  contactOwner: {},
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
