<template>
  <div>
    <AuthTitle mb="47">Login to your account</AuthTitle>
    <form class="card-body" @submit.prevent="login">
      <div class="card-message" v-if="validError">
        <h2 class="card-message-title">Login or password is incorrect</h2>
        <p class="card-message-content">
          If you have forgotten your password, 
          <router-link :to="`/${$lang}/auth/password-recovery`">
            <span class="hover-link">click here.</span>
          </router-link>
        </p>
      </div>
      <FormInput
        class="login-input"
        type="email"
        :typeValid="'email'"
        :messageError="emailMessage"
        :required="true"
        :showMessage="showMsg"
        placeholder="Email"
        v-model="authData.email"
        @validInput="loginValidation"
      >Email</FormInput>
      <FormInput
        class="login-input login-input--last"
        :required="true"
        :typeValid="'password'"
        :messageError="passwordMessage"
        :showMessage="showMsg"
        type="password"
        placeholder="Password"
        v-model="authData.password"
        @keydown.enter="login"
        @validInput="passwordValidation"
      >Password</FormInput>

        <router-link class="login-forward-link" :to="`/${$lang}/auth/password-recovery/`">
           <span class="hover-link">
               Forgot password?
           </span>
        </router-link>
      <FormButton :class="['login-btn']">Log in</FormButton>
      <FormButton class="login-btn login-btn--auth-google">
        <svg class="icon-google">
          <use xlink:href="/assets/icons/sprite.svg#google" />
        </svg>
        Log in with Google
      </FormButton>
    </form>
    <p class="registration">
      <span class="registration-text">Don't have account ? </span>
      <router-link class="registration-link" :to="`/${$lang}/auth/registration`">
          <span class="hover-link">
          Let's start! It's free
          </span>
      </router-link>
    </p>
  </div>
</template>

<script>
import AuthTitle from '@/components/ui/AuthTitle'
import FormInput from "../components/common/FormInput"
import FormButton from "../components/common/FormButton"

export default {
  name: "Login",
  components: {
    FormInput,
    FormButton,
    AuthTitle
  },
  data() {
    return {
      authData: {
        email: "",
        password: ""
      },
      validEmail: false,
      validPassword: false,
      valid: false,
      validError: false,
      passwordMessage: 'Password is required.',
      emailMessage: 'Email is required.',
      showMsg: true
    };
  },
  mounted () {
    this.validForm()
  },
  methods: {
    login() {
      if (this.valid) {
        this.$store
          .dispatch("login", this.authData)
          .then(res => {
            this.$router.push({path: `/${this.$lang}/companies`})
          })
          .catch(err => {
            const codeError = err.response.data.result.appCode
            if (codeError === 4001) {
              this.validError = true
              this.showMsg = false
              for(let i = 1; i <= 2; i++) {
                this.$children[i].$el.classList.add('error')
              }
            } else if (codeError === 4007) {
              this.$router.push({path: `/${this.$lang}/auth/confirm-auth`})
            }
          })
      } else {
        for(let i = 1; i <= 2; i++) {
          this.$children[i].$el.classList.add('error')
        }
      }
    },
    loginValidation (value) {
        this.validEmail = value
        this.validForm()
    },
    passwordValidation ({value, password}) {
      this.validPassword = value
      this.validForm()
    },
    validForm () {
        if (this.validEmail && this.validPassword) {
          this.valid = true
        } else {
          this.valid= false
          this.showMsg = true
        }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/components/loginAndRegistration.scss";

.card-message {
  text-align: center;
  margin-bottom: 33px;
  &-title {
    font-weight: 600;
    font-size: 24px;
    line-height: 16px;
    color: #FC6180;
    display: inline-block;
    margin-bottom: 23px;
  }
  &-content {
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    color: #2E2F31;
    a {
      color: #2197D1;
    }
  }
}
</style>
