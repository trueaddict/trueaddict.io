import * as http from 'http';
import App from './app';

const PORT = process.env.PORT || 3080;

App.set('port', PORT);
const server = http.createServer(App);
server.listen(PORT);

server.on('listening', () => {
    const addr = server.address();
    console.log(`Server listening on: ${PORT}`);
});

module.exports = App;