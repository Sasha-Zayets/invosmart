<template>
    <div
        class="element-trigger" 
        :style="[{'margin-right': `${marginRight}px`}]"
        v-on="$listeners">
        <svg class="icon">
            <use xlink:href="/assets/icons/sprite.svg#add-icon-new"></use>
        </svg>
        <slot name="default"></slot>
    </div>
</template>

<script>
export default {
    name: 'ElementTrigger',
    props: {
        marginRight: {
            type: [Number, String],
            default: 0
        },
    }
}
</script>

<style scoped>
.element-trigger {
    height: 40px;
	background: #E1EEF7;
    border-radius: 6px;
    cursor: pointer;
    padding: 0 16px 0 18px;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 15px;
    line-height: 16px;
    color: #30A5E0;
    transition-duration: .3s;
}

.element-trigger:hover {
    background: #CEE6F5;
}

.element-trigger:active {
    background: #BADEF2;
}

.element-trigger .icon {
    width: 16px;
    height: 16px;
    margin-right: 14px;
    fill: #30A5E0;
}
</style>
