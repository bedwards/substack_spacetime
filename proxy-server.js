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
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'application/json',
      'Referer': 'https://substack.com/',
      'Origin': 'https://substack.com',
      'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin'
    }
  });

  const text = await response.text();
  console.log('Response:', text.substring(0, 200));
  
  res.set('Content-Type', 'application/json');
  res.send(text);
});

app.listen(3000, () => console.log('Proxy running on http://localhost:3000'));
