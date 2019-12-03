<template>
    <table class="table">
        <thead>
            <tr>
                <th
                    v-for="(item, index) in titleTable"
                    :key="index"
                    class="table-title">
                {{ item.title }}    
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(element, index) in contentTable"
                :key="index">
                <td class="table-content">
                    {{ index + 1 }}
                </td>
                <td class="table-content">
                    {{ element.name }}
                </td>
                <td class="table-content">
                    {{ element.something }}
                </td>
                <td class="table-content">
                    {{ element.money }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        titleTable: {
            type: Array
        },
        contentTable: {
            type: Array
        }
    }
}
</script>

<style lang="scss" scoped>
.table {
    width: 100%;
    border-collapse: collapse;
    &-title {
        font-weight: 800;
        font-size: 14px;
        line-height: 16px;
        color: #818E94;
        text-align: left;
        padding-bottom: 10px;
        &:first-child {
            text-align: center;
        }
    }
    &-content {
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #2E2F31;
        padding: 15px 0;
        &:first-child {
            text-align: center;
            border-top-left-radius: 25px;
            border-bottom-left-radius: 25px;
        }
        &:last-child {
            border-top-right-radius: 25px;
            border-bottom-right-radius: 25px;
        }
    }
    tbody {
        tr:nth-child(even) {
            background: #F5F6FA;
        }
    }
}
</style>
