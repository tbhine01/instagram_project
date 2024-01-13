<script setup>


</script>


<template>
<div id="header">
   <img id="logo" src="../assets/Logo-Instagram.png" alt="Instagram Logo">
    <div id="notification">
        <img id="heart_icon" src="../assets/like.png" alt="Notifications">
        <img id="message_icon" src="../assets/message.png" alt="Messages">
    </div>
</div>

</template>


<style scoped>

#header{
    width: 100vw;
    height: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: lightgray;
    margin: 0;
    padding: 1rem;
}

#logo{
    width: 10rem;
    height: 5rem;
}

#notification{
    display: flex;
    flex-direction: row;
    padding-right: 2rem;
}

#heart_icon{
    width: 3rem;
    height: 3rem;
}

#message_icon{
    width: 4rem;
    height: 3.5rem;
}

</style>