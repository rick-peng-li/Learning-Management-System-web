const fs = require('fs');
const path = require('path');
const dir = './frontend/src/pages';
const files = fs.readdirSync(dir);
files.forEach(f => {
  if (f.endsWith('.jsx')) {
    let content = fs.readFileSync(path.join(dir, f), 'utf8');
    // Replace 'http://localhost:5000 with `${import.meta.env.VITE_API_URL || "http://localhost:5000"}
    content = content.replace(/'http:\/\/localhost:5000/g, '`${import.meta.env.VITE_API_URL || "http://localhost:5000"}');
    // Replace `http://localhost:5000 with `${import.meta.env.VITE_API_URL || "http://localhost:5000"}
    content = content.replace(/`http:\/\/localhost:5000/g, '`${import.meta.env.VITE_API_URL || "http://localhost:5000"}');
    fs.writeFileSync(path.join(dir, f), content);
  }
});
console.log("URLs updated successfully for production!");
