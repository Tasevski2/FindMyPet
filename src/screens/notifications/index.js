import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { NotificationTypeEnum } from '../../../enums';
import NotificationCard from '../../components/NotificationCard';
import AppLayout from '../../layouts/AppLayout';
import { useQuery } from '@tanstack/react-query';
import { API } from '../../api';

const NotificationsScreen = ({ navigation }) => {
  const { data: notifications, isLoading: isLoadingNotifications } = useQuery({
    placeholderData: [],
    queryKey: ['notifications'],
    queryFn: async () => (await API.getNotifications()).data,
  });

  const onCardPress = (notification) => {
    if (notification.type !== NotificationTypeEnum.NEW_SEEN_LOCATION) return;
    navigation.navigate('NewSeenLocationMessage', notification);
  };

  return (
    <AppLayout>
      {isLoadingNotifications ? (
        <ActivityIndicator
          size={'large'}
          color='white'
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={notifications}
          key={(item) => item.id}
          renderItem={({ item }) => (
            <NotificationCard notification={item} onPress={onCardPress} />
          )}
          style={styles.lostPetsList}
        />
      )}
    </AppLayout>
  );
};

const styles = StyleSheet.create({});

export default NotificationsScreen;
