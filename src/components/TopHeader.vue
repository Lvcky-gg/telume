<template>


        <div class="header-logo">
            <el-avatar :src="elessarImg" alt="Logo":size="50" />
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
import { ref } from 'vue';
import elessarImg from '../assets/imgs/Elessar2.png';
import Weather from "@arcgis/core/widgets/Weather.js";
import Search from "@arcgis/core/widgets/Search.js";
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
const search = ref(false);
let weatherWidget: any = null;
      const searchWidget = new Search({
        view: view,

    });

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
const toggleGeocode = () => {

    view.ui.add(searchWidget, {
        position: 'top-leading',
        index: 0
    });

}
   searchWidget.on("search-complete", (event) => {

    if (event.results.length && event.results[0].results.length) {
        const result = event.results[0].results[0];
        const geometry = result.feature.geometry;

        if(geometry) {
        if (geometry.type === "point") {
            const { latitude, longitude } = geometry;
            if(latitude && longitude) {
            getWeather(latitude, longitude);
            }
        }
    }
    }
});
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
