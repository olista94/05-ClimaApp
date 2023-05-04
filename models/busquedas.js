
// import axios from 'axios';
const axios = require('axios');
const colors = require('colors');

class Busquedas {

    historial = ['Ourense', 'A Coruña', 'Vigo', 'Lugo', 'Santiago de Compostela', 'Pontevedra'];

    constructor(){
        // TODO: leer DB si existe
    }

    async ciudad ( ciudad = '' ){

        try{
            
            const resp = await axios.get(`https://geocode.maps.co/search?q=${ ciudad }`);

            const ciudades =  resp.data.slice(0, 5).map( element => {

                return{
                    id: element.place_id,
                    nombre: element.display_name,
                    latitud: element.lat,
                    longitud: element.lon
                }
            });

            return ciudades;

        } catch ( error ){
            console.log(error);
        }
        
    }

    async climaCiudad ( lat = '', lon = '' ){

        try{


            const resp2 = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${ lat }&longitude=${ lon }&daily=temperature_2m_max,temperature_2m_min&current_weather=true&forecast_days=1&timezone=Europe%2FBerlin`);

            // console.log(resp2.data);
            // console.log(resp2.data.current_weather.weathercode);

            return {
                temperatura: resp2.data.current_weather.temperature,
                minima: resp2.data.daily.temperature_2m_max[0], 
                maxima: resp2.data.daily.temperature_2m_min[0],
                parte: this.weatherCode( resp2.data.current_weather.weathercode )
                // parte: resp2.data.current_weather.weathercode
            }

        } catch( error ){
            console.log( error );
        }
    }
    
    function weatherCode ( weathercode ){

        return new Promise( function( resolve, reject ){
            
            let climaStr;

            switch( weathercode ) {

                case 0:
                  climaStr = 'Cielo despejado';
                  break;
                case 1:
                  climaStr = 'Principalmente despejado';
                case 2:
                  climaStr = 'Parcialmente nublado';
                case 3:
                  climaStr = 'Nublado';
                  break;
                case 45:
                  climaStr = 'Niebla';
                  break;
                case 48:
                  climaStr = 'Niebla calcárea depositada';
                  break;
                case 51:
                  climaStr = 'Llovizna ligera';
                  break;
                case 53:
                  climaStr = 'Llovizna moderada';
                  break;
                case 55:
                  climaStr = 'Llovizna densa';
                  break;
                case 56:
                  climaStr = 'Llovizna helada ligera';
                  break;
                case 57:
                  climaStr = 'Llovizna helada densa';
                  break;
                case 61:
                  climaStr = 'Lluvia ligera';
                  break;
                case 63:
                  climaStr = 'Lluvia moderada';
                  break;
                case 65:
                  climaStr = 'Lluvia fuerte';
                  break;
                case 66:
                  climaStr = 'Lluvia helada ligera';
                  break;
                case 67:
                  climaStr = 'Lluvia helada fuerte';
                  break;
                case 71:
                  climaStr = 'Caída de nieve ligera';
                  break;
                case 73:
                  climaStr = 'Caída de nieve moderada';
                  break;
                case 75:
                  climaStr = 'Caída de nieve fuerte';
                  break;
                case 77:
                  climaStr = 'Granos de nieve';
                  break;
                case 80:
                  climaStr = 'Chubascos ligeros'
                  break;
                case 81:
                  climaStr = 'Chubascos moderados'
                  break;
                case 82:
                  climaStr = 'Chubascos violentos';
                  break;
                case 85:
                  climaStr = 'Chubascos de nieve ligeros';
                  break;
                case 86:
                  climaStr = 'Chubascos de nieve fuertes';
                  break;
                case 95:
                  climaStr = 'Tormenta eléctrica';
                  break;
                case 96:
                  climaStr = 'Tormenta con granizo ligero';
                  break;
                case 99:
                  climaStr = 'Tormenta con granizo fuerte';
                  break;
                default:
                  climaStr = 'Código no válido';
            }

            resolve(climaStr);

        });
    }    
        // let climaStr;

        // switch( weathercode ) {
        // 
        //     case 0:
        //       climaStr = 'Cielo despejado';
        //       break;
        //     case 1:
        //       climaStr = 'Principalmente despejado';
        //     case 2:
        //       climaStr = 'Parcialmente nublado';
        //     case 3:
        //       climaStr = 'Nublado';
        //       break;
        //     case 45:
        //       climaStr = 'Niebla';
        //       break;
        //     case 48:
        //       climaStr = 'Niebla calcárea depositada';
        //       break;
        //     case 51:
        //       climaStr = 'Llovizna ligera';
        //       break;
        //     case 53:
        //       climaStr = 'Llovizna moderada';
        //       break;
        //     case 55:
        //       climaStr = 'Llovizna densa';
        //       break;
        //     case 56:
        //       climaStr = 'Llovizna helada ligera';
        //       break;
        //     case 57:
        //       climaStr = 'Llovizna helada densa';
        //       break;
        //     case 61:
        //       climaStr = 'Lluvia ligera';
        //       break;
        //     case 63:
        //       climaStr = 'Lluvia moderada';
        //       break;
        //     case 65:
        //       climaStr = 'Lluvia fuerte';
        //       break;
        //     case 66:
        //       climaStr = 'Lluvia helada ligera';
        //       break;
        //     case 67:
        //       climaStr = 'Lluvia helada fuerte';
        //       break;
        //     case 71:
        //       climaStr = 'Caída de nieve ligera';
        //       break;
        //     case 73:
        //       climaStr = 'Caída de nieve moderada';
        //       break;
        //     case 75:
        //       climaStr = 'Caída de nieve fuerte';
        //       break;
        //     case 77:
        //       climaStr = 'Granos de nieve';
        //       break;
        //     case 80:
        //       climaStr = 'Chubascos ligeros'
        //       break;
        //     case 81:
        //       climaStr = 'Chubascos moderados'
        //       break;
        //     case 82:
        //       climaStr = 'Chubascos violentos';
        //       break;
        //     case 85:
        //       climaStr = 'Chubascos de nieve ligeros';
        //       break;
        //     case 86:
        //       climaStr = 'Chubascos de nieve fuertes';
        //       break;
        //     case 95:
        //       climaStr = 'Tormenta eléctrica';
        //       break;
        //     case 96:
        //       climaStr = 'Tormenta con granizo ligero';
        //       break;
        //     case 99:
        //       climaStr = 'Tormenta con granizo fuerte';
        //       break;
        //     default:
        //       climaStr = 'Código no válido';
        // }

        // return climaStr;
    // }
}



module.exports = Busquedas;
