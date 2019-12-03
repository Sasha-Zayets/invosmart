<template>
    <div :class="['showMessage', setSizeTheme]">
        <span>
            {{ message }}
        </span>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: [String, Number],
        }
    },
    computed: {
        setSizeTheme () {
            if (this.message.length <= 60) {
                return `small`
            } else if (this.message.length <= 170) {
                return `medium`
            } else {
                return `large`
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.showMessage {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 8px 8px 11px 8px;
    background: #3B4548;
    border-radius: 6px;
    opacity: 1;
    text-align: center;
    visibility: hidden;
    transition-duration: .5s;
    &:before {
        content: "";
        width: 23px;
        height: 23px;
        background: url('/assets/icons/square-msg.svg');
        background-repeat: no-repeat;
        transform: translateY(-50%);
        position: absolute;
        right: -17px;
        top: 50%;
    }
    &.small {
        width: 144px;
        left: calc(-100% - 58px);
    }
    &.medium {
        width: 192px;
        left: calc(-100% - 105px);
    }
    &.large {
        width: 256px;
        left: calc(-100% - 170px);
    }
    span {
        font-family: Montserrat;
        font-weight: 600;
        font-size: 11px;
        line-height: 140%;
        color: #FFFFFF;
    }
}
</style>