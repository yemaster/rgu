<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
</script>

<template>
    <div>
        <navbar />
        <v-container class="vt-article">
            <h1>说在前面</h1>
            <p>致力于消除信息差(๑•̀ㅂ•́)و✧</p>
            <p>虽然现在浙江高考很大程度上还是“一考定终身”，但是三一、强基等其他录取途径带来的几分乃至十几分的浮动依然能够改变人生轨道。分数线、时间点、优先级……种种因素使得高考与录取变成一个复杂的迷宫。如何找到更加适合你的那个出口？信息是一个要素。在这三年征程的最后一公里，胡闹和她的小伙伴们希望可以用这份《招生指北》（双关哦~）为大家“接驳”。最后，希望大家都找到属于自己的那个迷宫出口！
            </p>
            <h2>使用说明</h2>
            可以通过视图-显示-导航窗格-标题选择感兴趣的部分，也可以通过编辑-查找搜索感兴趣的大学（全称）与学科（模糊关键词）。（后续不定期更新）
            <h2>时间线</h2>
            <v-timeline side="end">
                <v-timeline-item size="small">
                    高考
                </v-timeline-item>
                <v-timeline-item size="small">
                    交复三一笔试
                </v-timeline-item>
                <v-timeline-item size="small">
                    清北强基培训（期间出交复笔试入围结果）
                </v-timeline-item>
                <v-timeline-item size="small">
                    交复面试
                </v-timeline-item>
                <v-timeline-item size="small">
                    高考出分
                </v-timeline-item>
                <v-timeline-item size="small">
                    填报平行志愿
                </v-timeline-item>
                <v-timeline-item size="small">
                    大致可以知道交复入围结果（内部，问招办老师）
                </v-timeline-item>
                <v-timeline-item size="small">
                    清北强基笔试并公布入围结果
                </v-timeline-item>
                <v-timeline-item size="small">
                    清北强基面试并公布录取结果
                </v-timeline-item>
                <v-timeline-item size="small">
                    三一录取
                </v-timeline-item>
                <v-timeline-item size="small">
                    平行志愿录取（P.S.根据胡闹苯人经验，不包括保送、提前批、艺考等录取途径）
                </v-timeline-item>
            </v-timeline>
        </v-container>
    </div>
</template>