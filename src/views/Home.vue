<script setup>
import { ref } from 'vue'
import Map from '../components/Map.vue';
import Sidebar from '../components/Sidebar.vue';
import TopHeader from '../components/TopHeader.vue';
import ChatWindow from "../components/ChatWindow.vue";

const chatVisible = ref(false);
const openChat = () => { chatVisible.value = true; };
const closeChat = () => { chatVisible.value = false; };
</script>

<template>
  <top-header class="top-header" @open-chat="openChat" />
  <el-container>
    <el-aside class="sidebar"><sidebar /></el-aside>
    <el-main class="main">
      <Map :defaultBasemap="'Imagery'" :defaultGround="'world-elevation'"/>
    </el-main>
  </el-container>
  <el-dialog destroy-on-close draggable v-model="chatVisible" title="Chat" width="50%" @close="closeChat">
    <ChatWindow />
  </el-dialog>
</template>
<style scoped>

  .main {
    width: 95vw;
    height: 90vh;
    position: absolute;
    top: 5.5em;
    left: 5.0vw;

  }
  .top-header {
    width: 100vw;
    height: 4vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #23272a ;
    border-radius: .4em;
    padding: 1em;
    position: absolute ;
    top: 0;
    margin:.2vh;
}
.sidebar {
    width: 5vw;
    background-color: #23272a ;
    border-radius: .4em;
    padding: 1em;
    position: absolute ;
    top: 4em;
    left: 0;
    margin:.2em;
    height: 90vh;
}





</style>
