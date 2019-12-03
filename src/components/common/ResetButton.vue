<template>
    <button class="reset-filter" v-bind="$attrs" v-on="$listeners">
        <slot name="icon"></slot>
        <slot></slot>
    </button>
</template>

<script>
export default {
    inheritAttrs: false,
}
</script>

<style lang="scss" scoped>
.reset-filter {
	border: 2px solid #C2CACD;
    box-shadow: 3px 1px 4px rgba(220, 224, 227, 0.25);
	border-radius: 6px;
	color: #252932;
	font-size: 16px;
	font-weight: 500;
	line-height: 19px;
    padding: 0 21px;
    height: 40px;
    justify-content: center;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition-duration: .3s;
    position: relative;
    overflow: hidden;
    transition-duration: .5s;
    opacity: 1;
    background-color: transparent;
    &:focus, &:active {
        outline: none;
    }
    &:before {
        content: "";
        height: 100%;
        background-color: #C2CACD;
        width: 0%;
        transition-duration: .5s;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
    }
    &:hover {
        &:before {
            width: 100%;
        }
    }
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 5px;
      height: 5px;
      background: rgba(255, 255, 255, .5);
      opacity: 0;
      z-index: 2;
      border-radius: 100%;
      transform: scale(1, 1) translate(-50%);
      transform-origin: 50% 50%;
    }

    @keyframes ripple {
      0% {
        transform: scale(0, 0);
        opacity: 1;
      }
      20% {
        transform: scale(25, 25);
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: scale(40, 40);
      }
    }
    &:focus:not(:active)::after {
      animation: ripple 1s ease-out;
    }
    svg {
        fill: #818E94;
        width: 20px;
        height: 20px;
        position: relative;
        z-index: 3;
        margin-right: 8px;
    }
    span {
        position: relative;
        z-index: 3;
    }
    
}
</style>