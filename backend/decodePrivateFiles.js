const fs = require('fs');

const privateFiles = JSON.parse(process.env.PRIVATE_FILES);

const decodeBase64ToFile = (base64, filePath) => {
  const buffer = Buffer.from(base64, 'base64');
  fs.mkdirSync(filePath.substring(0, filePath.lastIndexOf('/')), { recursive: true });
  fs.writeFileSync(filePath, buffer);
};

Object.keys(privateFiles).forEach(filePath => {
  decodeBase64ToFile(privateFiles[filePath], `private/${filePath}`);
});