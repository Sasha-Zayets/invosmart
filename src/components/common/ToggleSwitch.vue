<template>
    <div class="toggle-switch" :class="[{'disabled':disabled}, {'active': activeClass}]">
        <div class="block" ref="block" :style="{width: `calc((100% / ${options.length}) - 3px)`}"></div>
        <div 
            class="toggle-option" 
            :class="{active: i === 0}"
            v-for="(option, i) in options" 
            :key="i" 
            @click="animationActive($event, option)" 
            ref="option">
            <span>{{option.name}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ToggleSwitch',
    model: {
        event: 'change'
    },
    props: ['value', 'options', 'disabled'],
    data: () => ({
        activeClass: false
    }),
    methods: {
        animationActive (event, obj) {
            const activeElement = event.target,
                  options = this.$refs.option

            options.forEach(option => {
                option.classList.remove('active')
            })

            if (event.target.classList.contains('toggle-option')) {
                this.addPositionBlock(activeElement.offsetLeft)
                activeElement.classList.add('active')
            } else {
                this.addPositionBlock(activeElement.parentNode.offsetLeft)
                activeElement.parentNode.classList.add('active')
            }
            
            this.$emit('change', obj.value)
        },
        addPositionBlock (leftPosition) {
            const blocksBg = this.$refs.block

            blocksBg.style.left = leftPosition + 'px'
        }
    }
}
</script>

<style lang="scss" scoped>
.toggle-switch {
	border-radius: 6px;
    background-color: #fff;
    display: flex;
    height: 38px;
    padding: 3px;
    position: relative;
    &.active {
        .block {
            left: 50%;
        }
    }
    .block {
        height: calc(100% - 6px);
        background-color: #30A5E0;
        position: absolute;
        top: 3px;
        border-radius: 30px;
        z-index: 1;
        left: 3px;
        transition-duration: .5s;
    }
}

.toggle-switch.disabled {
    pointer-events: none;
    opacity: .75;
}

.toggle-option {
	border-radius: 6px;
	font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    padding: 5px 0;
    cursor: pointer;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #30A5E0;
    position: relative;
    z-index: 2;
}

.toggle-option.active {
    border-radius: 6px;	
    color: #fff;
}
</style>
