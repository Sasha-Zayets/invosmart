<template>
    <h2 class="auth-title" :style="{'margin-bottom': `${mb}px`}">
        <slot></slot>
    </h2>
</template>

<script>
export default {
    props: {
        mb: {
            type: String,
            default: '44'
        }
    }
}
</script>

<style lang="scss" scoped>
.auth-title {
    font-weight: 600;
    font-size: 34px;
    line-height: 34px;
    color: #2E2F31;
    text-align: center;
}
</style>