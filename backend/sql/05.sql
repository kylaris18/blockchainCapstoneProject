CREATE TABLE `transactions` (
  `transactionId` int PRIMARY KEY AUTO_INCREMENT,
  `wholesalerId` int,
  `goodsId` int,
  `status` int,
  `deliverySendDate` datetime,
  `deliveryRecieveDate` datetime,
  `deliveryDesc` varchar(255),
  `createdAt` timestamp,
  `updatedAt` datetime
);

ALTER TABLE `transactions` ADD FOREIGN KEY (`goodsId`) REFERENCES `goods` (`goodsId`);

ALTER TABLE `transactions` ADD FOREIGN KEY (`wholesalerId`) REFERENCES `wholesalers` (`wholesalerId`);