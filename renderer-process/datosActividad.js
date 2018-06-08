const mysql = require('mysql');

const subBtns = document.querySelectorAll(".sub-button");

subBtns.forEach((subBtn) =>{

    subBtn.addEventListener('click', (event) => {
        
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
                console.log("conexion realizada en script datosActividad");
            }
        });

        var divTabla = document.getElementById(`horario-${event.target.dataset.section}`)

        //obtengo id
        if(event.target.dataset.section== "boxeo")
            var id = 1;
        if(event.target.dataset.section== "futbol")
            var id = 2;
        if(event.target.dataset.section== "gim-ritmica")
            var id = 3;   
        if(event.target.dataset.section== "gim-recreativa")
            var id = 4;
        if(event.target.dataset.section== "judo")
            var id = 5; 

        var consulta = "SELECT `horarios`.*, `instructores`.`nombre`, `instructores`.`apellido` \
                        FROM `horarios` , `instructores`, `actividades` \
                        WHERE `actividades`.idactividad ='"+id+"' \
                        AND `actividades`.idactividad = `instructores`.actividades_idactividad";

        var query = connection.query(consulta,function(error, results){
            if(error){

                throw error;

            }else{

                //Armado de tabla de horarios.
                

            }
        });
    });
});



