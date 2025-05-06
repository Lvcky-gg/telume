<script setup>
import { ref } from 'vue'
import Map from '../components/Map.vue';
import Sidebar from '../components/Sidebar.vue';
import TopHeader from '../components/TopHeader.vue';
import ChatWindow from "../components/ChatWindow.vue";
import { GridLayout, GridItem } from 'vue3-grid-layout';

const chatVisible = ref(false);
const conversionVisible = ref(false);
const activeName = ref('first')
const openChat = () => { chatVisible.value = true; };
const closeChat = () => { chatVisible.value = false; };
const openConversion = () => {
  console.log('open')
  conversionVisible.value = true; };
const closeConversion = () => { conversionVisible.value = false; };

const layout = ref([
  { i: 'a', x: 0, y: 0, w: 12, h: 50 },
]);

</script>

<template>
  <top-header class="top-header"
   @open-chat="openChat"
   @open-conversion="openConversion"
    />
  <el-container>
    <el-aside class="sidebar"><Sidebar /></el-aside>
    <el-main class="main">
      <grid-layout
        class="grid-layout"
        :layout="layout"
        :col-num="12"
        :row-height="30"
        :isDraggable="true"
        :isResizable="true"
      >
        <grid-item v-for="item in layout" :key="item.i" v-bind="item">
          <div class="map-tabs-container">
            <el-tabs tabPosition="top" v-model="activeName" class="full-size-tabs">
              <el-tab-pane label="Map" name="first" class="full-size-tab-pane">
                <div class="map-container">
                  <Map :defaultBasemap="'Imagery'" :defaultGround="'world-elevation'"/>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </grid-item>
      </grid-layout>
    </el-main>
  </el-container>
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
  .grid-layout {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
.map-tabs-container,
.full-size-tabs,
.full-size-tab-pane,
.map-container {
  width: 100%;
  height: 100%;
  min-height: 300px; /* fallback for very small screens */
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
