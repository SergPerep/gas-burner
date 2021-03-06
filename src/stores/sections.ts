import { writable } from "svelte/store";

function createSections() {
    const sections = writable<Sections>([{
        id: 'el-consumption',
        title: 'Consumption',
        status: null,
        energyType: "el"
    },
    {
        id: 'el-totale-variabele-kosten',
        title: 'Totale variabele kosten',
        status: null,
        energyType: "el"
    },
    {
        id: 'el-vaste-leveringskosten',
        title: 'Vaste leveringskosten',
        status: null,
        energyType: "el"
    },
    {
        id: 'el-vermindering-energiebelasting',
        title: "Vermindering energiebelasting",
        status: "success",
        energyType: "el"
    },
    {
        id: 'el-netbeheerkosten',
        title: 'Netbeheerkosten',
        status: null,
        energyType: "el"
    },
    {
        id: 'gas-consumption',
        title: 'Consumption',
        status: null,
        energyType: "gas"
    },
    {
        id: 'gas-totale-variabele-kosten',
        title: 'Totale variabele kosten',
        status: null,
        energyType: "gas"
    },
    {
        id: 'gas-vaste-leveringskosten',
        title: 'Vaste leveringskosten',
        status: null,
        energyType: "gas"
    },
    {
        id: 'gas-netbeheerkosten',
        title: 'Netbeheerkosten',
        status: null,
        energyType: "gas"
    }
    ]);
    const { subscribe, set, update } = sections;

    return {
        subscribe,
        setStatus: (id: string, status: Status) => {
            update(sections => {
                const newSect = sections.map(section => {
                    if (section.id === id) section.status = status;
                    return section;
                });
                console.log(`Status for ${id} has been set as ${status}`)
                return newSect;
            })
        }
    }
};

const getSection = (id: string, sections: Sections) => {
    return sections.find(section => section.id === id);
}

export const getSectionTitle = (id: string, sections: Sections) => {
    const section = getSection(id, sections);
    const title = section?.title || undefined;
    return title;
}

export const getSectionStatus = (id: string, sections: Sections) => {
    const section = getSection(id, sections);
    const status = section?.status || null;
    return status;
}

// Returns a ratio of successfully filled sections for specified energyType (electricity or gas)
export const getSectionsFillingProgress = (sections: Sections, energyType: "el" | "gas") => {
    const filledSectionsNum = sections
        .filter((section) => section.energyType === energyType)
        .reduce((prevVal, curVal) => {
            if (curVal.status === 'success') return prevVal + 1;
            return prevVal;
        }, 0);
    const totalSectionsNum = sections.filter((section) => section.energyType === energyType).length;
    return filledSectionsNum / totalSectionsNum;
}

export const sections = createSections();