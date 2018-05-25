
const mysql = require('mysql');
const { ipcRenderer } = require('electron');

document.getElementById("button-listasocios").addEventListener('click', (event) => {


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
            console.log("conexion realizada");
        }
    });

    var tbody = document.getElementById("tablabody");
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    var query = connection.query('SELECT * FROM socios', function (error, result) {
        if (error) {
            throw error;
        } else {
            var socios = result;
            if (socios.length > 0) {
                console.log("Registro encontrado");
            } else {
                console.log('Registro no encontrado');
            }

            for (let i = 0; i < socios.length; i++) {

                var tr = document.createElement("tr");

                tr.addEventListener('contextmenu', () => {
                    ipcRenderer.send('show-context-menu')
                },false)

                var td = document.createElement("td");
                var dni = document.createTextNode(socios[i].dni);
                td.appendChild(dni);
                tr.appendChild(td);

                var td = document.createElement("td");
                var NumSocio = document.createTextNode(socios[i].nroSocio);
                td.appendChild(NumSocio);
                tr.appendChild(td);

                var td = document.createElement("td");
                var Nombre = document.createTextNode(socios[i].nombre);
                td.appendChild(Nombre);
                tr.appendChild(td);

                var td = document.createElement("td");
                var Apellido = document.createTextNode(socios[i].apellido);
                td.appendChild(Apellido);
                tr.appendChild(td);

                var td = document.createElement("td");
                var Sexo = document.createTextNode(socios[i].sexo);
                td.appendChild(Sexo);
                tr.appendChild(td);

                var td = document.createElement("td");
                var fechaNacimiento = document.createTextNode(formatear(socios[i].fechaNac));
                td.appendChild(fechaNacimiento);
                tr.appendChild(td);

                var td = document.createElement("td");
                var Categoria = document.createTextNode(socios[i].categoria);
                td.appendChild(Categoria);
                tr.appendChild(td);

                var td = document.createElement("td");
                var FechaInicio = document.createTextNode(formatear(socios[i].inicio));
                td.appendChild(FechaInicio);
                tr.appendChild(td);

                var td = document.createElement("td");
                var Domicilio = document.createTextNode(socios[i].domicilio);
                td.appendChild(Domicilio);
                tr.appendChild(td);

                var td = document.createElement("td");
                var Telefono = document.createTextNode(socios[i].telefono);
                td.appendChild(Telefono);
                tr.appendChild(td);

                tbody.appendChild(tr);
            }

        }
    }
    );
    connection.end();
})

function formatear(fecha){

    return fecha.getDate()+"/"+fecha.getMonth()+"/"+fecha.getFullYear();
}
