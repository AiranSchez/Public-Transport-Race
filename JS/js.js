var vector = [];
var turno = 1;
var comprobacion = false;
var flag1 = false;
var flag2 = false;
var flag3 = false;
var Vehiculo =
{
    Tranvia: {
        nombre: 'Tranvia',
        ventaja: 5,     // 25%
        normal: 2,      // 60%
        dificultad: 0,  // 15%
        posicion: 0,
        porcentajes: [25, 85]
    },

    Coche: {
        nombre: 'Coche',
        ventaja: 20,    // 15%
        normal: 10,     // 45%
        dificultad: -5, // 40%
        posicion: 0,
        porcentajes: [15, 60]
    },

    Guagua: {
        nombre: 'Guagua',
        ventaja: 5,     // 43%
        normal: 3,      // 43%
        dificultad: -1, // 15%
        posicion: 0,
        porcentajes: [43, 86] 
    }
};

function numeroAleatorio() {
    var randNumber = Math.floor((Math.random() * 100) + 1);
    return randNumber;
}

function movimientoVehiculo(numero, objeto) {                                // Mueve el vehículo que se le pase por parámetro viendo el numero aleatorio generado                   

    if (objeto.posicion < 250) {
        if (numero <= objeto.porcentajes[0]) {                               // 1-25 (Tranvia),1-43(Guagua),() 
            if (objeto.posicion + objeto.ventaja < 250) {
                objeto.posicion += objeto.ventaja;
            }
            else {
                objeto.posicion = 250;
            }
        }
        else if (numero <= objeto.porcentajes[1]) {                          // 26-85 (Tranvia),44-86(Guagua),()
            if (objeto.posicion + objeto.normal < 250) {
                objeto.posicion += objeto.normal;
            }
            else {
                objeto.posicion = 250;
            }
        }
        else {                                                               // 86-100 (Tranvia),(),()
            if ((objeto.posicion + objeto.dificultad) < 0)
                objeto.posicion = 0;
            else
                objeto.posicion += objeto.dificultad;
        }
    }
    else {
        objeto.posicion = 250;
    }
}

function hanLlegado(objeto1, objeto2, objeto3) {                            // Comprueba si han llegado

    podium(objeto1);
    podium(objeto2);                                                        // Primero compruebo 
    podium(objeto3);

    if ((objeto1.posicion == 250) && (objeto2.posicion == 250) && (objeto3.posicion == 250)) {
        comprobacion = true;                                                // Set a true para que no haga más veces el do-while de deGolpe()
        genera_tabla();
        document.getElementById("Siguiente").disabled = true;               // Deshabilitamos los botones cuando se llega al final
        document.getElementById("deGolpe").disabled = true;
    }
}

function podium(objeto) {                                                   // Función que introduce en el podium según van llegando
    if ((objeto.posicion == 250) && (!vector.includes(objeto.nombre)))
        vector.push(objeto.nombre);                                         // Si ha llegado lo introduzco en el podium
}


function genera_tabla() {                                                   // Función que crea la tabla que será el podium
    var body = document.getElementsByTagName("body")[0];
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    for (var i = 0; i < 3; i++) {                                           // 3 filas
        var fila = document.createElement("tr");
        var puesto = document.createTextNode(i + 1);                        // Imprimirá 1-2-3 en cada una de las filas
        for (var j = 0; j < 1; j++) {
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(vector[i]);            // Imprimirá por orden el vector del podium
            fila.appendChild(puesto);
            celda.appendChild(textoCelda);
            fila.appendChild(celda);
        }
        tblBody.appendChild(fila);

    }
    tabla.appendChild(tblBody);
    body.appendChild(tabla);
}

function deGolpe() {                                                        // Función para generar todos los movimientos hasta el final
    do {
        movimiento();                                                       // Llama al movimiento turno a turno hasta que hayan llegado todos
    } while (comprobacion == false);                                
}

function movimiento() {                                                     // Función para ir paso a paso en los movimientos de los vehiculos

    var randNum = numeroAleatorio();                                        // Genero 1 número
    console.log('Numero aleatorio: ' + randNum + ' Turno: ' + turno);

    movimientoVehiculo(randNum, Vehiculo.Coche);                            // Muevo los vehículos
    movimientoVehiculo(randNum, Vehiculo.Tranvia);
    movimientoVehiculo(randNum, Vehiculo.Guagua);

    console.log('Posición del coche: ' + Vehiculo.Coche.posicion);
    console.log('Posición del Tranvia: ' + Vehiculo.Tranvia.posicion);
    console.log('Posición de la Guagua: ' + Vehiculo.Guagua.posicion);

    hanLlegado(Vehiculo.Coche, Vehiculo.Tranvia, Vehiculo.Guagua);          // Compruebo si han llegado
    turno++;

    document.getElementById("Coche").value = Vehiculo.Coche.posicion;       // Muevo los progress bar del html
    document.getElementById("Tranvia").value = Vehiculo.Tranvia.posicion;
    document.getElementById("Guagua").value = Vehiculo.Guagua.posicion;
}