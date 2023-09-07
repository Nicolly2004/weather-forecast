import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { getOpenWeaherLink } from './helper';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Icon  from 'react-native-vector-icons/Entypo';

export default function App() {
  const [city,setCity] = useState("");
  const[weather,setWeather] = useState({});

  const getCityWeather = async () => {
    const {data: {main,weather,wind:{speed},
  },
 } = await axios.get(getOpenWeaherLink(city));

 setWeather({
  wind_speed: speed,
  weather_type: weather[0].main,
  temp: main.temp,
  humidity: main.humidity,
  feels_like: main.feels_like,
});

};

  useEffect(() => {
    if(city === "") return;
    getCityWeather();
  },[city]);

  return (
    <LinearGradient colors={["#22b3fc", "#bfbfbf"]}
    style={{
      flex: 1,
    }}
    >
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.seachForm}>
          <TextInput style={styles.seachInput}/>
          <Pressable style={styles.seachButton}>
            <Icon name="magnifying-glass" size={25}/>
          </Pressable>
        </View>
      </View>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  seachInput: {
    width: "84%",
    backgroundColor: "#eee",
    padding: 4,
    borderRadius:7,
  },
  seachButton:{
    width: "100%",
    alignItems:"center",
    flex: 1,
    padding:10,
  },
  seachForm: {
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row"
  },
  card:{
    padding:10,
    flex: 1,
    flexDirection: "column",
    gap: 5,
    backgroundColor: "#f9f9fb",
    borderRadius:7,
    marginHorizontal: 10,
  },
  cardButton:{
    padding:5,
  },
});
