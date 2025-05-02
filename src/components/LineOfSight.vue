<template>
    <!-- <Coords></Coords> -->
     <button @click="startLos">Start LOS</button>
</template>
<script setup lang="ts">
import Coords from './Coords.vue';
import {startLOS }from '../lib/los.js';
const startLos = () => {
    startLOS();
};
</script>
