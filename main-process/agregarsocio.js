const {ipcMain} = require('electron')
const mysql = require('mysql')



ipcMain.on('obtener-numsocio', (event) => {
    
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'clubargentino'
    });
    
    connection.connect(function (err) {
        // en caso de error
        if (err) {
            window.close();
        } else {
        }
    });

    var query = connection.query('SELECT nroSocio FROM socios ORDER by nroSocio DESC LIMIT 1', function (error, result){
    
        if (error) {
            throw error;
        } else {
            nroSocio = result[0].nroSocio;
            nroSocio++;
            
            event.returnValue=nroSocio;
        }
        
        });
  

  
});

ipcMain.on('agregar-socio', (event,Consulta) => {
    
    var resultado=0;

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'clubargentino'
    });
    
    connection.connect(function (err) {
        // en caso de error
        if (err) {
            window.close();
        } else {
        }
    });

    var query = connection.query(Consulta, function (error, result) {

        if (error) {
            throw error;
        } else {
            var resultado = "Datos Cargados correctamente"
        }
        connection.end();
    });
    event.returnValue=resultado;
    
})

function newFunction() {
    var respuesta;
    return respuesta;
}
