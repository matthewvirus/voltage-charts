const formatter = 'YYYY-MM-DD HH:mm:ss';
const dataStringsJSON = {
    'v_magnetic': 'Antenne',
    'v_piezo': 'Piezo',
    'v_12': '12 Volts line',
    'v_24': '24 Volts line'
};
const dataOutputsJSON = {
    'v_magnetic': 0.1,
    'v_piezo': 0.57,
    'v_12': 0.555,
    'v_24': 4.536
};
const dataOutputsIfStringExistsJSON = {
    'v_magnetic': 0.102,
    'v_piezo': 0.6,
    'v_12': 0.56,
    'v_24': 4.537
};
const dataMinAxeJSON = {
    'v_magnetic': 0.092,
    'v_piezo': 0.518,
    'v_12': 0.528,
    'v_24': 4.533
};
const averageJSON = {
    v_magnetic: 0.0922,
    v_piezo: 0.52456,
    v_12: 0.5300,
    v_24: 4.5330
};

export default{
    formatter, dataStringsJSON, dataOutputsJSON, dataOutputsIfStringExistsJSON, dataMinAxeJSON, averageJSON
}