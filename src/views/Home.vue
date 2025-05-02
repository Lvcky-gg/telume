<script setup>
import { ref } from 'vue'
import Map from '../components/Map.vue';
import Sidebar from '../components/Sidebar.vue';
import TopHeader from '../components/TopHeader.vue';
import ChatWindow from "../components/ChatWindow.vue";

const chatVisible = ref(false);
const conversionVisible = ref(false);
const openChat = () => { chatVisible.value = true; };
const closeChat = () => { chatVisible.value = false; };
const openConversion = () => {
  console.log('open')
  conversionVisible.value = true; };
const closeConversion = () => { conversionVisible.value = false; };
</script>

<template>
  <top-header class="top-header"
   @open-chat="openChat"
   @open-conversion="openConversion"
    />
  <el-container>
    <el-aside class="sidebar"><sidebar /></el-aside>
    <el-main class="main">
      <Map :defaultBasemap="'Imagery'" :defaultGround="'world-elevation'"/>
    </el-main>
  </el-container>
  <el-dialog destroy-on-close draggable v-model="chatVisible" title="Chat" width="50%" @close="closeChat" >
    <ChatWindow />
  </el-dialog>

    <el-dialog destroy-on-close draggable v-model="conversionVisible" title="Conversion" width="50%" @close="closeConversion" >

  </el-dialog>
</template>
<style scoped>

  .main {
    width: 85vw;
    height: 98vh;
    position: absolute;
    top: 4.5em;
    left: 15.5vw;
    overflow: hidden;

  }
  .top-header {
    width: 100vw;
    height: 4vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #23272a ;

    padding: 1em;
    position: absolute ;
    top: 0;

    z-index: 1000;
    box-shadow: -5px 5px 20px 5px #000;
}
.sidebar {
    width: 15vw;
    background-color: #23272a ;
    z-index: 999;
    height: 95vh;
    overflow: hidden;
}





</style>
