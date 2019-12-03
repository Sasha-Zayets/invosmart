<template>
    <div class="products-wrapper" :class="{'disabled':readonly}">
        <table class="products-list">
            <thead>
                <tr>
                    <th></th>
                    <th>№ товара/услуги</th>
                    <th>Название</th>
                    <th class="centered">Цена за ед.</th>
                    <th class="centered">Кол-во и единица</th>
                    <th class="centered">Скидка</th>
                    <th class="centered">Итого</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <InvoiceProduct :key="i" v-for="(product, i) in invoice.products" :product="product" :currency="invoice.currency" @delete="onDeleteProduct(i)"></InvoiceProduct>
            </tbody>
        </table>
        <button @click="onAddProduct">Добавить продукт</button>
    </div>
</template>

<script>
import merge from 'deepmerge'
import InvoiceProduct from './InvoiceProduct'

export default {
    name: 'InvoiceProducts',
    components: {
        InvoiceProduct,
    },
    model: {
        prop: 'invoice',
        event: 'change'
    },
    props: {
        invoice: Object,
        readonly: Boolean,
    },
    methods: {
        onAddProduct() {
            let newProduct = {
                is_new: true,
                count: 0,
                discount: 0,
                ...this.$store.getters.productTemplate(),
            }

            this.invoice.products.push(newProduct);
        },
        onDeleteProduct(index) {
            this.invoice.products.splice(index, 1);
        }
    }
}
</script>

<style scoped>
.products-wrapper {
    border-radius: 6px;
	background-color: #F5F6FA;
    margin: 10px;
    flex: 1;
    padding: 20px;
}

.products-list {
    width: 100%;
    border-collapse: separate;
}

.products-list th {
    text-align: left;
	color: #5E6D84;
	font-size: 13px;
	font-weight: 600;
	line-height: 16px;
}

th.centered {
    text-align: center;
}

.products-wrapper.disabled {
    pointer-events: none;
    opacity: .75;
}
</style>
