import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { router } from './routes/index.js';
import serveFavicon from 'serve-favicon';

const app = express();
const port = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(
    express.static(path.join(__dirname, 'node_modules/bootstrap/dist/'))
);
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(serveFavicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.get('/api', router);

app.get('/', function (_, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});