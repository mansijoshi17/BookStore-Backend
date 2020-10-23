const express = require("express");
const router = express.Router();
var mysql = require('mysql');

//----------------------------- MYSQL connection and add data --------------------------//

// Configure MySQL connection
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'thinkpad@123',
  database: 'bookstore'
})

//Establish MySQL connection
connection.connect(function (err) {
  if (err)
    throw err
  else {
    console.log('Connected to MySQL');
  }
});


router.get('/list', async (req, res) => {
  connection.query('select * from books', function (error, results, fields) {
    if (error) throw error;
    res.status(200).json({
      data: results
    });
  });
});

router.post('/addbook', (req, res) => {
  var sql = "INSERT INTO books (name, author, price, imgurl ) VALUES ('" + req.body.name + "','" + req.body.author + "','" + req.body.price + "','" + req.body.imgurl + "')";
  // Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.send('Error');
    }
    else {
      res.send('Success! check phpmyAdmin');
    }
  });
})

router.delete('/deletebook/:id', (req, res) => {  
  let id = parseInt(req.params.id);
  var sql ='DELETE FROM books WHERE id=?';
  // Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)
  connection.query(sql, id, function (err, result) {
    if (err) {
      console.log(err);
      res.send('Error');
    } 
    else {
      res.send('Success! check phpmyAdmin');
    }
  });
})


router.get('/edit/:id', (req, res) => {  
  let id = parseInt(req.params.id);
  var sql ='SELECT * FROM books WHERE id=?';
  // Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)
  connection.query(sql, id, function (err, result) {
    if (err) {
      console.log(err);
      res.send('Error');
    } 
    else {
      res.status(200).json({
        data: result[0]

      });
    }
  });
})


router.put('/update/book/:id', (req, res) => {  
  let id = parseInt(req.params.id);
  console.log("u",id);
  var sql ='UPDATE books SET name=?, author=?, price=?, imgurl=?  WHERE id=?';
  let data = [req.body.name, req.body.author, req.body.price, req.body.imgurl, id]
  // Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)
  connection.query(sql, data, function (err, result) {
    if (err) {
      console.log(err);
      res.send('Error');
    } 
    else {
      res.send('Success! check phpmyAdmin');
    }
  });
})

module.exports = router;