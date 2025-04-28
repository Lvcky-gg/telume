<template>

  <div class="common-layout">
    <el-container>
      <el-aside ><sidebar/></el-aside>
      <el-main><div><map id="map-container"></map></div></el-main>
      <el-aside ><top-header></top-header></el-aside>
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
