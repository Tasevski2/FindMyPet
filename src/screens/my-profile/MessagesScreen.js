import { FlatList, Text, View } from 'react-native';
import SearchBarHeader from '../../components/SearchBarHeader';
import { useState } from 'react';
import AppLayout from '../../layouts/AppLayout';
import { mockMessages } from '../../../mockData';
import MessageCard from '../../components/MessageCard';

// TODO: this component will be finished for higher grade
const MessagesScreen = () => {
  const [search, setSearch] = useState('');
  const [filteredMessages, setFilteredMessages] = useState(mockMessages);

  const onSearchChange = (search) => {
    const _search = search.trim().toLowerCase();
    const filtered = mockMessages.filter((m) =>
      m.fullName.toLowerCase().includes(_search)
    );

    setSearch(search);
    setFilteredMessages(filtered);
  };

  return (
    <AppLayout>
      <SearchBarHeader
        value={search}
        onChangeText={onSearchChange}
        shouldSetInsetPaddingTop={false}
      />
      <FlatList
        data={filteredMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageCard {...item} />}
      />
    </AppLayout>
  );
};

export default MessagesScreen;
