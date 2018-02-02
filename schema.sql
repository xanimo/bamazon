
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT, 
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(20) NOT NULL,
price DECIMAL(10, 4) NOT NULL,
stock_quantity INTEGER NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO 
products 
(product_name, department_name, price, stock_quantity)
VALUES
('Product 1', 'Department 1', 19.99, 10),
('Product 2', 'Department 2', 29.99, 20),
('Product 3', 'Department 3', 39.99, 30),
('Product 4', 'Department 4', 49.99, 40),
('Product 5', 'Department 5', 59.99, 50),
('Product 6', 'Department 6', 69.99, 60),
('Product 7', 'Department 7', 79.99, 70),
('Product 8', 'Department 8', 89.99, 80),
('Product 9', 'Department 9', 99.99, 900),
('Product 10', 'Department 10', 109.99, 1000);

SELECT * FROM products;

UPDATE products
SET stock_quantity = stock_quantity - 1
WHERE item_id = 1;