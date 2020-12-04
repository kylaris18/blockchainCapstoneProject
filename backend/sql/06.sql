CREATE TABLE `reviews` (
  `reviewId` int PRIMARY KEY AUTO_INCREMENT,
  `userId` int,
  `reviewerId` int,
  `score` int,
  `reviewDesc` varchar(255),
  `createdAt` timestamp,
  `updatedAt` timestamp
);

ALTER TABLE `users` ADD FOREIGN KEY (`userId`) REFERENCES `reviews` (`userId`);

ALTER TABLE `users` ADD FOREIGN KEY (`userId`) REFERENCES `reviews` (`reviewerId`);