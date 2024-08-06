<script setup lang="ts">
import axios from 'axios';
import { onBeforeMount, type Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Navbar from '@/components/Navbar.vue';

import { marked } from 'marked'

const route = useRoute()
const router = useRouter()

const loading = ref(true);

type dataPiece = {
    [key: string]: string
}
const path = route.params.id
const article: Ref<dataPiece> = ref({});

onBeforeMount(async () => {
    try {
        article.value = (await axios.get(`/data/${path}.json`)).data;
    }
    catch (e) {
        router.push('/404');
    }
    article.value.content = marked.parse(article.value.content) as string;
    loading.value = false;
});
</script>

<template>
    <div>
        <navbar />
        <v-container class="vt-article">
            <v-skeleton-loader type="article" v-if="loading && !article"></v-skeleton-loader>
            <template v-else>
                <h1>{{ article.title }}</h1>

                <div class="d-flex flex-wrap ga-2" style="margin-top: .75rem">
                    <v-chip size="small" color="primary" prepend-icon="mdi-domain">
                        {{ article.school }}
                    </v-chip>
                    <v-chip size="small" color="indigo" prepend-icon="mdi-key-outline">
                        {{ article.admission }}
                    </v-chip>
                    <v-chip size="small" color="purple" prepend-icon="mdi-book-open-variant">
                        {{ article.choose }}
                    </v-chip>
                    <v-chip size="small" color="green" prepend-icon="mdi-counter">
                        高考 {{ article.score }} 分
                    </v-chip>
                    <v-chip size="small" color="teal" prepend-icon="mdi-counter">
                        排名 {{ article.rank }} 名
                    </v-chip>
                </div>
                <v-divider class="vt-divider" />
                <div v-html="article.content"></div>
            </template>
            <v-divider class="vt-divider" />
            <h2>LICENSE</h2>
            <p>
                <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-Hans" target="_blank">CC BY-NC-SA
                    4.0</a><br>
                如果有侵权、不实信息请联系进行删除。
            </p>
        </v-container>
    </div>
</template>