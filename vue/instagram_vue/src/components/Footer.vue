<script setup>
    import { RouterLink } from 'vue-router';

</script>

<template>
    <div id="footer">
        <RouterLink to="/posts">🏠</RouterLink>
        <RouterLink to="/create-post">➕</RouterLink>
        <RouterLink to="/profile">👤</RouterLink>
    </div>


</template>

<style scoped>
    #footer{
        background-color: lightgrey;
        height: 3rem;
        width: 100vw;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin: 0;
    }

</style>