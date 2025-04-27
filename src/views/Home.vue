<template>
    <!-- <top-header id="top-header"></top-header> -->
    <!-- <sidebar id="custom-sidebar"/> -->
    <!-- <div id="app-content">
    <map id="map-container"></map>

    </div> -->
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main><map id="map-container"></map></el-main>
      <el-aside width="200px">Aside</el-aside>
    </el-container>
  </div>


</template>
<script setup>
import Map from '../components/Map.vue';
import Sidebar from '../components/Sidebar.vue';
import TopHeader from '../components/TopHeader.vue';

</script>
<style scoped>

body, html, #app {
    height: 100%;
    margin: 0;
    padding: 0;
}




</style>
