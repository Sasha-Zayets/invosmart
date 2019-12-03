<template>
    <div class="select-wrapper" :class="{'disabled':disabled}" v-bind="$attrs" ref="selects">
        <!--<div class="header">
            <div class="header-content"><slot name="default"></slot></div>
        </div>-->
        <select :value="indexIcon" ref="select">
            <option></option>
        </select>
        <div :class="['select', {'select-icon--true': icons}]"  @click="toggleShow">
            <div class="select-value">
                <div class="select-info">
                    <span>
                        <slot></slot>
                    </span>
                </div>
                <div class="select-value-show" ref="showValue">
                    <span>
                        <span v-if="icons" class="select-icon">
                            <img 
                                :src="`/assets/icons/flags/${listElement[indexIcon].code}.png`" 
                                class="select-icon-value"/>
                        </span>
                        <span class="text">{{listElement[indexIcon].name}}</span>
                    </span>
                </div>
            </div>
            <div 
                :class="['select-container', {'priority': priority}, {'checked': checkedIcon}]" 
                :style="{'height' : `${(showCount * 40) + 6}px`}" 
                ref="selectContainer"
                data-simplebar
                data-simplebar-auto-hide="false">
                <div 
                    v-for="(item, index) in listElement" 
                    :key="index" 
                    :class="['select-element',
                        {'select-element--active': listElement[0].name === item.name},
                    ]" 
                    @click="selectValue($event, item, index)">
                    <span v-if="icons" class="select-icon">
                        <img :src="`/assets/icons/flags/${item.code}.png`" class="select-icon-value"/>
                    </span>
                    {{item.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    name: 'FormSelect',
    props: {
        defaultIndex: {
            type: [Number, String],
            default: 0
        },
        items: {
            type: Array,
            default: []
        },
        disabled: Boolean,
        icons: {
            type: Boolean,
            default: false
        },
        showCount: {
            type: Number,
            default: 3
        },
        priority: {
            type: Boolean,
            default: false
        },
        priorityList: {
            type: Array
        },
        checkedIcon: {
            type: Boolean,
            default: false
        }
    },
    created () {
        this.indexIcon = this.values

        let temp = []
        
        if (this.priority) {
            this.listElement = temp.concat(this.priorityList, this.items)
            this.indexIcon = this.values + this.priorityList.length
        } else {
            this.listElement = temp.concat(this.items)
        }
    },
    computed: {
        values () {
            let temp = Number(this.defaultIndex)
            return temp
        },
    },
    data: () => ({
        listElement: [],
    }),
    methods: {
        toggleShow () {
            const container = this.$refs.selectContainer,
                  host = this.$refs.selects

            container.classList.toggle('active')
            host.classList.toggle('open')
        },
        selectValue (event, element, index) {
            const childrenElement = this.$refs.selectContainer.querySelector('.select-element--active')

            this.showValue = this.$refs.showValue.querySelector('.text')

            childrenElement.classList.remove('select-element--active')
            event.target.classList.add('select-element--active')

            this.$refs.select.value = element.id
            this.indexIcon = index

            this.showValue.innerHTML = element.name
            this.$emit('newValue', element.id)
        },
        reset () {
            this.$refs.select.value = 0
            this.indexIcon = 0

            this.showValue.innerHTML = this.listElement[0].name
            this.$emit('newValue', 0)
        }
    }
}
</script>

<style lang="scss" scoped>
.simple-content-wrapper {
    overflow: auto !important;
}
.select-wrapper {
    &.open {
        position: relative;
        z-index: 9999;
    }
    &.form-select {
        .select {
            .select-value:before {
                width: 14px;
                height: 7px;
            }
        }
    }
}

.select-wrapper select {
    display: none;
}

.select {
    position: relative;
    min-width: 280px;
    height: 40px;
    &-icon {
        margin-right: 13px;
        display: flex;
        align-items: center;
        &-value {
            width: 24px;
            height: 24px;
        }
        &--true {
            .select-element {
                display: flex;
                align-items: center;
            }
            .select-value-show {
                > span {
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
    &-value {
        cursor: pointer;
        background-color: #FFFFFF;
        position: relative;
        padding: 0 25px;
        height: 100%;
        display: flex;
        align-items: center;
        border: 1px solid #C2CACD;
        box-sizing: border-box;
        border-radius: 6px;
        position: relative;
        width: 100%;
        z-index: 5;
        &:before {
            content: "";
            width: 13px;
            height: 8px;
            background-image: url('../../assets/icons/arrow.svg');
            background-size: contain;
            background-repeat: no-repeat;
            position: absolute;
            right: 25px;
            top: 50%;
            transform: translateY(-50%);
        }
        &-show {
            font-weight: 500;
            font-size: 16px;
            line-height: 19px;
            color: #252932;
        }
    }
    &-container {
        opacity: 0;
        //overflow: hidden;
        z-index: -1;
        position: absolute;
        top: 38px;
        padding-top: 5px;
        padding-bottom: 3px;
        left: 0;
        background: #F5F6FA;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
        border-radius: 6px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        width: 100%;
        transition-duration: .3s;
        &.priority {
            .select-element:nth-child(4) {
                border-bottom: 1px dashed black;
            }
        }
        &.active {
            visibility: visible;
            z-index: 4;
            opacity: 1;
        }
        &.checked {
            .select-element {
                position: relative;
                &--active {
                    &:before {
                        content: "";
                        background-image: url('/assets/icons/check.svg');
                        background-size: 100%;
                        width: 9px;
                        height: 6px;
                        position: absolute;
                        top: 50%;
                        left: 9px;
                        transform: translateY(-50%);
                    }
                }
            }
        }
    }
    &-element {
        width: 100%;
        padding: 10px 26px;
        font-size: 16px;
        line-height: 19px;
        color: black;
        transition-duration: .3s;
        cursor: pointer;
        height: 38px;
        &:hover {
            background: #FFFFFF;
            color: #252932;
        }
        &--active {
            background: #FFFFFF;
            color: #252932;
        }
    }
    &-info {
        position: absolute;
        left: 22px;
        top: -8px;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        color: #727779;
        z-index: 3;
        padding: 0 4px;
        &:before {
            content: "";
            width: 100%;
            height: 50%;
            position: absolute;
            bottom: 1px;    
            left: 0;
            background-color: white;
            z-index: 2;
        }
        span {
            position: relative;
            z-index: 4;
        }
    }
}

.select-wrapper.disabled {
    //opacity: .75;
}

.header {
    position: absolute;
    border-bottom: 1px solid #fff;
    padding: 0 5px;
    top: -12px;
}

.header-content {
	color: #727779;
	font-size: 12px;
	font-weight: 500;
	line-height: 15px;
    margin-bottom: -4px
}

select {
    background: transparent;
}

select, option {
	color: #252932;
	font-size: 15px;
	font-weight: 500;
	line-height: 19px !important;
    border: none;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    padding: 0;
    resize: none;
    height: 19px;
}

i {
    line-height: 19px;
    font-size: 19px;
    color: #5E6D84;
    margin-right: 5px;
}

@function w($value) {
    @return ($value*100vw)/1572
};

@media (min-width: 1300px) and (max-width: 1572px) {
    .select {
        min-width: w(280);
        height: w(50);
        font-size: w(16);
        &-info {
            font-size: w(12);
        }
        &-container {
            padding-top: w(60);
        }
        &-element {
            font-size: w(16);
            padding: w(10) w(26);
        }
    }
} 
</style>
