import http from 'http';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Base path to your AnimeEpisodes folder
const animeDir = "./";

const server = http.createServer(async (req, res) => {
  if (req.url === '/api/users') {
    try {
      const data = await readFile(join(__dirname, 'data', 'users.json'), 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Error reading users.json' }));
    }
  }

  // Dynamic anime route
  else if (req.url.startsWith('/')) {
    const animeName = req.url.slice(1); // removes leading '/'
    try {
      const filePath = join(animeDir, `${animeName}.json`);
      const data = await readFile(filePath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    } catch (err) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `Anime '${animeName}' not found` }));
    }
  }

  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
