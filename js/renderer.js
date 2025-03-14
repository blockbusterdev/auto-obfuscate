const { ipcRenderer } = require("electron")

//Event when click open-dialog button
document.getElementById("Btn_openFile").addEventListener("click", () => {
  ipcRenderer.send("to-open-file-input")
})

//Event when select file from file-input dialog
ipcRenderer.on("selected-file", async (event, path) => {
  //Visible mask
  document.querySelector(".mask").classList.add("display-flex")
  document.querySelector(".mask").classList.remove("display-none")

  ipcRenderer.send("read-file", path) //Read file
})

//Event when read file from file-input dialog
ipcRenderer.on("read-success", async (event, data) => {
  let string = stringfy(data[1].trim()) //make array as string removing junk lines

  string = nickFunction(string) //Apply nickname to function

  string = nickValue(string, 'int') //Apply nickname to int value
  string = nickValue(string, 'float') //Apply nickname to float value
  string = nickValue(string, 'double') //Apply nickname to double value
  string = nickValue(string, 'image') //Apply nickname to image value
  string = nickValue(string, 'string') //Apply nickname to string value
  string = nickValue(string, 'char') //Apply nickname to char value
  string = nickValue(string, 'bool') //Apply nickname to bool value
  string = nickValue(string, 'combo') //Apply nickname to combo value
  string = nickValue(string, 'define') //Apply nickname to combo value

  string = nickControllerConsts(string) //Obfuscating for combo

  string = uglify(string) //Obfuscating for combo

  let path = `${data[0].trim().substr(0, data[0].trim().length - 4)}-result.${data[0].trim().substr(-3)}`
  ipcRenderer.send("save-file", [path, string]) //Read file
})
ipcRenderer.on("read-error", async (event, msg) => {
  //Disable mask
  document.querySelector(".mask").classList.remove("display-flex")
  document.querySelector(".mask").classList.add("display-none")
  alert(msg)
})

//Event when after trying to save file
ipcRenderer.on("save-success", async (event, path) => {
  //Disable mask
  document.querySelector(".mask").classList.remove("display-flex")
  document.querySelector(".mask").classList.add("display-none")
  alert(`Success to obfuscate! Please read: ${path}`)
})
ipcRenderer.on("save-error", async (event, msg) => {
  //Disable mask
  document.querySelector(".mask").classList.remove("display-flex")
  document.querySelector(".mask").classList.add("display-none")
  alert(msg)
})