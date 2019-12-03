<template>
    <div class="notes-message" v-bind="$attrs" >
        <span class="add-note-icon-container">
            <svg class="add-note-icon">
                <use xlink:href="/assets/icons/sprite.svg#pensil-edit"></use>
            </svg>
        </span>
        <div class="notes-popup">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
}
</script>

<style lang="scss" scoped>
.notes-message {
    position: relative;
    display: none;
    text-align: right;
    width: auto;
    margin-left: auto;
    .add-note-icon-container {
        width: 16px;
        height: 16px;
        margin-left: 24px;
        display: flex;
        align-items: center;
        position: relative;
        &:before {
            content: "";
            width: 0;
            height: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            background-color: transparent;
            transition-duration: .3s;
            z-index: 1;
        }
        &:hover {
            &:before {
                width: 34px;
                height: 34px;
                background-color: #E9EAF0;
            }
            .add-note-icon {
                fill: #4C5457;
            }
            & + .notes-popup {
                animation: fadeIn .3s .3s forwards;
            }
        }
        &:active {
            &:before {
                width: 34px;
                height: 34px;
                background-color: #D8DAE3;
            }
            .add-note-icon {
                fill: #2E2F31;
            }
        }
    }
    .add-note-icon {
        width: 16px;
        height: 16px;
        fill: #818E94;
        position: relative;
        z-index: 2;
        transition-duration: .3s;
    }
    .notes-popup {
        height: 30px;
        min-width: 133px;
        padding: 0 13px;
        white-space: nowrap;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #3B4548;
        border-radius: 6px;
        font-family: Montserrat;
        font-weight: 600;
        font-size: 11px;
        line-height: 16px;
        color: #FFFFFF;
        position: absolute;
        top: calc(100% + 8px);
        right: -27px;
        opacity: 0;
        z-index: 999;
        visibility: hidden;
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        visibility: hidden;
    }
    100% {
        opacity: 1;
        visibility: visible;
    }
}
</style>