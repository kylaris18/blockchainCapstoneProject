CREATE TABLE `goods` (
  `goodsId` int PRIMARY KEY AUTO_INCREMENT,
  `farmerId` int,
  `goodsName` varchar(255),
  `quantityType` varchar(255),
  `quantityValue` varchar(255),
  `amountPerUnit` varchar(255),
  `amount` varchar(255),
  `additionalDesc` varchar(255),
  `plantationDate` datetime,
  `harvestDate` datetime,
  `createdAt` timestamp,
  `updatedAt` datetime
);

ALTER TABLE `goods` ADD FOREIGN KEY (`farmerId`) REFERENCES `farmers` (`farmerId`);