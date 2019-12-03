<template>
    <div class="invoices">
        <div class="controls">
            <div class="filters">
                <FormInput placeholder="Поиск" v-model="filters.number">
                    <template #icon>
                        <i class="fas fa-search"></i>
                    </template>
                </FormInput>
                <FormSelect :items="statusOptions" v-model="filters.status">По статусу</FormSelect>
                <FormInput type="date" v-model="filters.date">По дате</FormInput>
                <div class="reset-filter" @click="clearFilters">
                    <i class="fas fa-broom"></i>
                    <span>Очистить фильтр</span>
                </div>
            </div>
            <ControlsButton @click="$modal.show(modalName, null)">Создать инвойс</ControlsButton>
        </div>
        <PaginatedTable :items="sorted">
            <template #item_name>инвойса</template>
            <template #thead>
                <th>Статус</th>
                <th>№ инвойса</th>
                <th>Референц-номер для оплаты</th>
                <th class="sort-control" @click="sort('invoice_date')">Дата инвойса <i class="fas fa-sort"></i></th>
                <th class="sort-control" @click="sort('payment_term')">Срок платежа <i class="fas fa-sort"></i></th>
                <th class="sort-control" @click="sort('_contact')">Плательщик <i class="fas fa-sort"></i></th>
                <th class="sort-control" @click="sort('_noNds')">Без НДС <i class="fas fa-sort"></i></th>
                <th class="sort-control" @click="sort('_nds')">С НДС <i class="fas fa-sort"></i></th>
                <th>Заметка</th>
                <th></th>
            </template>
            <template #tbody-item="slot">
                <td @click="$modal.show(modalName, slot.item)">{{slot.item.draft | statusFilter}}</td>
                <td @click="$modal.show(modalName, slot.item)">{{slot.item._number}}</td>
                <td @click="$modal.show(modalName, slot.item)">{{slot.item.reference_number}}</td>
                <td @click="$modal.show(modalName, slot.item)">{{slot.item.invoice_date}}</td>
                <td @click="$modal.show(modalName, slot.item)">{{slot.item.payment_term}}</td>
                <td @click="$modal.show(modalName, slot.item)">{{slot.item._contact}}</td>
                <td @click="$modal.show(modalName, slot.item)">{{slot.item._noNds}}</td>
                <td @click="$modal.show(modalName, slot.item)">{{slot.item._nds}}</td>
                <td @click="$modal.show(modalName, slot.item)">{{slot.item.note | noteFilter}}</td>
                <td>
                    <ControlWrapper @click.native="deleteItem(slot.item)">
                        <i class="far fa-trash-alt"></i>
                    </ControlWrapper>
                </td>
            </template>
        </PaginatedTable>
        <CreditInvoice :modalName="modalName"></CreditInvoice>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import FormInput from '../common/FormInput'
import FormSelect from '../common/FormSelect'
import ControlsButton from '../common/ControlsButton'
import PaginatedTable from '../common/PaginatedTable'
import ControlWrapper from '../common/ControlWrapper'
import CreditInvoice from './CreditInvoice'

export default {
    name: 'Invoices',
    components: {
        FormInput,
        FormSelect,
        ControlsButton,
        PaginatedTable,
        ControlWrapper,
        CreditInvoice,
    },
    data() {
        return {
            modalName: 'credit_invoice',
            filters: {
                number: '',
                status: 0,
                date: ''
            },
            sorter: {
                last_prop: '',
                current_prop: '',
                reversed: false,
            },
            statusOptions: [
                {
                    name: 'Все',
                    value: 0,
                },
                {
                    name: 'Выпущенные',
                    value: 1,
                },
                {
                    name: 'Черновики',
                    value: 2,
                }
            ]
        }
    },
    computed: {
        ...mapGetters(['invoices']),
        filtered() {
            let itemsToShow = this.invoices.slice(0);

            if(this.filters.number) {
                itemsToShow = itemsToShow.filter(item => {
                    return ~item._number.toLowerCase().indexOf(this.filters.number.toLowerCase());
                });
            }

            if(this.filters.status == 1) itemsToShow = itemsToShow.filter(item => !item.draft);
            else if(this.filters.status == 2) itemsToShow = itemsToShow.filter(item => item.draft);

            if(this.filters.date) {
                itemsToShow = itemsToShow.filter(item => item.invoice_date == this.filter.date);
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
        sort(current_prop) {
            let sorter = this.sorter;

            if(sorter.last_prop === current_prop) {
                sorter.reversed = !sorter.reversed;
            } else {
                sorter.reversed = false;
                this.sorter.current_prop = current_prop;
            }

            sorter.last_prop = sorter.current_prop;
        },
        clearFilters() {
            this.filters.name = '';
            this.filters.status = 0;
            this.filters.date = '';
        },
        deleteItem(invoice) {
            if(!confirm(`Удалить инвойс?`)) return;

            this.$store.dispatch('deleteInvoice', invoice.id)
            .catch(err => console.log(err.response));
        }
    },
    filters: {
        statusFilter(val) {
            return val ? 'Черновик' : 'Выпущен';
        },
        noteFilter(val) {
            return val.substring(0, 16);
        }
    },
    created() {
        this.$store.dispatch('fetchInvoices')
        .catch(err => console.log(err.response));

        this.$store.dispatch('fetchProducts')
        .catch(err => console.log(err.response));

        this.$store.dispatch('fetchContacts')
        .catch(err => console.log(err.response));
    }
}
</script>

<style scoped>
.invoices {
    padding: 0 60px;
}

.invoices > * {
    margin-bottom: 15px;
}

.controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
}

.filters {
    display: flex;
    align-items: center;
}

.filters > * {
    margin-right: 30px;
}

.sort-control {
    cursor: pointer;
}

.sort-control > i {
    color: #C2CACD;
}

.reset-filter {
	border: 2px solid #C2CACD;
	border-radius: 6px;
	color: #252932;
	font-size: 15px;
	font-weight: 500;
	line-height: 19px;
    padding: 8px 25px;
    cursor: pointer;
}

.reset-filter:hover {
    opacity: .85;
}

.reset-filter > i {
    font-size: 20px;
    margin-right: 8px;
    color: #5E6D84;
}
</style>
