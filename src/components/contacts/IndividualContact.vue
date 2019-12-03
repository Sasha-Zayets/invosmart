<template>
    <form class="contact-form" v-bind="$attrs">
        <FormBlock class="form-block bottom-space">
            <template>Информация о физ. лице</template>
            <template #content>
                <FormInput 
                    :readonly="readonly" 
                    class="form-input-block" 
                    :placeholder="'Введите имя'" 
                    :typeValid="'default'" 
                    :value="contact.first_name" 
                    @validInput="firstNameValidate">Имя</FormInput>
                <FormInput 
                    :readonly="readonly" 
                    class="form-input-block" 
                    :placeholder="'Введите фамилию'" 
                    :typeValid="'default'" 
                    :value="contact.last_name" 
                    @validInput="lastNameValidate">Фамилия</FormInput>
                <FormInput v-if="state.nds_number" class="form-input-block" :readonly="readonly" :value="contact.nds_number" @input="update('nds_number', $event)">Номер НДС</FormInput>
                <div class="triggers-container">
                    <ElementTrigger v-if="!state.nds_number" @click="state.nds_number=true">Номер НДС</ElementTrigger>
                </div>
            </template>
        </FormBlock>
        <FormBlock class="form-block bottom-space">
            <template>Контакты для выставления счета</template>
            <template #content>
                <FormInput :readonly="readonly" class="form-input-block" :placeholder="'Введите email'" :value="contact.email" @input="update('email', $event)">Email</FormInput>
                <FormInput :readonly="readonly" class="form-input-block" :value="contact.phone_number" @input="update('phone_number', $event)" :placeholder="'Введите телефон'">Телефон</FormInput>
                <FormInput v-if="state.client_number" :readonly="readonly" :value="contact.client_number" @input="update('client_number', $event)">Номер клиента</FormInput>
                <div class="triggers-container">
                    <ElementTrigger v-if="!state.client_number" @click="state.client_number=true">Номер клиента</ElementTrigger>
                </div>
            </template>
        </FormBlock>
        <FormBlock class="form-block">
            <template>Адрес</template>
            <template #content>
                <FormSelect :items="countries" class="form-select form-input-block" :disabled="readonly" :value="contact.country" @newValue="update('country', $event)">Страна</FormSelect>
                <div class="input-group form-input-block">
                    <FormInput :readonly="readonly" :value="contact.postcode" @input="update('postcode', $event)">Индекс</FormInput>
                    <FormInput :readonly="readonly" :value="contact.locality" @input="update('locality', $event)">Населенный пункт</FormInput>
                </div>
                <FormInput :readonly="readonly" class="form-input-block" :value="contact.invoice_adds" @input="update('invoice_adds', $event)">Адрес для выставления инвойса</FormInput>
                <FormInput v-if="state.additional_adds" class="form-input-block" :readonly="readonly" :value="contact.additional_adds" @input="update('additional_adds', $event)">Дополнительная строка адреса</FormInput>
                <div class="triggers-container">
                    <ElementTrigger v-if="!state.additional_adds" @click="state.additional_adds=true">Дополнительная строка</ElementTrigger>
                </div>
            </template>
        </FormBlock>
        <FormBlock class="form-block">
            <template>Язык оформления инвойса</template>
            <template #content>
                <FormSelect class="form-select" :items="languages" :disabled="readonly" :value="contact.languages" @newValue="update('languages', $event)">Выберете язык оформления</FormSelect>
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
import ElementTrigger from '../common/ElementTrigger'

export default {
    inheritAttrs: false,
    name: 'IndividualContact',
    model: {
        prop: 'contact',
        event: 'input',
    },
    props: {
        contact: Object,
        readonly: Boolean,
    },
    components: {
        FormBlock,
        FormInput,
        FormTextarea,
        FormSelect,
        ElementTrigger,
    },
    data() {
        return {
            state: {
                phone_number: false,
                extra_info: false,
                nds_number: false,
                client_number: false,
                client_id: false,
                additional_adds: false
            }
        }
    },
    computed: mapGetters(['countries', 'languages']),
    methods: {
        update(key, value) {
            this.$emit('input', { ...this.contact, [key]: value});
        },
        firstNameValidate ({valid, value}) {
            if (valid) {
                this.update('first_name', value)
                this.firstNameValid = true
            } else {
                this.firstNameValid = false
                this.update('first_name', value)
            }
            this.validForms()
        },
        lastNameValidate ({valid, value}) {
            if (valid) {
                this.lastNameValid = true
                this.update('last_name', value)
            } else {
                this.update('last_name', value)
                this.lastNameValid = false
            }
            this.validForms()
        },
        validForms () {
            if (this.firstNameValid && this.lastNameValid) {
                this.$emit('validateForms', true)
            } else {
                this.$emit('validateForms', false)
            }
        }
    }
}
</script>

<style scoped>
.form-input-block {
    margin-bottom: 34px;
}

.contact-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.form-block {
    flex-basis: 48%;
}

.form-block.bottom-space {
    margin-bottom: 40px;
}

.triggers-container {
    display: flex;
    flex-wrap: wrap;
}

.triggers-container > * {
    margin-right: 10px;
}

.input-group {
    display: flex;
    justify-content: space-between;
}

.input-group > * {
    flex-basis: 49%;
}
</style>
