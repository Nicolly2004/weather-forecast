import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { getOpenWeaherLink, weatherClassification } from './helper';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Icon  from 'react-native-vector-icons/Entypo';
import {Image} from "expo-image";
import { WeatherCard } from './WeatherCard';


interface WeatherType{
  wind_speed: string;
  weather_type: "Clear"| "Clouds"| "Mist"| "Rain"|"Snow";
  temp: string;
  humidity: string;
  feels_like: string;
}


export default function App() {
  const [city,setCity] = useState("");
  const [citySearch,setCitySearch] = useState("");
  const [weather,setWeather] = useState<WeatherType|null>(null);

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
          <TextInput 
          style={styles.seachInput}
          value={citySearch}
          onChangeText={setCitySearch}
          />
          <Pressable style={styles.seachButton}
          onPress={() => {
            setCity(citySearch);
          }}
          >
            <Icon name="magnifying-glass" size={25}/>
          </Pressable>
        </View>
        {weather && (
        <View style={styles.weatherContent}>
          <Image
          source={weatherClassification(weather?.weather_type)} 
          contentFit= "cover"
          style={styles.weatherImage}
          />
          <View style={styles.weatherDetails}>
            <Text>{weather?.temp} °C</Text>
            <Text>{weather?.weather_type}</Text>
          </View>
          <View style={styles.weatherCards}>

           <WeatherCard 
           iconName='water'
           description='Umidade' 
           text={weather?.humidity}
           isFirst
            />

          <WeatherCard 
           iconName='wind'
           description='Velocidade do vento' 
           text={weather?.wind_speed}
            />

          <WeatherCard 
           iconName='temperature-low'
           description='Sensação Térmica' 
           text={`${weather?.feels_like} °C`}
            />

          </View>
        </View>
)}
      </View>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  weatherCards:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  weatherDetails: {
    flexDirection: "column",
    alignItems: "center",
  },
  weatherContent: {
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  weatherImage:{
    width: 150,
    height: 150,
  },
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
