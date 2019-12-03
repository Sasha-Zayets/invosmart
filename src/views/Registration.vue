<template>
  <div class="auth-registration">
    <AuthTitle mb="47">Account registration</AuthTitle>
    <form class="card-body" @submit.prevent="register" ref="forms">
      <div class="login-input-group">
        <FormInput
          class="login-input"
          type="text"
          placeholder="First name"
          :required="true"
          :messageError="'First name is required.'"
          :typeValid="'default'"
          @validInput="firstNameValid"
          v-model="authData.first_name"
          data-ref="firstName"
        >First name</FormInput>
        <FormInput
          class="login-input"
          type="text"
          placeholder="Family name"
          :required="true"
          :messageError="'Family name is required.'"
          :typeValid="'default'"
          @validInput="familyNameValid"
          v-model="authData.family_name"
          data-ref="familyName"
        >Family name</FormInput>
      </div>
      <FormInput
        class="login-input"
        type="email"
        placeholder="Email"
        :required="true"
        :typeValid="'email'"
        @validInput="emailValid"
        :messageError="emailMessage"
        v-model="authData.email"
        data-ref="email"
      >Email</FormInput>
      <FormInput
        class="login-input"
        type="password"
        placeholder="Password"
        :required="true"
        :typeValid="'password'"
        @validInput="passwordValid"
        :messageError="passwordMessage"
        :recomendationMessage="'Password must be greater than 8 characters'"
        v-model="authData.password"
        data-ref="password"
      >Password</FormInput>

      <FormInput
        class="login-input login-input--last"
        type="password"
        :typeValid="'confirmPassword'"
        placeholder="Confirm password"
        v-model="authData.confirm"
        :required="true"
        :messageError="'Passwords do not match, check the input'"
        @validInput="ConfirmPassword"
        ref="confirmInputBlock"
        data-ref="confirmPassword"
        @keyup.enter="register"
      >Confirm password</FormInput>

      <FormSelect 
        v-if="$store.getters.indexCountries"
        class="form-select" 
        :showCount="6" 
        :items="countries" 
        :icons="true" 
        :langIcon="true" 
        :priority="true"
        :priorityList="$store.getters.priorityCountries"
        @newValue="countriesUser"
        :defaultIndex="$store.getters.indexCountries">Choose a country</FormSelect>
      <FormSelect 
        class="form-select" 
        :items="languages" 
        :defaultIndex="0"
        @newValue="langUser">Choose a language</FormSelect>

      <FormButton :class="['login-btn']" @click.prevent="register">Sign up</FormButton>
      <FormButton class="login-btn login-btn--auth-google">
        <svg class="icon-google">
          <use xlink:href="/assets/icons/sprite.svg#google" />
        </svg>
        Sign up with Google
      </FormButton>
    </form>
    <p class="registration">
      <span class="registration-text">Already have an account? </span>
      <router-link class="registration-link" :to="`/${$lang}/auth/login`">
        <span class="hover-link">Click to enter</span>
      </router-link>
    </p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import AuthTitle from '@/components/ui/AuthTitle'
import FormInput from "@/components/common/FormInput"
import FormButton from "@/components/common/FormButton"
import FormSelect from '@/components/common/FormSelect'

export default {
  name: "Registration",
  components: {
    FormInput,
    FormButton,
    AuthTitle,
    FormSelect
  },
  data() {
    return {
      authData: {
        company: '',
        first_name: '',
        family_name: '',
        email: '',
        password: '',
        country: 0,
        lang: 0
      },
      validateForm: {
        first_name: false,
        family_name: false,
        email: false,
        password: false,
        confirmPassword: false
      },
      passwordMessage: 'The password must consist of 8 characters',
      emailMessage: 'Email is required.',
    };
  },
  computed: mapGetters(['countries', 'languages']),
  methods: {
    update(key, value) {
      this.validate()
      this.$emit('input', { ...this.authData, [key]: value})
    },
    register() {
      this.validate()
      let vm = this

      if (this.$store.state.account.registrationValid) {
        vm.$http({
            method: 'post',
            url: `http://invosmart.com:5005/api/v1/registration`,
            headers: {
                contentType: 'application/json; charset=utf-8',
            },
            data: vm.authData
        })
        .then(res => vm.$router.push({path: `/${this.$lang}/auth/email-confirm/`}))
        .catch(err => {
          console.log(err.response)
          
          const codeError = err.response.data.result.appCode

          if (codeError === 4005) {
            this.emailMessage = err.response.data.result.messages[0]

            const emailInput = this.$refs.forms.querySelector('[data-ref="email"]')
            emailInput.parentNode.classList.add('error')
          }
        })
      } else {
        this.sendValidate()
      }
    },
    firstNameValid (value) {
      this.validate()
      this.validateForm.first_name = value
    },
    familyNameValid (value) {
      this.validate()
      this.validateForm.family_name = value
    },
    emailValid ({valid ,value}) {
      if (value.length === 0) {
        this.emailMessage = 'Email is required.'
      } else {
        this.emailMessage = 'An account with this email already exists.'
      }

      this.validate()
      this.validateForm.email = valid

    },
    passwordValid ({value, password}) {
      this.validate()
      this.validateForm.password = value
      this.authData.password = password

      if(password.indexOf(this.authData.email) === 0) {
        const forms = this.$refs.forms,
              password = forms.querySelector('[data-ref="password"]')
        
        // add error class
        this.addClass(password.parentNode, 'error')

        // add new value message
        this.passwordMessage = 'Your password can’t contain your email address.'
        this.validateForm.password = false
      } else {
        this.passwordMessage = 'The password must consist of 8 characters'
      }
    },
    ConfirmPassword (value) {
      const confirmInput = this.$refs.confirmInputBlock.$el  

      this.validate()

      if (value == this.authData.password) {
        this.validateForm.confirmPassword = true
        confirmInput.classList.remove('error')
      } else {
        const label = confirmInput.querySelector('.error-message')

        label.style.display = 'block'
        this.validateForm.confirmPassword = false
        confirmInput.classList.add('error')
      }
    },
    countriesUser (value) {
      this.authData.country = value
    },
    langUser (value) {
      console.log(value)
      
      this.authData.lang = value
    },
    validate () {
      let result = Object.values(this.validateForm)

      if(result.includes(false)) {
        this.$store.commit('setRegistrationValid', false)
      } else {
        this.$store.commit('setRegistrationValid', true)
      }
    },
    sendValidate () {
      let temp
      for (let key in this.validateForm) {
        if (!this.validateForm[key]) {
          temp = document.querySelector(`[data-ref="${key}"]`)
          if (!!temp) {
            temp.parentNode.classList.add('error')
            if (key === 'confirmPassword') {
              const password = document.querySelector('[data-ref="password"]')

              if (password.parentNode.classList.contains('error')) {
                temp.nextElementSibling.style.display = 'none'
              }
            }
          }          
        }
      }
    },
    addClass(element, nameClass) {
      element.classList.add(nameClass)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/components/loginAndRegistration.scss";

.login-input-group {
  display: flex;
  justify-content: space-between;
  .login-input {
    width: calc(50% - 7px);
  }
}
.form-select {
  margin-bottom: 28px;
}
.login-btn.disabled {
    //pointer-events: none;
}
</style>
