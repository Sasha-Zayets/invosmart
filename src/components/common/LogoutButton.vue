<template>
    <div class="logout-btn" v-on="$listeners" ref="logoutContainer">
        <svg class="icon-exit">
            <use xlink:href="/assets/icons/sprite.svg#exit2"></use>
        </svg>
        <span class="logout-btn-text" ref="logoutText">
            <slot></slot>
        </span>
    </div>
</template>

<script>
export default {
    name: 'LogoutButton',
    mounted () {
        const widthText = this.$refs.logoutText.offsetWidth,
              container = this.$refs.logoutContainer

        container.style.right = `-${widthText + 12}px`
        this.$emit('size', (widthText + 12))
    }
}
</script>

<style lang="scss" scoped>
.logout-btn {
	height: 34px;
	border-radius: 17px 0 0 17px;
    background-color: #F6DFE7;
    padding: 0 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-duration: .3s;
    .icon-exit {
        width: 20px;
        height: 20px;
        fill: #FC6180;
        margin-right: 8px;
    }
    &-text {
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        color: #FC6180;
    }
    &:hover {
        right: 0 !important;
        .icon-exit {
            fill: #FC6180;
        }
        .logout-btn-text {
            color: #FC6180;
        }
    }
    &:active {
        .icon-exit {
            fill: #E44A69;
        }
        .logout-btn-text {
            color: #E44A69;
        }
    }
}

@media (min-width: 1921px) {
    .logout-btn {
        border-radius: 17px;
        padding-right: 14px;
    }
}
</style>
