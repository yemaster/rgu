<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const props = withDefaults(defineProps<{
    homepage?: boolean
}>(), {
    homepage: false
})

const router = useRouter()

const gotoLink = (link: any = '/') => {
    router.push(link)
}

const appBarMode = ref(0);

if (props.homepage) {

    const handleScroll = () => {
        const scrollTop = window.scrollY
        if (scrollTop > 0) {
            appBarMode.value = 1
        } else {
            appBarMode.value = 0
        }
    }

    onMounted(() => {
        window.addEventListener('scroll', handleScroll)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll)
    })
}
else {
    appBarMode.value = 2
}

// 投稿的对话框控制
const dialog = ref(false);
</script>

<template>
    <v-app-bar color="indigo-darken-4" :image="homepage ? undefined : '/bg.jpg'" class="vt-menu"
        :class="{ 'vt-menu-0': appBarMode === 0, 'vt-menu-1': appBarMode === 1 }"
        :scroll-behavior="homepage ? 'fade-image elevate' : 'elevate'">
        <template v-slot:image v-if="!homepage">
            <v-img gradient="to top right, rgba(26, 35, 126, .6), rgba(57, 73, 171, .6)"></v-img>
        </template>
        <v-app-bar-title class="vt-link" @click="gotoLink('/')">招生指北</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn @click="gotoLink('/')">首页</v-btn>
        <v-btn @click="gotoLink('/readme')">说在最前</v-btn>
        <v-btn @click="dialog = true">投稿</v-btn>
    </v-app-bar>

    <v-dialog v-model="dialog" width="auto">
        <v-card max-width="400" prepend-icon="mdi-information-box-outline" title="投稿">
            <template v-slot:text>
                发送邮件至：<a href="mailto:me@yemaster.cn">me@yemaster.cn</a> 或者联系QQ: 1440169768
            </template>
            <template v-slot:actions>
                <v-btn class="ms-auto" text="好的" @click="dialog = false"></v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>
