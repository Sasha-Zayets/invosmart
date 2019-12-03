<template>
    <div class="confirmation">
        <div v-if="!valid">
            <AuthTitle mb="46">Login to your account</AuthTitle>
            <div class="info">
                <span class="red">
                    Confirmation link has already been used or expired
                </span>
                <span class="info-content">
                    <router-link :to="`/${$lang}/auth/login`">
                    <span class="hover-link">Log in</span>
                    </router-link> 
                    or repeat the registration process
                </span>
                <div class="info-link">
                    <router-link :to="`/${$lang}/auth/login`">
                    <span class="hover-link">Log in</span>
                    </router-link> 
                    <span>or</span>
                    <router-link :to="`/${$lang}/auth/registration`">
                    <span class="hover-link">Sign Up</span>
                    </router-link> 
                </div>
                <FormButton class="login-btn login-btn--auth-google">
                    <svg class="icon-google">
                        <use xlink:href="/assets/icons/sprite.svg#google" />
                    </svg>
                    Log in with Google
                </FormButton>
            </div>
        </div>

       <div class="email-verify" v-else>
            <div class="email-verify-check">
                <img src="@/assets/images/tick-inside-circle.svg" alt="">
            </div>
            <h2 class="email-verify-title">Your email is verified</h2>
            <span class="email-verify-description">
                Have a nice work
            </span>
            <router-link :to="`/${$lang}/auth/login/`">
                <FormButton class="login-btn">Войти</FormButton>
            </router-link>
            <FormButton class="login-btn login-btn--auth-google">
                <svg class="icon-google">
                    <use xlink:href="/assets/icons/sprite.svg#google" />
                </svg>
                Log in with Google
            </FormButton>
        </div>
    </div>
</template>

<script>
import AuthTitle from '@/components/ui/AuthTitle'
import FormButton from "@/components/common/FormButton"

export default {
    components: {
        AuthTitle,
        FormButton
    },
    data: () => ({
        valid: false
    }),
    mounted () {
        const token = this.$route.query.token

        this.$store.dispatch('validTokens', token)
            .then(data => {
                this.valid = true
            })
    }
}
</script>

<style lang="scss" scoped>
.info {
    text-align: center;
    .red {
        font-weight: 600;
        font-size: 24px;
        line-height: 36px;
        color: #FC6180;
        display: inline-block;
        margin-bottom: 5px;
    }
    &-content, &-link {
        color: black;
        font-size: 16px;
        display: inline-block;
    }
    &-content {
        margin-bottom: 46px;
    }
    &-link {
        margin-bottom: 33px;
        span {
            margin: 0 3px;
        }
    }
    a {
        color: #4980FF;
        span {
            &:before {
                background-color: #4980FF;
            }
        }
    }
}

.email-verify {
    margin-top: 78px;
    &-check {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
    }
    &-title {
        font-weight: bold;
        font-size: 24px;
        text-align: center;
        color: #1BA261;
        margin-bottom: 15px;
    }
    &-description {
        font-size: 16px;
        display: block;
        text-align: center;
        margin-bottom: 97px;
    }
}
a {
    text-decoration: none;
}
@import "@/assets/css/components/loginAndRegistration.scss";
</style>