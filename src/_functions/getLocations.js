class VersionLocation {
    constructor(name, locations = []) {
        this.name = name;
        this.locations = locations;
    }

    addLocation(loc) {
        this.locations.push(loc)
    }

}

class VersionMethodAndLocation {
    constructor(area, name, method) {
        this.area = area;
        this.name = name;
        this.method = method;
    }
}

const getLocations = {
    
    getLocationData: async (pokeData, setLocations) => {
            try {
                const res = await fetch(`${pokeData.location_area_encounters}`);
                const data = await res.json();
                const temp = data.map((loc) => {
                    return loc.version_details.map((detail) => {
                        return new VersionMethodAndLocation(loc.location_area.name, detail.version.name, detail.encounter_details[0].method.name)
    
                    })
    
                })
                setLocations(temp);
            }
            catch (err) {
                console.log(err);
            }
    
        },
    
    getVersionData: async (setVersions) => {
            try {
                const res = await fetch('https://pokeapi.co/api/v2/version/?limit=40')
                const data = await res.json()
                const versionsTemp = data.results.map((version) => {
                    return (
                        new VersionLocation(version.name)
                    )
                })
                setVersions(versionsTemp)
            }
            catch (err) {
                console.log(err);
            }
        }
}

export default getLocations;