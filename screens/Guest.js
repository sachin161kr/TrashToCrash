import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

const GuestScreen = ({navigation, route}) => {
  const image = route.params.imageSelected;

  const itemSelected = route.params.text;

  const description = route.params.description;

  const [loginStatus, setLogin] = useState('');
  const [username, setName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [landmark,setLandmark] = useState('')
  const [pincode,setPincode] = useState('');
  const [address,setAddress] = useState('');
  
  

  const getUser = async () => {
    var tempLoginStatus = await AsyncStorage.getItem('loginStatus');
    var tempUsername = await AsyncStorage.getItem('User');
    var tempAddress = await AsyncStorage.getItem('address');
    var tempEmail = await AsyncStorage.getItem('email');
    var tempPhone = await AsyncStorage.getItem('phone');
    var tempLandmark = await AsyncStorage.getItem('landmark');
    var tempPincode = await AsyncStorage.getItem('pincode');
    
    setLogin(tempLoginStatus);
    setName(tempUsername);
    setAddress(tempAddress);
    setEmail(tempEmail);
    setPhone(tempPhone);
    setLandmark(tempLandmark);
    setPincode(tempPincode);
  };

  getUser();

  

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Image source={image} style={styles.image} />
          <Text
            style={{
              color: '#000000',
              alignSelf: 'center',
              marginTop: 20,
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            {itemSelected} Selected
          </Text>
          <Text
            style={{
              color: '#000000',
              textAlign: 'center',
              margin: 20,
              fontSize: 18,
              fontStyle: 'italic',
            }}>
            {description}
          </Text>

          <View style={styles.loginBtn}>
            <TouchableOpacity
              onPress={() => {
                if (loginStatus == 'true') {
                  navigation.navigate('Pickup Screen', {
                    name: `${username}`,
                    itemSelected : `${itemSelected}`,
                    address : `${address}`,
                    email: `${email}`,
                    phone: `${phone}`,
                    landmark: `${landmark}`,
                    pincode: `${pincode}`,

                  });
                  
                } else {
                  navigation.navigate('Login Screen',{
                    
                    itemSelected : `${itemSelected}`
                    
                  });
                }
              }}>
              {loginStatus == 'true' ? (
                <Text
                  style={{
                    fontSize: 30,
                    alignSelf: 'center',
                    color: '#FFFFFF',
                    margin: 5,
                    paddingBottom: 10,
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}>
                  Continue As {username}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 30,
                    alignSelf: 'center',
                    color: '#FFFFFF',
                    margin: 5,
                    paddingBottom: 10,
                  }}>
                  Login
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {loginStatus == 'true' ? (
            <></>
          ) : (
            <View style={styles.guestRegister}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Guest Pickup Screen', {
                    itemSelected: `${itemSelected}`,
                  });
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    alignSelf: 'center',
                    color: '#000000',
                    margin: 5,
                    paddingBottom: 10,
                  }}>
                  Continue As Guest
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default GuestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },

  image: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginTop: 50,
  },

  loginBtn: {
    marginTop: 25,
    backgroundColor: '#1FAA59',
    marginLeft: 90,
    marginRight: 90,
    borderRadius: 15,
  },

  guestRegister: {
    marginTop: 25,
    borderColor: '#1FAA59',
    borderWidth: 1,
    borderRadius: 15,
    marginLeft: 90,
    marginRight: 90,
    paddingTop: 7,
  },
});
