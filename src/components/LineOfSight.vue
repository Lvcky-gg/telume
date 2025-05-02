<template>
    <!-- <Coords></Coords> -->
     <button @click="startLos">Start LOS</button>
</template>
<script setup lang="ts">
import Coords from './Coords.vue';
import {startLOS, createLOS  }from '../lib/los.js';
import onMounted from 'vue';
const startLos = () => {
    console.log('start los');
    createLOS();
    startLOS();
};
// onMounted(() => {
//     createLOS();
// });
</script>
