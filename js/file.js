const fs = require("fs")

/**
 * Function to read data-stream from file
  * @param {Event} event - IPC event
 * @param {string} path 
 * @returns {string} data stream read from file
 */
const readFile = async (event, path) => {
  if (!path) return ""

  try {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        event.sender.send("read-error", `Failed to read file: ${path}`)
      } else {
        event.sender.send("read-success", [path, data]);
      }
    })
  } catch (err) {
    event.sender.send("read-error", `Unexpected error: ${err.message}`)
  }
}

/**
 * Function to save data-stream from file
  * @param {Event} event - IPC event
 * @param {array} data - [0:path], [1:string]
 * @returns {string} data stream read from file
 */
const saveFile = async (event, data) => {
  if (!data || data.length != 2 || !data[0]) return

  try {
    fs.writeFile(data[0], data[1], 'utf8', (err) => {
      if (err) {
        event.sender.send(`save-error', "Failed to save file to ${data[0]}`);
      } else {
        event.sender.send('save-success', data[0]);
      }
    });
  } catch (err) {
    event.sender.send("save-error", `Unexpected error: ${err.message}`);
  }
}

module.exports = { readFile, saveFile }