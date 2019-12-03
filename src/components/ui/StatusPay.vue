<template>
    <div class="status">
        <div :class="[getClass]">
            <slot>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        status: {
            type: String,
            default: 'no-paint'
        }
    },
    computed: {
        getClass () {
            return `status-${this.status}`
        }
    }
}
</script>

<style lang="scss">
    .status {
        &-no-paint {
            font-weight: 600;
            font-size: 15px;
            line-height: 19px;
            color: #FC6180;
        }
        &-paid {
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #1BA261;
            border-radius: 6px;
            font-weight: 600;
            font-size: 15px;
            line-height: 19px;
            color: #FFFFFF;
        }
        &-draft {
            font-size: 15px;
            line-height: 19px;
            color: #818E94;
        }
    }
</style>