const fs = require('fs');
const path = require('path');

// Pfad zur Secret File
const secretFilePath = path.join('/etc/secrets', 'privateFiles.json');

if (!fs.existsSync(secretFilePath)) {
  console.error('privateFiles.json Secret File ist nicht vorhanden.');
  process.exit(1);
}

const privateFiles = JSON.parse(fs.readFileSync(secretFilePath, 'utf8'));

const decodeBase64ToFile = (base64, filePath) => {
  const buffer = Buffer.from(base64, 'base64');
  fs.mkdirSync(filePath.substring(0, filePath.lastIndexOf('/')), { recursive: true });
  fs.writeFileSync(filePath, buffer);
};

Object.keys(privateFiles).forEach(filePath => {
  decodeBase64ToFile(privateFiles[filePath], `private/${filePath}`);
});