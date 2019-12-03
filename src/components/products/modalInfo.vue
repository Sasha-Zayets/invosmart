<template>
	<ModalWindowInfo :name="modalName" @before-open="beforeOpen($event.params)" class="modal-header" @before-close="$emit('before-close', $event.params)">
        <template #content>
            <span class="info-title">Удалить продукт?</span> 
			<h2 class="info-name">{{ fullName }}</h2>
            <div class="modal-button-event">
            	<div class="modal-button-element">
            		<button @click="deleteItem" class="red">
						<i class="far fa-trash-alt"></i>
						Удалить
					</button>
            	</div>
            	<div class="modal-button-element">
            		<button @click="$modal.hide(modalName)" class="blue">
						<i class="fas fa-reply"></i>
						Отменить
					</button>
            	</div>
            </div>
        </template>
    </ModalWindowInfo>
</template>

<script>
import ModalWindowInfo from '@/components/common/ModalWindowInfo'
import FormButton from '@/components/common/FormButton'

export default {
	name: 'ModalInfo',
	props: {
        modalName: String,
		contact: Object,
		names: String
    },
    data: () => ({
		id: '',
		fullName: ''
	}),
	mounted () {
		
	},
	components: {
		ModalWindowInfo,
		FormButton
	},
	methods: {
		beforeOpen(element) {
			this.id = element.id
			this.fullName = element._name
		},
        deleteItem() {
           this.$store.dispatch('deleteProduct', this.id)
            .then(el => {
				this.$store.state.products.showInfo = true
				this.$store.state.products.nameInfo = 'error'
				this.$modal.hide(this.modalName)

				setTimeout(() => {
					this.$store.state.products.showInfo = false
				}, 1000)
            })
            .catch(err => console.log(err.response));
        }
	}
}
</script>

<style lang="scss" scoped>
.info-title {
	display: block;
	text-align: center;
	font-size: 24px;
	line-height: 15px;
	text-align: center;
	color: #000000;
}
.info-name {
	margin: 24px 0 48px 0;
	font-size: 24px;
	line-height: 15px;
	text-align: center;
	color: #000000;
}
.modal-button {
	&-event {
		display: flex;
		justify-content: center;
		width: 100%;
		padding-bottom: 54px;
	}
	&-element {
		display: flex;
		justify-content: center;
		align-items: center;
		&:first-child {
			margin-right: 19px
		}
		&:last-child {
			margin-left: 19px;
		}
		button {
			height: 40px;
			width: 168px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 500;
			font-size: 16px;
			line-height: 15px;
			color: #FFFFFF;
			border: none;
			cursor: pointer;
			border-radius: 6px;
			transition-duration: .5s;
			i {
				margin-right: 16px;
			}
			&.blue {
				background: #30A5E0;
				&:hover {
					background: #2197D1;
				}
				&:active {
					background: #67C6F4;
				}
			}
			&.red {
				background: #FC6180;
				&:hover {
					background: #FB456A;
				}
				&:active {
					background: #FD7591;
				}
			}
		}
	}
}
</style>