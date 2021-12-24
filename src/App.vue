<template>
    <div id="#app">
        <router-view v-slot="{ Component, route }">
                <keep-alive>
                    <component :is="Component" :key="route.name" v-if="route.meta.keepAlive" />
                </keep-alive>
                <component :is="Component" :key="route.name" v-if="!route.meta.keepAlive" />
        </router-view>
    </div>
</template>

<script setup>

</script>
<style>
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>
