const express = require('express');
const graphRoutes = require('./src/routes/graph');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json());
app.use('/graph', graphRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
