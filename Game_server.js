const WebSocket = require('ws')

const wss = new WebSocket.Server({port:8080})
console.log('server created')
var player1
let player_counter = 1;
wss.on ('connection', ws => {
	ws.on('message' , (message)=>{
		data = JSON.parse(message)
		if(data.code === 1){
			data.player = 'O'
			data.code = 3
			player1.send(JSON.stringify(data))
		}
		if(data.code === 2){
			data.player = 'X'
			data.code = 3
			ws.send(JSON.stringify(data))
		}
	})
	console.log(`${player_counter} connected`)
	if (player_counter === 1)
	{
		player1 = ws
		var message = "Waiting for other Player to join." 
		let myObj = {
			'code' : 1,
			'message' : message
		}
		ws.send(JSON.stringify(myObj))
		console.log('message sent')
	}
	if (player_counter >= 2)
	{
		console.log('Another Player connected')
		let myObj = {
			'code' : 2,
			'message' : ' ',
		}
		ws.send(JSON.stringify(myObj))
	}
	player_counter++
})
