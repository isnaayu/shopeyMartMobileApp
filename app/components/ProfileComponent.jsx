import { View, Text, TextInput, TouchableOpacity, Linking, Alert, Image } from "react-native";
import React from "react";
import Colors from "../utils/Colors";
import { useNavigation} from "@react-navigation/native"
import { useSelector } from "react-redux";

const ProfilComponent = () => {
  const navigation = useNavigation()
  const usersLogin = useSelector((state)=> state.users.users)

  return (
    <View>
      <View style={styles.container}>
      <Text style={styles.headline}>Profile</Text>
        <Image source={require("../../assets/profil.jpg")} style={styles.imageProfile} /> 
        <View style={styles.infoUsers}>
            <View style={styles.info}>
                <Text>Username : </Text>
                <Text>Isna Ayu Muarofah </Text>
            </View>
            <View style={styles.info}>
                <Text>Role : </Text>
                <Text>Customer </Text>
            </View>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    justifyContent: "center",
    // alignItems: "center",
    marginTop: '35%',
    // flex: 1,
  },
  headline: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: 'uppercase',
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
    color: Colors.PRIMARY
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
    textTransform: 'uppercase',
    backgroundColor: Colors.PRIMARY,
    
  },
  imageProfile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 30,
    marginLeft: '37%',
  },
  infoUsers: {
    padding: 5
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomColor: Colors.SOFT,
    borderBottomWidth: 1,
  }
};

export default ProfilComponent;
