<template lang="">
    <div>
      <body>
      <div class="main">  	
		<input type="checkbox" id="chk" aria-hidden="true">

			<div class="signup">
				<form @submit.prevent="signup">
					<label for="chk" aria-hidden="true">Sign up</label>
					<input type="text" id="text" name="txt" placeholder="User name" required="" v-model="username">
					<input type="email" id="email" name="email" placeholder="Email" required="" v-model="email">
					<input type="password" id="password" name="pswd" placeholder="Password" required="" v-model="password" autocomplete="on">
					<input type="password" id="password2" name="pswd" placeholder="Confirm Password" required="" v-model="password2" autocomplete="on">
					<button @click="register">
						<v-progress-circular indeterminate color="white" size="20" v-if="$store.state.loading"></v-progress-circular>
						<!-- <v-progress-linear :indeterminate="loading" absolute bottom color="deep-purple accent-4" v-if="$store.state.loading"/> -->
						<span v-else>Register</span>
					</button>
				</form>
			</div>

			<div class="login">
				<form @submit.prevent="login">
					<label for="chk" aria-hidden="true">Login</label>
					<input type="email" name="email" placeholder="Email" required="" id="loginemail" v-model="email" autocomplete="on">
					<input type="password" name="pswd" placeholder="Password" required="" id="loginpassword" v-model="password" autocomplete="on">
					<button type="submit">
						<v-progress-circular indeterminate color="white" size="20" v-if="$store.state.loading"></v-progress-circular>
						<!-- <v-progress-linear color="red lighten-2" buffer-value="0" stream v-if="$store.state.loading"></v-progress-linear> -->
						<!-- <v-progress-linear :indeterminate="loading" absolute bottom color="deep-purple accent-4" v-if="$store.state.loading"/> -->
						<span v-else>Login</span>
					
					</button>
					
				</form>
			</div>
		</div>
		</body>
    </div>
</template>
<script>
export default {
    name:'LoginPage',
	data() {
    return {
		interval: {},
        value: 0,
		username: '',
		email: '',
		password: '',
		password2: '',
		error: '',
    };
  },
  methods: {
    login() {
      if (!this.validatelogin()) {
        this.$store.commit('flashError', this.error);
		alert(this.error);
        return;
      }
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push('/');
        });
    },
    validatelogin() {
      if (!this.email) {
        this.error = 'Email is required';
        return false;
      }
      if (!this.password) {
        this.error = 'Password is required';
        return false;
      }
      return true;
    },
	register() {
      const valid = this.validateRegister();
      if (!valid) {
        this.$store.commit('flashError', this.error);
		console.log(this.error);
        return;
      }
      this.$store
        .dispatch('register', {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push('/');
        });
    },
    validateRegister() {
      if (
        this.username.trim() === '' ||
        this.email.trim() === '' ||
        this.password.trim() === '' ||
        this.password2.trim() === ''
      ) {
        this.error = 'All fields are required';
        return false;
      } else if (!this.validateEmail(this.email)) {
        this.error = 'Email is not valid';
        return false;
      } else if (this.password.length < 6) {
        this.error = 'Password must be at least 6 characters';
        return false;
      } else if (this.password !== this.password2) {
        this.error = 'Passwords do not match';
        return false;
      }
      return true;
    },
    validateEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
	
  },
  
  
}

</script>
<style scoped>
 @import url('https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap');
 html{
	margin: 0;
	padding: 0;
	overflow: hidden;
 }
 body{
	margin-top:-7px;
	padding: 0;
	
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 102vh;
	font-family: 'Jost', sans-serif;
	background: linear-gradient(to bottom, #0f0c29,#1A237E);
}
.main{
	width: 350px;
	height: 500px;
	overflow-y: hidden;
	border-radius: 10px;
	box-shadow: 5px 20px 50px #000;
}
#chk{
	display: none;
}
.signup{
	position: relative;
	width:100%;
	/* transform: translateY(+180px); */
	transition: .8s ease-in-out;
	height: 100%;
}
label{
	color: #fff;
	font-size: 2.3em;
	justify-content: center;
	display: flex;
	margin: 60px;
	font-weight: bold;
	cursor: pointer;
	transition: .5s ease-in-out;
}
input{
	width: 60%;
	height: 24px;
	background: rgb(255,255,255,93%);
	justify-content: center;
	display: flex;
	margin: 20px auto;
	padding: 10px;
	border: none;
	outline: none;
	border-radius: 5px;
}
button{
	width: 60%;
	height: 40px;
	margin: 10px auto;
	justify-content: center;
	display: block;
	color: #fff;
	background: #FF5F15;
	font-size: 1em;
	font-weight: bold;
	margin-top: 20px;
	outline: none;
	border: none;
	border-radius: 5px;
	transition: .2s ease-in;
	cursor: pointer;
}
button:hover{
	background: #6d44b8;
}
.login{
	height: 460px;
	background: #eee;
	border-radius: 60% / 10%;
	transform: translateY(-180px);
	transition: .8s ease-in-out;
}
.login label{
	color: #1A237E;
	transform: scale(.6);
}

#chk:checked ~ .login{
	transform: translateY(-500px);
}

#chk:checked ~ .login label{
	transform: scale(1);	
}


/* #chk:checked ~ .signup label{
	transform: scale(1);
} */

</style>