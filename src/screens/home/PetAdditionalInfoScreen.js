import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import AppLayout from '../../layouts/AppLayout';
import { Button, makeStyles } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API } from '../../api';
import { formatDate } from '../../utils/formatDate';
import MyImage from '../../components/MyImage';

const PetAdditionalInfoScreen = (props) => {
  const queryClient = useQueryClient();
  const {
    id,
    name,
    photo,
    petOwner,
    additionalInformation,
    lostAtTime,
    lastSeenAtDate,
    lastSeenAtLocation,
    lostAtLocation,
    shouldShowReportBtn,
    shouldShowDeleteBtn,
  } = props.route.params;

  const navigation = useNavigation();
  const styles = useStyles();
  const deletePostMutation = useMutation({
    mutationFn: async () => (await API.deteleLostPetPost(id)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['all-lost-pets'],
      });
      queryClient.invalidateQueries({ queryKey: ['municipalities'] });
      queryClient.invalidateQueries({ queryKey: ['my-lost-pets'] });
      navigation.goBack();
    },
  });

  const deletePost = () => {
    deletePostMutation.mutate();
  };

  return (
    <AppLayout>
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          <MyImage
            imagePath={photo}
            containerStyle={{
              width: '100%',
              height: Dimensions.get('window').height * 0.3,
            }}
            resizeMode='stretch'
          />
          <View style={styles.info}>
            <Text style={styles.additionalInformation}>
              {additionalInformation}
            </Text>
            <View style={styles.ownerInfo}>
              <Row keyName='Сопственик' value={petOwner.fullName} />
              <Row keyName='Телефон' value={petOwner.phoneNumber} />
            </View>
            <View style={styles.petInfo}>
              <Row keyName='Изгубен на' value={formatDate(lostAtTime)} />
              {lastSeenAtDate && (
                <Row
                  keyName='Последно виден на'
                  value={formatDate(lastSeenAtDate)}
                />
              )}
              {lastSeenAtLocation && (
                <Row
                  keyName='Последно виден на локација'
                  value={lastSeenAtLocation.address}
                />
              )}
            </View>
          </View>
          <View style={styles.buttons}>
            <Button
              title='Види локации'
              containerStyle={styles.seeLocationsBtnContainer}
              buttonStyle={styles.seeLocationsBtn}
              titleStyle={styles.btnTitle}
              onPress={() =>
                navigation.navigate('PetLocations', {
                  id,
                  name,
                  lostAtLocation,
                })
              }
            />
            {shouldShowReportBtn && (
              <Button
                title='Извести за нова локација'
                containerStyle={styles.reportLocationBtnContainer}
                buttonStyle={styles.reportLocationBtn}
                titleStyle={styles.btnTitle}
                onPress={() =>
                  navigation.navigate('ReportNewSeenLocationForPet', {
                    id,
                    name,
                    lostAtLocation,
                  })
                }
              />
            )}
            {shouldShowDeleteBtn && (
              <Button
                title='Избришија објавата'
                containerStyle={styles.reportLocationBtnContainer}
                buttonStyle={styles.reportLocationBtn}
                titleStyle={styles.btnTitle}
                onPress={deletePost}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </AppLayout>
  );
};

const Row = ({ keyName, value }) => {
  const styles = useStyles();
  return (
    <View style={styles.row}>
      <Text style={styles.key}>{keyName}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
    marginBottom: 0,
  },
  wrapper: {
    backgroundColor: theme.colors.whiteSmoke,
    borderRadius: 10,
    padding: 15,
    paddingBottom: 25,
  },
  info: {
    marginVertical: 15,
  },
  additionalInformation: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.lightBlue500,
  },
  ownerInfo: {
    marginBottom: 30,
  },
  petInfo: {},
  row: {
    flexDirection: 'row',
    marginBottom: 7,
    flexWrap: 'wrap',
  },
  key: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.lightBlue600,
    marginRight: 7,
    marginBottom: 3,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.lightBlue500,
  },
  buttons: {},
  seeLocationsBtnContainer: {
    marginBottom: 20,
    borderRadius: 10,
  },
  seeLocationsBtn: {
    backgroundColor: theme.colors.blue900,
    paddingVertical: 10,
  },
  reportLocationBtnContainer: {
    borderRadius: 10,
  },
  reportLocationBtn: {
    backgroundColor: theme.colors.red500,
    paddingVertical: 10,
  },
  btnTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
}));

export default PetAdditionalInfoScreen;
