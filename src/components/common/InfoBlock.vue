<template>
	<div :class="['info-block', 
        {'active': show === true},
        {'error': typeInfo === 'error'}
    ]" ref="showInfo">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        typeInfo: {
            type: String
        },
        show: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.info-block {
    position: fixed;
    width: 340px;
    bottom: 40px;
    right: 30px;
    padding: 0 26px 0 36px;
    height: 60px;
    background: #1BA261;
    border-radius: 10px;
    font-family: Roboto !important;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(calc(100% + 40px));
    transition-duration: .5s;
    z-index: 999;
    .sprite {
        width: 30px;
        height: 30px;
        margin-right: 24px;
    }
    i {
        cursor: pointer;
        margin-left: 46px;
        font-size: 12px;
    }
    // show block
    &.active {
    	transform: translateX(0%);
	}
    &.error {
        background: #FC6180;
    }
}
</style>