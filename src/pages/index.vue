<script lang="ts" setup>
import { ref, onBeforeMount, computed, type Ref } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios';

import Navbar from '@/components/Navbar.vue';

const router = useRouter();

const loading = ref(true);

type dataPiece = {
    [key: string]: string
}
const data: Ref<dataPiece[]> = ref([]);

const searchText = ref("");

const allSchools = computed(() => {
    // 从data的所有school中获取
    const res = new Set(data.value.map((v) => v.school));
    return Array.from(res).sort((a, b) => a.localeCompare(b));
})
const chooseSchool: Ref<string[]> = ref([]);
const admissionMethod = ["高考", "强基计划", "三位一体", "少年班/少创班", "出国", "艺术特长", "体育特长", "其他"];
const chooseMethod: Ref<string[]> = ref([]);
const chooseCourseList = ref(["物", "化", "生", "史", "地", "政", "技"]);
const chooseCourse: Ref<string[]> = ref([]);

const dataFilter = computed(() => {
    return data.value.filter((item: any) => {
        if (!item.title.includes(searchText.value)) {
            return false;
        }
        if (chooseSchool.value.length > 0 && !chooseSchool.value.includes(item.school)) {
            return false;
        }
        if (chooseMethod.value.length > 0 && !chooseMethod.value.includes(item.admission)) {
            return false;
        }
        if (chooseCourse.value.length > 0 && !chooseCourse.value.every((v) => item.choose.includes(v))) {
            return false;
        }
        return true;
    })
})

const isShort = computed(() => {
    return searchText.value.length > 0 || chooseMethod.value.length > 0 || chooseCourse.value.length > 0 || chooseSchool.value.length > 0
})

const gotoLink = (link: any = '/') => {
    router.push(link)
}

onBeforeMount(async () => {
    data.value = (await axios.get('/data/outlines.json')).data;
    loading.value = false;
})
</script>

<template>
    <div>
        <navbar homepage />
        <div class="vt-background" :class="{ small: isShort }"></div>
        <div class="vt-header" :class="{ small: isShort }">
            <div class="vt-header-box">
                <h3 class="vt-header-text" v-show="!isShort">发现学长学姐留下的大学招生指北</h3>
                <v-text-field label="搜一搜" variant="outlined" v-model="searchText"></v-text-field>
                <v-row>
                    <v-col cols="4">
                        <v-select v-model="chooseSchool" :items="allSchools" label="录取学校" chips multiple></v-select>
                    </v-col>
                    <v-col cols="4">
                        <v-select v-model="chooseMethod" :items="admissionMethod" label="录取方式" chips
                            multiple></v-select>
                    </v-col>
                    <v-col cols="4">
                        <v-select v-model="chooseCourse" :items="chooseCourseList" label="选考科目" chips
                            multiple></v-select>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="vt-box-1" :class="{ small: isShort }"></div>
        <v-container>
            <div class="vt-body-header">建议列表({{ dataFilter.length }})</div>
            <v-divider class="vt-divider"></v-divider>
            <v-card class="vt-card" v-for="(d, i) in dataFilter" :key="i">
                <v-card-item>
                    <h3 class="vt-card-title vt-link" @click="gotoLink(`/view/${d.path}`)">{{ d.title }}</h3>

                    <div class="d-flex flex-wrap ga-2">
                        <v-chip size="small" color="primary" prepend-icon="mdi-domain">
                            {{ d.school }}
                        </v-chip>
                        <v-chip size="small" color="indigo" prepend-icon="mdi-key-outline">
                            {{ d.admission }}
                        </v-chip>
                        <v-chip size="small" color="purple" prepend-icon="mdi-book-open-variant">
                            {{ d.choose }}
                        </v-chip>
                        <v-chip size="small" color="green" prepend-icon="mdi-counter">
                            高考 {{ d.score }} 分
                        </v-chip>
                        <v-chip size="small" color="teal" prepend-icon="mdi-counter">
                            排名 {{ d.rank }} 名
                        </v-chip>
                    </div>
                </v-card-item>
                <template v-slot:actions>
                    <v-btn text="详细阅读" @click="gotoLink(`/view/${d.path}`)"></v-btn>
                </template>
            </v-card>
        </v-container>
    </div>
</template>

<style>
.v-chip {
    opacity: 1;
}
</style>