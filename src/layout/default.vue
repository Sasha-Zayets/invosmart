<template>
    <div class="default-layout no-gutters workspace">
        <Sidebar class="" :options="$ml.get('sidebar')"></Sidebar>
        <div class="content">
            <div class="workspace-controls">
                <div class="workspace-title">
                    <svg class="icon">
                        <use :xlink:href="`/assets/icons/sprite.svg#${$store.state.global.pageInfo.icon}`"></use>
                    </svg>
                    <span>
                        {{ $store.state.global.pageInfo.title }}
                    </span>
                </div>
                <div class="workspace-menu" ref="workMenu">
                    <InfoMenu class="workspace-info" />
                    <NotificationMenu class="workspace-nitification" />
                    <UserMenu class="workspace-user-menu"/>
                </div>
                <LogoutButton 
                    class="workspace-logout" 
                    @size="getSize"
                    @mouseover="addAnimation" 
                    @mouseout="removeAnimation"
                    @click="onLogout">Выход</LogoutButton>
            </div>
            <div class="container-layout">
                <router-view></router-view>
                
                <Loading v-if="$store.getters.loading"/>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '../components/sidebar/Sidebar'
import InfoMenu from '@/components/ui/layoutMenu/informationMenu'
import NotificationMenu from '@/components/ui/layoutMenu/notificationMenu'
import UserMenu from '@/components/ui/layoutMenu/userMenu'
import LogoutButton from '@/components/common/LogoutButton'
import Loading from '@/components/ui/Loading'

export default {
    components: {
        Sidebar,
        LogoutButton,
        InfoMenu,
        NotificationMenu,
        UserMenu,
        Loading
    },
    mounted () {
    },
    methods: {
        onLogout() {
            const lang = this.$route.params.lang

            this.$store.dispatch('logout')
            .then(res => {
                this.$router.push(`/${lang}/auth/login`)
                localStorage.clear()
                localStorage.setItem('lang', lang)
            })
            .catch(err => console.log(err.response));
        },
        addAnimation () {
            this.menu = this.$refs.workMenu

            this.menu.style.right = `${this.rightPosition}px`
        },
        removeAnimation () {
            this.menu.style.right = `0px`
        },
        getSize (value) {
            this.rightPosition = value
        }
    }
}
</script>

<style lang="scss" scoped>
.content {
    //min-width: 1300px;  
    flex-grow: 2;
    padding-top: 32px;
    max-width: 1416px;
    margin: 0 auto;
}
.workspace {
    padding: 0;
    width: 100%;
    min-height: 100%;
    display: flex;
    position: relative;
    &-title {
        font-family: 'Montserrat';
        font-weight: 800;
        font-size: 32px;
        line-height: 39px;
        color: #C2CACD;
        padding-left: 16px;
        svg {
            width: 32px;
            height: 32px;
            //margin-right: 9px;
            fill: #C2CACD;
            position: relative;
            bottom: -5px;
        }
    }
    &-menu {
        display: flex;
        align-items: center;
        position: relative;
        transition-duration: .3s;
    }
    &-logout {
        position: absolute;
    }
}

.workspace-controls {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 26px;
}

.container-layout {
    position: relative;
    height: 100%;
}

@function w($value) {
    @return ($value*100vw)/1572
};

@media screen and (min-width: 1921px) {
    .workspace-controls {
        position: relative;
    }
    .workspace-logout {
        right: calc(-110px - 40px) !important;
    }
}

@media (min-width: 1300px) and (max-width: 1572px) {
    .contacts {
    }
    .workspace-title {
        font-size: w(32);
        .icon {
            width: w(32);
            height: w(32);
        }
    }
} 
</style>
