import { View, Text, TextInput, TouchableOpacity, Linking, Alert } from "react-native";
import React, { useState } from "react";
import Colors from "../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation} from "@react-navigation/native"
import { register } from "../services/UsersService";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { setUsers } from "../store/reducers/usersSlice";
import { validateEmail, validateMobilePhone, validatePassword, validateUsername } from "../validator/InputValidation";

const RegisterComponent = () => {
    const navigation = useNavigation()
  const dispatch = useDispatch()
  const username = useSelector((state)=> state.users.username)
  const password = useSelector((state)=> state.users.password)

  const [formRegister, setFormRegister] = useState({
    username: "",
    password: "",
    address: "",
    mobilePhone: "",
    name: "",
    email: "",
  });

  const handleRegister = async()=> {
  setValidationErrors({});

  const usernameError = validateUsername(formRegister.username);
  const passwordError = validatePassword(formRegister.password);
  const mobilePhoneError = validateMobilePhone(formRegister.mobilePhone);
  const emailError = validateEmail(formRegister.email);

  const errors = {};

  if (usernameError) {
    errors.username = usernameError;
  }

  if (passwordError) {
    errors.password = passwordError;
  }

  if (mobilePhoneError) {
    errors.mobilePhone = mobilePhoneError;
  }

  if (emailError) {
    errors.email = emailError;
  }

  setValidationErrors(errors);

  if (Object.keys(errors).length > 0) {
    return;
  }

  
    try{
        const response = await register({
            username: formRegister.username,
            password: formRegister.password,
            address: formRegister.address,
            mobilePhone: formRegister.mobilePhone,
            name: formRegister.name,
            email: formRegister.email
        })
        dispatch(setUsers(formRegister))
        if(response.status === 200){
            Alert.alert(
                "Registration Successful",
                "Your account has been successfully registered.",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      navigation.navigate("Login");
                    },
                  },
                ]
            )
        }

        console.log(response.data)
    }catch(e){
      Alert.alert(
        "Registration Failed",
        "Your account have no Register. Error! ",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Register");
            },
          },
        ]
    )
        console.log(e)
    }
  }

  return (
    <View> 
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{...styles.container}}>
            <Text style={styles.headline}>Register</Text>
            <TextInput style={styles.input} inlineImageLeft="search_icon" placeholder="Enter Username" value={formRegister.username} onChangeText={(username)=> setFormRegister((prevData) => ({ ...prevData, username: username }))} />
            {validationErrors.username && <Text style={styles.errorText}>{validationErrors.username}</Text>}
            <TextInput style={styles.input} inlineImageLeft="search_icon" placeholder="Enter Password" value={formRegister.password} onChangeText={(password)=> setFormRegister((prevData)=> ({...prevData, password: password}) )} />
            {validationErrors.password && <Text style={styles.errorText}>{validationErrors.password}</Text>}
            <TextInput style={styles.input} inlineImageLeft="search_icon" placeholder="Enter Address" value={formRegister.address} onChangeText={(address)=> setFormRegister((prevData)=> ({...prevData, address: address}) )} />
            <TextInput style={styles.input} inlineImageLeft="search_icon" placeholder="Enter Mobile Phone" value={formRegister.mobilePhone} onChangeText={(mobilePhone)=> setFormRegister((prevData)=> ({...prevData, mobilePhone: mobilePhone}) )} />
            {validationErrors.mobilePhone && <Text style={styles.errorText}>{validationErrors.mobilePhone}</Text>}
            <TextInput style={styles.input} inlineImageLeft="search_icon" placeholder="Enter Fullname" value={formRegister.name} onChangeText={(name)=> setFormRegister((prevData)=> ({...prevData, name: name}) )} />
            <TextInput style={styles.input} inlineImageLeft="search_icon" placeholder="Enter Email" value={formRegister.email} onChangeText={(email)=> setFormRegister((prevData)=> ({...prevData, email: email}) )} />
            {validationErrors.email && <Text style={styles.errorText}>{validationErrors.email}</Text>}
            <Text>Already have a account ? <Text onPress={()=> navigation.navigate("Login")} style={{color: Colors.PRIMARY, fontWeight: 'bold'}}>Login</Text></Text>
            <TouchableOpacity>
                <Text style={styles.button} onPress={handleRegister}>Sign Up</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
  );
};

const styles = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: '35%'
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'left'
  }
  
};

export default RegisterComponent;
