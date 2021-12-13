import { getChatsForUser } from "../firebase-sw-messaging"
import { Text, ScrollView, View, Button } from "react-native";
import React from "react";
import { Link } from "@react-navigation/native";


export default function ChatsList() {
const [chats, setChats] = React.useState([]);

 React.useEffect(() => {
    getChatsForUser().then((chatResults) => {setChats(chatResults)})
 }, [])


return (
<View>
<Text>
User Chat Rooms
</Text>
<ScrollView>
    {chats.map((chatroom) => {
        return (
            <View key={chatroom.id}>
                <Text>{chatroom.date}</Text>
                <Text>{chatroom.name}</Text>
                <Text>{chatroom.venue}</Text>
               <Link to={{ screen: 'Chats', params: { id: chatroom.id } }}>Go to Chatroom</Link>
            </View>
        )
    })}
</ScrollView>
</View>
)

}