--
-- Database: `blockchaincapstone`
--

CREATE TABLE `blockchaincapstone`.`users` ( 
  `userId` INT NOT NULL AUTO_INCREMENT , 
  `username` VARCHAR(50) NOT NULL , 
  `password` VARCHAR(150) NOT NULL , 
  `salt` VARCHAR(50) NOT NULL , 
  `createdAt` TIMESTAMP NOT NULL , 
  `updatedAt` TIMESTAMP NOT NULL , 
  PRIMARY KEY (`userId`)
) ENGINE = InnoDB;
