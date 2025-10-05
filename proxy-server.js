import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/inbox', async (req, res) => {
  const token = req.headers['x-substack-token'];
  
  const response = await fetch('https://substack.com/api/v1/reader/inbox', {
    headers: {
      'Cookie': `substack.sid=${token}`,
      'User-Agent': 'Mozilla/5.0'
    }
  });
  
  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log('Proxy running on http://localhost:3000'));
