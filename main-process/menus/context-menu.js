const {
    BrowserWindow,
    Menu,
    MenuItem,
    ipcMain,
    app
  } = require('electron')
  const path = require('path')
  const menu = new Menu()
  menu.append(new MenuItem({ label: 'Modificar' ,   
     
        click: (item) =>{  

            const modalPath = path.join('file://', __dirname, '../../sections/modificar-datos.html')
            let win = new BrowserWindow({ width: 500, height: 400 })
            
            win.on('close', () => { 
                win = null })
            win.loadURL(modalPath)
            win.show()
         } 
    
    }))
  menu.append(new MenuItem({ type: 'separator' }))
  menu.append(new MenuItem({ label: 'Eliminar'}))
  
  
  ipcMain.on('show-context-menu', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    menu.popup(win)
  })