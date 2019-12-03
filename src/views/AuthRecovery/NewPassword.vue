<template>
    <div class="new-password">
        <AuthTitle mb="160">Password recovery</AuthTitle>
        <h2 class="new-password-title"></h2>
        <div class="new-password-form">
            <FormInput
                class="new-password-input"
                type="password"
                placeholder="Enter password"
                :required="true"
                :typeValid="'password'"
                @validInput="passwordValid"
                :messageError="'The password must consist of 8 characters'"
                v-model="password"
                ref="password"
            >New password</FormInput>
            <FormInput
                class="new-password-input"
                type="password"
                :typeValid="'confirmPassword'"
                placeholder="Re-enter Password"
                v-model="confirmPassword"
                :required="true"
                :messageError="'Passwords do not match, check the input'"
                @validInput="ConfirmPassword"
                ref="confirmInputBlock"
            >The password again</FormInput>
            <FormButton :class="['new-password-btn', {'disabled': !valid}]" @click="send">Save</FormButton>
        </div>
    </div>
</template>

<script>
import AuthTitle from '@/components/ui/AuthTitle'
import FormInput from '@/components/common/FormInput'
import FormButton from "@/components/common/FormButton"

export default {
    components: {
        FormInput,
        FormButton,
        AuthTitle
    },
    data: () => ({
        password: '',
        confirmPassword: '',
        valid: false
    }),
    methods: {
        passwordValid ({value, password}) {
            this.password = password
        },
        ConfirmPassword (value) {
            const confirmInput = this.$refs.confirmInputBlock

            if (confirmInput.value === this.password) {
                confirmInput.$el.classList.remove('error')
                this.valid = true
            } else {
                confirmInput.$el.classList.add('error')
                this.valid = false
            }
        },
        send () {
            if (this.valid) {
                this.$router.push({path: `/${this.$lang}/auth/login`})
            } else {
                for(let i = 0; i < 2; i++) {
                    this.$children[i].$el.classList.add('error')
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .new-password {
        &-input {
            margin-bottom: 25px;
            &:last-child {
                margin-bottom: 54px;
            }
        }
        &-btn {
            width: 360px;
            margin: 0 auto;
        }
    }
</style>