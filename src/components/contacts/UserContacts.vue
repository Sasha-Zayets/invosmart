<template>
    <div class="user-contacts">
        <header class="user-contacts-header">
            <ControlsButton class="button-create">
                <svg class="icon">
                    <use xlink:href="/assets/icons/sprite.svg#invoices"></use>
                </svg>
                Create invoice
            </ControlsButton>
        </header>
        <div class="user-contacts-content">
            <div class="grid">
                <div class="grid-col">
                    <Card padding="24px">
                        <template #header>
                            <span class="card-title">Информация о компании</span>
                        </template>
                        <template #content>
                            <div class="card-element">
                                <span class="card-label">Имя компании</span>
                                <span class="card-value">{{info.company_name}}</span>
                            </div>
                            <div class="card-element">
                                <span class="card-label">Отдел/Контактное лицо</span>
                                <span class="card-value">{{info._name}}</span>
                            </div>
                            <div class="card-group">
                                <div class="card-element">
                                    <span class="card-label">Код реестра</span>
                                    <span class="card-value">{{info.registry_code}}</span>
                                </div>
                                <div class="card-element">
                                    <span class="card-label">Номер НДС</span>
                                    <span class="card-value">{{info.nds_number}}</span>
                                </div>
                            </div>
                        </template>
                    </Card>
                </div>
                <div class="grid-col">
                    <Card padding="24px">
                        <template #header>
                            <span class="card-title">Адрес</span>
                        </template>
                        <template #content>
                            <div class="card-group">
                                <div class="card-element">
                                    <span class="card-label">Страна</span>
                                    <span class="card-value">{{lang}}</span>
                                </div>
                                <div class="card-element">
                                    <span class="card-label">Населенный пункт</span>
                                    <span class="card-value">{{info.locality}}</span>
                                </div>
                            </div>
                            <div class="card-element">
                                <span class="card-label">Индекс</span>
                                <span class="card-value">{{info.postcode}}</span>
                            </div>
                            <div class="card-element">
                                <span class="card-label">Адрес для выставления инвойса</span>
                                <span class="card-value">{{info.invoice_adds}}</span>
                            </div>
                        </template>
                    </Card>
                </div>
                <div class="grid-col">
                    <Card padding="24px">
                        <template #header>
                            <span class="card-title">Контакты для выставления счета</span>
                        </template>
                        <template #content>
                            <div class="card-element">
                                <span class="card-label">Email</span>
                                <span class="card-value">{{info.email}}</span>
                            </div>
                            <div class="card-element">
                                <span class="card-label">Телефон</span>
                                <span class="card-value">{{info.phone_number}}</span>
                            </div>
                            <div class="card-element">
                                <span class="card-label">E-invoice address</span>
                                <span class="card-value">{{info.extra_info}}</span>
                            </div>
                        </template>
                    </Card>
                </div>
            </div>
            <div class="user-edit">
                <FormButton class="user-edit-btn" @click="modalShow">Редактировать</FormButton>
            </div>
            <div class="notes">
                <span class="notes-label">
                    Заметка для контакта
                </span>
                <div class="notes-text">
                    <textarea class="notes-text-field" placeholder="Введите заметку" v-model="comments"></textarea>
                </div>
            </div>
             <PaginatedTable :items="sorted" :count="false" :paginatedShow="false">
                <template #thead>
                    <th class="sort-control" @click="sort('is_company', $event)">
                        <span class="sort-title" data-sort="0">
                            Статус
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
                    <th class="sort-control" @click="sort('_name', $event)">
                        <span class="sort-title" data-sort="0">
                            № инвойса
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
                    <th class="sort-control" @click="sort('postcode', $event)">
                        <span class="sort-title" data-sort="0">
                            Референц-номер для оплаты
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
                    <th class="sort-control" @click="sort('locality', $event)">
                        <span class="sort-title" data-sort="0">
                            Дата инвойса
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
                    <th class="sort-control" @click="sort('invoice_adds', $event)">
                        <span class="sort-title" data-sort="0">
                            Срок платежа
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
                            Плательщик
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
                    <th class="sort-control last-sort-control" @click="sort('count', $event)">
                        <span class="sort-title" data-sort="0">
                            без НДС
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
                    <th class="sort-control last-sort-control" @click="sort('count', $event)">
                        <span class="sort-title" data-sort="0">
                            c НДС
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
                    <th class="sort-control last-sort-control" @click="sort('count', $event)">
                        <span class="sort-title" data-sort="0">
                            Заметка
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
                    <th class="sort-control last-sort-control" @click="sort('count', $event)">
                        <span class="sort-title" data-sort="0">
                            Статус
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
                </template>
                <template #tbody-item="slot">
                    <td>
                        <StatusPay status="draft">Черновик</StatusPay>
                    </td>
                    <td>{{slot.item._number}}</td>
                    <td>{{slot.item.reference_number}}</td>
                    <td>{{slot.item.invoice_date}}</td>
                    <td>{{slot.item.payment_term}}</td>
                    <td>{{slot.item.contact.company_name}}</td>
                    <td>{{slot.item.products | no_nds_price_filter | to_fixed_filter}}</td>
                    <td>{{slot.item.products[0].price}}.00</td>
                    <td class="edit-col">
                        <div class="add-note" @click="notesShowModal($event)">
                            <span v-if="slot.item.note" class="add-note-text">
                                {{ slot.item.note.slice(0, 16) }}
                            </span>
                            <span v-else class="add-note-text">
                                Добавить заметку
                            </span>
                            <svg class="add-note-icon">
                                <use xlink:href="/assets/icons/sprite.svg#pensil-edit"></use>
                            </svg>
                            <div class="add-note-show" v-if="slot.item.note">
                                <svg class="icon">
                                    <use xlink:href="/assets/icons/sprite.svg#cloud"></use>
                                </svg>
                                <span class="text">
                                    {{ slot.item.note }}
                                </span>
                            </div>
                            <NotesPopup class="note-popup" :element="slot.item" :typeNotes="'user'"/>
                        </div>
                    </td>
                    <td>1</td>
                </template>
            </PaginatedTable>
        </div>
        <CreditContact :modalName="modalName" @updates="updateData"></CreditContact>

        <block-info v-if="this.$store.state.contacts.nameInfo == 'info'" :show="$store.state.contacts.showInfo">
            <img src="@/assets/icons/win.svg" class="sprite">
            Контакт обновлен
            <i class="fas fa-times" @click="fade"></i>
        </block-info>
        <block-info v-if="this.$store.state.contacts.nameNotesInfo == 'info'" :show="$store.state.contacts.showNotestInfo">
            <img src="@/assets/icons/win.svg" class="sprite">
            Заметка добавлена
            <i class="fas fa-times" @click="fade"></i>
        </block-info>
         <block-info v-if="this.$store.state.contacts.nameNotesInfo == 'error'" :show="$store.state.contacts.showNotestInfo" :typeInfo="'error'">
            <img src="@/assets/icons/delete-new.svg" class="sprite">
            Заметка удалена
            <i class="fas fa-times" @click="fade"></i>
        </block-info>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import ControlsButton from '@/components/common/ControlsButton'
import Card from '@/components/common/CardElement'
import FormButton from "@/components/common/FormButton"
import PaginatedTable from '@/components/common/PaginatedTable'
import ControlWrapper from '@/components/common/ControlWrapper'
import StatusPay from '@/components/ui/StatusPay'
import NotesPopup from './NotesPopup'
import BlockInfo from '../common/InfoBlock'
import CreditContact from './CreditContact'

export default {
    components: {
        ControlsButton,
        Card,
        FormButton,
        PaginatedTable,
        ControlWrapper,
        StatusPay,
        NotesPopup,
        BlockInfo,
        CreditContact
    },
    created () {
        this.loadData()
    },
    data: () => ({
        filters: {
            name: '',
            type: 0,
        },
        sorter: {
            last_prop: '',
            current_prop: '',
            reversed: false,
        },
        info: [],
        comments: '',
        lang: '',
        modalName: 'credit_contact',
    }),
    computed: {
        ...mapGetters(['invoices']),
        filtered() {
            let itemsToShow = this.invoices.slice(0);

            if(this.filters.name) {
                itemsToShow = itemsToShow.filter(item => {
                    return ~item._name.toLowerCase().indexOf(this.filters.name.toLowerCase());
                });
            }

            if(this.filters.type == 1) itemsToShow = itemsToShow.filter(item => item.is_company);
            else if(this.filters.type == 2) itemsToShow = itemsToShow.filter(item => !item.is_company);

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
        },
    },
    methods: {
        loadData () {
            const id = this.$route.params.id

            this.$store.dispatch('fetchContacts')
                .then(res => {
                    this.info = this.$store.getters.contact(id)
                    this.valueData()
                    console.log(this.info)
                })
        },
        valueData () {
            this.$store.getters.countries.forEach(el => {
                if (el.value === this.info.country) {
                    this.lang = el.name
                }
            })
            this.comments = this.info.comments

            this.$store.dispatch('fetchInvoices')
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
        notesShowModal (event) {
            const element = event.target.parentNode,
                  list = Array.from(element.children),
                  lastElement = list[list.length - 1]

            lastElement.classList.toggle('show')

            setTimeout(() => {
                if (lastElement.classList.contains('show')) {
                        this.documentClick(lastElement)
                }
            }, 500)
        },
        // check on click outside event and delete event
        documentClick (element) {
            document.addEventListener('click', fade)
            
            function fade (event) {
                if (!element.contains(event.target)) {
                   element.classList.remove('show')
                   document.removeEventListener('click', fade, false)
                }
            }
        },
        fade () {
            this.$store.commit('setShowInfo', false)
        },
        modalShow () {
            this.$modal.show(this.modalName, this.info)
        },
        updateData () {
            this.loadData()
        }
    }
}
</script>

<style lang="scss" scoped>
.user-contacts {
    padding: 0 60px 60px;
    &-header {
        margin-bottom: 36px;
    }
}
.button-create {
    margin-left: auto;
    max-width: 251px;
    .icon {
        width: 17px;
        height: 17px;
        fill: white;
    }
}

.grid {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    &-col {
        width: calc((100% / 3) - 13px);
    }
}

// card
.card {
    &-title {
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #818E94;
    }
    &-group {
        display: flex;
        .card-element {
            margin-bottom: 0;
            width: 50%;
        }
        & + .card-element {
            margin-top: 24px;
        }
    }
    &-element {
        margin-bottom: 24px;
    }
    &-label {
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        color: #727779;
        display: block;
        margin-bottom: 16px;
    }
    &-value {
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        color: #2E2F31;
    }
}

.user-edit {
    margin-bottom: 54px;
    &-btn {
        margin-left: auto;
    }
}

.notes {
    &-label {
        display: inline-block;
        margin-bottom: 36px;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #818E94;
    }
    &-text-field {
        width: 630px;
        height: 180px;
        border: none;
        background: #FFFFFF;
        border-radius: 6px;
        padding: 24px;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        color: #979B9D;
        resize: none;
        &:focus {
            outline: none;
        }
        &::placeholder {
            font-weight: 500;
            font-size: 12px;
            line-height: 15px;
            color: #979B9D;
        }
    }
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


.add-note {
    font-size: 15px;
    color: #818E94;
    position: relative;
    margin-right: 21px;
    flex-grow: 2;
    display: flex;
    transition-duration: .3s;
    .text {
        position: absolute;
        left: 0;
        top: 30px;
    }
    &-show {
        visibility: hidden;
        opacity: 0;
        position: absolute;
        bottom: 15px;
        left: -80%;
        transition-duration: .5s;
        .icon {
            width: 283px;
            height: 240px;
        }
    }
    &-icon {
        width: 16px;
        height: 16px;
        margin-left: 10px;
        fill: #818E94;
        transition-duration: .3s;
    }
    &-text {
    }
    &:hover {
        color: #252932;
        .add-note-show {
            visibility: visible;
            opacity: 1;
        }
        &-icon {
        }
    }
}

.note-popup {
    position: absolute;
    position: absolute;
    bottom: -100%;
    left: -100%;
    z-index: 99;
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
</style>