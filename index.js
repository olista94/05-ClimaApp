
require('dotenv').config();

const { leerInput, inquirerMenu, pausa, listarCiudades } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async () => {

    const busquedas = new Busquedas();
    let opt;

    

    do{

        // Imprimir el menu
        opt = await inquirerMenu();
        
        switch( opt ) {

            case 1: 
            // Mostrar el mensaje
            const ciudad = await leerInput( 'Ciudad: ' );

            // Buscar ciudades
            const ciudades = await busquedas.ciudad ( ciudad );
            
            // Seleccionar la ciudad
            const id = await listarCiudades( ciudades );
            const ciudadSel = ciudades.find( l => l.id === id);

            

            // Mostrar resutados
            
            const latShort = ciudadSel.latitud;
            const lonShort = ciudadSel.longitud;

            const puntoIndexLat = latShort.indexOf('.');
            const puntoIndexLon = lonShort.indexOf('.');

            const lat =  latShort.substring(0, puntoIndexLat + 3);
            const lon =  lonShort.substring(0, puntoIndexLon + 3);
            
            console.log( '\nInformación de la ciudad\n'.green );
            console.log('Ciudad: ', ciudadSel.nombre );
            console.log('Lat: ', lat );
            console.log('Lng: ', lon );

            // Clima
            const clima = await busquedas.climaCiudad( lat, lon );
            console.log('Temperatura: ', clima.temperatura.toString() );
            console.log('Mínima: ', clima.minima.toString() );
            console.log('Máxima: ', clima.maxima.toString() );
            console.log('Tiempo: ', clima.parte );
            // console.log(clima.parte);

            // Clima
            //const clima = await busquedas.climaCiudad( lat, lon );

            // case 2: // Hisotrial
            //     tareas.listadoCompleto();
            // break;
  }
        

        if ( opt !== 0 ) await pausa();

    } while ( opt !== 0 );

}

main();
