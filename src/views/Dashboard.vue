<template>
    <div class="dashboard-container">
        <div class="dashboard-navigation">
            <router-link to="/invoices">
                <ControlsButton class="dashboard-button">
                    <div class="dashboard-button-icon">
                        <svg class="icon">
                            <use xlink:href="/assets/icons/sprite.svg#add-icon"></use>
                        </svg>
                    </div>
                    Create invoice
                </ControlsButton>
            </router-link>
            <router-link to="/price-offer">
                <ControlsButton class="dashboard-button">
                    <div class="dashboard-button-icon">
                        <svg class="icon">
                            <use xlink:href="/assets/icons/sprite.svg#price-offer"></use>
                        </svg>
                    </div>
                    Create price offer
                </ControlsButton>
            </router-link>
            <ControlsButton class="dashboard-button" @click="$modal.show(modalInfo, null)">
                <div class="dashboard-button-icon">
                    <svg class="icon">
                        <use xlink:href="/assets/icons/sprite.svg#box"></use>
                    </svg>
                </div>
                Create product
            </ControlsButton>
            <ControlsButton class="dashboard-button" @click="$modal.show(modalName, null)">
                <div class="dashboard-button-icon">
                    <svg class="icon">
                        <use xlink:href="/assets/icons/sprite.svg#people"></use>
                    </svg>
                </div>
                Create contact
            </ControlsButton>
        </div>
        <div class="switch">
            <ToggleSwitch class="toggle" :options="toggleOptions" v-model="val"></ToggleSwitch>
        </div>
        <div class="dashboard-group">
            <Card class="dashboard-group-card" v-if="true">
                <template #header>
                    Monthly Earning
                </template>
                <template #content>
                    <div class="flex-count">
                        <NumbersValue class="flex-count-element">
                            <template #number>
                                4,358
                            </template>
                            <template #description>
                                Completed
                            </template>
                        </NumbersValue>
                        <NumbersValue class="flex-count-element">
                            <template #number>
                                157
                            </template>
                            <template #description>
                                Overdue
                            </template>
                        </NumbersValue>
                        <NumbersValue class="flex-count-element">
                            <template #number>
                                2,897
                            </template>
                            <template #description>
                                In progress
                            </template>
                        </NumbersValue>
                    </div>
                    <div class="chart">
                        <div class="chart-top">
                            <span class="chart-title">Apple Pie Chart</span>
                            <div class="chart-sort">
                                <span>
                                    Show
                                </span>
                                <DropDown :list="dropDown"/>
                            </div>
                        </div>
                       <div class="char-wrapper">
	                       	 <div id="chart" class="noselect">
	                       	 	<span class="chart-price">
	                       	 		$5,687
	                       	 	</span>
							  <canvas id="myChart" height="400" width="400"></canvas>
							</div>
							<div id="chartjs-legend" class="noselect"></div>
                       </div>
                    </div>
                </template>
            </Card>
            <Card class="dashboard-group-card" v-else>
                <template #header>
                    Monthly Earning
                </template>
                <template #content>
                    <div class="flex-count">
                        <NumbersValue class="flex-count-element">
                            <template #number>
                                -
                            </template>
                        </NumbersValue>
                        <NumbersValue class="flex-count-element">
                            <template #number>
                                -
                            </template>
                        </NumbersValue>
                        <NumbersValue class="flex-count-element">
                            <template #number>
                                -
                            </template>
                        </NumbersValue>
                    </div>
                    <div class="chart">
                        <div class="chart-top">
                            <span class="chart-title">Apple Pie Chart</span>
                            <div class="chart-sort">
                                <span>
                                    Show
                                </span>
                                <DropDown :list="dropDown"/>
                            </div>
                        </div>
                       <div class="char-wrapper">
	                       	<picture class="chart-frame">
                                <img src="@/assets/images/no-chart.svg">
                            </picture>
                            <div class="chart-description">
                                Not enough data to build a chart at this time.
                            </div>
                       </div>
                    </div>
                </template>
            </Card>
            <Card class="dashboard-group-card" rowTitle padding="20px 15px">
                <template #header>
                    <span>
                        The name of this block
                    </span>
                    <ButtonEvent>
                        <template #icon>
                            <svg class="icon">
                                <use xlink:href="/assets/icons/sprite.svg#export-file"></use>
                            </svg>
                        </template>
                        Export XLS file
                    </ButtonEvent>
                </template>
                <template #content>
                    <TableList :titleTable="tableTitle" :contentTable="tableContent"/>
                </template>
            </Card>
        </div>

        <!-- Modals window -->
        <CreditContact :modalName="modalName"></CreditContact>
        <CreditProduct :modalName="modalInfo"></CreditProduct>

        <!-- Information Blocks -->
            <!-- Products modal -->
        <block-info v-if="this.$store.state.products.nameInfo == 'info'" :show="$store.state.products.showInfo">
            <img src="@/assets/icons/win.svg" class="sprite">
            Продукт добавлен 
            <i class="fas fa-times" @click="fade"></i>
        </block-info>
            <!-- Contacts modal -->
        <block-info v-if="this.$store.state.contacts.nameInfo == 'info'" :show="$store.state.contacts.showInfo">
            <img src="@/assets/icons/win.svg" class="sprite">
            Контакт добавлен
            <i class="fas fa-times" @click="fade"></i>
        </block-info>
        <!-- Information Blocks end-->
    </div>
</template>

<script>
import CreditContact from '@/components/contacts/CreditContact'
import CreditProduct from '@/components/products/CreditProduct'
import BlockInfo from '@/components/common/InfoBlock'
import ToggleSwitch from '@/components/common/ToggleSwitch'
import ControlsButton from '@/components/common/ControlsButton'
import Card from '@/components/common/CardElement'
import NumbersValue from '@/components/ui/NumbersValue'
import DropDown from '@/components/ui/DropDown'
import ButtonEvent from '@/components/ui/ButtonEvent'
import TableList from '@/components/ui/TableList'
import Chart from 'chart.js'

export default {
    components: {
        ControlsButton,
        ToggleSwitch,
        Card,
        NumbersValue,
        DropDown,
        ButtonEvent,
        TableList,
        CreditContact,
        CreditProduct,
        BlockInfo
    },
    mounted () {
        const data = [25, 61, 14]
        let labelGenerate = ['Completed', 'In progress', 'Overdue']
        let label = []

        data.forEach((el, index) => {
            let temp = `${labelGenerate[index]} ${el}%`

            label.push(temp)
        })

        const dataOption = {
            labels: label,
            datasets: [{
                data: data,
                backgroundColor: [
                    "#4980FF",
                    "#FFB74E",
                    "#FC6180"
                ],
                hoverBackgroundColor: [
                    "#4980FF",
                    "#FFB74E",
                    "#FC6180"
                ],
                borderWidth: 5,
            }]
        }
        const outerCircle = new Chart(document.getElementById("myChart"), {
            type: "doughnut",
            data: dataOption,
            options: {
                cutoutPercentage: 85,
                responsive: true,
                aspectRatio: 2,
                animation: {
                    animateScale: true,
                },
                hover: {
                    onHover: function(data) {
                    // console.log(data);
                    }, // Called when any of the events fire. Called in the context of the chart and passed an array of active elements (bars, points, etc)
                    mode: 'label', // Sets which elements hover. Acceptable options are 'single', 'label', or 'dataset'. single highlights the closest element. label highlights elements in all datasets at the same X value. dataset highlights the closest dataset.
                    animationDuration: 1000 // Duration in milliseconds it takes to animate hover style changes
                },
                onClick: function(e, a, b) {
                    // console.log(e, a, b);
                },
                "legend": {
                    "display": false
                },
            }
            });

            var diagramLegend = document.getElementById('chartjs-legend');

            diagramLegend.innerHTML = outerCircle.generateLegend();

            /*** Highlight Doughnut Segment on Legend Hover ***/

            var legendItems = document.querySelectorAll('#chartjs-legend li');

            legendItems.forEach(function(item, itemIndex) {
                item.addEventListener('mouseenter', function() {
                    highlightSegment(outerCircle, itemIndex, true)
                })
                item.addEventListener('mouseleave', function() {
                    highlightSegment(outerCircle, itemIndex, false)
                })
            })

            function highlightSegment(chart, index, isHighlight) {
                var activeSegment = chart.getDatasetMeta(0).data[index]
                if (isHighlight) chart.updateHoverStyle([activeSegment], null, true)
                else chart.updateHoverStyle([activeSegment], null, false)
                chart.draw()
            }

    },
    data: () => ({
        toggleOptions: [
            {
                name: 'Contacts',
                value: true
            },
            {
                name: 'Products',
                value: false
            }
        ],
        val: true,
        dropDown: [
            {
                name: 'by last mounth',
                value: 0
            },
            {
                name: 'by last 30 days',
                value: 1
            },
            {
                name: 'by last 60 days',
                value: 2
            },
            {
                name: 'by last 90 days',
                value: 3
            }
        ],
        tableTitle: [
            {
                title: 'Rank'
            },
            {
                title: 'Name'
            },
            {
                title: 'Something'
            },
            {
                title: 'Money'
            }
        ],
        tableContent: [
            {
                name: 'Shaamikh Al Hakim',
                something: '32.54 %',
                money: '$32,547'
            },
            {
                name: 'Cammy Hedling',
                something: '23.87 %',
                money: '$32,547'
            }
        ],
        dropChecked: '',
        modalName: 'credit_contact',
        modalInfo: 'credit_product',
    }),
    methods: {
        fade () {}
    }
}
</script>

<style lang="scss" scoped>
.chart-frame {
    margin-right: 21px;
}

.char-wrapper {
    margin-bottom: 85px;
}

.chart-description {
    max-width: 220px;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #2E2F31;
}

a {
    text-decoration: none;
}

.dashboard {
    &-container {
        padding: 0 70px;
    }
    &-navigation {
        display: flex;
        justify-content: space-between;
        margin-bottom: 50px;
    }
    &-button {
        width: 325px;
        height: 80px;
        font-weight: 800;
        font-size: 18px;
        line-height: 22px;
        padding: 0 22px;
        &-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.2);
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 20px;
            .icon {
                fill: white;
                width: 22px;
                height: 22px;
            }
        }
    }
}

.switch {
    margin-bottom: 30px;
    .toggle {
        height: 60px;
        max-width: 330px;
        border: 3px solid rgba(48, 165, 224, .5);
        border-radius: 30px;
        margin: 0 auto;
    }
}

.dashboard-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 66px;
    &-card {
        width: calc(50% - 18px);
    }
}

.flex-count {
    display: flex;
    justify-content: space-between;
    margin-bottom: 44px;
    &-element {
        width: calc((100% / 3) - 15px);
    }
}

.chart {
    &-top {
        display: flex;
        justify-content: space-between;
        padding-right: 25px;
    }
    &-title {
        font-weight: 500;
        font-size: 22px;
        line-height: 27px;
        color: #2E2F31;
    }
    &-sort {
        display: flex;
        & > span {
            font-weight: 600;
            font-size: 16px;
            line-height: 19px;
            color: #2E2F31;
            margin-right: 3px;
        }
    }
    &-bottom {
        width: 231px;
        height: 231px;
        * {
            height: 100%;
        }
    }
}

</style>
