<template>
    <div class="card" :style="[{'padding': padding}]">
        <div v-if="header" :class="['card-header', {'card-header-flex' : rowTitle}]">
            <slot name=header></slot>
        </div>
        <div class="card-content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        padding: {
            type: String,
            default: '26px'
        },
        rowTitle: Boolean,
        header: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    background: #FFFFFF;
    border-radius: 18px;
    &-header {
        font-weight: 500;
        font-size: 22px;
        line-height: 27px;
        color: #2E2F31;
        margin-bottom: 28px;
        &-flex {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
    }
}
</style>
