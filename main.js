console.log("Processo principal")

const { app, BrowserWindow, nativeTheme, Menu, ipcMain } = require('electron')
const path = require('node:path')

// Janela principal
let win
const createWindow = () => {
  // a linha abaixo define o tema (claro ou escuro)
  nativeTheme.themeSource = 'light' //(dark ou light)
  win = new BrowserWindow({
    width: 800,
    height: 600,
    //autoHideMenuBar: true,
    //minimizable: false,
    resizable: false,
    //ativação do preload
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // menu personalizado
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  win.loadFile('./src/views/index.html')

  // recebimento dos pedidos para abertura de janelas (botões) autorizado no preload.js
  ipcMain.on('client-window', () => {
    clientWindow()
  })

  ipcMain.on('os-window', () => {
    osWindow()
  })
}

// Janela Sobre
function aboutWindow() {
  nativeTheme.themeSource = 'light'
  // ↓ obtém a janela principal ↓
  const main = BrowserWindow.getFocusedWindow()
  let about // ← estabelecer uma relação hierárquica entre janelas
  if (main) {
    about = new BrowserWindow({
      width: 360,
      height: 200,
      autoHideMenuBar: true,
      resizable: false,
      minimizable: false,
      parent: main,
      modal: true,

    })
  }
  about.loadFile('./src/views/sobre.html')
}

// JANELA CLIENTES

let client
function clientWindow() {
  nativeTheme.themeSource = 'light'
  const main = BrowserWindow.getFocusedWindow()
  if (main) {
    client = new BrowserWindow({
      width: 1020,
      heigth: 720,
      //autoHideMenuBar: true,
      resizable: false,
      parent: main,
      modal: true
    })
  }
  client.loadFile('./src/views/clientes.html')
  client.center() //inicar no centro da tela
}

// JANELA OS

let os
function osWindow() {
  nativeTheme.themeSource = 'light'
  const main = BrowserWindow.getFocusedWindow()
  if (main) {
    os = new BrowserWindow({
      width: 1020,
      heigth: 720,
      //autoHideMenuBar: true,
      resizable: false,
      parent: main,
      modal: true
    })
  }
  os.loadFile('./src/views/os.html')
  os.center() //inicar no centro da tela
}

// Iniciar a aplicação
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// reduzir logs não críticos
app.commandLine.appendSwitch('log-level', '3')

// template do menu
const template = [
  {
    label: 'Cadastro',
    submenu: [
      {
        label: 'Clientes',
        click: () => clientWindow()
      },
      {
        label: 'OS',
        click: () => osWindow()
      },
      {
        type: 'separator'
      },
      {
        label: 'Sair',
        click: () => app.quit(),
        accelerator: 'Alt+F4'
      }
    ]
  },
  {
    label: 'Relatórios',
    submenu: [
      {
        label: 'Clientes'
      },
      {
        label: 'OS Abertas'
      },
      {
        label: 'OS Concluídas'
      }
    ]
  },
  {
    label: 'Ferramentas',
    submenu: [
      {
        label: 'Aplicar zoom',
        role: 'zoomIn'
      },
      {
        label: 'Reduzir',
        role: 'zoomOut'
      },
      {
        label: 'Restaurar o zoom padrão',
        role: 'resetZoom'
      },
      {
        type: 'separator'
      },
      {
        label: 'Recarregar',
        role: 'reload'
      },
      {
        label: 'Ferramentas do Desenvolvedor',
        role: 'toggleDevTools'
      }
    ]
  },
  {
    label: 'Ajuda',
    submenu: [
      {
        label: 'Sobre',
        click: () => aboutWindow()
      }
    ]
  }
]