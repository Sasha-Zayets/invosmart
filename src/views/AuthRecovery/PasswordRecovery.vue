<template>
    <div class="recovery">
        <AuthTitle mb="56" class="recovery-title">Password recovery</AuthTitle>
        <form @sumbit.prevent="send" class="recovery-form" v-if="!showResultBlock">
            <FormInput
                class="recovery-input"
                type="email"
                :typeValid="'email'"
                :messageError="'Email is required.'"
                :required="true"
                :theme="'blue'"
                placeholder="Email"
                v-model="email"
                ref="emailInput"
                @keydown.enter="send"
                @validInput="emailValid"
            >Email</FormInput>
            <span class="recovery-label">Enter your email, we will send password recovery data to it</span>
            <FormButton class="recovery-btn" @click.prevent="send">Send</FormButton>
            <router-link :to="`/${$lang}/auth/login`" class="recovery-link">
                <span class="hover-link">Click to return Login</span>
            </router-link>
        </form>

        <div class="recovery-feedback" v-else>
            <h2 class="green-title">Password reset email sent</h2>
            <p class="recovery-content">
                An email has been sent to your email addres 
                <strong> {{email}} </strong>
                Follow the link in the email to reset your password.
            </p>
            <router-link :to="`/${$lang}/auth/login/`">
                <FormButton class="recovery-btn">Done</FormButton>
            </router-link>
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
        email: '',
        valid: false,
        showResultBlock: false
    }),
    methods: {
        emailValid (value) {
            if (value) {
                this.valid = true
            } else {
                this.valid = false
            }
        },
        send () {
            if (this.valid) {
                this.showResultBlock = true
            } else {
                const input = this.$refs.emailInput

                input.$el.classList.add('error')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.recovery {
    padding-bottom: 150px;
    &-title {
        margin-top: 28px;
    }
    &-input {
        margin-bottom: 31px;
    }
    &-label {
        font-size: 16px;
        line-height: 24px;
        color: #2E2F31;
        display: inline-block;
        margin-bottom: 54px;
    }
    &-btn {
        width: 360px;
        margin: 0 auto;
    }
    &-link {
        margin-top: 20px;
        display: block;
        text-align: center;
        text-decoration: none;
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        text-decoration: none;
        color: #4980FF;
    }
    &-content {
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        text-align: center;
        color: #2E2F31;
        margin-bottom: 39px;
        strong {
            display: block;
        }
    }
}

.green-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
    text-align: center;
    color: #1BA261;
    margin-bottom: 10px;
}
</style>