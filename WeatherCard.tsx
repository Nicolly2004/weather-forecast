import { FC, ReactNode } from "react";
import { StyleSheet, View,Text} from "react-native";
import FaIcon from 'react-native-vector-icons/FontAwesome5';



interface WeatherCardProps{
    iconName: string,
    description: string,
    text: string,
    isFirst?:boolean;
}

export const WeatherCard: FC<WeatherCardProps> = ({
    iconName,
    text,
    description,
    isFirst
}) => {
    return (
    <View style={[styles.weatherCard,isFirst ? styles.removeBorderLeft : null]}
    >
    <FaIcon name={iconName} size={20} />
    <Text style={styles.textInfo}>{text}</Text>
    <Text style={styles.textDescription}>{description}</Text>
  </View>
);
    
};

const styles =  StyleSheet.create({
    textDescription: {
      color: "#808080",
      fontSize: 12, 
    },
    textInfo:{
     fontWeight: "bold",
     fontSize: 14,
    },
    weatherCard:{
        flexDirection:"column",
        alignItems:"center",
        borderLeftWidth: 1,
        borderLeftColor: "#e8e8e8",
        gap: 2, 
        flex: 1
    },
    removeBorderLeft:{
        borderLeftWidth: 0,
    },
});