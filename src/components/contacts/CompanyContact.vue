<template>
    <form class="contact-form" v-bind="$attrs" @submit.prevent="$emit('submit')">
        <FormBlock class="form-block bottom-space">
            <template>ИНФОРМАЦИЯ О КОМПАНИИ</template>
            <template #content>
                <FormInput 
                    :readonly="readonly" 
                    :typeValid="'default'" 
                    :required="true" 
                    class="form-input-block" 
                    :placeholder="'Введите имя компании'" 
                    :value="contact.company_name" 
                    @validInput="validateNameCompany">Имя компании</FormInput>
                <FormInput :readonly="readonly" class="form-input-block" :placeholder="'Введите имя получателя'" :value="contact.department" @input="update('department', $event)">Отдел / Контактное лицо</FormInput>
                <div class="form-block-row">
                    <FormInput v-if="state.registry_code" class="form-input-block" :readonly="readonly" :value="contact.registry_code" @input="update('registry_code', $event)">Код реестра</FormInput>
                    <FormInput v-if="state.nds_number" class="form-input-block" :readonly="readonly" :value="contact.nds_number" @input="update('nds_number', $event)">Номер НДС</FormInput>
                </div>
                <div class="triggers-container">
                    <ElementTrigger 
                        :marginRight="34"
                        v-if="!state.nds_number" 
                        @click="state.nds_number=true">Номер НДС</ElementTrigger>
                    <ElementTrigger v-if="!state.registry_code" @click="state.registry_code=true">Код реестра</ElementTrigger>
                </div>
            </template>
        </FormBlock>
        <FormBlock class="form-block bottom-space">
            <template>КОНТАКТЫ И АДРЕС ДЛЯ ВЫСТАВЛЕНИЯ СЧЕТА</template>
            <template #content>
                <FormInput 
                    :readonly="readonly" 
                    :placeholder="'Введите Email'" 
                    class="form-input-block" 
                    type="email" 
                    :value="contact.email" 
                    @input="update('email', $event)">Email</FormInput>
                <FormInput 
                    :readonly="readonly" 
                    class="form-input-block" 
                    :value="contact.phone_number" 
                    @input="update('phone_number', $event)" 
                    :placeholder="'Введите телефон'">Телефон</FormInput>
                <FormInput 
                    v-if="state.client_number"  
                    class="form-input-block" 
                    :readonly="readonly" 
                    :value="contact.client_number" 
                    @input="update('client_number', $event)">Номер клиента</FormInput>
                <div class="triggers-container">
                    <ElementTrigger 
                        :marginRight="24"
                        v-if="!state.client_number" 
                        @click="state.client_number=true">Номер клиента</ElementTrigger>
                </div>
            </template>
        </FormBlock>
        <FormBlock class="form-block">
            <template>АДРЕС</template>
            <template #content>
                <FormSelect 
                    class="form-select" 
                    :items="countries" 
                    :defaultIndex="indexCounty" 
                    @newValue="update('country', $event)">Страна</FormSelect>
                <div class="input-group">
                    <FormInput :readonly="readonly" :value="contact.postcode" @input="update('postcode', $event)">Индекс</FormInput>
                    <FormInput :readonly="readonly" :value="contact.locality" @input="update('locality', $event)">Населенный пункт</FormInput>
                </div>
                <FormInput :readonly="readonly" :value="contact.invoice_adds" @input="update('invoice_adds', $event)">Адрес для выставления инвойса</FormInput>
                <FormInput v-if="state.additional_adds" :readonly="readonly" :value="contact.additional_adds" @input="update('additional_adds', $event)">Дополнительная строка адреса</FormInput>
                <div class="triggers-container">
                    <ElementTrigger v-if="!state.additional_adds" @click="state.additional_adds=true">Дополнительная строка</ElementTrigger>
                </div>
            </template>
        </FormBlock>
        <FormBlock class="form-block">
            <template>Язык оформления инвойса</template>
            <template #content>
                <FormSelect 
                    class="form-select" 
                    :items="languages" 
                    :disabled="readonly" 
                    :value="0" 
                    @newValue="update('languages', $event)">Выберете язык оформления</FormSelect>
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
    name: 'CompanyContact',
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
                registry_code: false,
                nds_number: false,
                client_number: false,
                additional_adds: false,
                extra_info: false
            },
        }
    },
    computed: {
        ...mapGetters(['countries', 'languages', 'userInfo']),
        indexCounty () {
            this.index = 0
            this.countries.filter((country, index) => {
                if (country.id === this.userInfo.country) {
                    this.index = index
                }
            })
            return this.index
        }
    },
    methods: {
        update(key, value) {
            this.$emit('input', { ...this.contact, [key]: value});
        },
        validateNameCompany ({valid, value}) {
            if (valid) {
                this.valueValidUpdate('company_name', value, valid)
            } else {
                this.valueValidUpdate('company_name', value, valid)
            }
        },
        valueValidUpdate (nameUpdate, value, valid) {
            this.update(nameUpdate, value)
            this.$emit('validateForms', valid)
        }
    }
}
</script>

<style lang="scss" scoped>

.form-input-block {
    margin-bottom: 24px;
}

.contact-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.form-block-row {
    display: flex;
    justify-content: space-between;
    .form-input-block {
        width: calc(50% - 25px);
    }
}

.form-block {
    flex-basis: 48%;
}

.form-block.bottom-space {
    margin-bottom: 34px;
}

.triggers-container {
    margin-top: -8px;
    display: flex;
}


.input-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    & + .input-wrapper {
        margin-bottom: 24px;
    }
}

.input-group .input-wrapper {
    &:first-child {
        max-width: 152px;
        width: 100%;
        margin-right: 16px;
    }
    &:last-child {
        flex-grow: 2;
    }
}

.form-block .form-select {
    margin-bottom: 24px;
}
</style>
