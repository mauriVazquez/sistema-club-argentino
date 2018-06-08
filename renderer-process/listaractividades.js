const mysql = require('mysql');
const { ipcRenderer } = require('electron');

document.getElementById("button-listaactividades").addEventListener('click', (event) => {


    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'clubargentino'
    });

    connection.connect(function (err) {

        // in case of error
        if (err) {
            console.log(err.code);
            console.log(err.fatal);
        } else {
            console.log("conexion realizada en listar actividades");
        }
    });
    var divContenedor = document.getElementById("contenedor-actividades");
    while (divContenedor.firstChild) {
        divContenedor.removeChild(divContenedor.firstChild);
    }
    var query = connection.query("SELECT * FROM `actividades`", function (error, actividades) {

        if (error) {
            throw error;
        } else {
            

            
            for (let i = 0; i < actividades.length; i++) {
                
                var divDemoControls = document.createElement("div");
                divDemoControls.classList.add("demo-controls")
                
                    var divAux= document.createElement("div");
                        var buttonAct = document.createElement("button");
                        buttonAct.classList.add("demo-button");
                        buttonAct.classList.add("button-actividad");
                        buttonAct.classList.add(actividades[i].icono);
                        buttonAct.setAttribute("id","button-"+actividades[i].nombre);
                        buttonAct.addEventListener('click', (event) => {
                            document.getElementById("button-"+actividades[i].icono).click();
                        })
                    divAux.appendChild(buttonAct);

                divDemoControls.appendChild(divAux);
                var divAux= document.createElement("div");
                    var divTituloAct = document.createElement("div");
                        divTituloAct.classList.add("titulo-actividad");
                        var h1 = document.createElement("h1");
                        var titulo = document.createTextNode(actividades[i].nombre);
                        h1.appendChild(titulo);
                    divTituloAct.appendChild(h1);
                    divAux.appendChild(divTituloAct)

                    var divInfoAct = document.createElement("div");
                    divInfoAct.classList.add("informacion-actividad");
                        var h3 = document.createElement("h3");
                        var texto = document.createTextNode("Instructores: ");
                        h3.appendChild(texto);
                        divInfoAct.appendChild(h3);
                        var h3 = document.createElement("h3");
                        var texto = document.createTextNode("Cantidad de inscriptos: ");
                        h3.appendChild(texto);
                    divInfoAct.appendChild(h3);
                divAux.appendChild(divInfoAct)
                divDemoControls.appendChild(divAux);

                divContenedor.appendChild(divDemoControls);
            }


        }
    });
    
    connection.end();
})

