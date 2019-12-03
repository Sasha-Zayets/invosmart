<template>
    <div class="userMenu" ref="menu">
        <div class="userMenu-icon-block" @click="dropdownMenu($event)" ref="icon">
            <div class="userMenu-icon">
                <span>
                    G
                </span>
            </div>
            <!--<div class="userMenu-arrow">
                <svg class="icon">
                    <use xlink:href="/assets/icons/sprite.svg#arrow"></use>
                </svg>
            </div>-->
        </div>
        <div class="userMenu-drop" ref="dropmenu">
            <ul class="dropmenu">
                <li 
                    v-for="(item, index) in $ml.get('userTopMenu')"
                    :key="index"
                    class="dropmenu__item">
                    <router-link :to="`/${$lang}/${item.rout}`">
                        <svg class="icon">
                            <use :xlink:href="`/assets/icons/sprite.svg#${item.icon}`"></use>
                        </svg>
                        {{ item.title }}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    data: () => ({
    }),
    methods: {
        dropdownMenu (event) {
            const menu = this.$refs.dropmenu,
                  icon = this.$refs.icon

            icon.classList.toggle('active')
            menu.classList.toggle('active')
            if (menu.classList.contains('active')) {
                this.documentClick(event)
            }
        },
        documentClick (event) {
            const menu = this.$refs.menu,
                  dropMenu = this.$refs.dropmenu,
                  icon = this.$refs.icon

            document.addEventListener('click', function (event) {
                if (!menu.contains(event.target)) {
                    icon.classList.remove('active')
                    dropMenu.classList.remove('active')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.userMenu {
    position: relative;
    $m: '.userMenu';
    &-icon-block {
        display: flex;
        align-items: center;
        // margin-right: 27px;
        cursor: pointer;
        &.active {
            #{$m}-arrow {
                .icon {
                    transform: rotate(180deg);
                }
            }
        }
    }
    &-icon {
        width: 48px;
        height: 48px;
        background: #30A5E0;
        box-sizing: border-box;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        &:before {
            content: "";
            width: 54px;
            height: 54px;
            border-radius: 50%;
            background-color: transparent;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            transition-duration: .3s;
            z-index: -1;
        }
        &:hover {
            &:before {
                width: 58px;
                height: 58px;
                background-color: #EBF0F2;
            }
        }
        &:active {
            &:before {
                width: 58px;
                height: 58px;
                background-color: #DDE6EA;
            }
        }
        span {
            font-weight: 800;
            font-size: 18px;
            line-height: 18px;
            color: #FFFFFF;
        }
    }
    &-arrow {
        .icon {
            transition-duration: .5s;
            fill: transparent;
            stroke: #C2CACD;
            width: 10px;
            height: 10px;
        }
    }
    &-drop {
        position: absolute;
        top: calc(100% + 5px);
        right: 0;
        width: 296px;
        height: auto;
        opacity: 0;
        visibility: hidden;
        z-index: -1;
        transition-duration: .5s;
        &.active {
            opacity: 1;
            visibility: visible;
            z-index: 99;
        }
    }
}

.dropmenu {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
    background: #F5F6FA;
    border-radius: 6px;
    padding: 7px 0;
    list-style: none;
    margin: 0;
    &__item {
        padding: 0 24px;
        height: 40px;
        display: flex;
        align-items: center;
        border-radius: 5px;
        transition-duration: .3s;
        .icon {
            width: 24px;
            height: 24px;
            fill: #2E2F31;
            margin-right: 16px;
        }
        a {
            display: flex;
            align-items: center;
            text-decoration: none;
            font-size: 16px;
            line-height: 19px;
            color: #2E2F31;
        }
        &:hover {
            background: #FFFFFF;
        }
        &:active {
            background: #E7F1F9;
        }
    }
}
</style>