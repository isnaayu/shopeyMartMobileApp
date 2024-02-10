import { View, Text, TextInput, TouchableOpacity, Linking, Alert } from "react-native";
import React from "react";
import Colors from "../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation} from "@react-navigation/native"
import { login } from "../services/UsersService";
import { setPassword, setUsername } from "../store/reducers/usersSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginComponent = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const username = useSelector((state)=> state.users.username)
  const password = useSelector((state)=> state.users.password)

  const handleLogin = async() => {

    
    try{
      const response = await login({
        username: username,
        password: password
      })
      console.log(response)
      if(response.data.statusCode === 201){
        await AsyncStorage.setItem('token', response.data.data.token)
        await AsyncStorage.setItem('role', response.data.data.role)
        dispatch(setUsername(response.data.data.username))
        dispatch(setPassword(response.data.data.password))
        Alert.alert(
          "Login Successful",
          "Lets Enjoy with Us",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Home");
              },
            },
          ]
      )
      }
      console.log(response.data.data.message)
    }catch(e){
      Alert.alert(
        "Login Failed",
        "Password or Username Wrong",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Login");
            },
          },
        ]
      );
      console.log(e)
    }
  }
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.headline}>Login</Text>
        <TextInput style={styles.input} inlineImageLeft="search_icon" placeholder="Enter Username" value={username} onChangeText={(e)=> dispatch(setUsername(e))} />
        <TextInput style={styles.input} inlineImageLeft="search_icon" placeholder="Enter Password" value={password} onChangeText={(e)=> dispatch(setPassword(e))} />
        <Text>Don't have a account ? <Text onPress={()=> navigation.navigate("Register")} style={{color: Colors.PRIMARY, fontWeight: 'bold'}}>Register</Text></Text>
        <TouchableOpacity>
          <Text style={styles.button} onPress={handleLogin}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: '75%',
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
    
  },errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'left'
  }

};

export default LoginComponent;
