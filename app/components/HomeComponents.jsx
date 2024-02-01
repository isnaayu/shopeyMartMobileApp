import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import Colors from "../utils/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation} from "@react-navigation/native"

const HomeComponent = () => {
    const navigation = useNavigation()
    const handleLogout = ()=> {
        Alert.alert(
          "Are you sure you want to logout?",
          "",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: async () => {
                await AsyncStorage.removeItem('token')
                await AsyncStorage.removeItem('role')
                // await AsyncStorage.removeItem('username')
                // await AsyncStorage.removeItem('password')
                Alert.alert(
                  "Logout Successful",
                  "",
                  [
                    {
                      text: "OK",
                      onPress: () => console.log("OK Pressed"),
                      style: "cancel",
                    },
                  ],
                  navigation.navigate("Login")
                );
              },
            },
          ],
          { cancelable: false }
        );
    }
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.headline}>Home</Text>
        <TouchableOpacity>
            <Text style={styles.button} onPress={handleLogout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "75%",
    // flex: 1,
  },
  headline: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    // color: Colors.PRIMARY,
  },
  input: {
    height: 40,
    width: 300,
    borderWidth: 1,
    borderColor: Colors.SOFT,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    color: Colors.PRIMARY,
  },
  button: {
    height: 40,
    width: 300,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    color: Colors.WHITE,
    textAlign: "center",
    textTransform: "uppercase",
    backgroundColor: Colors.PRIMARY,
  },
};

export default HomeComponent;
