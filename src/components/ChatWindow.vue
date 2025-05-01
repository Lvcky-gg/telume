<template>
    <button @click="sendMessage" style="margin-bottom: 20%;">Send</button>
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
import { inputEmits } from 'element-plus';
import { ChatMessage } from '../types/message';
const message = ref('');
const models = ref<string[]>([]);
const responses = ref('');
const sendMessage = async (e:any) => {
    e.preventDefault();
    if(!message.value.trim())
        return;
    try {
        const userMessage : ChatMessage = {
            role: 'user',
            content: message.value,
        };
     const response = await invoke('chat', {
            request: {
                model: "llama3:latest",
                messages: [userMessage]
            }
        });
        console.log(JSON.stringify({response}));
        responses.value = response as string;

    } catch (error) {
        console.error('Error:', error);
    }
};
const getModels = async () => {
    try {
        const response : string[] = await invoke('get_models');
        if(response.length){
            models.value = response;
        }

    } catch (error) {
        console.error('Error:', error);
    }
};
</script>
