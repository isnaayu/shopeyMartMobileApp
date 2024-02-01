import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from "react";
import Colors from "../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation} from "@react-navigation/native"
import { login } from "../services/UsersService";
import { setPassword, setUsername } from "../store/reducers/usersSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllProduct } from "../services/ProductService";
import { setProduct } from "../store/reducers/productsSlice";

// const shoes = require('../../../assets/shoes.jpg')

const ProductComponent = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const products = useSelector((state)=> state.products.product)

  useEffect(()=> {
    const fetchProduct = async()=> {
        try{
            const response = await getAllProduct()
            dispatch(setProduct(response.data.data))
            console.log(response.data.data)
        }catch(e){
            console.log(e)
        }
    }
    fetchProduct()
  }, [])

// onPress={() => handleCardPress(index)}
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.headline}>Product</Text>
        <View style={styles.cardContainer}>
        {products.map((product, index) => {
            return (
                <TouchableOpacity key={index} style={styles.card}>
                    <View>
                        <Image source={require("../../assets/shoes.png")} style={{width: 120, height: 90}} />
                    </View>
                    
                    <Text style={styles.cardText}>{product.productName}</Text>
                    <Text style={styles.cardText}>Rp. {product.price}</Text>
                    <Text style={styles.cardText}>Stock: {product.stock}</Text>
                    <Text style={styles.cardText}>{product.description}</Text>
                </TouchableOpacity>
            )
        })}
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    marginTop: '10%',
    padding: 5
  },
  headline: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: 'uppercase', 
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
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '45%',
    alignItems: 'left',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3,
    shadowRadius: 2,
    margin: 7
  },
  cardText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'left'
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: "wrap",
  }
};

export default ProductComponent;
