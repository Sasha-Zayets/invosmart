<template>
    <div class="message">
        <span class="message-container">
            <svg class="icon">
                <use xlink:href="/assets/icons/sprite.svg#delete-icon"></use>
            </svg>
        </span>
        <div class="message-remove">
            Удалить контакт
        </div>
    </div>
</template>

<style lang="scss" scoped>
.message {
    position: relative;
    display: none;
    &-container {
        width: 14px;
        height: 16px;
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
            & + .message-remove {
                animation: fadeIn .3s .3s forwards;
            }
            .icon {
                fill: #FC6180;
            }
        }
        &:active {
            &:before {
                background-color: #D8DAE3;
            }
            .icon {
                fill: #2E2F31;
            }
        }
    }
    .icon {
        fill: #818E94;
        width: 14px;
        height: 16px;
        position: relative;
        z-index: 2;
    }

    .message-remove {
        min-width: 123px;
        background: #3B4548;
        border-radius: 6px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Montserrat;
        font-weight: 600;
        font-size: 11px;
        line-height: 16px;
        color: #FFFFFF;
        position: absolute;
        top: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
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