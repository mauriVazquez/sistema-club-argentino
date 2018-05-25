const mysql = require('mysql');
const {ipcRenderer} = require('electron');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database : 'clubargentino'
});

connection.connect(function(err) {
    
    // in case of error
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }else{
        console.log("conexion realizada en script buscarsocio");
    }
});

var datoAbuscar = document.getElementById("nombre-buscado");

datoAbuscar.addEventListener('input', (event) => {

        console.log("entre al evento");
        var divArellenar = document.getElementById("socio-encontrado");
        while(divArellenar.firstChild){
            divArellenar.removeChild(divArellenar.firstChild);
        }
        if (datoAbuscar.value != ""){
            var consulta;
            if(!isNaN(datoAbuscar.value)){
                 consulta = "SELECT `nroSocio`,`dni`,`nombre`,`apellido`,`categoria` FROM `socios` where `dni` LIKE '"+datoAbuscar.value+"%' order by `nroSocio` ASC" ;
            }
            else{
                var trm = datoAbuscar.value.trim();
                var lista = datoAbuscar.value.split(' ');

                if(lista.length > 1){
                 consulta = "SELECT `nroSocio`,`dni`,`nombre`,`apellido`,`categoria` FROM `socios`\
                             where `nombre` LIKE '"+lista[0]+"%' AND \
                             apellido LIKE'"+lista[1]+"%' order by `nroSocio` ASC";
                }else if(lista.length==1){
                    consulta = "SELECT `nroSocio`,`dni`,`nombre`,`apellido`,`categoria` FROM `socios`\
                             where `nombre` LIKE '"+lista[0]+"%' order by `nroSocio` ASC";
                }

            }
            var query = connection.query(consulta, function(error, result){
                if(error){
                throw error;
                }else{
                console.log(consulta);    
                var socios = result;
                console.log("encontre algun registro con el patron");
                if(socios.length > 0 ){

                    var table = document.createElement("table");
                    table.setAttribute("id", "tabla-socios-encontrados");
                    
                    var thead = document.createElement("thead")
                    
                    var th = document.createElement("th")
                    var texto = document.createTextNode("N° socio")
                    th.appendChild(texto)
                    thead.appendChild(th);

                    var th = document.createElement("th")
                    var texto = document.createTextNode("DNI")
                    th.appendChild(texto)
                    thead.appendChild(th);

                    var th = document.createElement("th")
                    var texto = document.createTextNode("Nombre")
                    th.appendChild(texto)
                    thead.appendChild(th);

                    var th = document.createElement("th")
                    var texto = document.createTextNode("Apellido")
                    th.appendChild(texto)
                    thead.appendChild(th);

                    var th = document.createElement("th")
                    var texto = document.createTextNode("Categoria")
                    th.appendChild(texto)
                    thead.appendChild(th);

                    table.appendChild(thead);
                    
                    var tbody = document.createElement("tbody")

                    for (let i = 0; i < socios.length; i++) {
                        
                        var tr = document.createElement("tr");
                        
                        //NO FUNCIONA CORRECTAMENTE
                        tr.addEventListener('contextmenu', () => {
                            ipcRenderer.send('show-context-menu')
                            },false)

                        var td = document.createElement("td");
                        var NumSocio = document.createTextNode(socios[i].nroSocio);
                        td.appendChild(NumSocio);
                        tr.appendChild(td);

                        var td = document.createElement("td"); 
                        var dni= document.createTextNode(socios[i].dni);
                        td.appendChild(dni);
                        tr.appendChild(td);    

                        var td = document.createElement("td");
                        var Nombre= document.createTextNode(socios[i].nombre);
                        td.appendChild(Nombre);
                        tr.appendChild(td);   

                        var td = document.createElement("td");
                        var Apellido= document.createTextNode(socios[i].apellido);
                        td.appendChild(Apellido);
                        tr.appendChild(td);    

                        var td = document.createElement("td");
                        var Categoria= document.createTextNode(socios[i].categoria);
                        td.appendChild(Categoria);
                        tr.appendChild(td); 

                        tbody.appendChild(tr);   
                    }
                        table.appendChild(tbody);
                        divArellenar.appendChild(table);
                }
                 else{

                    divArellenar.appendChild(document.createElement("h2").appendChild(document.createTextNode("No se encontro nigun socio con "+datoAbuscar.value)));

                }
                
    
              }
        })};
    });