import pool from '../config/db.js';
import moment from 'moment';

const formatter = 'YYYY-MM-DD HH:mm:ss';
const averageJSON = {
    v_magnetic: 0.0922,
    v_piezo: 0.52456,
    v_12: 0.5300,
    v_24: 4.5330
};

const getVoltages = (req, res) => {
    const data = req.query.data;
    const editableData = req.query.editableQuery;
    const startDate = moment.unix(Date.parse(req.query.startDate)/1000).format(formatter);
    const endDate = moment.unix(Date.parse(req.query.endDate)/1000).format(formatter);

    const sqlStatement = `SELECT hwtime, ${data}, msg FROM common_logs WHERE ${data} > ${parseFloat(averageJSON[data])} GROUP BY hwtime, ${data}, msg HAVING hwtime BETWEEN '${startDate}' AND '${endDate}' ORDER BY hwtime`;
    pool.query(sqlStatement, (err, results) => {
        if (err) res.status(400).end();
        console.log("Statement:\n" + sqlStatement);
        res.status(200).json(results.rows);
    });
};

export { 
    getVoltages,
};