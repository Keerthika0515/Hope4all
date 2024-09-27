var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "orphanage",
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var sql = "INSERT INTO reg_page (First_name, Last_name, Age, Gender, Phone_No, `E-mail`, password, `Re-type_pword`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    var values = ['Eamilda', 'John', 1, 'female', '1234567895', 'eammilda@gmail.com', '123123', '123123'];

    con.query(sql, values, function(err, result) {
        if (err) {
            console.error("Error executing query:", err);
            return;
        }
        console.log("Record inserted, ID:", result.insertId);
    });
});
