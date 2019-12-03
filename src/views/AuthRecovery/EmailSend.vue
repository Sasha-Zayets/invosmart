<template>
    <div class="email-send">
        <AuthTitle mb="35">Login to your account</AuthTitle>
        <div class="email-send-information">
           <span class="red"> Your account is not activated </span>
            <span class="green">
                A confirmation email has been sent to your email. To activate your account, click on the link in the message.
            </span>
        </div>
        <router-link :to="`/${$lang}/auth/login/`" class="email-send-link">
            <span class="hover-link">Back to Login</span>
        </router-link>
        <div class="email-send-frame">
            <img src="@/assets/images/confirm-email.svg" alt="">
        </div>
    </div>
</template>

<script>
import AuthTitle from '@/components/ui/AuthTitle'

export default {
    components: {
        AuthTitle
    }  
}
</script>

<style lang="scss" scoped>
.email-send {
    padding-bottom: 70px;
    &-information {
        font-size: 24px;
        line-height: 36px;
        text-align: center;
        margin-bottom: 28px;
        span {
            display: block;
            text-align: center;
            margin-bottom: 10px;
        }
        .red {
            font-weight: 600;
            color: #FC6180;
        }
        .green {
            color: block;
            font-size: 16px;
            line-height: 36px;
            font-weight: normal;
        }
    }
    &-link {
        display: block;
        text-align: center;
        margin-bottom: 55px;
        span {
            color: #4980FF;
            &:before {
                background-color: #4980FF;
            }
        }
    }
    img {
        max-width: 100%;
        object-fit: contain;
    }
}
</style>