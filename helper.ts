const API_KEY = '69b5a50afb7b18d2fd5d1f7d3fd45a5a'


export const getOpenWeaherLink = (cidade: string) => {
 return `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${API_KEY}&lang=pt_br`;
}


export const weatherClassification= (weather: "Clear"| "Clouds"| "Mist"| "Rain"|"Snow") => {

 const imagens = {
    Clear: require('./assets/clear.png'),
    Clouds: require('./assets/cloud.png'),
    Mist: require('./assets/mist.png'),
    Rain: require('./assets/rain.png'),
    Snow: require('./assets/snow.png'),
};

return imagens[weather] ? imagens[weather] : imagens['Clouds']
};

export const translateWeater = (weather: "Clear"| "Clouds"| "Mist"| "Rain"|"Snow") => {
    
    const traducoes = {
        Clear:  "Claro",
        Clouds: "Nublado",
        Mist:   "Nevoeiro",
        Rain:   "Chuvoso",
        Snow:   "Nevando",
    };
  
    return traducoes[weather] ? traducoes[weather] : "Não informado";

}