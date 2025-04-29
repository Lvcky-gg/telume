<template>


        <div class="header-logo">
            <el-avatar :src="elessarImg" alt="Logo" />
            <div class="tools-container">
              <el-icon><download/></el-icon>
               <el-icon><compass/></el-icon>
                <el-icon><document/></el-icon>
            </div>
        </div>


</template>


<script setup lang="ts">
// import Avatar from 'primevue/avatar';
import elessarImg from '../assets/imgs/Elessar.png';
 import {
Download,
    Document,
    Setting,
    Plus,
    Tools,
    Menu as IconMenu,
    ArrowDown,
    ArrowUp,
    Compass
 } from '@element-plus/icons-vue'
</script>
<style lang="scss" scoped>

.header-logo img {
    width: 50px;
    height: 50px;
}
.header-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
}
.tools-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 50px;
    color: white;
    font-size: 24px;
    cursor: pointer;
    i {
      margin-right: 8%;
    }
}

</style>
