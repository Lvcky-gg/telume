<template>
    <button @click="getModels" style="margin-bottom: 20%;">Send</button>
      <el-input
    v-model="message"
    style="width: 240px"
    :autosize="{ minRows: 2, maxRows: 4 }"
    type="textarea"
    placeholder="Please input"
  />

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { invoke } from '@tauri-apps/api';
const message = ref('');
const models = ref('');
const responses = ref('');
const sendMessage = async () => {
    console.log('Message:', message.value);
    try {
        const response = await invoke('chat', { message: message.value });
        responses.value = response as string;
        console.log('Response:', response);
    } catch (error) {
        console.error('Error:', error);
    }
};
const getModels = async () => {
    try {
        const response = await invoke('get_models');
        console.log(response)
        models.value = response as string;
    } catch (error) {
        console.error('Error:', error);
    }
};
</script>
