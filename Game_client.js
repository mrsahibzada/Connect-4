new Vue({
	template:
	`<div>
		<center><h1 style="font-family:comic; font-size:200%; color:darkgoldenrod; background-color: lightblue;"> Connect 4 </h1></center>
		<center><div style="font-family:courier; font-size:150%; color:darkslategray;"> {{start_message}} </div></center>
		<center><h2 style="font-family:courier; font-size:150%; color:sienna; background-color: darkseagreen;"> Player {{player_turn}}'s Turn </h2></center>
		<center><div style="font-family:courier; font-size:150%; color:darkred;"> {{err}} </div></center>
		<center><div style="font-family:courier; font-size:150%; color:darkslategray;"> {{verdict}} </div></center>
		<table>
			<tr>
				<td @click='func(1)'>{{value.c1.r1}}</td>
				<td @click='func(2)'>{{value.c2.r1}}</td>
				<td @click='func(3)'>{{value.c3.r1}}</td>
				<td @click='func(4)'>{{value.c4.r1}}</td>
				<td @click='func(5)'>{{value.c5.r1}}</td>
				<td @click='func(6)'>{{value.c6.r1}}</td>
			</tr>
			<tr>
				<td @click='func(1)'>{{value.c1.r2}}</td>
				<td @click='func(2)'>{{value.c2.r2}}</td>
				<td @click='func(3)'>{{value.c3.r2}}</td>
				<td @click='func(4)'>{{value.c4.r2}}</td>
				<td @click='func(5)'>{{value.c5.r2}}</td>
				<td @click='func(6)'>{{value.c6.r2}}</td>
			</tr>
			<tr>
				<td @click='func(1)'>{{value.c1.r3}}</td>
				<td @click='func(2)'>{{value.c2.r3}}</td>
				<td @click='func(3)'>{{value.c3.r3}}</td>
				<td @click='func(4)'>{{value.c4.r3}}</td>
				<td @click='func(5)'>{{value.c5.r3}}</td>
				<td @click='func(6)'>{{value.c6.r3}}</td>
			</tr>
			<tr>	
				<td @click='func(1)'>{{value.c1.r4}}</td>
				<td @click='func(2)'>{{value.c2.r4}}</td>
				<td @click='func(3)'>{{value.c3.r4}}</td>
				<td @click='func(4)'>{{value.c4.r4}}</td>
				<td @click='func(5)'>{{value.c5.r4}}</td>
				<td @click='func(6)'>{{value.c6.r4}}</td>
			</tr>
			<tr>
				<td @click='func(1)'>{{value.c1.r5}}</td>
				<td @click='func(2)'>{{value.c2.r5}}</td>
				<td @click='func(3)'>{{value.c3.r5}}</td>
				<td @click='func(4)'>{{value.c4.r5}}</td>
				<td @click='func(5)'>{{value.c5.r5}}</td>
				<td @click='func(6)'>{{value.c6.r5}}</td>
			</tr>
			<tr>
				<td @click='func(1)'>{{value.c1.r6}}</td>
				<td @click='func(2)'>{{value.c2.r6}}</td>
				<td @click='func(3)'>{{value.c3.r6}}</td>
				<td @click='func(4)'>{{value.c4.r6}}</td>
				<td @click='func(5)'>{{value.c5.r6}}</td>
				<td @click='func(6)'>{{value.c6.r6}}</td>
			</tr>
			<tr>
				<td @click='func(1)'>{{value.c1.r7}}</td>
				<td @click='func(2)'>{{value.c2.r7}}</td>
				<td @click='func(3)'>{{value.c3.r7}}</td>
				<td @click='func(4)'>{{value.c4.r7}}</td>
				<td @click='func(5)'>{{value.c5.r7}}</td>
				<td @click='func(6)'>{{value.c6.r7}}</td>
			</tr>
		</table>
	</div>` ,
	data: {
		value : {
				c1: {r1:" ",r2:" ",r3:" ",r4:" ",r5:" ",r6:" ",r7:" "},
				c2: {r1:" ",r2:" ",r3:" ",r4:" ",r5:" ",r6:" ",r7:" "},
				c3: {r1:" ",r2:" ",r3:" ",r4:" ",r5:" ",r6:" ",r7:" "},
				c4: {r1:" ",r2:" ",r3:" ",r4:" ",r5:" ",r6:" ",r7:" "},
				c5: {r1:" ",r2:" ",r3:" ",r4:" ",r5:" ",r6:" ",r7:" "},
				c6: {r1:" ",r2:" ",r3:" ",r4:" ",r5:" ",r6:" ",r7:" "}	
			},
		player_turn : 'X' ,
		err : "" ,
		verdict : "" ,
		start_message : "" ,
		game_start : 0 ,
		ws : new WebSocket('ws://localhost:8080')
	} ,
	mounted () {
			console.log('mounted run')
			this.ws.onmessage = e => {
			let data = JSON.parse(e.data)
			if(data.code===1){
				console.log('data recieved with code 1')
				this.start_message = data.message
				this.game_start = 0

			}
			else if(data.code===2){
				console.log('data recieved with code 2')
				this.start_message = data.message
				this.game_start = 1

			}
			else if(data.code===3){
				console.log('data recieved with code 3')
				this.game_start = 1
				this.value = data.value
				this.player_turn = data.player
			}
		}
	},
	methods : {

		async func (x) { 
			if(this.game_start === 1) {

			this.start_message = " "
			this.err = " "
			var counter = 0;
			var draw_count = 0;
			if (x === 1)
			{
				var column = this.value.c1
			}
			else if (x === 2)
			{
				var column = this.value.c2
			}
			else if (x === 3)
			{
				var column = this.value.c3
			}
			else if (x === 4)
			{
				var column = this.value.c4
			}
			else if (x === 5)
			{
				var column = this.value.c5
			}
			else if (x === 6)
			{
				var column = this.value.c6
			}
			// Draw Check
			for (var key in this.value)
			{
				var temp = this.value[key]
				for (var element in temp)
				{
					if (temp[element] == 'X' || temp[element] == 'O')
					{
						draw_count++
					}				
				}
			}
			if (draw_count == 42)
			{
				this.verdict = "Game is a Draw!"
				this.player_turn = '-'
				return
			}
			if (this.player_turn == 'X')
			{
				// Column Full Check
				for(var inside_key in column)
				{
					counter++
					if ((column[inside_key] != " ") && counter == 1)
						{
							this.err = "Column is full."
							return
						}
						else if (column[inside_key] != " ")
						{
							column[element] = this.player_turn
							continue
						}
						else if (counter == 7)
						{
							column[inside_key] = this.player_turn
							continue
						}
					var element = inside_key
				}
				// Column Win Check
				if ((column['r7'] == 'X' || column['r7'] == 'O') && (column['r6'] == 'X' || column['r6'] == 'O') && (column['r5'] == 'X' || column['r5'] == 'O') && (column['r4'] == 'X' || column['r4'] == 'O'))
				{
					if ((column['r7'] == column['r6']) && (column['r6'] == column['r5']) && (column['r5'] == column['r4']))
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
					else if ((column['r6'] == column['r5']) && (column['r5'] == column['r4']) && (column['r4'] == column['r3']))
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
					else if ((column['r5'] == column['r4']) && (column['r4'] == column['r3']) && (column['r3'] == column['r2']))
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
					else if ((column['r4'] == column['r3']) && (column['r3'] == column['r2']) && (column['r2'] == column['r1']))
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}	
				}
				// Row Win Check
				var temp_row = []
				var temp_counter = 0
				for (var key in column)
				{
					temp_row[temp_counter] = key
					temp_counter++
				}
				for (var i = 0; i < 7; i++)
				{
					if((this.value.c1[`${temp_row[i]}`] == this.value.c2[`${temp_row[i]}`]) && (this.value.c2[`${temp_row[i]}`] == this.value.c3[`${temp_row[i]}`]) && (this.value.c3[`${temp_row[i]}`] == this.value.c4[`${temp_row[i]}`]) && (this.value.c1[`${temp_row[i]}`] == 'X' || this.value.c1[`${temp_row[i]}`] == 'O')) 
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
					else if ((this.value.c2[`${temp_row[i]}`] == this.value.c3[`${temp_row[i]}`]) && (this.value.c3[`${temp_row[i]}`] == this.value.c4[`${temp_row[i]}`]) && (this.value.c4[`${temp_row[i]}`] == this.value.c5[`${temp_row[i]}`]) && (this.value.c2[`${temp_row[i]}`] == 'X' || this.value.c2[`${temp_row[i]}`] == 'O'))
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
					else if ((this.value.c3[`${temp_row[i]}`] == this.value.c4[`${temp_row[i]}`]) && (this.value.c4[`${temp_row[i]}`] == this.value.c5[`${temp_row[i]}`]) && (this.value.c5[`${temp_row[i]}`] == this.value.c6[`${temp_row[i]}`]) && (this.value.c3[`${temp_row[i]}`] == 'X' || this.value.c3[`${temp_row[i]}`] == 'O'))
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
				}
				// Diagonal Win Check
				// Downwards Check
				/*for (var i = 0; i <4; i++)
				{
					if((this.value.c1[`${temp_row[i]}`] == this.value.c2[`${temp_row[i+1]}`]) && (this.value.c2[`${temp_row[i+1]}`] == this.value.c3[`${temp_row[i+2]}`]) && (this.value.c3[`${temp_row[i+2]}`] == this.value.c4[`${temp_row[i+3]}`]) && (this.value.c1[`${temp_row[i]}`] == 'X' || this.value.c1[`${temp_row[i]}`] == 'O')) 
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
					else if((this.value.c2[`${temp_row[i]}`] == this.value.c3[`${temp_row[i+1]}`]) && (this.value.c3[`${temp_row[i+1]}`] == this.value.c4[`${temp_row[i+2]}`]) && (this.value.c4[`${temp_row[i+2]}`] == this.value.c5[`${temp_row[i+3]}`]) && (this.value.c2[`${temp_row[i]}`] == 'X' || this.value.c2[`${temp_row[i]}`] == 'O')) 
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
					else if((this.value.c3[`${temp_row[i]}`] == this.value.c4[`${temp_row[i+1]}`]) && (this.value.c4[`${temp_row[i+1]}`] == this.value.c5[`${temp_row[i+2]}`]) && (this.value.c5[`${temp_row[i+2]}`] == this.value.c6[`${temp_row[i+3]}`]) && (this.value.c3[`${temp_row[i]}`] == 'X' || this.value.c1[`${temp_row[i]}`] == 'O')) 
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
				}
				// Upwards Check
				for (var i = 6; i >2; i--)
				{
					if((this.value.c1[`${temp_row[i]}`] == this.value.c2[`${temp_row[i-1]}`]) && (this.value.c2[`${temp_row[i-1]}`] == this.value.c3[`${temp_row[i-2]}`]) && (this.value.c3[`${temp_row[i-2]}`] == this.value.c4[`${temp_row[i-3]}`]) && (this.value.c1[`${temp_row[i]}`] == 'X' || this.value.c1[`${temp_row[i]}`] == 'O')) 
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
					else if((this.value.c2[`${temp_row[i]}`] == this.value.c3[`${temp_row[i-1]}`]) && (this.value.c3[`${temp_row[i-1]}`] == this.value.c4[`${temp_row[i-2]}`]) && (this.value.c4[`${temp_row[i-2]}`] == this.value.c5[`${temp_row[i-3]}`]) && (this.value.c2[`${temp_row[i]}`] == 'X' || this.value.c2[`${temp_row[i]}`] == 'O')) 
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
					else if((this.value.c3[`${temp_row[i]}`] == this.value.c4[`${temp_row[i-1]}`]) && (this.value.c4[`${temp_row[i-1]}`] == this.value.c5[`${temp_row[i-2]}`]) && (this.value.c5[`${temp_row[i-2]}`] == this.value.c6[`${temp_row[i-3]}`]) && (this.value.c3[`${temp_row[i]}`] == 'X' || this.value.c1[`${temp_row[i]}`] == 'O')) 
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
				}*/
				let tempObj = {
					'code' : 1 , 
					'player' : 'X' ,
					'value' : this.value
				}
				this.game_start = 0
				this.ws.send(JSON.stringify(tempObj))
			}
			else if (this.player_turn == 'O')
			{
				// Column Full Check
				for(var inside_key in column)
				{
					counter++
					if ((column[inside_key] != " ") && counter == 1)
					{
						this.err = "Column is full."
						return
					}
					else if (column[inside_key] != " ")
					{
						column[element] = this.player_turn
						continue
					}
					else if (counter == 7)
					{
						column[inside_key] = this.player_turn
						continue
					}
					var element = inside_key
				}
				// Column Win Check
				if ((column['r7'] == 'X' || column['r7'] == 'O') && (column['r6'] == 'X' || column['r6'] == 'O') && (column['r5'] == 'X' || column['r5'] == 'O') && (column['r4'] == 'X' || column['r4'] == 'O'))
				{
					if ((column['r7'] == column['r6']) && (column['r6'] == column['r5']) && (column['r5'] == column['r4']))
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
					else if ((column['r6'] == column['r5']) && (column['r5'] == column['r4']) && (column['r4'] == column['r3']))
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
					else if ((column['r5'] == column['r4']) && (column['r4'] == column['r3']) && (column['r3'] == column['r2']))
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
					else if ((column['r4'] == column['r3']) && (column['r3'] == column['r2']) && (column['r2'] == column['r1']))
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}	
				}
				// Row Win Check
				var temp_row = []
				var temp_counter = 0
				for (var key in column)
				{
					temp_row[temp_counter] = key
					temp_counter++
				}
				for (var i = 0; i < 7; i++)
				{
					if((this.value.c1[`${temp_row[i]}`] == this.value.c2[`${temp_row[i]}`]) && (this.value.c2[`${temp_row[i]}`] == this.value.c3[`${temp_row[i]}`]) && (this.value.c3[`${temp_row[i]}`] == this.value.c4[`${temp_row[i]}`]) && (this.value.c1[`${temp_row[i]}`] == 'X' || this.value.c1[`${temp_row[i]}`] == 'O')) 
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
					else if ((this.value.c2[`${temp_row[i]}`] == this.value.c3[`${temp_row[i]}`]) && (this.value.c3[`${temp_row[i]}`] == this.value.c4[`${temp_row[i]}`]) && (this.value.c4[`${temp_row[i]}`] == this.value.c5[`${temp_row[i]}`]) && (this.value.c2[`${temp_row[i]}`] == 'X' || this.value.c2[`${temp_row[i]}`] == 'O'))
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
					else if ((this.value.c3[`${temp_row[i]}`] == this.value.c4[`${temp_row[i]}`]) && (this.value.c4[`${temp_row[i]}`] == this.value.c5[`${temp_row[i]}`]) && (this.value.c5[`${temp_row[i]}`] == this.value.c6[`${temp_row[i]}`]) && (this.value.c3[`${temp_row[i]}`] == 'X' || this.value.c3[`${temp_row[i]}`] == 'O'))
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
				}
				// Diagonal Win Check
				// Downwards Check
				/*for (var i = 0; i <4; i++)
				{
					if((this.value.c1[`${temp_row[i]}`] == this.value.c2[`${temp_row[i+1]}`]) && (this.value.c2[`${temp_row[i+1]}`] == this.value.c3[`${temp_row[i+2]}`]) && (this.value.c3[`${temp_row[i+2]}`] == this.value.c4[`${temp_row[i+3]}`]) && (this.value.c1[`${temp_row[i]}`] == 'X' || this.value.c1[`${temp_row[i]}`] == 'O')) 
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
					else if((this.value.c2[`${temp_row[i]}`] == this.value.c3[`${temp_row[i+1]}`]) && (this.value.c3[`${temp_row[i+1]}`] == this.value.c4[`${temp_row[i+2]}`]) && (this.value.c4[`${temp_row[i+2]}`] == this.value.c5[`${temp_row[i+3]}`]) && (this.value.c2[`${temp_row[i]}`] == 'X' || this.value.c2[`${temp_row[i]}`] == 'O')) 
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
					else if((this.value.c3[`${temp_row[i]}`] == this.value.c4[`${temp_row[i+1]}`]) && (this.value.c4[`${temp_row[i+1]}`] == this.value.c5[`${temp_row[i+2]}`]) && (this.value.c5[`${temp_row[i+2]}`] == this.value.c6[`${temp_row[i+3]}`]) && (this.value.c3[`${temp_row[i]}`] == 'X' || this.value.c1[`${temp_row[i]}`] == 'O')) 
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
				}
				// Upwards Check
				for (var i = 6; i >2; i--)
				{
					if((this.value.c1[`${temp_row[i]}`] == this.value.c2[`${temp_row[i-1]}`]) && (this.value.c2[`${temp_row[i-1]}`] == this.value.c3[`${temp_row[i-2]}`]) && (this.value.c3[`${temp_row[i-2]}`] == this.value.c4[`${temp_row[i-3]}`]) && (this.value.c1[`${temp_row[i]}`] == 'X' || this.value.c1[`${temp_row[i]}`] == 'O')) 
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
					else if((this.value.c2[`${temp_row[i]}`] == this.value.c3[`${temp_row[i-1]}`]) && (this.value.c3[`${temp_row[i-1]}`] == this.value.c4[`${temp_row[i-2]}`]) && (this.value.c4[`${temp_row[i-2]}`] == this.value.c5[`${temp_row[i-3]}`]) && (this.value.c2[`${temp_row[i]}`] == 'X' || this.value.c2[`${temp_row[i]}`] == 'O')) 
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
					else if((this.value.c3[`${temp_row[i]}`] == this.value.c4[`${temp_row[i-1]}`]) && (this.value.c4[`${temp_row[i-1]}`] == this.value.c5[`${temp_row[i-2]}`]) && (this.value.c5[`${temp_row[i-2]}`] == this.value.c6[`${temp_row[i-3]}`]) && (this.value.c3[`${temp_row[i]}`] == 'X' || this.value.c1[`${temp_row[i]}`] == 'O')) 
					{
						this.verdict = `Player ${this.player_turn} wins!`
						this.player_turn = '-'
						return
					}
				}*/
				let tempObj = {
					'code' : 2 , 
					'player' : 'O' ,
					'value' : this.value
				}
				this.game_start = 0
				this.ws.send(JSON.stringify(tempObj))
			}
			}
		}
		
	}

		}).$mount('#root')
