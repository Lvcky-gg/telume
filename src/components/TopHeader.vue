<template>


        <div class="header-logo">
            <el-avatar :src="elessarImg" alt="Logo" />
        </div>


</template>


<script setup lang="ts">
// import Avatar from 'primevue/avatar';
import elessarImg from '../assets/imgs/Elessar.png';
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

</style>
