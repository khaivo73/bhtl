const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/submit', async (req, res) => {
  const googleApiUrl = 'https://script.google.com/macros/s/AKfycbzaLmfyWatzsmbc_PJaFlba8ez78FYgjogJgCpzYwnHGojnODZ42qIVBSPByhwYWJC41A/exec';
  try {
    const resp = await fetch(googleApiUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(req.body)
    });
    const text = await resp.text();
    res.send({result: text});
  } catch (err) {
    res.status(500).send({result: 'ERROR', err: err.message});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
