import React from "react";
import { View, Text } from "react-native";
import { ScreenProps } from "../../interfaces/screen";


const UserPanelScreen: React.FC<ScreenProps> = ({ navigation }) => {
    return (
        <View>
            <Text>User panel</Text>
        </View>
    )
}

export default UserPanelScreen;
