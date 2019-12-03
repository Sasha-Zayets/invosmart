<template>
    <div class="popup-container" ref="notes">
		<div class="popup-host">
			<svg class="icon-close" @click="closePopup">
				<use xlink:href="/assets/icons/sprite.svg#close"></use>
			</svg>
			<div 
				class="text-field textFieldNotesBlock">
				<textarea 
					class="textFieldNotes"
					placeholder="Введите заметку"
					v-model="comments"
					@input="validate($event)"></textarea>
			</div>
			<div class="popup-count">
				<span>{{ lenghtMessage }}</span>
				<span>/400</span>	
			</div>
			<div class="modal-button-event">
				<div class="modal-button-element">
					<button @click="addComments" class="green">
						<svg class="garbage-icon">
							<use xlink:href="/assets/icons/sprite.svg#garbage"></use>
						</svg>
						Сохранить
					</button>
				</div>
				<div class="modal-button-element">
					<button @click="deleteItem" class="red">
						<svg class="basket-icon">
							<use xlink:href="/assets/icons/sprite.svg#clear"></use>
						</svg>
						Очистить
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import OverlayScrollbars from 'overlayscrollbars'

export default {
    inheritAttrs: false,
    props: {
		element: {
            type: [Object, Array]
		},
		typeNotes: {
			type: String,
			default: 'contacts'
		}
    },
    data: () => ({
        comments: '',
		contact: {},
	}),
    mounted () {
		OverlayScrollbars(document.querySelector('.textFieldNotes'), { });

		OverlayScrollbars(document.querySelector('.textFieldNotesBlock'), { });
        if (this.typeNotes === 'contacts') {
			this.contact = {
				id: '',
				comments: '',
				is_company: true
			}
			this.contact = this.element
        	this.comments = this.element.comments
		} else {
			this.contact = this.element
			this.comments = this.element.note
		}
	},
	computed: {
		lenghtMessage () {
			return this.comments.length
		}
	},
	methods: {
		validate (event) {
			const height = event.target.scrollHeight

			if (this.lenghtMessage <= 400) {
				this.comments = event.target.value
			} else {
				this.comments = event.target.value.slice(0, 400)
			}
		},
        deleteItem() {
            this.comments = ''
			this.actionDispatch(this.comments)
			
			this.notesCommit({
				name: 'setNameNotesInfo',
				value: 'error',
				show: 'setShowNotestInfo',
				showValue: true
            })
            
			this.showInfoBlock()
		},
		addComments () {
			this.actionDispatch(this.comments)
			
			this.notesCommit({
				name: 'setNameNotesInfo',
				value: 'info',
				show: 'setShowNotestInfo',
				showValue: true
            })
            
			this.showInfoBlock()
		},
		notesCommit ({name, value, show, showValue}) {
			this.$store.commit(name, value)
			this.$store.commit(show, showValue)
		},
		showInfoBlock () {
			setTimeout(() => {
				this.$store.commit('setShowNotestInfo', false)
			}, 1000)
		},
		actionDispatch (value) {
            if(this.typeNotes === 'contacts') {
				this.contact.comments = value
				this.$store.dispatch('updateContact', this.contact)
			} else {
				this.contact.note = value
				this.$store.dispatch('updateInvoice', this.contact)
			}

            this.$refs.notes.classList.remove('show')
		},
		closePopup () {
			console.log('close')
			this.$refs.notes.classList.remove('show')
		}
	}
}
</script>

<style lang="scss" scoped>
.popup-container {
	position: relative;
	opacity: 0;
	z-index: -1;
    visibility: hidden;
    transition-duration: .3s;
	&:before {
		content: "";
		width: 19px;
		height: 23px;
		position: absolute;
		top: 24px;
		right: -8px;
		background-image: url('/assets/icons/right-tr.svg');
		background-size: 100%;
	}
	&.show {
        opacity: 1;
		z-index: 9999;
        visibility: visible;
    }
}

.popup-count {
	margin-top: 4px;
	margin-bottom: 20px;
	text-align: right;
	padding-right: 8px;
	span {
		font-family: Montserrat;
		font-weight: 500;
		font-size: 11px;
		line-height: 16px;
		text-align: right;
		color: #979B9D;
	}
}

.popup-host {
    background: #FFFFFF;
    border-radius: 6px;
	box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
    padding: 24px;
	min-width: 456px;
	position: relative;
	cursor: auto;

	.icon-close {
		width: 10px;
		height: 10px;
		cursor: pointer;
		fill: #818E94;
		position: absolute;
		right: 9px;
		top: 9px;
		transition-duration: .3s;
		&:hover {
			fill: #FC6180;
		}
		&:active {
			fill: #2E2F31;	
		}
	}
}

.text-field {
    width: 100%;
	height: 120px;
    background: #FFFFFF;
    border: 1px solid #C2CACD;
    box-sizing: border-box;
    border-radius: 6px;
    padding: 8px;
    textarea {
        width: 100%;
		min-height: 100%;
        height: 100%;
        resize: none;
        border: none;
        font-family: Roboto !important;
		font-style: normal;
		font-weight: normal;
		font-size: 13px;
		line-height: 130%;
		color: #252932;
		padding: 0;
        &:focus, &:active {
            outline: none;
        }
        &::placeholder {
            font-family: Roboto !important;
			font-size: 13px;
			line-height: 130%;
			color: #979B9D;
        }
    }
}
.basket-icon {
    fill: white;
    width: 14px;
    height: 16px;
    margin-right: 16px;
}

.garbage-icon {
    width: 20px;
    height: 20px;
    fill: white;
    margin-right: 16px;
}

.modal-button {
	&-event {
		display: flex;
		justify-content: space-between;
		width: 100%;
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
			font-family: Montserrat;
			font-weight: 500;
			font-size: 16px;
			line-height: 15px;
			color: #FFFFFF;
			border: none;
			cursor: pointer;
			border-radius: 6px;
			transition-duration: .5s;
			&.green {
				background: #1BA261;
				&:hover {
					//background: #2197D1;
				}
				&:active {
					//background: #67C6F4;
				}
			}
			&.red {
				background: #FC6180;
				.basket-icon {
					width: 18px;
					height: 18px;
				}
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