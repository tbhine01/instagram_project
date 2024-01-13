<script setup>
import Header from "../components/header.vue"
import Footer from "../components/Footer.vue"
import { ref } from "vue"
import router from "@/router";


let imageURL = ref('')
let caption = ref('')

function createPost(){
    const reqBody = {
        "image": imageURL.value,
        "caption": caption.value
    }

    fetch("http://localhost:3000/createpost",
    {
        headers: {"Content-Type": "application/json", "Authorization": "document.cookie"},
        body: JSON.stringify(reqBody),
        method: "POST"
    })
    .then(response => {
        if(response.status === 200){
            alert("Post Successful!")
            router.push('/posts')
        }else{
            alert("Something went wrong. Please try again")
        }
    })
    .catch(error => [
        console.log(error)
    ])
}

</script>

<template>
<Header/>
<div id="container">
    
    <div>
        <label for="image_input">Image</label>
        <input v-model="imageURL" type="text" placeholder="Image URL" id="image_input">
    </div>

    <div>
        <img :src=imageURL>
    </div>

    <div>
        <label for="caption">Caption</label>
        <input v-model="caption" type="text" placeholder="Caption" id="caption">

        <button @click="createPost">Post!</button>
    </div>
</div>
<Footer/>
</template>

<style scoped>
#container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

</style>