import { FlatList, StyleSheet } from 'react-native';
import { NotificationTypeEnum } from '../../../enums';
import { mockNotifications } from '../../../mockData';
import NotificationCard from '../../components/NotificationCard';
import AppLayout from '../../layouts/AppLayout';

const NotificationsScreen = ({ navigation }) => {
  const onCardPress = (notification) => {
    if (notification.type !== NotificationTypeEnum.NEW_SEEN_LOCATION) return;
    navigation.navigate('NewSeenLocationMessage', notification);
  };

  return (
    <AppLayout>
      <FlatList
        data={mockNotifications}
        keyExtractor={(notification) => notification.id}
        renderItem={({ item }) => (
          <NotificationCard {...item} onPress={onCardPress} />
        )}
        style={styles.lostPetsList}
      />
    </AppLayout>
  );
};

const styles = StyleSheet.create({});

export default NotificationsScreen;
