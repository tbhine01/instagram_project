<script setup>
import router from "@/router";
import { ref } from "vue"

let email = ref('')
let password = ref('')

function login(){
  const reqBody = {
    "email": email.value,
    "password": password.value
  }

  fetch("http://localhost:3000/login", 
  {headers: {"Content-Type": "application/json"},
  body: JSON.stringify(reqBody),
  method: "POST"
  })

  .then(response => {
    return response.json()
  })

  .then(data => {
    document.cookie = data
    router.push('/posts')
  })

  .catch(error => {
    console.log(error)
  })
}
</script>

<template>
    <div class="container">
      <div class="login_box">
        <img id="insta_logo" src="../assets/instagram_word_logo.png" alt="instagram Logo">
        <input type="text" id="username" name="username" v-model="email" placeholder="Email">
        <input type="password" id="password" name="password" v-model="password" placeholder="Password">
        <button @click="login">Log In</button>
      </div>
      <div id="register_box">
        <p>Don't have an account? <router-link to = "/register">Register Here</router-link> </p>
      </div>
    </div>
</template>

<style scoped>
  .container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
  }


  .login_box{
    border: 1px solid grey;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 25vw;
    padding-bottom: 2rem;
  }

  #insta_logo{
    height: 150px;
   
  }
  
  input{
    width: 300px;
    text-align: center;
    height: 25px;
    font-size: 95%;
    font-family: 'PT Sans', sans-serif;
  }

  button{
    background-color: #3083DC;
    color: white;
    font-size: x-large;
    width: 310px;
    border-radius: 10px;
    font-family: 'PT Sans', sans-serif;
  }

  #register_box{
    margin-top: 1rem;
    border: 1px solid grey;
    width: 25vw;
    text-align: center;
    
  }

 
</style>
