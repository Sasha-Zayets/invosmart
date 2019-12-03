<template>
    <div class="contacts">
        <div class="block-hello" :class="{'show' : $store.state.contacts.contacts.length <= 0}">
            <img src="@/assets/images/contacts-new.png">
            <div class="block-hello-info">
                <span class="block-hello-title">У Вас нет ни одного контакта</span>
                <ControlsButton class="btn-create" @click="$modal.show(modalName, null)">
                    <img src="@/assets/icons/user.svg"/>
                    Создать контакт
                </ControlsButton>
            </div>
        </div>
        <div class="layout" v-if="this.$store.state.contacts.contacts.length != 0">
            <div class="controls">
                <div class="filters">
                    <FormInput class="filters-search" :placeholder="'Поиск'" v-model="filters.name">
                        <template #icon>
                            <svg class="icon-search">
                                <use xlink:href="/assets/icons/sprite.svg#search"></use>
                            </svg>
                        </template>
                    </FormInput>
                    <FormSelect 
                        class="filters" 
                        :items="typeOptions" 
                        :value="filters.type" 
                        :checkedIcon="true"
                        @newValue="newVal" ref="filter">
                        Тип контакта
                    </FormSelect>

                    <ResetButton @click="clearFilters">
                        <template #icon>
                            <svg class="icon">
                                <use xlink:href="/assets/icons/sprite.svg#clear"></use>
                            </svg>
                        </template>
                        <span>Очистить фильтр</span>
                    </ResetButton>
                </div>
                <ControlsButton 
                    iconName="user"
                    :sizeIcon="19"
                    @click="$modal.show(modalName, null)">
                    Создать контакт
                </ControlsButton>
            </div>
            <PaginatedTable :items="sorted" ref="tablesContacts">
                <template #item_name>контакта</template>
                <template #thead>
                    <th 
                        class="sort-control" 
                        data-hover="0"
                        @click="sort('is_company', $event)">
                        <span class="sort-title up" data-sort="1">
                            Тип
                            <span class="sort-icon">
                                <svg class="icon-hover">
                                    <use xlink:href="/assets/icons/sprite.svg#sort-one"></use>
                                </svg>
                                <svg class="icon-two">
                                    <use xlink:href="/assets/icons/sprite.svg#sort-two"></use>
                                </svg>
                            </span>
                        </span>
                    </th>
                    <th 
                        class="sort-control" 
                        data-hover="1"
                        @click="sort('_name', $event)">
                        <span class="sort-title" data-sort="0">
                            Имя Фамилия
                            <span class="sort-icon">
                                <svg class="icon-hover">
                                    <use xlink:href="/assets/icons/sprite.svg#sort-one"></use>
                                </svg>
                                <svg class="icon-two">
                                    <use xlink:href="/assets/icons/sprite.svg#sort-two"></use>
                                </svg>
                            </span>
                        </span>
                    </th>
                    <th 
                        class="sort-control index" 
                        data-hover="2"
                        @click="sort('postcode', $event)">
                        <span class="sort-title" data-sort="0">
                            Индекс
                            <span class="sort-icon">
                                <svg class="icon-hover">
                                    <use xlink:href="/assets/icons/sprite.svg#sort-one"></use>
                                </svg>
                                <svg class="icon-two">
                                    <use xlink:href="/assets/icons/sprite.svg#sort-two"></use>
                                </svg>
                            </span>
                        </span>
                    </th>
                    <th 
                        class="sort-control" 
                        data-hover="3"
                        @click="sort('locality', $event)">
                        <span class="sort-title" data-sort="0">
                            Город
                            <span class="sort-icon">
                                <svg class="icon-hover">
                                    <use xlink:href="/assets/icons/sprite.svg#sort-one"></use>
                                </svg>
                                <svg class="icon-two">
                                    <use xlink:href="/assets/icons/sprite.svg#sort-two"></use>
                                </svg>
                            </span>
                        </span>
                    </th>
                    <th 
                        class="sort-control" 
                        data-hover="4"
                        @click="sort('invoice_adds', $event)">
                        <span class="sort-title" data-sort="0">
                            Адрес выставления инвойса
                            <span class="sort-icon">
                                <svg class="icon-hover">
                                    <use xlink:href="/assets/icons/sprite.svg#sort-one"></use>
                                </svg>
                                <svg class="icon-two">
                                    <use xlink:href="/assets/icons/sprite.svg#sort-two"></use>
                                </svg>
                            </span>
                        </span>
                    </th>
                    <th 
                        class="sort-control" 
                        data-hover="5"
                        @click="sort('count', $event)">
                        <span class="sort-title" data-sort="0">
                            Кол-во инвойсов
                            <span class="sort-icon">
                                <svg class="icon-hover">
                                    <use xlink:href="/assets/icons/sprite.svg#sort-one"></use>
                                </svg>
                                <svg class="icon-two">
                                    <use xlink:href="/assets/icons/sprite.svg#sort-two"></use>
                                </svg>
                            </span>
                        </span>
                    </th>
                    <th 
                        class="sort-control last-sort-control" 
                        data-hover="6"
                        @click="sort('comments', $event)">
                        <span class="sort-title" data-sort="0">
                            Заметка
                            <span class="sort-icon">
                                <svg class="icon-hover">
                                    <use xlink:href="/assets/icons/sprite.svg#sort-one"></use>
                                </svg>
                                <svg class="icon-two">
                                    <use xlink:href="/assets/icons/sprite.svg#sort-two"></use>
                                </svg>
                            </span>
                        </span>
                    </th>
                </template>
                <template #tbody-item="slot">
                    <td 
                        class="type td-item"
                        data-hover="0"
                        @mouseover="visibilityIcon($event)"
                        @mouseout="hiddenIcon($event)">
                        {{slot.item.is_company | typeFilter}}
                    </td>
                    <td
                        class="fullName td-item"
                        data-hover="1"
                        @mouseover="visibilityIcon($event)"
                        @mouseout="hiddenIcon($event)">
                        {{slot.item._name}}
                    </td>
                    <td 
                        class="index td-item"
                        data-hover="2"
                        @mouseover="visibilityIcon($event)"
                        @mouseout="hiddenIcon($event)">
                        {{slot.item.postcode}}
                    </td>
                    <td 
                        class="city td-item"
                        data-hover="3"
                        @mouseover="visibilityIcon($event)"
                        @mouseout="hiddenIcon($event)">
                        {{slot.item.locality}}
                    </td>
                    <td 
                        class="address td-item"
                        data-hover="4"
                        @mouseover="visibilityIcon($event)"
                        @mouseout="hiddenIcon($event)">
                        {{slot.item.invoice_adds}}
                    </td>
                    <td 
                        class="count td-item"
                        data-hover="5"
                        @mouseover="visibilityIcon($event)"
                        @mouseout="hiddenIcon($event)">1</td>
                    <td 
                        class="edit-col notes td-item"
                        data-hover="6"
                        @mouseover="visibilityIcon($event)"
                        @mouseout="hiddenIcon($event)">
                        <div class="add-note" @click="notesShowModal($event)">
                            <span v-if="slot.item.comments" class="add-note-text">
                                {{ slot.item.comments }}
                            </span>
                            <ShowMessage :message="slot.item.comments" class="showMessage"></ShowMessage>
                            <NotesMessage v-if="slot.item.comments">Редактировать заметку</NotesMessage>
                            <NotesMessage v-else>Добавить заметку</NotesMessage>
                            <NotesPopup class="note-popup" :element="slot.item" />
                        </div>
                        <ControlWrapper class="conrol-delete" @click="showModal(slot.item)">
                            <MessageRemove />
                        </ControlWrapper>
                    </td>
                </template>
            </PaginatedTable>
          
            <div class="result-not" v-if="this.$store.state.contacts.showPaginated <= 0">
                <img src="@/assets/images/result-not.png">
                <span>
                    Контакт с таким именем не найден
                </span>
            </div>
        </div>

        <!-- Inforamtion blocks -->
        <CreditContact :modalName="modalName"></CreditContact>
        <ModalInfo :modalName="modalInfo"></ModalInfo>
        
        <block-info v-if="this.$store.state.contacts.nameInfo == 'info'" :show="$store.state.contacts.showInfo">
            <img src="@/assets/icons/win.svg" class="sprite">
            Контакт добавлен
            <i class="fas fa-times" @click="fade"></i>
        </block-info>
        <block-info v-if="this.$store.state.contacts.nameInfo == 'error'" :show="$store.state.contacts.showInfo" :typeInfo="'error'">
            <img src="@/assets/icons/delete-new.svg" class="sprite">
            Контакт удален 
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
import {mapGetters} from 'vuex';
import FormInput from '../common/FormInput'
import FormSelect from '../common/FormSelect'
import ControlsButton from '../common/ControlsButton'
import PaginatedTable from '../common/PaginatedTable'
import ControlWrapper from '../common/ControlWrapper'
import CreditContact from './CreditContact'
import BlockInfo from '../common/InfoBlock'
import ModalInfo from './ModalInfo'
import NotesPopup from './NotesPopup'
import ResetButton from '@/components/common/ResetButton'
import MessageRemove from '@/components/ui/tableUI/MessageRemove'
import NotesMessage from '@/components/ui/tableUI/NotesMessage'
import ShowMessage from '@/components/ui/tableUI/ShowMessage'

export default {
    name: 'Products',
    components: {
        FormInput,
        FormSelect,
        ControlsButton,
        PaginatedTable,
        ControlWrapper,
        CreditContact,
        BlockInfo,
        ModalInfo,
        NotesPopup,
        ResetButton,
        MessageRemove,
        NotesMessage,
        ShowMessage
    },
    data() {
        return {
            filters: {
                name: '',
                type: 0,
            },
            sorter: {
                last_prop: '',
                current_prop: '',
                reversed: false,
            },
            typeOptions: [
                {
                    name: 'Все',
                    id: 0,
                },
                {
                    name: 'Только компании',
                    id: 1,
                },
                {
                    name: 'Только физ. лица',
                    id: 2,
                }
            ],
            modalName: 'credit_contact',
            modalInfo: 'modal_info'
        }
    },
    computed: {
        ...mapGetters(['contacts']),
        filtered() {
            let itemsToShow = this.contacts.slice(0);

            if(this.filters.name) {
                itemsToShow = itemsToShow.filter(item => {
                    return ~item._name.toLowerCase().indexOf(this.filters.name.toLowerCase());
                })
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
        }
    },
    mounted () {
        console.log(this.contacts)
    },
    methods: {
        showModal (data) {
            this.$modal.show(this.modalInfo, data)
        },
        notesShowModal (event) {
            let element, temp = event.target
            
            while ((temp = temp.parentElement) && !temp.classList.contains('notes')) {
                element = temp
            }

            const list = Array.from(element.children),
                  lastElement = list[list.length - 1],
                  elementTr = element.parentNode.parentNode

            if (!lastElement.contains(event.target)) {
                elementTr.classList.add('active')
    
                if (lastElement.classList.contains('show')) {
                    lastElement.classList.remove('show')
                } else {
                    lastElement.classList.add('show')
                }
    
                setTimeout(() => {
                    if (lastElement.classList.contains('show')) {
                        this.documentClick(elementTr, lastElement)
                    }
                }, 500)
            }
        },
        // check on click outside event and delete event
        documentClick (clickElement, element) {
            document.addEventListener('click', fade)
            
            function fade (event) {
                if (!element.contains(event.target)) {
                   element.classList.remove('show')
                   document.removeEventListener('click', fade, false)
                   clickElement.classList.remove('active')
                }
            }
        },
        newVal (element) {
            this.filters.type = element
        },
        sort(current_prop, event) {
            let sorter = this.sorter,
                thisElement = event.target

            if (thisElement.classList.contains('sort-title')) {
                this.addSortClass(thisElement)
            } else {
                while((thisElement = thisElement.parentElement)) {
                    if (thisElement.classList.contains('sort-title')) {
                        this.addSortClass(thisElement)
                        break;
                    }
                }
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
            const titleList = this.$refs.tablesContacts.$el.querySelectorAll('.sort-title'),
                  dataSort = element.getAttribute('data-sort')

            titleList.forEach(title => {
                title.setAttribute('class', 'sort-title')
            })

            if (dataSort == 0) {
                element.setAttribute('class', 'sort-title up')
                element.setAttribute('data-sort', 1)
            } else if (dataSort == 1) {
                element.setAttribute('class', 'sort-title down')
                element.setAttribute('data-sort', 2)
            } else {
                element.setAttribute('class', 'sort-title up')
                element.setAttribute('data-sort', 1)
            }
        },
        clearFilters() {
            this.filters.name = ''
            this.filters.type = 0

            this.$refs.filter.reset()
        },
        fade () {
            this.$store.commit('setShowInfo', false)
        },
        visibilityIcon (event) {
            let element, temp = event.target

            if (temp.classList.contains('td-item')) {
                element = temp
            } else {
                while ((temp = temp.parentElement)) {
                    if (temp.classList.contains('td-item')) {
                        element = temp

                        break;
                    }
                }
            }

            const dataHoverValue = element.getAttribute('data-hover')

            document.querySelector(`th[data-hover='${dataHoverValue}']`)
                .classList.add('active')
        },
        hiddenIcon (event) {
           let element, temp = event.target

            if (temp.classList.contains('td-item')) {
                element = temp
            } else {
                while ((temp = temp.parentElement)) {
                    if (temp.classList.contains('td-item')) {
                        element = temp
                        
                        break;
                    }
                }
            }

            const dataHoverValue = element.getAttribute('data-hover')

            document.querySelector(`th[data-hover='${dataHoverValue}']`)
                .classList.remove('active')
        }
    },
    filters: {
        typeFilter (isCompany) {
            return isCompany ? 'Компания' : 'Физ. лицо';
        }
    },
    created() {
        this.$store.dispatch('getUserInfo')
            .catch(err => console.log(err))
            
        this.$store.commit('setLoading', true)

        this.$store.dispatch('fetchContacts')
            .then(data => {
                this.$store.commit('setLoading', false)   
            })
            .catch(err => console.log(err.response));
    }
}
</script>

<style lang="scss" scoped>
.contacts {
    height: 100%;
}
//table
    th.index {
        padding-right: 18px;
        & > span {
            justify-content: flex-end;
        }
    }
    .type {
        width: 145px;
        padding-right: 16px;
    }
    .fullName {
        width: 211px;
        padding-right: 16px;
    }
    .index {
        width: 126px;
        padding-right: 41px;
        text-align: right;
    }
    .city {
        width: 235px;
        padding-right: 16px;
    }
    .address {
        width: 318px;
        padding-right: 16px;
    }
    .count {
        width: 172px;
        padding-right: 49px;
        text-align: right;
    }
    .notes {
        width: 163px;
        padding-right: 16px;
    }
//end table
.last-sort-control {
    width: 209px;
}

.edit-col {
    display: flex;
}

.icon-search {
    min-width: 19px;
    width: 19px;
    height: 19px;
    fill: #818E94;
    margin-right: 8px;
}

.note-popup {
    position: absolute;
    top: calc(100% - 59px);
    left: calc(-100% - 364px);
    z-index: 99;
}

.block-hello {
    display: none;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 100px;
    > * {
        display: none;
    }
    &.show {
        display: flex;
        > * {
            display: block;
        }
    }
    & > img {
        max-width: 801px;
        margin-bottom: 35px;
    }
    &-title {
        font-weight: 600;
        font-size: 24px;
        line-height: 19px;
        text-align: center;
        color: #000000;
        margin-bottom: 40px;
        display: block;
    }
}

.sort-title {
    display: flex;
    align-items: center;
    .icon-hover {
        width: 14px;
        height: 14px;
        fill: #B8C5CB;
        transition-duration: .3s;
    }
    &:hover {
        .sort-icon {
            background-color: #F5F6FA;
        }
    }
    &:active {
        .icon-hover, .icon-two {
            fill: #818E94;
        }
    }
    &.up .sort-icon {
        .icon-hover {
            display: block;
            opacity: 1;
            fill: #B8C5CB;
        }
    }
    &.down .sort-icon {
        .icon-hover {
            display: none;
            opacity: 0;
        }
        .icon-two {
            display: block;
            opacity: 1;
            fill: #B8C5CB;
        }
    }
}

.sort-icon {
    margin-left: 0;
    width: 6px;
    height: 9px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    fill: #C2CACD;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: transparent;
    transition-duration: .3s;
    &:hover {
        background-color: #F5F6FA;
    }
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

.result-not {
    display: flex;
    align-items: center;
    flex-direction: column;
    img {
        margin-bottom: 48px;
    }
    span {
        display: block;
        font-weight: 600;
        font-size: 24px;
        line-height: 19px;
        text-align: center;
        color: #000000;
    }
}

.contacts > * {
    margin-bottom: 15px;
}

.btn-create {
    max-width: 300px;
    height: 60px;
    border-radius: 10px;
    text-align: center;
    justify-content: center;
    margin: 0 auto;
}
.controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 47px;
}


.filters {
    display: flex;
    align-items: center;
    &-search {
        max-width: 280px;
    }
}

.filters > * {
    margin-right: 16px;
}

.sort-control {
    cursor: pointer;
    user-select: none;
    .icon-hover {
        display: none;
        opacity: 0;
        transition: .3s;
    }
    &.active {
        .icon-hover {
            display: block;
            opacity: 1;
        }
    }
    &:hover {
        .icon-hover {
            display: block;
            opacity: 1;
        }
    }
    i {
        margin-left: 4px;
        color: #C2CACD;
        font-size: 10px;
        &.fas.fa-sort-up, &.fas.fa-sort-down {
            color: #4c4e4e;
        }
    }
}

.sort-control > i {
    color: #C2CACD;
}

.icon-two {
    display: none;
}
tr {
    &.active {
        .message {
            display: block;
        }
        .notes-message {
            display: block;
        }
        .add-note-text {
            max-width: 68px;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
    &:hover {
        .message {
            display: flex;
            align-items: center;
        }
        .notes-message {
            display: block;
        }
        .add-note-text {
            max-width: 68px;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
}

@function w($value) {
    @return ($value*100vw)/1572
};

@function w($value) {
    @return ($value*100vw)/1572
};

@media (min-width: 1300px) and (max-width: 1572px) {
    .filters-search {
        max-width: w(280);
        height: w(50);
        i {
            font-size: w(19);
        }
    }
    .reset-filter {
        width: w(216);
        height: w(50);
        font-size: w(16);
    }  
}
</style>
