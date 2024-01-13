<script setup>
import Header from "../components/header.vue"
import Footer from "../components/Footer.vue"

// import{ ref, reactive} from 'vue'
// let posts = reactive([])

fetch("http://localhost:3000/posts", 
{headers: {"Authorization": document.cookie}   
})
.then((response) => {
    return response.json()
})

.then((data) => {
    console.log(data)
    // posts.value.push(...json)
    const container = document.getElementById("container")


    data.forEach((instaPosts) => {
        let postDiv = document.createElement("div")
        let postContainer = document.createElement("div")
        let postHeader = document.createElement("div")
        let postFooter = document.createElement("div")
        let buttonDiv = document.createElement("div")
        let profileTag = document.createElement("img")
        let usernameTag = document.createElement("h3")
        let imageTag = document.createElement("img")
        let captionDiv = document.createElement("div")
        let captionTag = document.createElement("h3")
        let likesTag = document.createElement("h3")       
        let commentsTag = document.createElement("h3")

        const username = instaPosts.username
        const image = instaPosts.image
        const caption = instaPosts.caption

        profileTag.src = "../../public/profile_bubble.png" 
        usernameTag.innerText = username
        imageTag.src = image
        captionTag.innerText = caption
        likesTag.innerText = `❤️ ${instaPosts.likes.length} likes`
        commentsTag.innerText = "💬"

        postHeader.appendChild(profileTag)
        postHeader.appendChild(usernameTag)

        captionDiv.appendChild(captionTag)

        buttonDiv.appendChild(likesTag)
        buttonDiv.appendChild(commentsTag)

        postFooter.appendChild(buttonDiv)
        postFooter.appendChild(captionDiv)

        postContainer.appendChild(postDiv)

        postDiv.appendChild(postHeader)
        postDiv.appendChild(imageTag)
        postDiv.appendChild(postFooter)

        container.appendChild(postContainer)
    

        postContainer.classList.add("post_container")
        postDiv.classList.add("post_div")
        postHeader.classList.add("post_header")
        postFooter.classList.add("post_footer")
        buttonDiv.classList.add("button_div")
        imageTag.classList.add("post_images")
        profileTag.classList.add("profile_bubble")
})

})

</script>

<template>
    <Header/>
    <div id="container">
    </div>
    <!-- <template>
        <div class="post_container">
            <div class="card-header">
                <p>{{ post.username }}</p>
            </div>
            <div class="image_container">
                <img src="post.image" alt="">
            </div>
            <div class="card_footer">
                <div class="likes_container">
                    <p>Likes: {{ posts.likes.length }}</p>
                    <p>❤️</p>
                </div>
                <div class="caption_container">
                    <p> {{ post.caption }}</p>
                </div>
            </div>
        </div>
    </template> -->
    <Footer/>
</template>

<style scoped>
    #container{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: lightgrey;
        gap: 1rem;
    }

    :deep(.post_div){
        display: flex;
        flex-direction: column;
        justify-self: center;
        align-items: center;
        background-color: white;
        height: 42rem;
        width: 40rem;
    }
 
   :deep(.post_header){
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
   }

   :deep(.profile_bubble){
        height: 2rem;
   }

   :deep(.post_images){
        width: 30rem;
        height: 30rem;
   }

   :deep(.post_footer){
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
   }

   :deep(.button_div){
        display: flex;
        align-items: center;
        gap: 2rem;
   }

</style>