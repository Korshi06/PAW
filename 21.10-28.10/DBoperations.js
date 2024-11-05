const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'messagesDB',
    connectionLimit: 5
});


async function insertData(name, surname, email, message) {
    let conn;
    try {
        conn = await pool.getConnection();
        const res = await conn.query("INSERT INTO messages (name, surname, email, message) VALUES (?, ?, ?, ?)", [name, surname, email, message]);
        console.log("Insert ID:", res.insertId);
    } catch (e) {
        console.error("Error inserting data:", e);
    } finally {
        if (conn) conn.end();
    }
}

async function getData(id) {
    let conn;
    try {
        conn = await pool.getConnection();
        const res = await conn.query("SELECT * FROM messages WHERE id = ?", [id]);
        return res;
    } catch (err) {
        console.error("Error retrieving data:", err);
    } finally {
        if (conn) conn.end();
    }
}


async function getAllData() {
    let conn;
    try {
        conn = await pool.getConnection();
        const res = await conn.query("SELECT * FROM messages");
        return res;
    } catch (err) {
        console.error("Error retrieving data:", err);
    } finally {
        if (conn) conn.end();
    }
}


module.exports = {insertData, getData, getAllData};