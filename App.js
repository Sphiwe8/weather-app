import  React, {useState, useCallback} from 'react';

import { ImageBackground,TextInput, Text, View, StyleSheet, ActivityIndicator, } from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';

// You can import from local files


// or any pure javascript modules available in npm


const App = () => {
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

    const api = {
    key: '21c10543ae6f7aaa4ca0542494421964',
    baseUrl: 'http://api.openweathermap.org/data/2.5/',
  };

const fetchDataHandler = useCallback(() => { 
  setLoading(true);
    setInput('');
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,

      
    })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => {
        console.dir(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [api.key, input]);

  return (
    <View style={styles.container}>
    <ImageBackground
       source={require('./assets/bg9.jpeg')}
        resizeMode="cover"
        style={styles.image}>

<View>
          <TextInput
            placeholder="Enter city name and press return..."
            style={styles.textInput}
            onChangeText={text => setInput(text)}
            placeholderTextColor={'#000'}
            onSubmitEditing={fetchDataHandler}
            value={input}
          />
        </View>

         {loading && (
          <View>
            <ActivityIndicator size={'large'} color={'#fff'} />
          </View>
        )}

        {data && (
          <View style={styles.infoView}>
            <Text
              style={
                styles.cityCountryText
              }>{`${data?.name}, ${data?.sys?.country}`}</Text>
            <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
            <Text style={styles.tempText}>{`${Math.round(
              data?.main?.temp,
            )} °C`}</Text>
            <Text style={styles.minMaxText}>{`Min ${Math.round(
              data?.main?.temp_min,
            )} °C / Max ${Math.round(data?.main?.temp_max)} °C`}</Text>
          </View>
        )}


    </ImageBackground>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },


image: {
  flex: 1,
  flexDirection: 'column',

},

  dateText: {
    color: '#fff',
    fontSize: 22,
    marginVertical: 10,
  },
  tempText: {
    fontSize: 35,
    color: '#fff' ,
    marginVertical: 10,
  },
  minMaxText: {
    fontSize: 22,
    color: '#FFF',
    marginVertical: 10,
    fontWeight: '500',
  },

  textInput: {
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 19,
    fontWeight: '300',
    borderRadius: 16,
    borderBottomColor: '#df8e00',
  },

   cityCountryText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    
  },

  infoView: {
    alignItems: 'center',
  },





});

export default App





