<template>
    <ModalWindow :name="modalName" @before-open="beforeOpen($event.params)" class="modal-header" @before-close="$emit('before-close', $event.params)">
        <template #header>
            <div class="header-content">
                <span>{{header}}</span>
                <ToggleSwitch class="toggle" v-if="isNew" :options="toggleOptions" v-model="contact.is_company" @change="toggleSwitch"></ToggleSwitch>
            </div>
        </template>
        <template #content>
            <CompanyContact 
                :contact="contact" 
                v-model="contact" 
                v-if="contact.is_company" 
                @validateForms="validateCreateContactsForm"/>
            <IndividualContact 
                :contact="contact" 
                v-model="contact" 
                v-else 
                @validateForms="validateCreateContactsForm"/>
            <!--<component :is="contact.is_company?'CompanyContact':'IndividualContact'" id="contact_form" v-model="contact" ></component>-->
        </template>
        <template #footer>
            <div class="footer-content">
                <!---->
                <FormButton v-if="isNew" :class="['footer-btn', {'disabled': validFormsCreateContact}]" form="contact_form" @click="addContacts($event)">Добавить контакт</FormButton>
                <!--<FormButton v-if="!isNew && readonly" class="btn-new" @click.prevent="readonly=false">Редактировать</FormButton>-->
                <FormButton v-if="!isNew" class="btn-new" form="contact_form" @click="updateContact">Сохранить</FormButton>
            </div>
        </template>
    </ModalWindow>
</template>

<script>
import ModalWindow from '../common/ModalWindow'
import CompanyContact from './CompanyContact'
import IndividualContact from './IndividualContact'
import FormButton from '../common/FormButton'
import ToggleSwitch from '../common/ToggleSwitch'
import { setTimeout } from 'timers';

export default {
    name: 'CreditContact',
    props: {
        modalName: String,
    },
    components: {
        ModalWindow,
        CompanyContact,
        IndividualContact,
        FormButton,
        ToggleSwitch,
    },
    data() {
        return {
            isNew: false,
            readonly: false,
            action: '',
            contact: {},
            toggleOptions: [
                {
                    name: 'Компания',
                    value: true
                },
                {
                    name: 'Физ. лицо',
                    value: false
                }
            ],
            validFormsCreateContact: true
        }
    },
    computed: {
        header() {
            if(this.isNew) return 'Добавить контакт';
            return this.readonly ? 'Информация о контакте' : 'Редактировать контакт';
        }
    },
    methods: {
        onSubmit (value) {
            if (!this.validFormsCreateContact) {
                this.addAction(this.action)
            }

            if(this.action === 'updateContact') {
                this.addAction(this.action)   
            }
        },
        addAction (action) {
            this.$store.dispatch(action, this.contact)
                .then(res => {
                    if (action === 'updateContact') {
                        this.$emit('updates')
                    }
                })
                .catch(err => console.log(err.response))   
        
            this.$store.commit('setNameInfo', 'info')
            this.$store.commit('setShowInfo', true)
            this.$modal.hide(this.modalName, this.contact)

            setTimeout(() => {
                this.$store.commit('setShowInfo', false)
            }, 1000)
        },
        beforeOpen(contact) {
            if(contact) {
                this.isNew = false,
                this.readonly = true;
                this.contact = {...contact};
            } else {
                this.isNew = true;
                this.readonly = false;
                this.contact = this.$store.getters.contactTemplate();
            }
        },
        addContacts (event) {
            if (event.target.classList.contains('disabled')) {
                event.preventDefault()
                
                this.$store.state.contacts.noValidError = true
            } else {
                this.action = 'createContact'
                this.onSubmit()
                this.$store.commit('setValidFormContacts', false)
            }
        },
        updateContact () {
            this.action = 'updateContact'
            this.onSubmit()
        },
        validateCreateContactsForm (value) {
            if (value) {
                this.validFormsCreateContact = false
            } else {
                 this.validFormsCreateContact = true
            }
        },
        toggleSwitch (value) {
            this.validFormsCreateContact = true
        }
    }
}
</script>

<style lang="scss" scoped>

.header-content {
    display: flex;
    align-items: center;
    flex: 1;
    width: 100%;
    justify-content: space-between;
    span:first-child {
        font-weight: 500;
        font-size: 18px;
        line-height: 19px;
        color: #2E2F31;
    }
}

.toggle {
    width: 278px;
    margin-left: 30px;
}

.footer-content {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .form-button.disabled {
        background: #CDCDCD !important;
        border: 2px solid #979797 !important;
        box-shadow: 3px 1px 4px rgba(151, 151, 151, 0.25) !important;
        border-radius: 6px;
    }
}

.footer-btn {
    border-radius: 6px;
    padding: 0 33px;
    height: 48px;
    font-weight: 600;
    font-size: 16px;
    line-height: 15px;
    text-align: center;
    color: #FFFFFF;
}


.btn-new {
    max-width: 450px;
    width: 100%;
}
</style>
