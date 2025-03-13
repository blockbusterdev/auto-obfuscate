const fs = require('fs');
const path = require('path');

function saveFile() {
	const text = document.getElementById('textArea').value
	const filePath = path.join(__dirname, 'output.txt')

	fs.writeFile(filePath, text, (err) => {
		if (err) {
			console.error('Error saving file:', err)
		} else {
			alert('File saved successfully!')
		}
	});
}