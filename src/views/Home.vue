<template>



    <top-header class="top-header"></top-header>
    <el-container>
      <el-aside class="sidebar"><sidebar /></el-aside>
      <el-main><div><map id="map-container"></map></div></el-main>
    </el-container>



</template>
<script setup>
import Map from '../components/Map.vue';
import Sidebar from '../components/Sidebar.vue';
import TopHeader from '../components/TopHeader.vue';

</script>
<style scoped>

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
