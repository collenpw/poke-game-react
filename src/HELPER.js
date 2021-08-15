const HELPER = {
    capitalize: (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    },

    formatSearch: (str) => {
        let formattedSearch = str.replace(/ /g, '-');

        return formattedSearch;
    },

    handleSearch: (e, setter, arrToFilter) => {
        if(e.target.value.length === 0) return setter(null);
        const newArr = arrToFilter.filter(function (el) {
            return el.name.toLowerCase().includes(HELPER.formatSearch(e.target.value.toLowerCase()))
        })

        setter(newArr);
    },

    alphabeticalSort: (arr) => {
        
        arr.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        })
    }

}



console.log(HELPER.capitalize('string'));

export default HELPER;