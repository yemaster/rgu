<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <v-footer class="bg-blue-darken-4" image="@/assets/bg.jpg" style="margin-top: 30px">
      <p class="text-left">&copy; {{ nowYear }} 一片抽象 Abstrax.</p>
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
const nowYear = new Date().getFullYear();
</script>
