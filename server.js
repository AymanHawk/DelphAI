const express = require('express');
const cors = require('cors');
const app = express();
const port = 11434;

app.use(cors({ origin: 'https://outlook.office.com' }));
app.use(express.json());

app.post('/api/generate', (req, res) => {
    res.json({
        message: 'Hello from the API',
        requestBody: req.body
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
