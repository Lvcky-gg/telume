<template>


        <div class="header-logo">
            <el-avatar :src="elessarImg" alt="Logo" />
            <div class="tools-container">
              <!-- <el-icon><download/></el-icon>
               <el-icon><compass/></el-icon> -->
                  <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="Coord Conversion"
                        placement="right-end"
                        >
                <el-icon @click="toggleConversionVisible"><location/></el-icon>
                </el-tooltip>
                      <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="Telume Chat"
                        placement="right-end"
                        >
                <el-icon @click="toggleChatVisible"><ChatDotRound/></el-icon>
                </el-tooltip>

                      <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="Weather"
                        placement="right-end"
                        >
                <el-icon @click="toggleWeatherVisible"><Drizzling /></el-icon>
                </el-tooltip>




            </div>
        </div>



</template>


<script setup lang="ts">
// import Avatar from 'primevue/avatar';
import { ref } from 'vue';
import { defineEmits } from 'vue';
import elessarImg from '../assets/imgs/Elessar.png';
import Weather from "@arcgis/core/widgets/Weather.js";
import { view }from '../lib/map.js';
 import {
Download,
    Location,
    Setting,
    ChatDotRound,
    Drizzling,
    Menu as IconMenu,
    Compass
 } from '@element-plus/icons-vue'
const emit = defineEmits(['open-chat', 'open-conversion']);
const weather = ref(false);
let weatherWidget: any = null;

const toggleChatVisible = () => {
  emit('open-chat');
};
const toggleConversionVisible = () => {
  emit('open-conversion');
};
const toggleWeatherVisible = () => {
  if (weather.value) {
    weather.value = false;
    if (weatherWidget) {
      view.ui.remove(weatherWidget);
      weatherWidget = null;
    }
  } else {
    weather.value = true;
    weatherWidget = new Weather({ view: view });
    view.ui.add(weatherWidget, "bottom-leading");
  }
};
// view.ui.add(new Weather({ view: view }), "bottom-leading");
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
