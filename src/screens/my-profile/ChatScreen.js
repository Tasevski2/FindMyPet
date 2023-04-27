import React, { useCallback, useState, useEffect } from 'react';
import { Actions, GiftedChat } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import avatarPhoto from '../../../src/assets/avatar.png';
import { Icon, useTheme } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const ChatScreen = ({ navigation }) => {
  const user = useSelector((store) => store.user.user);
  const { theme } = useTheme();
  const [messages, setMessages] = useState([]);

  // const renderActions = (props) => {
  //   return (
  //     <Actions
  //       {...props}
  //       options={{
  //         ['Send Image']: handlePickImage,
  //         ['Close']: () => {},
  //       }}
  //       icon={() => <Icon type='material' name='attach-file' size={28} />}
  //       onSend={(args) => console.log(args)}
  //     />
  //   );
  // };

  const renderActions = (props) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          paddingLeft: 5,
        }}
      >
        <TouchableWithoutFeedback onPress={handlePickImage}>
          <Icon type='material' name='add-photo-alternate' size={28} />
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (result.canceled) return;

    let res = await fetch(result.assets[0].uri);
    let blob = await res.blob();

    console.log(result.assets[0].uri);
  };

  useEffect(() => {
    //   const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
    //   const unsubscribe = onSnapshot(q, (snapshot) =>
    //     setMessages(
    //       snapshot.docs.map((doc) => ({
    //         _id: doc.data()._id,
    //         createdAt: doc.data().createdAt.toDate(),
    //         text: doc.data().text,
    //         user: doc.data().user,
    //       }))
    //     )
    //   );
    setTimeout(
      () =>
        setMessages([
          {
            _id: 1,
            createdAt: new Date(),
            text: 'Hello Viktor',
            user: {
              _id: 2,
              name: 'Goran',
              avatar: avatarPhoto,
            },
          },
        ]),
      2000
    );
    //   return () => {
    //     unsubscribe();
    //   };
  }, []);

  const onSend = useCallback((messages = []) => {
    const { _id, createdAt, text, user } = messages[0];

    // addDoc(collection(db, 'chats'), { _id, createdAt, text, user });
    setMessages((prevMsgs) => GiftedChat.append(prevMsgs, messages));
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.id,
        name: user.fullName,
        avatar: user.photo,
      }}
      placeholder='Напиши порака...'
      showUserAvatar
      renderAvatarOnTop
      bottomOffset={0}
      messagesContainerStyle={{
        backgroundColor: theme.colors.whiteSmoke,
      }}
      timeFormat='HH:mm'
      renderActions={renderActions}
    />
  );
};

export default ChatScreen;
