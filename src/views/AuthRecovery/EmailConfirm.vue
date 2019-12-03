<template>
    <div class="email-confirm">
        <AuthTitle mb="40">Email confirmation</AuthTitle>
        <div class="email-send-information">
            <span class="email-confirm-green">A confirmation email has been sent to your email</span>
            <span class="green">To activate your account, click on the link in the message</span>
        </div>
        <router-link :to='`/${$lang}/auth/login/`'>
            <FormButton class="email-confirm-button">Done</FormButton>
        </router-link>
        <div class="email-send-frame">
            <img src="@/assets/images/confirm-email.svg" alt="">
        </div>
    </div>
</template>

<script>
import AuthTitle from '@/components/ui/AuthTitle'
import FormButton from '@/components/common/FormButton'

export default {
    components: {
        AuthTitle,
        FormButton
    }
}
</script>

<style lang="scss" scoped>
.email-confirm {
    &-green {
        display: block;
        font-weight: 500;
        font-size: 24px;
        line-height: 36px;
        text-align: center;
        color: #1BA261;
        margin-bottom: 5px;
    }
    .green {
        color: black;
        font-size: 16px;
        display: block;
        text-align: center;
        margin-bottom: 28px;
    }
    &-button {
        margin: 0 auto 40px auto;
        width: 360px;
    }
}
.email-send {
    img {
        max-width: 100%;
        object-fit: contain;
    }
}
</style>