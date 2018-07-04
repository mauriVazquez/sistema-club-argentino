const {ipcRenderer} = require('electron')

const agregarSocioBtn = document.getElementById('agregar-socio');

agregarSocioBtn.addEventListener('click', (event) =>{

    if (datosCorrectos()) {


            var nroSocio = ipcRenderer.sendSync('obtener-numsocio')
            var DNI = document.getElementById("textDni").value;
            var Nombre = document.getElementById("textNombre").value;
            var Apellido = document.getElementById("textApellido").value;
            var Sexo = obtenerSexo();
            var fechaNac = document.getElementById("fechaNac").value;
            var Categoria = document.getElementById("selectCategoria").value;
            var Domicilio = document.getElementById("textDomicilio").value;
            var Telefono = document.getElementById("textTelefono").value;

            var d = new Date();
            var dia = d.getDate();
            var mes = d.getMonth();
            var year = d.getFullYear();
            var diaInicio = year + "-" + mes + "-" + dia;

            var Consulta = "INSERT INTO socios (`dni`, `nroSocio`, `nombre`, `apellido`, `sexo`, `fechaNac`, `categoria`, `inicio`, `domicilio`, `telefono`) VALUES ('" + DNI + "', '" + nroSocio + "', '" + Nombre + "', '" + Apellido + "', '" + Sexo + "', '" + fechaNac + "', '" + Categoria + "', '" + diaInicio + "', '" + Domicilio + "', '" + Telefono + "')";
            console.log(Consulta);

            resultadoConsulta = ipcRenderer.sendSync('agregar-socio', Consulta)
            console.log(resultadoConsulta);

    } else {
        alert("campos Incompletos o incorrectos");
    }
})



    function obtenerSexo() {

    var result;
    if (document.getElementById("checkHombre").checked)
        result = "Hombre";
    else {
        if (document.getElementById("checkMujer").checked) {
            result = "Mujer"
        }
    }
    return result;
    }

    function datosCorrectos() {

    var datoscorrectos = true;
    if (document.getElementById("textDni").value == "") {
        datoscorrectos = false;
    }
    if (document.getElementById("textNombre").value == "") {
        datoscorrectos = false;
    }
    if (document.getElementById("textApellido").value == "") {
        datoscorrectos = false;
    }
    if (document.getElementById("textDomicilio").value == "") {
        datoscorrectos = false;
    }
    if (document.getElementById("textTelefono").value == "") {
        datoscorrectos = false;
    }
    if (document.getElementById("selectCategoria").value == "") {
        datoscorrectos = false;
    }
    if (document.getElementById("fechaNac").value == "") {
        datoscorrectos = false;
    }
    
    return datoscorrectos;
    }
