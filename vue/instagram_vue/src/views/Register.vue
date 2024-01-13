<script setup>
import router from "@/router";
import { ref } from "vue"


let email = ref('')
let username = ref('')
let password = ref('')

function register(){
  const reqBody = {
    "email": email.value, 
    "username": username.value,
    "password": password.value
  }

  fetch("http://localhost:3000/user", {
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(reqBody),
    method: "POST"
  })

  .then(response => {
    console.log(response)
    if(email.value || username.value || password.value === ""){
      alert("Please fill out all fields")
    } else{

    if(response.status === 201){
      alert("Account created. Please login to continue")
      router.push("/")
    }else {
      alert("Something went wrong. Please try again")
    }}
  })


  .catch(error => {
    console.log(error)
  })
}

</script>

<template>
<div class="container">

    <div class="container">
      <div id="register_box">
        <img id="insta_logo" src="../assets/instagram_word_logo.png" alt="instagram Logo">
        <input v-model="email" type="text" id="email" name="email"  placeholder="Email">
        <input v-model="username" type="text" id="username" name="username" placeholder="Username">
        <input v-model="password" type="password" id="password" name="password" placeholder="Password">
        <button @click="register">Register</button>
        <p id="terms-text">By signing up you agree to our Terms, Privacy Policy and Cookies Policy</p>
      </div>
      <div id="login_box">
        <p>Have an account? <router-link to = "/">Login</router-link> </p>
      </div>
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

  #register_box{
    border: 1px solid lightgrey;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 25vw;
    padding-bottom: 2rem;
    text-align: center;
  }

  #login_box{
    margin-top: 1rem;
    border: 1px solid grey;
    width: 25vw;
    text-align: center;
  }

</style>