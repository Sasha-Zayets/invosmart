<template>
    <button class="buttonEvent" v-on="$listeners">
        <span class="buttonEvent-icon">
            <slot name="icon"></slot>
        </span>
        <slot></slot>
    </button>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.buttonEvent {
    height: 44px;
    display: flex;
    align-items: center;
    padding: 0 17px;
    border-radius: 22px;
    background: rgba(48, 165, 224, 0.1);
    box-shadow: 3px 1px 4px rgba(226, 238, 247, 0.25);
    font-weight: 600;
    font-size: 15px;
    color: #30A5E0;
    cursor: pointer;
    &-icon {
        display: flex;
        align-items: center;
        svg {
            width: 15px;
            height: 18px;
            fill: #30A5E0;
            margin-right: 11px;
        }
    }
}
</style>
