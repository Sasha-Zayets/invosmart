<template>
    <div class="sidebar">
        <div class="sidebar-logo">
            <img src="@/assets/images/logo.svg" alt="">
        </div>
        <div class="options-list">
            <SidebarOption :key="i" v-for="(option, i) in options" :option="option"></SidebarOption>
        </div>
    </div>
</template>

<script>
import SidebarOption from './SidebarOption'

export default {
    name: 'Sidebar',
    model: {
        event: 'change'
    },
    components: {
        SidebarOption
    },
    props: {
        options: Array,
        value: String
    },
    computed: {
        activeOption() {
            if(this.value) return this.value;
            
            let defaultOption = this.options.length > 0 ? this.options[0].value : '';
            this.$emit('change', defaultOption);
            return defaultOption;
        }
    },
    methods: {
        openComponents (element) {
            const page = {
                title: element.name,
                icon: element.icon_class
            }

            this.$store.commit('setPageInfo', page)
            this.$emit('change', element.value)
        }
    }
}
</script>

<style lang="scss" scoped>
.sidebar {
    min-height: 100%;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.1);
    width: 360px;
}

.sidebar-logo {
    padding-top: 37px;
    padding-left: 31px;
    text-align: left;
    margin-bottom: 55px;
    img {
        width: 164px;
        height: 26px;
    }
}

.sidebar-logo > span {
    color: #30A5E0;
}

.options-list {
    padding: 0 32px;
}

// media query
@function w($value) {
    @return ($value*100vw)/1572
};

@media (min-width: 1300px) and (max-width: 1572px) {
    .sidebar {
        width: w(360);
    }
    .sidebar-logo {
        margin-bottom: w(50);
        padding-top: w(37);
        padding-left: w(31);
    }
    .options-list {
        padding: w(30);
    }
}
</style>
