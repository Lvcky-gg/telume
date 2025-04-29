<template>
    <h1>Chat</h1>
      <el-input
    v-model="message"
    style="width: 240px"
    :autosize="{ minRows: 2, maxRows: 4 }"
    type="textarea"
    placeholder="Please input"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const message = ref('');
</script>
