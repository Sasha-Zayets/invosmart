<template>
    <div class="container-fluid no-gutters workspace">
        <Sidebar class="" :options="options" :value="activeWorkspaceArea" @change="setActiveWorkspaceArea($event)"></Sidebar>
        <div class="content">
            <div class="workspace-controls">
                <div class="workspace-title">
                    <svg class="icon" v-if="$store.state.global.pageInfo.icon == 'contacts'">
                        <use xlink:href="@/assets/icons/sprite.svg#contacts"></use>
                    </svg>
                    <svg class="icon" v-else>
                        <use :xlink:href="`./assets/icons/sprite.svg#${$store.state.global.pageInfo.icon}`"></use>
                    </svg>
                    <span>
                        {{ $store.state.global.pageInfo.title }}
                    </span>
                </div>
                <LogoutButton @click="onLogout"></LogoutButton>
            </div>
            <component class="workspace-area" :is="activeWorkspaceArea"></component>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

import Sidebar from '../components/sidebar/Sidebar'
import LogoutButton from '../components/common/LogoutButton'
import Invoices from '../components/invoices/Invoices'
import Products from '../components/products/Products'
import Contacts from '../components/contacts/Contacts'

export default {
    name: 'Workspace',
    components: {
        Sidebar,
        LogoutButton,
        Invoices,
        Products,
        Contacts,
    },
    computed: mapGetters(['activeWorkspaceArea']),
    data() {
        return {
            options: [
                {
                    name: 'Инвойсы',
                    value: 'Invoices',
                    icon_class: 'invoices'
                },
                {
                    name: 'Продукты',
                    value: 'Products',
                    icon_class: 'Products'
                },
                {
                    name: 'Контакты',
                    value: 'Contacts',
                    icon_class: 'contacts'
                },
            ],
        }
    },
    methods: {
        ...mapMutations(['setActiveWorkspaceArea'])
    }
}
</script>

<style lang="scss" scoped>

</style>
