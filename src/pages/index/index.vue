<template>
  <view>
    <text>{{ msg }}</text>
    <nut-button type="primary">主要按钮</nut-button>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { demo } from '@/api/index.js';
import './index.scss';

const msg = ref('Hello world');

onMounted(async () => {
  await demo({ companyId: '3123123123123' });
});
</script>
