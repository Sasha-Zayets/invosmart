<template>
    <div class="control" v-on="$listeners">
        <slot name="default"></slot>
    </div>
</template>

<script>
export default {
    name: 'ControlWrapper'
}
</script>

<style lang="scss" scoped>
.control {
    cursor: pointer;
    color: #5E6D84;
    i {
        font-size: 12px;
        transition-duration: .3s;
        &:hover {
            color: #FC6180;
        }
        &:active {
            color: #E60D38;
        }
    }
}
</style>