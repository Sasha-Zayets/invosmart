<template>
    <div class="textarea-wrapper" :class="{'readonly':readonly}">
        <div class="header">
            <div class="header-content"><slot name="default"></slot></div>
        </div>
        <textarea :readonly="readonly" :value="value" v-on="inputListeners" v-bind="$attrs"></textarea>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    name: 'FormTextarea',
    model: {
        event: 'change'
    },
    props: ['value', 'readonly'],
    computed: {
        inputListeners() {
            let vm = this;

            return Object.assign(
                {},
                this.$listeners,
                {
                    change: event => vm.$emit('change', event.target.value)
                }
            )
        }
    }
}
</script>

<style scoped>
.textarea-wrapper {
	border: 1px solid #C2CACD;
	border-radius: 6px;
	background-color: #FFFFFF;
    position: relative;
    padding: 10px;
    display: flex;
    align-items: center;
}

.textarea-wrapper.readonly {
    opacity: .75;
}

.header {
    position: absolute;
    border-bottom: 1px solid #fff;
    padding: 0 5px;
    top: -12px;
}

.header-content {
	color: #727779;
	font-size: 12px;
	font-weight: 500;
	line-height: 15px;
    margin-bottom: -4px
}

textarea {
	color: #252932;
	font-size: 15px;
	font-weight: 500;
	line-height: 19px;
    border: none;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    padding: 0;
    resize: none;
}
</style>
