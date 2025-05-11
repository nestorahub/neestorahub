const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/carpets', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'carpets.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);

    // Find a valid IPv4 address from network interfaces
    const interfaces = require('os').networkInterfaces();
    let networkIP = 'localhost'; // Fallback IP
    for (let iface in interfaces) {
        for (let alias of interfaces[iface]) {
            if (alias.family === 'IPv4' && !alias.internal) {
                networkIP = alias.address;
                break;
            }
        }
        if (networkIP !== 'localhost') break;
    }
    console.log(`Access on your network at http://${networkIP}:${port}`);
});