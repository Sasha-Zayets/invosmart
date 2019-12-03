<template>
    <div class="paginated-table-wrapper">
        <div class="shown-indicator" v-if="count">Показано контактов: {{paginated.length}} из {{items.length}}</div>
        <div class="table-wrapper" v-if="this.$store.state.contacts.showPaginated > 0">
            <table class="paginated-table">
                <thead>
                    <tr>
                        <slot name="thead"></slot>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="item.id" v-for="item in paginated">
                        <slot name="tbody-item" :item="item"></slot>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pages-controls" v-if="paginatedShow">
            <div class="page-sizes">
                <span class="page-sizes-label">Show on page:</span>
                <div class="page-sizes-flex">
                    <span class="page-sizes-count" :class="{'active': page_size==size}" :key="index" v-for="(size, index) in sizes" @click="page_size=size">{{size}}</span>
                </div>
            </div>
            <div class="pages-iterators">
                <span class="pages-iterator-nav" @click="gotoPrev">
                    <svg class="pages-iterator-icon pages-iterator-icon--prev">
                        <use xlink:href="/assets/icons/sprite.svg#right-arrow"></use>
                    </svg>
                </span>
                <div class="pages-iterators-list">
                    <div
                        v-for="(count, index) in countPaginated" 
                        :key="index">
                        <span class="page-indicator">{{count}}</span>
                        <span class="page-indicator" v-if="lengthPaginated > 5">...</span>
                    </div>
                </div>
                <span class="pages-iterator-nav" @click="gotoNext">
                    <svg class="pages-iterator-icon">
                        <use xlink:href="/assets/icons/sprite.svg#right-arrow"></use>
                    </svg>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PaginatedTable',
    props: {
        items: Array,
        count: {
            type: Boolean,
            default: true
        },
        paginatedShow: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            page_size: 5,
            current_page: 0,
            sizes: [10, 20, 50, 100],
        }
    },
    computed: {
        paginated() {
            let items = this.items;
            let start = this.page_size * this.current_page;
            let end = start + this.page_size;

            let len = items.slice(start, end);
            this.$store.commit('setShowPaginated', len.length);

            return items.slice(start, end);
        },
        countPaginated () {
            const length = ((this.items.length) / this.page_size)
            return Math.ceil(length)
        },
        lengthPaginated () {
            return this.items.length
        }
    },
    methods: {
        gotoPrev () {
          if(this.current_page > 0) this.current_page--;
        },
        gotoNext () {
            let pages_count = Math.ceil(this.items.length / this.page_size);
            if(this.current_page + 1 < pages_count) this.current_page++;
        },
    },
    filters: {
        pageIndexFilter(pageNum) {
            return pageNum + 1;
        }
    }
}
</script>

<style  lang="scss" scoped>
.shown-indicator {
	color: #727779;
	font-size: 16px;
	font-weight: 500;
	line-height: 19px;
    padding-left: 16px;
}

.table-wrapper {
	background-color: #fff;
    padding: 22px 16px 14px 16px;
    margin-top: 28px;
    border-radius: 18px;
    font-family: 'Roboto' !important;
    > *:not(i) {
        font-family: 'Roboto' !important;
    }
}

.paginated-table {
    width: 100%;
    max-width: 99%;
    border-spacing: 0;
    border-collapse: collapse;
}

.number {
    text-align: right;
}
.paginated-table thead tr {
    border-bottom: 1px solid #C2CACD;
}

.paginated-table th {
    width: fit-content;
    padding-bottom: 10px;
    font-weight: bold;
    font-size: 15px;
    line-height: 16px;
    color: #818E94;
    text-align: left;
    &:first-child {
        padding-left: 16px;
    }
    &:last-child {
        padding-right: 15px;
    }
}

.paginated-table tbody tr {
    border-top: 1px solid #E7EAEB;
    &:first-child {
       //border-top: 1px solid #C2CACD;
       border-top: none;
    }
    &:last-child {
        border-bottom: none;
    }
}

.paginated-table tbody tr:hover {
    background: #F5F6FA;
    cursor: pointer;
}

.sort-title {
    font-family: Roboto !important;
    font-weight: 900;
    font-size: 15px;
    line-height: 16px;
    color: #818E94;
}

.paginated-table td {
    height: 47px;
	font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 19px;
    color: #2E2F31;
    &:first-child {
        padding-left: 15px;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
    }
    &:last-child {
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
    }
    a {
        color: #2E2F31;
        text-decoration: none;
        position: relative;
        &:before {
            content: "";
            width: 100%;
            height: 1px;
            background-color: #2E2F31;
            position: absolute;
            top: 100%;
            left: 0;
            opacity: 1;
            transition-duration: .3s;
        }
        &:hover {
            &:before {
                top: 0%;
                opacity: 0;
            }
        }
    }
}

.pages-controls {
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    padding-left: 0;
    margin-top: 33px;
    padding-left: 16px;
}

.page-sizes {
    display: flex;
    align-items: flex-end;
	&-label {
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        color: #727779;
        margin-right: 8px;
    }
    &-flex {
        display: flex;
    }
    &-count {
        height: 21px;
        display: flex;
        align-items: flex-end;
        cursor: pointer;
        font-weight: 500;
        font-size: 15px;
        line-height: 21px;
        vertical-align: bottom;
        color: #818E94;
        transition-duration: .3s;
        margin-right: 10px;
        &:hover {
            color: #30A5E0;
        }
        &.active {
            font-weight: 600;
            color: #2E2F31;
            transform: scale(1.2);
            line-height: 21px;
        }
    }
}

.pages-iterators {
    display: flex;
    &-list {
        display: flex;
    }
}

.pages-iterator {
    cursor: pointer;
	color: #727779;
	font-size: 16px;
	font-weight: 500;
    line-height: 19px;
    transition-duration: .3s;
    
    &-nav {
        width: 27px;
        height: 27px;
        border-radius: 6px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition-duration: .3s;
        margin-right: 18px;
        &:hover {
            background: #E9ECF0;
        }
        &:active {
            background: #DEE1E6;
        }
        &:last-child {
            margin-left: 18px;
            margin-right: 0;
        }
    }
    &-icon {
        width: 10px;
        height: 12px;
        fill: #727779;
        transition-duration: .3s;
        stroke: #727779;
        &--prev {
            transform: rotate(180deg);
        }
    }
    &:hover, &:active {
        color: #2E2F31;
    }
    
}

.page-indicator {
    cursor: pointer;
	font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    display: flex;
    align-items: flex-end;
    color: #818E94;
    margin-right: 10px;
    transition-duration: .3s;
    &:last-child {
        margin-right: 0 ;
    }
    &:hover {
        color: #30A5E0;
    }
}

.conrol-delete {
    display: flex;
    align-items: center;
}

tbody {

    tr.active {
        background: #F5F6FA;
    }
    td {
        font-family: Roboto !important;
        font-weight: normal !important;
        font-size: 15px;
        line-height: 19px;
        color: #2E2F31;
        &:first-child {
            padding-left: 16px;
        }
        &:last-child {
            padding-right: 16px;
        }
        
    }
}

.add-note {
    font-family: Roboto;
    font-weight: normal;
    font-size: 15px;
    line-height: 16px;
    color: #2E2F31;
    position: relative;
    margin-right: 24px;
    display: flex;
    align-items: center;
    width: 100%;
    transition-duration: .3s;
    .text {
        position: absolute;
        left: 0;
        top: 30px;
        font-family: Roboto !important;
        font-weight: normal;
    }
    &-text {
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        &:hover {
            & + .showMessage {
                opacity: 1;
                visibility: visible;
            }
        }
    }
    &-show {
        visibility: hidden;
        opacity: 0;
        position: absolute;
        bottom: 15px;
        left: -80%;
        transition-duration: .5s;
        .icon {
            width: 283px;
            height: 240px;
        }
    }
    &:hover {
        color: #252932;
        .add-note-show {
            visibility: visible;
            opacity: 1;
        }
    }
}

// icons style
.icon-hover, .icon-two {
    width: 14px;
    height: 8px;
    fill: #B8C5CB;
}
</style>
