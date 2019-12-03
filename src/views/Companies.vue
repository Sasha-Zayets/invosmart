<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-6">
                <Card class="companies">
                    <template #header>Компании</template>
                    <template #content>
                        <form class="companies-controls" @submit.prevent="onCreateCompanyClick">
                            <FormInput class="company-name" placeholder="Название компании" required v-model="company.company_name">Название компании</FormInput>
                            <FormButton>Создать</FormButton>
                        </form>
                        <div class="companies-list">
                            <div class="company-item" :key="i" v-for="(company, i) in companies" @click="onCompanySelected(company)">{{company.company_name}}</div>
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Card from '../components/common/Card'
import FormInput from '../components/common/FormInput'
import FormButton from '../components/common/FormButton'

export default {
    name: 'Companies',
    components: {
        Card,
        FormInput,
        FormButton,
    },
    data() {
        return {
            company: {
                company_name: ''
            }
        }
    },
    computed: {
        ...mapGetters(['companies'])
    },
    methods: {
        onCreateCompanyClick() {
            let vm = this;

            this.$store.dispatch('createCompany', this.company)
            .then(() => vm.companyName = '')
            .catch(err => console.log(err.response));
        },
        onCompanySelected(company) {
            this.$store.commit('setCompanyId', company.id);
            this.$router.push('/invoices');
        }
    },
    created() {
        this.$store.dispatch('fetchCompanies')
        .catch(err => console.log(err));
    }
}
</script>

<style scoped>
.companies {
    margin-top: 30px;
}

.companies-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px;
    border-bottom: 1px solid #C2CACD;
    padding: 15px;
}

.company-name {
    flex: 1;
    margin-right: 10px;
}

.company-item {
    padding: 15px;
    cursor: pointer;
    border-bottom: 1px solid #C2CACD;
    font-weight: 500;
}

.company-item:last-of-type {
    border: none;
}

.company-item:hover {
    background-color: #F5F6FA;
}
</style>
