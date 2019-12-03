<template>
    <modal class="v--modal-info" :name="name" :adaptive="adaptive" :width="width" :height="height" 
    @before-open="$emit('before-open', $event)" 
    @before-close="$emit('before-close', $event)" 
    @closed="$emit('closed')">
        <div class="entry-wrapper">
            <div class="content">
                <slot name="content"></slot>
            </div>
        </div>
    </modal>
</template>

<script>
import ControlWrapper from './ControlWrapper'

export default {
    name: 'ModalWindow',
    props: {
        name: String,
        fullscreen: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        ControlWrapper
    },
    computed: {
        width() {
            return this.fullscreen ? '95%' : 900;
        },
        height() {
            return this.fullscreen ? '95%' : 'auto';
        },
        adaptive() {
            return this.fullscreen;
        }
    }
}
</script>

<style lang="scss" scoped>
.entry-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.content {
    background-color: #F5F6FA;
    padding: 20px;
    flex: 1;
}

.footer {
    background-color: #fff;
    padding: 15px 20px;
}

</style>
