<template>
    <div class="notification" v-bind="$attrs" v-on="$listeners">
        <div class="notification-icon">
            <svg class="icon">
                <use xlink:href="/assets/icons/sprite.svg#menu-notification"></use>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    inheritAttrs: false
}
</script>

<style lang="scss" scoped>
.notification {
    margin-right: 27px;
    &-icon {
        cursor: pointer;
        width: 22px;
        height: 24px;
        position: relative;
        &:before {
            content: "";
            width: 22px;
            height: 24px;
            border-radius: 50%;
            background-color: transparent;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            transition-duration: .3s;
        }
        &:hover {
            &:before {
                width: 46px;
                height: 46px;
                background-color: #EBF0F2;
            }
        }
        &:active {
            &:before {
                width: 46px;
                height: 46px;
                background-color: #DDE6EA;
            }
        }
        .icon {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            fill: #818E94;
            position: relative;
        }
    }
}
</style>