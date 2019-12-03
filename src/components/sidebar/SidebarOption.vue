<template>
    <router-link :to="option.rout" class="sidebar-option" :class="{'active': active}" v-on="$listeners">
        <svg v-if="option.icon_class" class="icon">
            <use :xlink:href="`/assets/icons/sprite.svg#${option.icon_class}`"></use>
        </svg>
        <span>{{option.name}}</span>
    </router-link>
</template>

<script>
export default {
    name: 'SidebarOption',
    props: {
        option: Object,
        activeOption: String,
    },
    computed: {
        active() {
            if (this.$route.path == this.option.rout) {
                const page = {
                    title: this.option.name,
                    icon: this.option.icon_class
                }
                this.$store.commit('setPageInfo', page)
            }
 
            return (this.option.value && this.activeOption) &&
            (this.option.value == this.activeOption);
        }
    }
}
</script>

<style lang="scss" scoped>
.icon {
    width: 25px;
    height: 25px;
    fill: #818E94;
    margin-right: 15px;
    transition-duration: .3s;
}
.sidebar-option {
    cursor: pointer;
	border-radius: 6px;
    font-size: 16px;
	font-weight: 600;
    line-height: 22px;
    padding: 0 21px;
    height: 56px;
    display: flex;
    align-items: center;
    padding-left: 23px;
    text-decoration: none;
    margin-bottom: 8px;
    transition: all .3s;
    span {
        transition: all .3s;
        color: #2E2F31;
    }
    &:hover {
        background: #F5F8F9;
        .icon {
            fill: #818E94;
        }
    }
    &:active {
        background: #E8F2F5;
        .icon {
            fill: #818E94;
        }
    }
    &.router-link-active {
        .icon {
            fill: white;
        }
    }
}

.sidebar-option i {
    font-size: 24px;
    margin-right: 20px;
    color: #5E6D84;
}

.sidebar-option.router-link-active {
    background-color: #30A5E0;
}

.sidebar-option.router-link-active i,
.sidebar-option.router-link-active span {
    color: #FFFFFF;
}

@function w($value) {
    @return ($value*100vw)/1572
};

@media (min-width: 1300px) and (max-width: 1572px) {
    .sidebar-option {
        width: w(300);
        padding: w(18);
        font-size: w(16);
    }
}


</style>
