<template>

		<!-- <div class="flex flex-col items-center mt-3 border-t border-gray-700">
			<a class="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="#">
			<el-icon><plus /></el-icon>
			</a>
		</div> -->
    <el-tabs type="border-card" tabPosition="left"class="sidebar-tabs">
    <!-- <el-tab-pane label="🛠️"></el-tab-pane> -->
      <el-tab-pane label="📈">Aanlysis</el-tab-pane>
      <el-tab-pane label="🧨">Boom</el-tab-pane>
      <el-tab-pane label="🗺️">Map</el-tab-pane>
      <el-tab-pane label="🫣"><LineOfSight/></el-tab-pane>
      <el-tab-pane label="☢️">Spill</el-tab-pane>
  </el-tabs>


 </template>

 <script lang="ts" setup>
 import { ref } from 'vue'
 import LineOfSight from './LineOfSight.vue'
 import {
   Menu as IconMenu,
   Tools,
   Plus
 } from '@element-plus/icons-vue'

 const isCollapse = ref(true)
 const handleOpen = (key: string, keyPath: string[]) => {
   console.log(key, keyPath)
 }
 const handleClose = (key: string, keyPath: string[]) => {
   console.log(key, keyPath)
 }
 </script>

 <style lang="scss" scoped>
  .sidebar-tabs{
   width: 100%;
   height: 100%;
   background-color: #23272a ;
   border: none;
   color: white;
   font-size: 1.2em;
   font-weight: bold;
   margin-top:10%;

  }
 .el-menu{

   height: 100%;
   background-color: #23272a ;
   border: none;

 }
 .el-icon{
   color: white;
 }
 </style>
