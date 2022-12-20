const express = require('express')
const bodyParser = require('body-parser')
var url = require('url');
const app = express()
let sql
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./hospital.db", sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.log(err)
})

app.use(bodyParser.json())


// Api to insert data
app.post("/api/addNurse", (req, res) => {
    try{
        const { firstName, lastName, ward, email} = req.body 
        sql = "INSERT INTO NURSE(FIRSTNAME, LASTNAME, WARD, EMAIL) VALUES (?,?,?,?)"
        db.run(sql, [firstName, lastName, ward, email], (err) => {
            if (err){ return res.json({
                status: 300, success :false, error : err
            })}
            console.log("succesfully inserted", firstName, lastName, ward, email)
            return res.json({
                status: 200,
                success: true
            })
        })
        
        
    }catch(error){
        return res.json({
            status : 400,
            success : false
        })
    }
})



// Api to Get data
app.get("/api/getNurse", (req, res) => {
    try{
        sql = "SELECT NURSE.EMPID, NURSE.FIRSTNAME, NURSE.LASTNAME, WARD.WARDNAME AS WARD, NURSE.EMAIL FROM NURSE, WARD WHERE NURSE.WARD = WARD.ID"
        const queryObject = url.parse(req.url, true).query // query parameters
        if (queryObject.field && queryObject.type){
            sql+=` WHERE ${queryObject.field} LIKE ${queryObject.type}`
        }
        
        db.all(sql, [], (err, rows) => {
            if (err){ return res.json({
                status: 300, success :false, error : err
            })}
            if (rows.length<1){
                return res.json({status : 300, success : false, error : err})
            }
            return res.json({
                status: 200,
                data : rows,
                success: true
            })
        })
        
        
    }catch(error){
        return res.json({
            status : 400,
            success : false,
            eer : error
        })
    }
})

// Api to Update data
app.put("/api/updateNurse", (req, res) => {
    try{
        // console.log(req.body)
        const { firstName, lastName, ward, email, emp_id} = req.body 
        // console.log(firstName)
        sql = `UPDATE NURSE SET FIRSTNAME = ?, LASTNAME = ?, WARD = ?, EMAIL = ? WHERE EMPID = ?`
        db.run(sql, [firstName, lastName, ward, email, emp_id], (err, rows) => {
            if (err){ return res.json({
                status: 300, success :false, error : err
            })}
            console.log("succesfully updated", firstName, lastName, ward, email)
            return res.json({
                status: 200,
                success: true
            })
        })
        
        
    }catch(error){
        return res.json({
            status : 400,
            success : false
        })
    }
})

// Api to Delete data
app.delete("/api/deleteNurse/:id", (req, res) => {
    try{
        const emp_id = req.params.id 
        // console.log(emp_id)
        sql = `DELETE FROM NURSE WHERE EMPID = ?`
        db.run(sql, [emp_id], (err) => {
            if (err){ return res.json({
                status: 300, success :false, error : err
            })}
            console.log("succesfully deleted", emp_id)
            return res.json({
                status: 200,   
                success: true
            })
        })
        
        
    }catch(error){
        return res.json({
            status : 400,
            success : false
        })
    }
})

app.listen(8000, ()=>{
    console.log("Server is running at http://localhost:8000")
})