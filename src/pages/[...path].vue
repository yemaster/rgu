<script setup lang="ts">
const errorExplainDict = ["若方法不对，无论多么努力，都无法寻得心中的那个她。",
    "被她拒绝时也无需灰心，提升自我，或许下次机会便被受。",
    "虽迷失于寻找她的路途，但请相信，总有新方向等你去发现。",
    "每个人都有崩溃的瞬间，但只需重整旗鼓，前路依旧光明。",
    "暂时的挫折是成功的垫脚石，在追梦的旅程中，永远不要灰心。",
    "等待虽苦，但心怀信念，终将跨越时空，追逐梦想。",
    "未知的错误如同心中的一抹阴霾，虽不明其因，但时光终会带来答案。"
]

// errorExplain是从errorExplainDict中随机选择一句
const errorExplain = errorExplainDict[Math.floor(Math.random() * errorExplainDict.length)]
</script>

<template>
    <div>
        <navbar />
        <v-empty-state :headline="`正在加急更新QAQ`" title="马上上线，请耐心等待哦" :text="errorExplain" image="/think.svg"
            style="margin-top: 30px">
            <v-btn color="primary" to="/">返回首页</v-btn>
        </v-empty-state>
    </div>
</template>