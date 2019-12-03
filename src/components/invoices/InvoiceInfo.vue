<template>
    <div class="invoice-info">
        <div class="info-row">
            <span>№ инвойса</span>
            <div class="invoice-num" :class="{'disabled':readonly}">
                <input type="text" :readonly="readonly" placeholder="Префикс" :value="invoice.prefix" @input="update('prefix', $event.target.value)">
                <input type="text" readonly placeholder="Индекс" :value="invoice.invoice_index">
                <input type="text" :readonly="readonly" placeholder="Суффикс" :value="invoice.suffix" @input="update('suffix', $event.target.value)">
            </div>
        </div>
        <div class="info-row">
            <span>Референц-номер<br>для оплаты</span>
            <FormInput placeholder="Референц-номер" :readonly="readonly" :value="invoice.reference_number" @input="update('reference_number', $event)"></FormInput>
        </div>
        <div class="info-row">
            <span>Дата инвойса</span>
            <FormInput type="date" :readonly="readonly" :value="invoice.invoice_date" @input="update('invoice_date', $event)"></FormInput>
        </div>
        <div class="info-row">
            <span>Cсылка</span>
            <FormInput placeholder="Наша ссылка" :readonly="readonly" :value="invoice.link" @input="update('link', $event)"></FormInput>
        </div>
    </div>
</template>

<script>
import merge from 'deepmerge'
import FormInput from '../common/FormInput'

export default {
    name: 'InvoiceInfo',
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: Object,
        readonly: Boolean,
    },
    components: {
        FormInput,
    },
    computed: {
        invoice() {
            return this.value ? this.value : this.$store.getters.invoiceTemplate();
        }
    },
    methods: {
        update(key, val) {
            let update = {
                [key]: val
            };

            this.$emit('change', merge.all([
                {}, 
                this.invoice,
                update
            ]));
        }
    }
}
</script>

<style scoped>
.invoice-info {
    padding: 20px;
}

.info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}

.info-row:last-of-type {
    margin: 0;
}

.info-row > span {
	color: #5E6D84;
	font-size: 13px;
	font-weight: 600;
	line-height: 16px;
    flex-basis: 30%;
}

.info-row > div {
    flex: 1;
}

.invoice-num {
	border: 1px solid #C2CACD;
	border-radius: 6px;
	background-color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    overflow: hidden;
}

.invoice-num.disabled {
    pointer-events: none;
    opacity: .75;
}

.invoice-num input {
    border: none;
    outline: none;
	color: #252932;
	font-size: 15px;
	font-weight: 500;
	line-height: 19px;
    text-align: center;
}

</style>
