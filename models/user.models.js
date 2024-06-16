import { pool } from '../data/connection.database.js';

const loginByEmail = async (email) => {
    const query = {
        text: `SELECT * FROM login WHERE EMAIL = $1`,
        values: [email]
    }

    const { rows } = await pool.query(query)
    return rows[0]
}

export const userModel = {
    loginByEmail
}
