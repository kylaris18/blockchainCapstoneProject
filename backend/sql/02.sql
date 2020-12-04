CREATE TABLE `wholesalers` (
  `wholesalerId` int PRIMARY KEY AUTO_INCREMENT,
  `userId` int,
  `firstName` varchar(255),
  `lastName` varchar(255),
  `storeName` varchar(255),
  `addressLine` varchar(255),
  `city` varchar(255),
  `province` varchar(255),
  `zipCode` varchar(255),
  `latlong` varchar(255),
  `mobile` varchar(255),
  `wholesalerDesc` varchar(255),
  `createdAt` timestamp,
  `updatedAt` timestamp
);

CREATE TABLE `farmers` (
  `farmerId` int PRIMARY KEY AUTO_INCREMENT,
  `userId` int,
  `firstName` varchar(255),
  `lastName` varchar(255),
  `addressLine` varchar(255),
  `city` varchar(255),
  `province` varchar(255),
  `zipCode` varchar(255),
  `latlong` varchar(255),
  `farmerType` varchar(255),
  `mainGoods` varchar(255),
  `mobile` varchar(255),
  `farmerDesc` varchar(255),
  `createdAt` timestamp,
  `updatedAt` timestamp
);

ALTER TABLE `farmers` 
ADD FOREIGN KEY (`userId`) 
REFERENCES `users`(`userId`) 
ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `wholesalers` 
ADD FOREIGN KEY (`userId`) 
REFERENCES `users`(`userId`) 
ON DELETE RESTRICT ON UPDATE RESTRICT;

