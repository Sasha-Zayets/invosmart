<template>
    <div class="controls-button" v-on="$listeners">
        <svg class="icon" v-if="iconName" :style="setStyleIcon">
            <use :xlink:href="`/assets/icons/sprite.svg#${iconName}`"></use>
        </svg>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ControlsButton',
    props: {
        iconName: {
            type: String
        },
        sizeIcon: {
            type: Number,
            default: 20
        },
        fillIcon: {
            type: String,
            default: '#fff'
        }
    },
    computed: {
        setStyleIcon () {
            return {
                width: `${this.sizeIcon}px`,
                height: `${this.sizeIcon}px`,
                fill: this.fillIcon
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.controls-button {
	background: #30A5E0;
    box-shadow: 3px 1px 4px rgba(48, 165, 224, 0.25);
    border-radius: 60px;
	color: #fff;
	font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    padding: 0 31px;
    //width: 250px;
    height: 60px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition-duration: .5s;

    .icon {
        margin-right: 12px;
    }

    &:active {
      background: #0689C9;
      background-size: 100%;
    }
}

.controls-button:hover {
    background: #2197D1;
}

@function w($value) {
    @return ($value*100vw)/1572
};

@media (min-width: 1300px) and (max-width: 1572px) {
    .controls-button {
        justify-content: center;
        padding: 0;
        width: w(250);
        height: w(50);
        font-size: w(18);
    }  
}
</style>
