<template>
    <ModalWindow :name="modalName" :fullscreen="true" @before-open="beforeOpen($event.params)">
        <template #header>{{header}}</template>
        <template #content>
            <div class="credit-invoice-wrapper">
                <div class="invoice-wrapper">
                    <InvoiceContact class="invoice-area" :readonly="readonly" v-model="invoice.contact"></InvoiceContact>
                    <InvoiceInfo  class="invoice-area" :readonly="readonly" v-model="invoice"></InvoiceInfo>
                    <InvoiceProducts  class="invoice-area full" :readonly="readonly" v-model="invoice"></InvoiceProducts>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="footer-content">
                <FormButton v-if="isNew" @click="onAction('createInvoice')">Сохранить инвойс</FormButton>
                <FormButton v-if="!isNew && readonly" @click.prevent="readonly=false">Редактировать</FormButton>
                <FormButton v-if="!isNew && !readonly" form="product_form" @click="onAction('updateInvoice')">Изменить инвойс</FormButton>
            </div>
        </template>
    </ModalWindow>
</template>

<script>
import merge from 'deepmerge'
import {mapGetters} from 'vuex'

import ModalWindow from '../common/ModalWindow'
import InvoiceContact from './contact/InvoiceContact'
import InvoiceInfo  from './InvoiceInfo'
import InvoiceProducts from './InvoiceProducts'
import FormButton from '../common/FormButton'

export default {
    name: 'CreditInvoice',
    components: {
        ModalWindow,
        InvoiceContact,
        InvoiceInfo,
        InvoiceProducts,
        FormButton,
    },
    props: {
        modalName: String
    },
    data() {
        return {
            isNew: false,
            readonly: false,
            invoice: {},
        }
    },
    computed: {
        header() {
            if(this.isNew) return 'Создать инвойс';
            return this.readonly ? 'Информация о инвойсе' : 'Редактировать инвойс';
        }
    },
    methods: {
        beforeOpen(invoice) {
            if(invoice) {
                this.isNew = false,
                this.readonly = true;
                this.invoice = {...invoice};
            } else {
                this.isNew = true;
                this.readonly = false;
                this.invoice = this.$store.getters.invoiceTemplate();
            }
        },
        onAction(actionName) {
            this.$store.dispatch(actionName, this.invoice)
            .catch(err => console.log(err.response));

            this.$modal.hide(this.modalName);
        }
    }
}
</script>

<style scoped>
.credit-invoice-wrapper {
    background: #F5F6FA;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.invoice-wrapper {
	border-radius: 6px;
	background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
    width: 100%;
    height: 100%;
}

.invoice-area {
    flex: 1;
    border-radius: 6px;
	background-color: #F5F6FA;
    margin: 10px;
}

.invoice-area.full {
    flex-basis: 100%;
}

.footer-content {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>
