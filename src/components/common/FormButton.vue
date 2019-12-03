<template>
    <button class="form-button" v-bind="$attrs" v-on="$listeners">
        <slot name="default"></slot>
    </button>
</template>

<script>
export default {
    inheritAttrs: false,
    name: 'FormButton',
}
</script>

<style lang="scss" scoped>
.form-button {
    border: none;
	border-radius: 10px;
    background-color: #30A5E0;
    color: #FFFFFF;
	font-weight: 600;
    font-size: 18px;
    padding: 0 83px;
    cursor: pointer;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #30A5E0;
    box-shadow: 3px 1px 4px rgba(48, 165, 224, 0.25);
    transition-duration: .3s;
    &:hover {
        background: #2197D1;
    }
    &:active {
        background: #0689C9;
    }
    &.disabled {
        background: #CDCDCD;
        border: 2px solid #979797;
        box-shadow: 3px 1px 4px rgba(151, 151, 151, 0.25);
        border-radius: 6px;
        transition-duration: .5s;
        &:hover {
            background: #AEAEAE;
            border: 2px solid #979797;
            box-shadow: 3px 1px 4px rgba(151, 151, 151, 0.25);
            border-radius: 6px;
        }
    }
}
</style>
