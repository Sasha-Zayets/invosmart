<template>
    <div class="invoice-contact" :class="{'disabled':readonly}">
        <div class="contact-info">
            <div>{{contact._name}}</div>
            <div>{{contact.invoice_adds}}</div>
            <div>{{contact.postcode}} {{contact.locality}}</div>
        </div>
        <div>
            <div class="contact" v-if="value">
                <div class="contact-control edit" @click="$modal.show(creditContactModalName, contact)"><i class="far fa-id-card"></i></div>
                <div class="contact-control name">{{contact._name}}</div>
                <div class="contact-control reset" @click="$emit('change', null)"><i class="fas fa-times"></i></div>
            </div>
            <ContactSearchList v-else @change="$emit('change', $event)"></ContactSearchList>
        </div>
        <CreditContact :modalName="creditContactModalName" @before-close="onBeforeClose"></CreditContact>
    </div>
</template>

<script>
import merge from 'deepmerge'
import {mapGetters} from 'vuex'

import ContactSearchList from './ContactSearchList'
import CreditContact from '../../contacts/CreditContact'

export default {
    name: 'InvoiceContact',
    components: {
        ContactSearchList,
        CreditContact,
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: Object,
        readonly: Boolean,
    },
    data() {
        return {
            creditContactModalName: 'credit-invoice-contact'
        }
    },
    computed: {
        ...mapGetters(['contacts']),
        contact() {
            let contact = this.value ? 
            this.$store.getters.contact(this.value.id) : 
            this.$store.getters.contactTemplate;

            return contact;
        },
        contactIsSet() {
            return !!this.value;
        }
    },
    methods: {
        onBeforeClose(contact) {
            if(contact) this.$emit('change', contact);
        }
    }
}
</script>

<style scoped>
.invoice-contact {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
}

.invoice-contact.disabled {
    pointer-events: none;
    opacity: .75;
}

.contact-info {
    flex: 1;
	color: #727779;
	font-size: 15px;
	font-weight: 500;
	line-height: 25px;
}

.contact {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 6px;
}

.contact-control {
    padding: 10px;
    color: #252932;
	font-size: 15px;
	font-weight: 500;
	line-height: 19px;
}

.contact-control.name {
    flex: 1;
    border-left: 1px solid #F5F6FA;
    border-right: 1px solid #F5F6FA;
    font-weight: 600;
}

.contact-control.edit, 
.contact-control.reset {
    cursor: pointer;
}

.contact-control.edit:hover, 
.contact-control.reset:hover {
    opacity: .85;
}

</style>
