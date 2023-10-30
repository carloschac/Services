const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/github/:username', (req, res) => {
  const username = req.params.username;
  axios
    .get(`https://api.github.com/users/${username}/repos`)
    .then((response) => {
      const repositories = response.data.map((repo) => repo.name);
      res.json(repositories);
    })
    .catch((error) => {
      console.error('Erro ao obter os repositórios:', error);
      res.status(500).json({ error: 'Erro ao obter os repositórios' });
    });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
