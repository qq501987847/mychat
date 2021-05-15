<template>
	<div id="app">
		<section class="Section-chat">
			<form >
				<fieldset class="chatMain">
					<legend>myChat</legend>
					<div class="userList">
						<h3>用户列表</h3>
						<ul class="userList-ul"></ul>
						<p>{{ connectState }}...</p>
					</div>
					<div class="chatRight">
						<div class="mainMessage"> 
						<ul ref="ulList" class="mainMessage-list">
						</ul>
						</div>
						<textarea ref="txta" class="myEmitMessage" @focus="keyEvent" v-model="txta" @keyup.ctrl.enter="lineFeed()"  @keyup.enter.exact="$refs.btn.click()"></textarea>
						<div class="subMitData">
							<div class="dataLeft">
								<input type="image" />
							</div>
							<input ref="btn" class="submit" :disabled="flag" type="button"  @click="addMessage" value="发送" />
						</div>
					</div>
				</fieldset>
			</form>
		</section>
	</div>
</template>

<script>
	export default {
		name: 'app',
		components: {},
		data() {
			return {
				myInfo: '',
				connectState: '',
				txta:'',
			}
		},
		
		created() {
			// this.info = createChat();
			// console.log(this.info)
			this.init()
			
			
		},
		
		methods: {
			init() {
				console.log(this.socket)
				this.socket.onmessage = this.message;
				this.socket.onopen = this.open;
				this.socket.onclose = this.close;
			},
			open(event) {
					this.connectState = '连接成功';
					// console.log(1111)
			},
			message(res) {
				console.log(res.data)
				const ulList = this.$refs.ulList;
				this.myInfo = res.data;
				const li = document.createElement('li');
				li.textContent = this.myInfo;
				ulList.appendChild(li);
			},
			addMessage() {
				let myMessage = this.txta
				if(this.socket.readyState === WebSocket.OPEN) {
					this.socket.send(myMessage);
					this.txta = '';
				}else {
					alert('连接没有开启')
				}
			},
			// 键盘事件
			keyEvent(e) {
				console.log(this.$refs.btn)
				console.log(e.target)
			},
			lineFeed() {
				this.txta = this.txta + '\n';
			}
		},
		computed: {
			flag () {
				console.log(this.txta)
				return this.txta !== '' ? false : true
			}
		}
		
	}
</script>

<style>
	@import 'assets/css/base.css';
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/* text-align: center; */
		color: #2c3e50;
		margin-top: 60px;
		height: 100vh;
		width: 100vw;
	}

	.chatMain {
		display: flex;
	}

	.userList {
		height: 40em;
		width: 10em;
		border: 1px solid #7D9726;
		background-color: rgba(0, 0, 0, .4);
		color: #fff;
	}

	.chatRight {
		display: flex;
		flex-direction: column;
		width: 40em;
		background-color: rgba(0, 100, 100, .4);
		border: 1px solid #516AEC;
	}

	.mainMessage {
		flex: 9 0 300px;
		background-color: rgba(100, 100, 0, .4);
		color: #fff;
		/* resize:none; */
	}

	.myEmitMessage {
		flex: 3 0 100px;
		resize: none;
	}

	.subMitData {
		display: flex;
		height: 3em;
	}

	.dataLeft {
		margin-right: auto;
	}

	.submit {
		width: 10em;

	}
	.userList {
		display: flex;
		flex-direction: column;
	}
	.userList h3,
	.userList p{
		text-align: center;
	}
	.userList-ul {
		margin-bottom: auto;
		border:#0000EE 1px solid;
	}
	.mainMessage-list li {
		position: relative;
		list-style: none;
		background-color: #5E1700;
		padding: 1em;
		width:10em;
		border-radius: .8em;
		margin-bottom: 1em;
	}
	.mainMessage-list li::before {
		content:'';
		display: block;
		position: absolute;
		left: -.8em;
		top: 1em;
		border: .4em solid #5E1700;
		border-color: transparent;
		border-right-color: #5E1700;
		
	}
	.Section-chat {
		position: absolute;
		top: 100px;
		left: 50%;
		transform: translate(-50%);
	}
</style>
