var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password:"",
database: "bamazon"
});

var id = '';
var qty, total, itemPrice = 0;

connection.connect(function(err) {
	if (err) console.log(err);
		inquireBuy();
});

function inquireBuy() {
 // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "item_id",
        type: "input",
        message: "What is the product ID you'd like to purchase?"
      },
      {
        name: "stock_quantity",
        type: "input",
        message: "How many units of this product would you like to purchase?"
      },
    ])
    .then(function(answer) {
		// pass answer answer.id and answer.qty for sql select statement
		id = answer.item_id;
		qty = answer.stock_quantity;
    	// pass id and qty to 
    	calcItemQty(id, qty);
    });
}

function calcItemQty(id, qty) {
	// select & compare item quantity and prompt user if out of stock
	connection.query(
		"SELECT * FROM products WHERE item_id = ?", id, function(err, res) {
			id = res[0].item_id;
			price = res[0].price;
			calcPrice(qty, price);
			console.log(total);
			// try to update database
			try {
				// if length of result is less than zero prompt user
				if (res.length < 1) {
					console.log("Insufficient Quantity!");
					// else update product by passing selected id to update function
				} else {
					// execute update function
				updateProductsDb(res[0].item_id);
				console.log("\n\nOrder successfully placed!");
				// trim to 2 characters past decimal point
				console.log("Total Cost: $", total.toFixed(2));
				}
			}
			// catch error if unsuccessful
			catch(err) {
				console.log(err);
			}
		});
}

function updateProductsDb(id, total) {
	// update products db to reflect current quantity
	connection.query(
		"UPDATE products SET stock_quantity = stock_quantity - 1 WHERE item_id = ?", id, function(err, res) {
			try {
				console.log("\n\nResult: ", res);
			}
			catch(err) {
				console.log(err);
				}
		});
}

function calcPrice(qty, price) {
	// total is equal to quantity entered by customer times price retrieved from db
	total = qty * price;
}


 
