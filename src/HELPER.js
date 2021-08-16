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
    }, 

    replaceDashWithSpace: (str) => {
        let formattedAbility = str.replace(/-/g, ' ');
        return HELPER.capitalize(formattedAbility);
    },

    formatLocation: (str) => {
        let formattedLoc = str.replace(/-/g, ' ');
        formattedLoc = formattedLoc.replace(/area/g, '')

        return HELPER.capitalize(formattedLoc);
    },

    formatMove: (str) => {
        if (str[0] === '1') {
            let arr = str.split('-');
            let numArr = arr.slice(0, 3).join(',');
            let wordArr = arr.slice(3).join(' ');
            return `${numArr} ${wordArr}`
        }
        let formattedMove = str.replace(/-/g, ' ');
        return HELPER.capitalize(formattedMove);
    },

    replaceUnderscoreWithSpace: (str) => {
        let formattedRel = str.replace(/_/g, ' ');
        return HELPER.capitalize(formattedRel);
    },

    grabID: (url) => {
        return (url.split('/')[6]);
    }

}

export default HELPER;