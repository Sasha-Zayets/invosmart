<template>
   <div class="dropdown">
        <div class="dropdown-value" @click="toggleOpen($event)" ref="valueDrop">
            {{ list[0].name }}
        </div>
        <div class="dropdown-show-block">
            <div
                v-for="(item, index) in list" 
                :key="index"
                :class="['dropdown-element',
                    {'active': item.value === 0}
                ]"
                ref="dropdownElement"
                :data-value="item.value"
                @click="checkedDrop(item, $event)">
                {{ item.name }}
            </div>
        </div>
    </div> 
</template>

<script>
export default {
    props: {
        list: {
            type: Array
        }
    },
    methods: {
        toggleOpen (event) {
            const element = event.target

            element.classList.toggle('open')
        },
        checkedDrop (element, event) {
            const elementValue = event.target.getAttribute('data-value'),
                sortValue = this.$refs.valueDrop

            sortValue.innerHTML = element.name
            sortValue.classList.remove('open')
            
            this.$refs.dropdownElement.forEach(element => {
                element.classList.remove('active')
            })
            event.target.classList.add('active')

            this.$emit('changeDrop', elementValue)
        }
    }
}
</script>

<style lang="scss" scoped>
.dropdown {
    position: relative;
    &-value {
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #30A5E0;
        text-decoration: underline;
        cursor: pointer;
        position: relative;
        &:after {
            content: "";
            position: absolute;
            top: 50%;
            right: -34px;
            transform: translateY(-50%) rotate(0deg);
            transition-duration: .5s;
            background-color: transparent;
            background-image: url('/assets/icons/arrow.svg');
            background-repeat: no-repeat;
            background-position: center;
            background-size: 12px 12px;
            width: 34px;
            height: 35px;
            transition-duration: .3s;
        }
        &.open {
            &:after {
                transform: translateY(-50%) rotate(180deg);
                background-color: #F5F6FA;
                box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
                border-radius: 0px 6px 0px 0px;
            }
            & + .dropdown-show-block {
                visibility: visible;
                opacity: 1;
            }
        }
    }
    &-show-block {
        position: absolute;
        top: 100%;
        width: 214px;
        right: -34px;
        background: #F5F6FA;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
        border-radius: 6px 0px 6px 6px;
        visibility: hidden;
        opacity: 0;
        transition-duration: .3s;
    }
    &-element {
        font-size: 16px;
        line-height: 19px;
        color: #2E2F31;
        padding: 7px 24px;
        border-radius: 6px;
        cursor: pointer;
        transition-duration: .3s;
        &:last-child {
            margin-bottom: 0;
        }
        &:hover {
            background: #FFFFFF;
        }
        &.active {
            background: #FFFFFF;
            font-weight: bold;
        }
    }
}
</style>
