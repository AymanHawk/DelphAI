const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Use CORS to allow requests from your Chrome extension
app.use(cors({
    origin: 'chrome-extension://your-extension-id'
}));

// Your API endpoint
app.get('/api/your-endpoint', (req, res) => {
    res.json({ message: 'Hello from the API' });
});

app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});
