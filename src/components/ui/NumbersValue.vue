<template>
    <div class="numbers-value">
        <div class="numbers-value-count">
            <slot name=number></slot>
        </div>
        <div class="numbers-value-description">
            <slot name="description"></slot>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.numbers-value {
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 45px;
    background: #F5F6FA;
    &-count {
        font-weight: 800;
        font-size: 36px;
        color: #2E2F31;
        margin-bottom: 5px;
    }
    &-description {
        font-size: 14px;
        color: #727779;
    }
}
</style>
