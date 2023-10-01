const { app, BrowserWindow } = require("electron");
const path = require("path");

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {      
      nodeIntegration: true,
      // preload: path.join(__dirname, 'src/node.cjs')
    }
  });
  mainWindow.loadFile(path.join(__dirname, "public/index.html"));
});
