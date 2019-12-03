<template>
    <div class="products">
        <div class="controls">
            <div class="filters">
                <FormInput class="search" placeholder="Поиск" v-model="filters.name">
                    <template #icon>
                        <i class="fas fa-search"></i>
                    </template>
                </FormInput>
                 <button class="reset-filter" @click="clearFilters">
                    <svg class="icon">
                        <use xlink:href="/assets/icons/sprite.svg#clear"></use>
                    </svg>
                    <span>Очистить фильтр</span>
                </button>
            </div>

            <ControlsButton class="btn-create" @click="$modal.show(modalName, null)">
                <svg class="icon">
                    <use xlink:href="/assets/icons/sprite.svg#box"></use>
                </svg>
                Создать продукт
            </ControlsButton>
        </div>
        <PaginatedTable :items="sorted">
            <template #item_name>продукта</template>
            <template #thead>
                <th class="sort-control" @click="sort('num', $event)">
                    <span class="sort-title" data-sort="0">
                        №
                        <span class="sort-icon">
                            <svg class="icon-up">
                                <use xlink:href="/assets/icons/sprite.svg#caret-down"></use>
                            </svg>
                            <svg class="icon-down">
                                <use xlink:href="/assets/icons/sprite.svg#caret-down"></use>
                            </svg>
                        </span>
                    </span>
                </th>
                <th class="sort-control" @click="sort('product_name', $event)">
                    <span class="sort-title" data-sort="0">
                        Название
                        <span class="sort-icon">
                            <svg class="icon-up">
                                <use xlink:href="/assets/icons/sprite.svg#caret-down"></use>
                            </svg>
                            <svg class="icon-down">
                                <use xlink:href="/assets/icons/sprite.svg#caret-down"></use>
                            </svg>
                        </span>
                    </span>
                </th>
                <th class="sort-control" @click="sort('count', $event)">
                    <span class="sort-title" data-sort="0">
                        Единица
                        <span class="sort-icon">
                            <svg class="icon-up">
                                <use xlink:href="/assets/icons/sprite.svg#caret-down"></use>
                            </svg>
                            <svg class="icon-down">
                                <use xlink:href="/assets/icons/sprite.svg#caret-down"></use>
                            </svg>
                        </span>
                    </span>
                </th>
                <th class="sort-control" @click="sort('nds', $event)">
                    <span class="sort-title" data-sort="0">
                        Цена без НДС
                        <span class="sort-icon">
                            <svg class="icon-up">
                                <use xlink:href="/assets/icons/sprite.svg#caret-down"></use>
                            </svg>
                            <svg class="icon-down">
                                <use xlink:href="/assets/icons/sprite.svg#caret-down"></use>
                            </svg>
                        </span>
                    </span>
                </th>
                <th class="sort-control" @click="sort('nds_on', $event)">
                    <span class="sort-title" data-sort="0">
                        НДС, %
                        <span class="sort-icon">
                            <svg class="icon-up">
                                <use xlink:href="/assets/icons/sprite.svg#caret-down"></use>
                            </svg>
                            <svg class="icon-down">
                                <use xlink:href="/assets/icons/sprite.svg#caret-down"></use>
                            </svg>
                        </span>
                    </span>
                </th>
                <th class="sort-control" @click="sort('price', $event)">
                    <span class="sort-title" data-sort="0">
                        Цена с НДС
                        <span class="sort-icon">
                            <svg class="icon-up">
                                <use xlink:href="/assets/icons/sprite.svg#caret-down"></use>
                            </svg>
                            <svg class="icon-down">
                                <use xlink:href="/assets/icons/sprite.svg#caret-down"></use>
                            </svg>
                        </span>
                    </span>
                </th>
                <th></th>
            </template>
            <template #tbody-item="slot">
                <td @click="$modal.show(modalName, slot.item)">{{slot.item.num}}</td>
                <td @click="$modal.show(modalName, slot.item)">{{slot.item.product_name}}</td>
                <td @click="$modal.show(modalName, slot.item)">{{slot.item.unit_type | unit_type_filter(unitTypes)}}</td>
                <td @click="$modal.show(modalName, slot.item)">{{slot.item | no_nds_price_filter | to_fixed_filter}}</td>
                <td @click="$modal.show(modalName, slot.item)">{{slot.item.nds}}</td>
                <td @click="$modal.show(modalName, slot.item)">{{slot.item | nds_price_filter | to_fixed_filter}}</td>
                <td>
                    <ControlWrapper  class="conrol-delete" @click="showModal(slot.item)">
                        <svg class="icon">
                            <use xlink:href="/assets/icons/sprite.svg#basket"></use>
                        </svg>
                        <div class="title-block">
                            Удалить продукт
                        </div>
                    </ControlWrapper>
                </td>
            </template>
        </PaginatedTable>
        <CreditProduct :modalName="modalName"></CreditProduct>

        <ModalInfo :modalName="modalInfo"></ModalInfo>
        <block-info v-if="this.$store.state.products.nameInfo == 'info'" :show="$store.state.products.showInfo">
            <img src="@/assets/icons/win.svg" class="sprite">
            Продукт добавлен 
            <i class="fas fa-times" @click="fade"></i>
        </block-info>
        <block-info v-if="this.$store.state.products.nameInfo == 'error'" :typeInfo="'error'" :show="$store.state.products.showInfo">
            <img src="@/assets/icons/delete-new.svg" class="sprite">
            Продукт удален 
            <i class="fas fa-times" @click="fade"></i>
        </block-info>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import FormInput from '../common/FormInput'
import ControlsButton from '../common/ControlsButton'
import PaginatedTable from '../common/PaginatedTable'
import ControlWrapper from '../common/ControlWrapper'
import CreditProduct from './CreditProduct'
import BlockInfo from '@/components/common/InfoBlock'
import ModalInfo from '@/components/products/modalInfo'

export default {
    name: 'Products',
    components: {
        FormInput,
        ControlsButton,
        PaginatedTable,
        ControlWrapper,
        CreditProduct,
        BlockInfo,
        ModalInfo
    },
    data() {
        return {
            filters: {
                name: ''
            },
            sorter: {
                last_prop: '',
                current_prop: '',
                reversed: false,
            },
            modalName: 'credit_product',
            modalInfo: 'modal_info'
        }
    },
    computed: {
        ...mapGetters(['products', 'unitTypes']),
        filtered() {
            let itemsToShow = this.products.slice(0);

            if(this.filters.name) {
                itemsToShow = itemsToShow.filter(item => {
                    return ~item.product_name.toLowerCase().indexOf(this.filters.name.toLowerCase());
                });
            }

            return itemsToShow;
        },
        sorted() {
            let filtered = this.filtered.slice(0);
            let sorter = this.sorter;

            if(!sorter.current_prop) return this.filtered;

            return filtered.sort((a, b) => {
                if (a[sorter.current_prop] < b[sorter.current_prop]) return sorter.reversed ? 1 : -1;
                if (a[sorter.current_prop] > b[sorter.current_prop]) return sorter.reversed ? -1 : 1;
                return 0;
            });
        }
    },
    methods: {
        showModal (data) {
            this.$modal.show(this.modalInfo, data)
        },
        sort(current_prop, event) {
            let sorter = this.sorter,
                thisElement = event.target

            if (thisElement.classList.contains('icon-down') || thisElement.classList.contains('icon-up')) {
                const element = thisElement.parentNode.parentNode
                this.addSortClass(element)
            } else if (thisElement.classList.contains('sort-icon')) {
                this.addSortClass(element.parentNode)
            } else if (thisElement.classList.contains('sort-title')) {
                this.addSortClass(thisElement)
            }

            if(sorter.last_prop === current_prop) {
                sorter.reversed = !sorter.reversed;
            } else {
                sorter.reversed = false;
                this.sorter.current_prop = current_prop;
            }

            sorter.last_prop = sorter.current_prop;
        },
        addSortClass (element) {
            const dataSort = element.getAttribute('data-sort')

            if (dataSort == 0) {
                element.setAttribute('class', 'sort-title up')
                element.setAttribute('data-sort', 1)
            } else if (dataSort == 1) {
                element.setAttribute('class', 'sort-title down')
                element.setAttribute('data-sort', 2)
            } else {
                element.setAttribute('class', 'sort-title')
                element.setAttribute('data-sort', 0)
            }
        },
        clearFilters() {
            this.filters.name = '';
        },
        fade () {}
    },
    created() {
        this.$store.dispatch('fetchProducts')
        .catch(err => console.log(err.response));
    }
}
</script>

<style lang="scss" scoped>
.conrol-delete {
    position: relative;
    .icon {
        fill: #979797;
        width: 14px;
        height: 16px;
        transition-duration: .3s;
        &:hover, &:active {
            fill: #5f5f5f;
        } 
    }
    &:hover {
        .title-block {
            visibility: visible;
            z-index: 2;
            opacity: 1;
        }
    }
}

.title-block {
    position: absolute;
    width: 146px;
    height: 36px;
    background: #F5F6FA;
    border: 1px solid #C2CACD;
    box-sizing: border-box;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #000000;
    left: -76px;
    top: -42px;
    z-index: -1;
    visibility: hidden;
    opacity: 0;
    transition-duration: .5s;
}

.sort-title {
    display: flex;
    align-items: center;
    &.up .sort-icon {
        .icon-up {
            fill: #2E2F31;
        }
    }
    &.down .sort-icon {
        .icon-down {
            fill: #2E2F31;
        }
    }
}

.sort-icon {
    margin-left: 4px;
    width: 6px;
    height: 9px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    fill: #C2CACD;
    .icon-up, .icon-down {
        width: 6px;
        height: 6px;
        transition-duration: .3s;
        &:hover {
            fill: #6C6F70;
        }
    }
    .icon-down {
        transform: rotate(180deg);
    }
}

.search {
    max-width: 280px;
}
.products {
    .controls .filters {
        display: flex;
        .input-wrapper {
            margin-right: 20px;
        }
    }
}

.products {
    padding: 0 60px;
}

.btn-create {
    padding: 0;
    justify-content: center;
    width: 250px;
    height: 60px;
    .icon {
        width: 19px;
        height: 19px;
        fill: white;
        margin-right: 16px;
    }
}

.reset-filter {
	border: 2px solid #C2CACD;
	border-radius: 25px;
	color: #252932;
	font-size: 16px;
	font-weight: 500;
	line-height: 19px;
    height: 50px;
    width: 216px;
    justify-content: center;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition-duration: .3s;
    position: relative;
    overflow: hidden;
    transition-duration: .5s;
    opacity: 1;
    background-color: transparent;
    &:focus, &:active {
        outline: none;
    }
    &:before {
        content: "";
        height: 100%;
        background-color: #C2CACD;
        width: 0%;
        transition-duration: .5s;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
    }
    &:hover {
        &:before {
            width: 100%;
        }
    }
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 5px;
      height: 5px;
      background: rgba(255, 255, 255, .5);
      opacity: 0;
      z-index: 2;
      border-radius: 100%;
      transform: scale(1, 1) translate(-50%);
      transform-origin: 50% 50%;
    }

    @keyframes ripple {
      0% {
        transform: scale(0, 0);
        opacity: 1;
      }
      20% {
        transform: scale(25, 25);
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: scale(40, 40);
      }
    }
    &:focus:not(:active)::after {
      animation: ripple 1s ease-out;
    }
    svg {
        fill: #818E94;
        width: 20px;
        height: 20px;
        position: relative;
        z-index: 3;
        margin-right: 8px;
    }
    span {
        position: relative;
        z-index: 3;
    }
    
}

.products > * {
    margin-bottom: 15px;
}

.controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sort-control {
    cursor: pointer;
}

.sort-control > i {
    color: #C2CACD;
}
</style>
