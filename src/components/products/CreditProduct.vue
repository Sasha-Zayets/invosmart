<template>
    <ModalWindow :name="modalName" @before-open="beforeOpen($event.params)" @before-close="$emit('before-close', $event.params)">
        <template #header>{{header}}</template>
        <template #content>
            <Product id="product_form" :readonly="readonly" v-model="product" @submit="onSubmit"></Product>
        </template>
        <template #footer>
            <div class="footer-content">
                <FormButton v-if="isNew" :class="{'disabled': !$store.state.products.validProducts}" form="product_form" @click="action='createProduct'">Сохранить товар/услугу</FormButton>
                <FormButton v-if="!isNew && readonly" @click.prevent="readonly=false">Редактировать</FormButton>
                <FormButton v-if="!isNew && !readonly" form="product_form" @click="action='updateProduct'">Изменить продукт</FormButton>
            </div>
        </template>
    </ModalWindow>
</template>

<script>
import ModalWindow from '../common/ModalWindow'
import Product from './Product'
import FormButton from '../common/FormButton'

export default {
    name: 'CreditProduct',
    props: {
        modalName: String,
    },
    components: {
        ModalWindow,
        Product,
        FormButton,
    },
    data() {
        return {
            isNew: false,
            readonly: false,
            action: '',
            product: {
            },
        }
    },
    computed: {
        header() {
            if(this.isNew) return 'Добавить продукт';
            return this.readonly ? 'Информация о продукте' : 'Редактировать продукт';
        }
    },
    methods: {
        onSubmit() {
            if (this.$store.state.products.validProducts) {

                this.$store.dispatch(this.action, this.product)
                .catch(err => console.log(err.response));
    
                this.$modal.hide(this.modalName, this.product);
                this.$store.state.products.showInfo = true;
                setTimeout(() => {
                    this.$store.state.products.showInfo = false;
                }, 2000);
            }
        },
        beforeOpen(product) {
            if(product) {
                this.isNew = false,
                this.readonly = true;
                this.product = {...product};
            } else {
                this.isNew = true;
                this.readonly = false;
                this.product = this.$store.getters.productTemplate();
            }
        }
    }
}
</script>

<style scoped>
.footer-content {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>
