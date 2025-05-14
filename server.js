const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the root folder
app.use(express.static(__dirname));

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for carpets page
app.get('/carpets', (req, res) => {
    res.sendFile(path.join(__dirname, 'carpets.html'));
});

// Route for services page
app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'services.html'));
});

// Catch-all route to redirect to index.html for undefined routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
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