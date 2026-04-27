import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sosController from './controllers/sos.controller.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.post('/api/sos', sosController.handleSOS);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'AuraShield Backend Running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
