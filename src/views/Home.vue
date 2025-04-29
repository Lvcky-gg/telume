<template>



    <top-header class="top-header"></top-header>
    <el-container>
      <el-aside class="sidebar"><sidebar /></el-aside>
      <el-main class="main">
        <Map :defaultBasemap="'Imagery'" :defaultGround="'world-elevation'"/>
      </el-main>
    </el-container>
    <chat-window class="chat"/>



</template>
<script setup>
import Map from '../components/Map.vue';
import Sidebar from '../components/Sidebar.vue';
import TopHeader from '../components/TopHeader.vue';
import ChatWindow from "../components/ChatWindow.vue";

</script>
<style scoped>
.chat {
  height:10px;
  background-color: blue;
  width:100vw;
  position: absolute ;
  top:80%;
  left: 0;
  z-index: 100;
}
  .main {
    width: 90vw;
    height: 90vh;
    position: absolute;
    top: 5.5em;
    left: 5.5vw;

  }
  .top-header {
    width: 100vw;
    height: 4vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #23272a ;
    border-radius: .4em;
    padding: 1em;
    position: absolute ;
    top: 0;
    margin:.2em;
}
.sidebar {
    width: 5vw;
    background-color: #23272a ;
    border-radius: .4em;
    padding: 1em;
    position: absolute ;
    top: 5em;
    left: 0;
    margin:.2em;
    height: 92vh;
}





</style>
