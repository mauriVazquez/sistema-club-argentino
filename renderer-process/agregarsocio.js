const {BrowserWindow, ipcRenderer} = require('electron').remote
const path = require('path')


const agregarSocioBtn = document.getElementById('agregar-socio')
const listarSocioBtn = document.getElementById('button-listasocios')

agregarSocioBtn.addEventListener('click', (event) =>{

    const modalPath = path.join('file://', __dirname, '../sections/agregarsocio.html')
    let win = new BrowserWindow({ width: 400, height: 500, frame: false })
    
    win.on('close', () => {
        listarSocioBtn.click(); 
        win = null })
    win.loadURL(modalPath)
    win.show()
  })

