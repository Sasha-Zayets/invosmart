<template>
    <div class="search-list">
        <FormInput placeholder="Введите имя получателя" v-model="contactName" @focus="state.showSuggestions=true">Получатель</FormInput>
        <div class="contacts-suggestions" v-if="state.showSuggestions">
            <div class="suggestions-contact" :key="i" v-for="(contact, i) in contactSuggestions" @click="onContactSelected(contact)">
                <i class="fas fa-user"></i>
                {{contact._name}}
            </div>
        </div>
        <div class="suggestions-bg" v-if="state.showSuggestions" @click="state.showSuggestions=false"></div>
    </div>
</template>

<script>
import merge from 'deepmerge'
import {mapGetters} from 'vuex'
import FormInput from '../../common/FormInput'

export default {
    name: 'ContactSearchList',
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: Object
    },
    components: {
        FormInput
    },
    data() {
        return {
            contactName: '',
            state: {
                showSuggestions: false
            }
        }
    },
    computed: {
        ...mapGetters(['contacts']),
        contactSuggestions() {
            let itemsForShow = this.contacts.slice(0);
            let name = this.contactName;

            if(name) {
                itemsForShow = itemsForShow.filter(item => {
                    return item._name.toLowerCase().indexOf(name.toLowerCase()) > -1;
                });
            }

            return itemsForShow;
        }
    },
    methods: {
        onContactSelected(contact) {
            this.state.showSuggestions = false;
            this.$emit('change', merge({}, contact));
        }
    }
}
</script>

<style scoped>
.search-list {
    position: relative;
}

.contacts-suggestions {
    position: absolute;
    background-color: #fff;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    width: 100%;
    margin-top: 5px;
    max-height: 250px;
    overflow-y: auto;
    z-index: 2;
}

.suggestions-contact {
    cursor: pointer;
    padding: 10px;
}

.suggestions-contact i {
    margin-right: 10px;
}

.suggestions-bg {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: transparent;
    z-index: 1;
}
</style>
