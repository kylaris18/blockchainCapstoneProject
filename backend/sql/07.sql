CREATE TABLE `status` ( 
    `code` INT(2) NOT NULL , 
    `status` VARCHAR(20) NOT NULL , 
    PRIMARY KEY (`code`)
) ENGINE = InnoDB;

ALTER TABLE `transactions` 
CHANGE `status` `status` INT(2) NOT NULL;

ALTER TABLE `transactions` ADD FOREIGN KEY (`status`) 
REFERENCES `status`(`code`) ON DELETE RESTRICT ON UPDATE RESTRICT;

INSERT INTO `status` (`code`, `status`) VALUES 
('1', 'Order Processed'), 
('2', 'Paid'), 
('3', 'For Shipment'), 
('4', 'In Transit'), 
('5', 'Goods Received'), 
('-1', 'For Return'), 
('-2', 'Order Refunded'), 
('-3', 'Order Cancelled')