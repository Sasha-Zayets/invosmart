<template>
    <form class="product-form" v-bind="$attrs" @submit.prevent="$emit('submit')">
        <FormBlock class="form-block">
            <template #content>
                <FormInput 
                    :typeValid="'default'" 
                    @validInput="productValid"
                    class="product-form__filed" 
                    :readonly="readonly" 
                    placeholder="Введите название товара / услуги" 
                    :value="product.product_name" 
                    @input="update('product_name', $event)">Название продукта</FormInput>
                <FormInput 
                    class="product-form__filed" 
                    :readonly="readonly" 
                    placeholder="Ведите номер продукта" 
                    :value="product.num" 
                    @input="update('num', $event)">Номер продукта</FormInput>
                <FormTextarea class="product-form__filed" rows="3" :readonly="readonly" placeholder="Описание товара или услуги" :value="product.description" @change="update('description', $event)">Описание</FormTextarea>
                <FormSelect class="" :disabled="readonly" :items="unitTypes" :value="product.unit_type" @newValue="update('unit_type', +$event)">Единица измерения</FormSelect>
            </template>
        </FormBlock>
        <FormBlock class="form-block">
            <template>ЦЕНА</template>
            <template #content>
                <ToggleSwitch :disabled="readonly" :options="ndsOptions" :value="product.nds_on" @change="update('nds_on', $event)"></ToggleSwitch>
                <div class="input-group">
                    <FormInput :readonly="readonly" :value="product.price" @input="update('price', +$event)">Цена за ед.</FormInput>
                    <FormInput v-if="showCustomNds" :readonly="readonly" :value="product.nds" @input="update('nds', +$event)">Ставка НДС</FormInput>
                    <FormSelect v-else :items="ndsRates" :disabled="readonly" :value="product.nds" @newValue="onNdsOptionChanged">Ставка НДС</FormSelect>
                </div>
                <div class="price-box">
                    <div class="price-item">
                        <span class="price-type">Цена за еденицу без НДС:</span>
                        <span class="price">{{product | no_nds_price_filter | to_fixed_filter}}</span>
                    </div>
                    <div class="price-item">
                        <span class="price-type">Цена за еденицу c НДС:</span>
                        <span class="price">{{product | nds_price_filter | to_fixed_filter}}</span>
                    </div>
                </div>
            </template>
        </FormBlock>
    </form>
</template>

<script>
import {mapGetters} from 'vuex'
import FormBlock from '../common/FormBlock'
import FormInput from '../common/FormInput'
import FormTextarea from '../common/FormTextarea'
import FormSelect from '../common/FormSelect'
import ToggleSwitch from '../common/ToggleSwitch'

export default {
    inheritAttrs: false,
    name: 'Product',
    model: {
        prop: 'product',
        event: 'input',
    },
    props: {
        product: Object,
        readonly: Boolean,
    },
    components: {
        FormBlock,
        FormInput,
        FormTextarea,
        FormSelect,
        ToggleSwitch,
    },
    data() {
        return {
            ndsOptions: [
                {
                    name: 'Цена с НДС',
                    value: true,
                },
                {
                    name: 'Цена без НДС',
                    value: false,
                }
            ],
            ndsRates: [
                {
                    name: '0%',
                    value: 0,
                    id: 0
                },
                {
                    name: '9%',
                    value: 9,
                    id: 9
                },
                {
                    name: '20%',
                    value: 20,
                    id: 20
                },
                {
                    name: 'Другое значение',
                    value: -1,
                    id: -1
                }
            ],
            showCustomNds: false
        }
    },
    computed: {
        ...mapGetters(['unitTypes'])
    },
    methods: {
        update(key, value) {
            this.$emit('input', { ...this.product, [key]: value})
        },
        onNdsOptionChanged (value) {
            let res = value

            if(res == -1) {
                res = 20
                this.showCustomNds = true
            }

            this.$emit('input', { ...this.product, ['nds']: res})
        },
        productValid (value) {
            if (value) {
                this.$store.commit('setValidProduct', true)
            } else {
                this.$store.commit('setValidProduct', false)
            }
        }
    },
    created() {
        this.showCustomNds = !this.ndsRates.filter(ndsRate => {
            return ndsRate.value === this.product.nds;
        }).length > 0;
    }
}
</script>

<style lang="scss" scoped>
.product-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &__filed {
        margin-top: 0;
        margin-bottom: 29px;
        //padding: 16px 25px;
    }
}

.form-block {
    width: calc(50% - 20px);
}

.input-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 36px;
}

.input-group > .input-wrapper {
    width: calc(50% - 10px);
}

.input-group .select-wrapper {
    width: calc(50% - 10px);
}

.price-box {
    padding: 0 15px;
}

.price-item {
    display: flex;
    margin-bottom: 15px;
}

.price-type {
	color: #727779;
	font-size: 13px;
	font-weight: 500;
    line-height: 16px;
    flex: 2;
}

.price {
	color: #252932;
	font-size: 15px;
	font-weight: 600;
    line-height: 19px;
    flex: 1;
}
</style>
