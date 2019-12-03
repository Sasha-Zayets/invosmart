<template>
    <div class="card">
        <div class="card-header">
            <slot name="header"></slot>
        </div>
        <div class="card-content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
}
</script>

<style scoped>
.card {
    border-radius: 6px;
    overflow: hidden;
    margin-top: 30px;
    background-color: #fff;
}

.card-header {
    font-size: 1.2rem;
    text-align: center;
    padding: 15px;
    background-color: #30A5E0;
    color: #fff;
    font-weight: 500;
}
</style>
