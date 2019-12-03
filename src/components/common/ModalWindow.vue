<template>
    <modal :name="name" :adaptive="adaptive" :clickToClose="false" :width="width" :height="height" 
    @before-open="$emit('before-open', $event)" 
    @before-close="$emit('before-close', $event)" 
    @closed="$emit('closed')">
        <div class="entry-wrapper">
            <div class="header">
                <span class="header-text">
                    <slot name="header"></slot>
                </span>
                <ControlWrapper>
                    <svg class="icon-close" @click="$modal.hide(name)">
                        <use xlink:href="/assets/icons/sprite.svg#close"></use>
                    </svg>
                </ControlWrapper>
            </div>
            <div class="content">
                <slot name="content"></slot>
            </div>
            <div class="footer">
                <slot name="footer"></slot>
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

<style scoped>
.entry-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.modal-wnd {
	border-radius: 6px !important;
	background-color: #fff !important;
	box-shadow: 0 10px 20px 0 rgba(0,0,0,0.2);
}

.icon-close {
    width: 12px;
    height: 12px;
    fill: #818E94;
    cursor: pointer;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 24px;
    height: 56px;
    background-color: white;
    position: relative;
}

.header-text {
	color: #252932;
	font-size: 18px;
	font-weight: 600;
	line-height: 22px;
}

.content {
    background-color: #F5F6FA;
    padding: 26px 40px;
    flex: 1;
}

.footer {
    background-color: transparent;
    padding: 8px 40px 24px 0;
}

</style>
