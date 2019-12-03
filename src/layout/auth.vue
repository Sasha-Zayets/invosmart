<template>
    <div class="login">
        <div class="login-form">
            <div class="login-logo">
                <img src="@/assets/images/logo.png" alt="logo">
            </div>
            <router-view></router-view>
        </div>
        <div class="login-slider">
            <div class="slider swiper-container" ref="loginSlider">
                <div class="swiper-wrapper">
                    <!-- slides -->
                    <div class="swiper-slide">
                        <h2 class="slider-title">Create invoices quickly and easily.</h2>
                        <p class="slider-content">
                            InvoSmart simplifies online invoicing and billing 
                            for freelancers and small business owners.
                        </p>
                        <p class="slider-content">
                            Spend more time on growing your business 
                            and less time on sending bills.
                        </p>
                    </div>
                    <div class="swiper-slide">
                        <h2 class="slider-title">Create invoices quickly and easily.2</h2>
                        <p class="slider-content">
                            InvoSmart simplifies online invoicing and billing 
                            for freelancers and small business owners.
                        </p>
                        <p class="slider-content">
                            Spend more time on growing your business 
                            and less time on sending bills.
                        </p>
                    </div>
                    <div class="swiper-slide">
                        <h2 class="slider-title">Create invoices quickly and easily.</h2>
                        <p class="slider-content">
                            InvoSmart simplifies online invoicing and billing 
                            for freelancers and small business owners.
                        </p>
                        <p class="slider-content">
                            Spend more time on growing your business 
                            and less time on sending bills.
                        </p>3
                    </div>
                </div>
                <div class="swiper-pagination"  slot="pagination"></div>
            </div>
        </div>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'

import Swiper from 'swiper'
export default {
    name: 'Auth',
    mounted () {
        const slider = this.$refs.loginSlider

        var swiper = new Swiper(slider, {
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            loop: true,
            speed: 500,
            //autoplay: {delay: 3000}
        })
    }
}
</script>

<style lang="scss" scoped>
.login {
    display: flex;
    background-color: white;
    min-height: 100vh;
    &-form {
        padding: 69px 49px 0 75px;
        width: 558px;
    }
    &-logo {
        display: flex;
        justify-content: center;
        margin-bottom: 31px;
    }
    &-title {
        font-weight: 600;
        font-size: 34px;
        line-height: 34px;
        color: #2E2F31;
        margin-bottom: 47px;
        text-align: center;
    }
    &-input {
        margin-bottom: 57px;
        &--last {
            margin-bottom: 26px;
        }
    }
    &-forward-link {
        display: block;
        max-width: 338px;
        margin: 0 auto;
        font-weight: 500;
        font-size: 14px;
        line-height: 12px;
        text-align: right;
        text-decoration-line: underline;
        color: #2EA4DE;
        margin-bottom: 40px;
    }
    &-slider {
        flex-grow: 2;
    }
    
    &-btn {
        border-radius: 6px;
        width: 360px;
        height: 60px;
        margin: 0 auto 20px auto;
        &--auth-google {
            background-color: white;
            color: #30A5E0;
            margin-bottom: 42px;
            padding: 0;
            .icon-google {
                width: 24px;
                height: 24px;
                margin-right: 10px;
            }
        }
    }
    .registration {
        margin-top: 0;
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        text-align: center;
        &-text {
            color: #2E2F31;
        }
        &-link {
            font-weight: 500;
            font-size: 16px;
            line-height: 16px;
            color: #2EA4DE;
            text-decoration: underline;
        }
    }

    // right block
    &-slider {
        padding-left: 103px;
        padding-top: 204px;
        background-image: url('/assets/images/invosmart.jpg');
        background-size: cover;
    }
}
// block slider 
.slider {
    max-width: 490px;
    margin: initial;
    &-title {
        font-weight: 600;
        font-size: 44px;
        line-height: 52px;
        color: #FFFFFF;
        margin-bottom: 25px;
    }
    &-content {
        font-weight: 500;
        font-size: 22px;
        line-height: 33px;
        color: #FFFFFF;
        opacity: 0.8;
        margin-bottom: 30px;
        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
