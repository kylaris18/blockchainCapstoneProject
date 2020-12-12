CREATE TABLE `reviews` (
  `reviewId` int PRIMARY KEY AUTO_INCREMENT,
  `userId` int,
  `reviewerId` int,
  `score` int,
  `reviewDesc` varchar(255),
  `createdAt` timestamp,
  `updatedAt` datetime
);

ALTER TABLE `reviews` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`reviewerId`) REFERENCES `users` (`userId`);