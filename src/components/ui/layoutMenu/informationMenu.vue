<template>
    <div class="information" v-bind="$attrs" ref="blockMenu">
        <div class="information-icon" @click="openMenu($event)">
            <svg class="icon">
                <use xlink:href="/assets/icons/sprite.svg#menu-info"></use>
            </svg>
        </div>   
        <div class="information-show-block" ref="menu">
            <div class="info-block">
                <div class="info-block-header">
                    <span class="info-block-title">{{$ml.get('topBlockUser').info.title}}</span>
                    <span>
                        <svg class="icon-close" @click="closeModal">
                            <use xlink:href="/assets/icons/sprite.svg#close"></use>
                        </svg>
                    </span>
                </div>
                <div class="info-block-container">
                    <div class="info-block-content">
                        <img src="@/assets/images/info.svg" alt="">
                        <span class="info-block-text">
                            {{$ml.get('topBlockUser').info.text}}
                        </span>
                    </div>
                </div>
                <div class="info-block-bottom">
                    <router-link 
                        v-for="(item, index) in $ml.get('topBlockUser').links" 
                        :key="index"
                        :to='`/${$lang}/${item.rout}`'>
                        {{item.title}}
                    </router-link>
                </div>
            </div>
        </div>     
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    methods: {
        openMenu (event) {
            const menu = this.$refs.menu

            menu.classList.toggle('show')
            if (menu.classList.contains('show')) {
                this.documentClick(event)
            }
        },
        closeModal () {
            const menu = this.$refs.menu

            menu.classList.remove('show')
        },
        documentClick (event) {
            const menu = this.$refs.blockMenu,
                  dropMenu = this.$refs.menu

            document.addEventListener('click', function (event) {
                if (!menu.contains(event.target)) {
                    dropMenu.classList.remove('show')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.information {
    margin-right: 28px;
    position: relative;
    &-icon {
        cursor: pointer;
        width: 24px;
        height: 24px;
        position: relative;
        &:before {
            content: "";
            width: 24px;
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
            fill: #818E94;
            border-radius: 50%;
            position: relative;
        }
    }
    &-show-block {
        position: absolute;
        right: -30px;
        top: calc(100% + 10px);
        width: 312px;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
        opacity: 0;
        visibility: hidden;
        z-index: -1;
        transition-duration: .5s;
        &.show {
            opacity: 1;
            visibility: visible;
            z-index: 99;
        }
    }
}

.info-block {
    background: #FFFFFF;
    border-radius: 6px;
    padding: 24px 16px 36px 16px;
    position: relative;
    &-header {
        padding-bottom: 17px;
        .icon-close {
            width: 15px;
            height: 15px;
            position: absolute;
            top: 20px;
            right: 24px;
            cursor: pointer;
        }
    }
    &-title {
        font-size: 16px;
        line-height: 22px;
        color: #000000;
        display: block;
        text-align: center;
    }
    &-container {
        margin: 0 -16px;
        padding: 0 16px;
        background-color: white;
        height: 100%;
        transition-duration: .3s;
        &:hover {
            background: #F0F9FE;;
            .info-block-content {
                border-color: #C2CACD;;
            }
        }
    }
    &-content {
        border-top: 1px solid #C2CACD;
        border-bottom: 1px solid #C2CACD;
        transition-duration: .3s;
        img {
            margin-bottom: 32px;
            width: 100%;
        }
    }
    &-text {
        display: block;
        text-align: center;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        color: #000000;
        margin: 0 auto;
        margin-bottom: 33px;
        max-width: 249px;
    }
    &-bottom {
        padding-top: 13px;
    
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        a {
            font-size: 12px;
            line-height: 18px;
            text-decoration: underline;
            color: #000000;
            margin-bottom: 16px;
            &:last-child {
                margin: 0 auto;
                display: block;
                width: 100%;
                text-align: center;
            }
        }
    }
}
</style>