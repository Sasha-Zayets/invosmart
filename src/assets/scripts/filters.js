'use strict';

function FiltersContainer() {
    this.filters = {
        no_nds_price_filter (product) {
            let {nds_on, price, nds} = product;

            if(nds <= 0) return price;
            if(nds_on) return price / (1 + nds / 100);

            return price;
        },
        nds_price_filter (product) {
            let {nds_on, price, nds} = product;
            
            if(nds <= 0) return price;
            if(!nds_on) return price + (price * nds / 100);

            return price;
        },
        unit_type_filter(unitIndex, units) {
            let filteredUnits = units.filter(unit => unit.value === unitIndex);
            return filteredUnits.length > 0 ? filteredUnits[0].name : '';
        },
        to_fixed_filter(val) {
            if((typeof val) === 'number') return val.toFixed(2);
            else return val;
        }
    };

    this.setFilters = function(Vue) {
        for(let key in this.filters) {
            Vue.filter(key, this.filters[key]);
        }
    }
}

export default new FiltersContainer();