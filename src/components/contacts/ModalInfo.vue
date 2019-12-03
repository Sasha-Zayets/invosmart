<template>
	<ModalWindowInfo :name="modalName" @before-open="beforeOpen($event.params)" class="modal-header modal-delete" @before-close="$emit('before-close', $event.params)">
        <template #content>
            <span class="info-title">Удалить контакт?</span> 
			<h2 class="info-name">{{ fullName }}</h2>
            <div class="modal-button-event">
            	<div class="modal-button-element">
					<button @click="$modal.hide(modalName)" class="blue">
						<svg class="icon">
							<use xlink:href="/assets/icons/sprite.svg#cancel"></use>
						</svg>
						Отменить
					</button>
            	</div>
				
            	<div class="modal-button-element">
					<button @click="deleteItem" class="red">
						<svg class="icon">
							<use xlink:href="/assets/icons/sprite.svg#modal-delete"></use>
						</svg>
						Удалить
					</button>
            	</div>
            </div>
        </template>
    </ModalWindowInfo>
</template>

<script>
import ModalWindowInfo from '../common/ModalWindowInfo'
import FormButton from '../common/FormButton'

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
            this.$store.dispatch('deleteContact', this.id)
            .then(el => {
				this.$store.commit('setShowInfo', true)
				this.$store.commit('setNameInfo', 'error')
				this.$modal.hide(this.modalName)

				setTimeout(() => {
					this.$store.commit('setShowInfo', false)
				}, 3000)
            })
            .catch(err => console.log(err.response));
        }
	}
}
</script>

<style lang="scss" scoped>
.info-title {
	display: block;
	font-family: Montserrat;
	font-weight: 600;
	font-size: 18px;
	line-height: 100%;
	text-align: center;
	color: #818E94;
	margin-bottom: 27px;
}

.info-name {
	max-width: 335px;
	margin: 0 auto 32px auto;
	font-family: Montserrat;
	font-weight: 600;
	font-size: 16px;
	line-height: 140%;
	text-align: center;
	color: #2E2F31;
}

.modal-button {
	&-event {
		display: flex;
		justify-content: center;
		width: 100%;
		padding-bottom: 24px;
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
			.icon {
				margin-right: 17px;
				width: 16px;
				height: 16px;
				fill: white;
			}
			&.blue {
				background: #30A5E0;
				&:hover {
					background: #2197D1;
				}
				&:active {
					background: #0689C9;
				}
			}
			&.red {
				background: #FC6180;
				&:hover {
					background: #E44A69;
				}
				&:active {
					background: #D2405D;
				}
			}
		}
	}
}
</style>