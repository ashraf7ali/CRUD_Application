const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./hospital.db", sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.log(err)
})

// const sql = `CREATE TABLE WARD(ID INTEGER PRIMARY KEY AUTOINCREMENT, WARDNAME)`

// const sql = `CREATE TABLE NURSE(ID INTEGER PRIMARY KEY AUTOINCREMENT, FIRSTNAME, LASTNAME, WARD, EMAIL)`

data = ["da", "Dsuza", "1", "maria.d@mail.com", "1"]
sql = `UPDATE NURSE SET FIRSTNAME = ?, LASTNAME = ?, WARD = ?, EMAIL = ? WHERE ID = ?`

db.run(sql, data, err => {
    if (err) {
        console.log(err)
    }
    console.log(this.changes)
});

