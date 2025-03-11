import pool from '../config/db.js';
import moment from 'moment';
import utils from '../public/js/utils.js';

const getVoltages = (req, res) => {
    const data = req.query.data;
    const editableData = req.query.editableQuery;
    const startDate = moment.unix(Date.parse(req.query.startDate)/1000).format(utils.formatter);
    const endDate = moment.unix(Date.parse(req.query.endDate)/1000).format(utils.formatter);

    const sqlStatement = `SELECT hwtime, ${data}, msg FROM common_logs WHERE ${data} > ${parseFloat(utils.averageJSON[data])} GROUP BY hwtime, ${data}, msg HAVING hwtime BETWEEN '${startDate}' AND '${endDate}' ORDER BY hwtime`;
    pool.query(sqlStatement, (err, results) => {
        if (err) res.status(400).end();
        res.status(200).json(results.rows);
    });
};

export { 
    getVoltages,
};