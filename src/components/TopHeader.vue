<template>
  <el-page-header icon="">
    <template #content>
      <div class="flex items-center">
        <el-avatar
          :size="32"
          class="mr-3"
          :src="elessarImg"
        />

      </div>
    </template>

  </el-page-header>
</template>


<script setup lang="ts">
import elessarImg from '../assets/imgs/Elessar.png';
</script>
