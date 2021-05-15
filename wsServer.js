const WebSocket = require('ws');

const server  = new WebSocket.Server({port: 8088});

server.on('open',function open() {
	console.log('cennected');
});

server.on('close',function close() {
	console.log('disconnected');
});

server.on('connection', function connection(ws, req) {
	const ip = req.connection.remoteAddress;
	// const port = req.connerction.remotePort;
	// console.log(req);
	ws.send('Welcome ' + ip);
	
	ws.on('message', function incoming(message) {
		console.log(message);
		// console.log()
		// console.log(server.client)
		server.clients.forEach((client) => {
			if(client.readyState === WebSocket.OPEN) {
				client.send(ip + ' -> ' + message);
			}
		});
	});
});