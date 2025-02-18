import { json } from 'express';
import pool from '../config/db.js';
import moment from 'moment';

const formatter = 'YYYY-MM-DD HH:mm:ss';

const getVoltages = (req, res) => {
    const data = req.query.data;
    const startDate = moment.unix(Date.parse(req.query.startDate)/1000).format(formatter);
    const endDate = moment.unix(Date.parse(req.query.endDate)/1000).format(formatter);

    pool.query(`SELECT * FROM voltage_logs WHERE hwtime BETWEEN '${startDate}' AND '${endDate}'`, (err, results) => {
        if (err) throw err;
        res.status(200).json(results.rows);
    });
};

export { 
    getVoltages,
};