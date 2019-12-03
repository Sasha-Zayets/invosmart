<template>
    <div class="form-block">
        <label class="header"><slot name="default"></slot></label>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FormBlock'
}
</script>

<style lang="scss" scoped>
.header {
	font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    color: #818E94;
    margin-bottom: 22px;
    display: block;
}

.content > * {
    //margin-top: 20px;
}

</style>
