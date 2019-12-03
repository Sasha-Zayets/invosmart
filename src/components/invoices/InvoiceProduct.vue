<template>
    <tr class="product-item">
        <td class="item-control" @click="onProductEdit">
            <i class="fas fa-pencil-alt"></i>
        </td>
        <td class="product-prop first">
            <input type="text" v-model="product.num" @focus="state.numSuggestions=true">
            <div class="products-suggestions" v-if="state.numSuggestions">
                <div class="product-suggestion" v-for="(ps, i) in filteredByNum" :key="i" @click="onProductSelected(ps)">
                    <div class="ps-num">
                        {{ps.num}}
                    </div>
                    <div class="ps-name">
                        {{ps.product_name}}
                    </div>
                    <div>
                        <div>{{ps | no_nds_price_filter | to_fixed_filter}}</div>
                        <div>{{ps | nds_price_filter | to_fixed_filter}}</div>
                    </div>
                </div>
                <div class="products-suggestions-bg" @click="state.numSuggestions=false"></div>
            </div>
        </td>
        <td class="product-prop">
            <input type="text" v-model="product.product_name" @focus="state.nameSuggestions=true">
            <div class="products-suggestions" v-if="state.nameSuggestions">
                <div class="product-suggestion" v-for="(ps, i) in filteredByName" :key="i" @click="onProductSelected(ps)">
                    <div class="ps-num">
                        {{ps.num}}
                    </div>
                    <div class="ps-name">
                        {{ps.product_name}}
                    </div>
                    <div>
                        <div>{{ps | no_nds_price_filter | to_fixed_filter}}</div>
                        <div>{{ps | nds_price_filter | to_fixed_filter}}</div>
                    </div>
                </div>
                <div class="products-suggestions-bg" @click="state.nameSuggestions=false"></div>
            </div>
        </td>
        <td class="product-prop price">
            <div class="price-wrapper" v-if="!state.price" @click="state.price=true">
                <span class="price">{{product | no_nds_price_filter | to_fixed_filter}}</span>
                <br>
                <span class="nds-price">НДС {{product.nds}}% - {{product | nds_price_filter | to_fixed_filter}}</span>
            </div>
            <div v-else class="popup">
                <div class="popup-content">
                    <div class="popup-extra price">
                        <ToggleSwitch :options="ndsOptions" v-model="product.nds_on"></ToggleSwitch>
                        <FormInput v-model.number="product.nds">НДС</FormInput>
                    </div>
                    <input class="price-popup-inp" type="text" v-model.number="product.price">
                </div>
                <div class="popup-bg" @click="state.price=false"></div>
            </div>
        </td>
        <td class="product-prop">
            <div class="count-unit">
                <input type="text" v-model.number="product.count">
                <input type="text" v-model="product.unit">
            </div>
        </td>
        <td class="product-prop discount">
            <input type="text" v-model.number="product.discount">
        </td>
        <td class="product-prop last">
            <div class="total">
                <span>{{totalNoNdsPrice | to_fixed_filter}}</span>
                <br>
                <span>{{totalNdsPrice | to_fixed_filter}}</span>
            </div>
        </td>
        <td class="item-control">
            <i class="fas fa-times" @click="$emit('delete')"></i>
        </td>
        <CreditProduct :modalName="modalName" @before-close="onBeforeClose"></CreditProduct>   
    </tr>
</template>

<script>
import merge from 'deepmerge'
import {mapGetters} from 'vuex';

import ToggleSwitch from '../common/ToggleSwitch'
import FormInput from '../common/FormInput'
import CreditProduct from '../products/CreditProduct'

export default {
    name: 'InvoiceProduct',
    components: {
        ToggleSwitch,
        FormInput,
        CreditProduct,
    },
    props: {
        product: Object,
        currency: Number,
    },
    data() {
        return {
            modalName: 'credit-product',
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
            state: {
                price: false,
                numSuggestions: false,
                nameSuggestions: false,
            },
        }
    },
    computed: {
        ...mapGetters(['currencies', 'unitTypes']),
        totalNoNdsPrice() {
            let price = this.$options.filters.no_nds_price_filter(this.product);
            let res = 0;

            if(price > 0) {
                let {discount, count} = this.product;
                let absDiscount = price * discount / 100;
                res = (price - absDiscount) * count;
            }
            
            return res;
        },
        totalNdsPrice() {
            let price = this.$options.filters.nds_price_filter(this.product);
            let res = 0;

            if(price > 0) {
                let {discount, count} = this.product;
                let absDiscount = price * discount / 100;
                res = (price - absDiscount) * count;
            }

            return res;
        },
        filteredByNum() {
            let itemsToShow = this.$store.getters.products.slice(0);

            if(this.product.num) {
                itemsToShow = itemsToShow.filter(item => {
                    return ~item.num.toLowerCase().indexOf(this.product.num.toLowerCase());
                });
            }

            return itemsToShow;
        },
        filteredByName() {
            let itemsToShow = this.$store.getters.products;

            if(this.product.product_name) {
                itemsToShow = itemsToShow.filter(item => {
                    return ~item.product_name.toLowerCase().indexOf(this.product.product_name.toLowerCase());
                });
            }

            if(itemsToShow.length == 0) this.nameSuggestions = false;

            return itemsToShow;
        }
    },
    methods: {
        onProductEdit() {
            let product = this.$store.getters.product(this.product.id);
            this.$modal.show(this.modalName, product);
        },
        onProductSelected(product) {
            this.state.numSuggestions = false;

            for(let key in product) {
                this.product[key] = product[key];
            }
        },
        onBeforeClose(product) {
            if(!product) return;

            for(let key in product) {
                this.product[key] = product[key];
            }
        }
    }
}
</script>

<style scoped>

.product-prop {
    position: relative;
    background-color: #fff;
    border-top: 1px solid #C2CACD;
    border-bottom: 1px solid #C2CACD;
    color: #252932;
}

.product-prop, .item-control {
    font-weight: 500;
    font-size: 15px;
    padding: 5px 10px;
    cursor: pointer;
}

.product-prop.price {
    width: 120px;
}

.product-prop.discount, .product-prop.discount input {
    text-align: center;
}

.item-control:hover {
    opacity: .85;
}

.product-prop input {
    color: #252932;
	font-size: 15px;
	font-weight: 500;
	line-height: 19px;
    border: none;
    outline: none;
    box-sizing: border-box;
    padding: 0;
}

.product-prop.first {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    border-left: 1px solid #C2CACD;
}

.product-prop.last {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border-right: 1px solid #C2CACD;
}

.price-wrapper {
    text-align: right;
}

.price-wrapper .price {
	color: #252932;
	font-size: 15px;
	font-weight: 500;
	line-height: 19px;
}

.price-wrapper .nds-price {
	color: #5E6D84;
	font-size: 10px;
	font-weight: 500;
	line-height: 13px;
}

.count-unit input, .count-unit span {
	color: #000000;
	font-size: 15px;
	font-weight: 500;
	line-height: 19px;
}

.count-unit input {
    text-align: center;
}

.popup {
    position: relative;
}

.popup-bg {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: transparent;
    z-index: 1;
}

.popup-content {
    position: relative;
    z-index: 2;
}

.popup-extra {
    position: absolute;
    background-color: #fff;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #C2CACD;
    width: 100%;
    bottom: 0;
}

.popup-extra.price {
    bottom: 35px;
    width: 270px;
    left: -90px;
}

.popup-extra.price > * {
    margin-bottom: 15px;
}

.price-popup-inp {
    box-sizing: border-box;
    width: 100%;
}

.popup-extra.price > *:last-child {
    margin: 0;
}

.products-suggestions {
    position: absolute;
    width: 600px;
    left: 0;
    top: 49px;
    z-index: 2;
    max-height: 250px;
    overflow-y: auto;
}

.product-suggestion {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    background-color: #fff;
    border: 1px solid #C2CACD;
    border-top: none;
    cursor: pointer;
    z-index: 2;
}

.product-suggestion:hover {
    background-color: #f1f1f1;
}

.product-suggestion:last-of-type {
    border-top: 1px solid #C2CACD;
}

.products-suggestions-bg {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    background-color: transparent;
}
</style>
