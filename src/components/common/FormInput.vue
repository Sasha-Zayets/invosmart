<template>
    <div class="input-wrapper" 
        :class="[
            {'readonly':readonly},
            {'mask': mask},
            {'error': this.$store.state.contacts.noValidError && required}
        ]" 
        ref="inputWrapper">
        <div class="header">
            <div class="header-content">
                <span>
                    <slot name="default"></slot>
                </span>
            </div>
        </div>
        <slot name="icon"></slot>
        <input 
            v-if="!mask"
            v-bind="$attrs"  
            @focus="addTheme"
            @blur="recomendationMessage ? passwordValid($event) : validFunction($event); removeTheme()" 
            @keydown.enter.prevent="recomendationMessage ? recomendationValid($event) : validFunction($event)"
            @keydown="recomendationMessage ? recomendationValid($event) : validFunction($event)"
            @keyup="recomendationMessage ? recomendationValid($event) : validFunction($event)"
            :readonly="readonly" 
            :value="value" 
            :placeholder="placeholder" handler
            v-on="inputListeners" 
            :mask="mask"
            ref="inputs"
        >
        <span class="error-message" v-if="showMessage">{{ messageError }}</span>
        <span class="recomendation" v-if="recomendationMessage">{{recomendationMessage}}</span>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    name: 'FormInput',
    props: {
        value: {
            type: [String, Number],
            default: ''
        }, 
        readonly: {
            type: Boolean
        },
        placeholder: {
            type: String,
            default: ''
        },
        mask: {
            type: String
        },
        required: {
            type: Boolean,
            default: false
        },
        typeValid: {
            type: String,
            default: ''
        },
        messageError: {
            type: String,
            default: 'Обязательное поле'
        },
        theme: {
            type: String,
            default: 'blue'
        },
        recomendationMessage: {
            type: String
        },
        showMessage: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        valueMask: '',
        valid: false,
        focus: false,
        blurValue: 0
    }),
    computed: {
        inputListeners() {
            let vm = this;

            return Object.assign(
                {},
                this.$listeners,
                {
                    input: event => vm.$emit('input', event.target.value)
                }
            )
        }
    },
    methods: {
        requiredValid (value) {
            const inputWrapper = this.$refs.inputWrapper

            if (value.length >= 1) {
                inputWrapper.classList.remove('error')
                this.$emit('validInput', {valid: true, value: value})
            } else {
                inputWrapper.classList.add('error')
                this.$emit('validInput', {valid: false, value: value})
            }
        },
        validPhone(phone) {
            return /^[\+][0-9]{2}?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone)
        },
        validMail (line) {
            return /\S+@\S+\.\S+/.test(line)
        },
        validFunction (event) {
            if (this.typeValid === 'default') {
                const val = event.target.value
                this.requiredValid(val)
            } else if (this.typeValid == 'email') {
                const inp = this.$refs.inputs
                
                if (this.blurValue === 0) {
                    inp.addEventListener('blur', () => {
                        if (this.validMail(this.value)) {
                            this.removeError()
                            this.$emit('validInput', {valid: true, value: this.value})
                        } else {
                            this.addError()
                            this.$emit('validInput', {valid: false, value: this.value})
                        }
                        this.blurValue++
                    })
                } else {
                    if (this.validMail(this.value)) {
                        this.removeError()
                        this.$emit('validInput', {valid: true, value: this.value})
                    } else {
                        this.addError()
                        this.$emit('validInput', {valid: false, value: this.value})
                    }
                }
            } else if (this.typeValid == 'password') {
                if (this.value.length < 8) {
                    this.addError()
                    this.$emit('validInput', {value: false, password: this.value})
                } else {
                    this.removeError()
                    this.$emit('validInput', {value: true, password: this.value})
                }
            } else if (this.typeValid == 'confirmPassword') {
                this.$emit('validInput', this.value)
            }
        },
        addError () {
            const inputWrapper = this.$refs.inputWrapper
            inputWrapper.classList.add('error')
        },
        removeError () {
            const inputWrapper = this.$refs.inputWrapper
            inputWrapper.classList.remove('error')
        },
        recomendationValid (event) {
            const input = event.target

            input.parentNode.classList.remove('error')
            if (this.value.length >= 8) {
                input.parentNode.classList.remove('recomendation')
            } else {
                input.parentNode.classList.add('recomendation')
            }
        },
        passwordValid (event) {
            if (this.value.length < 8) {
                this.addError()
                this.$emit('validInput', {value: false, password: this.value})
            } else {
                this.removeError()
                this.$emit('validInput', {value: true, password: this.value})
            }
        },
        addTheme () {
            const input = this.$refs.inputWrapper

            if (this.theme) {
                input.classList.add(this.theme)
                if (this.recomendationMessage) {
                    input.classList.add('recomendation')
                }
            }  
        },
        removeTheme () {
            const input = this.$refs.inputWrapper

            input.classList.remove(this.theme)
        }
    }
}
</script>

<style lang="scss" scoped>
.input-wrapper {
	border: 1px solid #C2CACD;
	border-radius: 6px;
	background-color: #FFFFFF;
    position: relative;
    padding: 0 25px;
    height: 40px;
    display: flex;
    align-items: center;
    &:before {
        content: "";
        position: absolute;
        top: 50%;
        right: 8px;
        width: 16px;
        height: 16px;
        transform: translateY(-50%);
        background-image: url('/assets/icons/warning.jpg');
        background-size: 16px 16px;
        background-size: contain;
        background-repeat: no-repeat;
        z-index: -1;
        opacity: 0;
        transition-duration: .3s;
    }
    &.blue {
        border: 1px solid #30A5E0;
        box-shadow: 0px 0px 4px #43B3EB;
        .header {
            span {
                color: #30A5E0;
            }
        }
    }
    .error-message {
        position: absolute;
        top: 100%;
        right: -13px;
        height: 30px;
        padding: 0 13px 0 14px;
        font-weight: 600;
        font-size: 11px;
        line-height: 16px;
        display: flex;
        align-items: center;
        color: #FFFFFF;
        background: #FC6180;
        border-radius: 6px;
        width: fit-content;
        &:before {
            content: "";
            width: 23px;
            height: 23px;
            position: absolute;
            right: 17.5px;
            top: -8px;
            background-image: url('/assets/icons/red-trk.svg');
            background-size: contain;
            z-index: 1;
            background-repeat: no-repeat;
        }
    }
    &.error {
        &:before {
            opacity: 1;
            z-index: 99;
        }
        border-color: #FC6180;
        input::placeholder {
            color: #FC6180;
        }
        .header-content {
            span {
                color: #FC6180;
            }
        }
        &:hover {
            .error-message {
                visibility: visible;
                opacity: 1;
            }
        }
        span.recomendation {
            opacity: 0 !important;
            visibility: hidden !important;
        }
    }
    &.recomendation {
        span.recomendation {
            visibility: visible;
            opacity: 1;
        }
    }
}

span.recomendation {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #30A5E0;
    position: absolute;
    left: 26px;
    bottom: -20px;
    visibility: hidden;
    opacity: 0;
    transition-duration: .5s;
}

.error-message {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #FC6180;
    visibility: hidden;
    opacity: 0;
    transition-duration: .5s;
}

.input-wrapper.readonly {
    opacity: .75;
}

.header {
    padding: 0px;
    position: absolute;
    top: -10px;
}

.header-content {
	color: #727779;
	font-size: 12px;
	font-weight: 500;
	line-height: 15px;
    position: relative;
    white-space: nowrap;
    padding: 0 4px;
    &::before {
        content: "";
        width: 100%;
        height: 50%;
        background-color: white;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
    }
    span {
        position: relative;
        z-index: 2; 
    }
}

input {
	color: #252932;
	font-size: 16px;
	font-weight: 500;
	line-height: 19px;
    border: none;
    box-shadow: none;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    padding: 0;
    height: 100%;
    background-color: transparent;
    &::placeholder {
        font-weight: 500;
        font-size: 16px;
        line-height: 38px;
        color: #979B9D;
        opacity: 1;
    }
    &:focus {
        &::placeholder {
            opacity: 0;
        }
    }
}
</style>
