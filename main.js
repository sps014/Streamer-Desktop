//Electron App Classes
const { app, BrowserWindow, dialog } = require('electron');
const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

//Server Handling Class
const HttpServer = require('./Assets/Scripts/httpServer');
const httpServer = new HttpServer(5555);
//httpServer.StartServer();


//Hot Reloading current directory
//require('electron-reload')(__dirname);

//Some Global Variables 
global.PortNumber = 5555;
global.FolderURL = "E:\\videos\\";
global.ApplicationFolder = app.getAppPath();
var binPath = app.getAppPath();

if (binPath.indexOf(".asar") > 0) {
    var l = binPath.length - 18;
    binPath = binPath.substring(0, l);
    global.ApplicationFolder = binPath;
}

console.log(global.ApplicationFolder);

let win;
function createWindow() {
    win = new BrowserWindow({ height: 560, width: 600 });
    win.setMenu(null);
    win.backgroundColor = "black";
    win.loadFile('index.html');
}
function closedWindow() {
    httpServer.StopServer();
    win = null;
}

function closeApp() {
    httpServer.StopServer();
    if (process.platform !== 'darwin') {
        app.quit();
    }
}

app.on('closed', closedWindow);
app.on('ready', createWindow);
app.on('window-all-closed', closeApp);

ipcMain.on('RunHttpServerEvent', RunServer);
ipcMain.on('SaveConfigurationSettingsEvents', SaveSettings);
ipcMain.on('ShowFolderDialogEvent', ShowFolderDialog);
ipcMain.on('GiveMeSettingsEvent', SearchForSettings);


class Configuration {
    constructor(path, port) {
        this.TargetDirectoryPath = path;
        this.Port = port;
    }
}

function SearchForSettings(event, _args) {
    let settingFile = path.join(ApplicationFolder, "config.json");
    if (fs.existsSync(settingFile)) {
        var str = fs.readFileSync(settingFile);
        var config = JSON.parse(str);
        var port = config.Port;
        var dir = config.TargetDirectoryPath;
        if (port != undefined)
            if (dir != undefined && port > 0 && port < 9999) {
                PortNumber = port;
                FolderURL = dir;
                event.sender.send('NowTakeSettingsBackEvent', str);
            }
    }
}

function ShowFolderDialog(event, _arg) {
    var Path;
    Path = dialog.showOpenDialog(win, { properties: ['openFile', 'openDirectory'] });
    event.sender.send('ObtainedDirectoryPathEvent', Path);
}

function RunServer(event, arg) {
    if (arg == true) {
        var success = false;
        if (PortVerifier(PortNumber) && FolderVerifier(FolderURL)) {
            httpServer.StartServer(PortNumber);
            event.sender.send('IpAddressTracesEvent', getIPAddress());
            success = true;
        }
        else {
            success = false;
        }
        event.sender.send('ServerStartingStatusEvent', success);

    }
    else {
        httpServer.StopServer();
        event.sender.send('ServerStoppedStatusEvent', success);
    }
}

function SaveSettings(event, args) {
    var parts = args.split("!@#$%");

    if (FolderVerifier(parts[0]) == false) {
        event.sender.send('FolderDoNotExistEvent', parts[0]);
        return;
    }
    if (PortVerifier(parts[1]) == false) {
        event.sender.send('PortDoNotExistEvent', parts[1]);
        return;
    }

    FolderURL = parts[0];
    PortNumber = parts[1];

    let settingFile = path.join(ApplicationFolder, "config.json");
    var c = new Configuration(FolderURL, PortNumber);
    fs.writeFileSync(settingFile, JSON.stringify(c));
    event.sender.send('SettingsVerifiedCorrectlyEvent', true);
}

function getIPAddress() {
    var os = require('os');
    var netInterfaces = os.networkInterfaces();
    for (var devName in netInterfaces) {
        var iface = netInterfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family == 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
                return (alias.address);
        }
    }
    return undefined;
}
getIPAddress();

function FolderVerifier(Folder) {
    if (fs.existsSync(Folder))
        return true;
    else
        return false;
}
function PortVerifier(Port) {
    Port = parseInt(Port);
    if (Port == undefined || Port >= 10000 || Port <= 0)
        return false;
    else
        return true;
}

global.IpPrinter = function () {

    var Print = function (ip) {
        if (win != undefined)
            win.webContents.send('SendIpRequestEvent', ip);
    }

    return {
        Print: function (ip) {
            return Print(ip);
        }
    }

}();


