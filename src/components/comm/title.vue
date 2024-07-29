<template>
    <div class="Title">{{ title }}</div>
</template>

<script>
export default {
    name: "Title",
    props: {
        title: {
            type: [String],
            default: "",
        },
    },
    data() {
        return {};
    },
    mounted() {},
    methods: {},
    components: {},
};
</script>

<style lang="scss" scoped>
.Title {
    font-size: 18px;
    font-weight: 600;
    color: #222222;
    line-height: 24px;
}
</style>