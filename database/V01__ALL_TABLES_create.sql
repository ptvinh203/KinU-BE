--
-- Table structure for table `account`
--
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthday` datetime NOT NULL,
  `gender` int NOT NULL,
  `currentBalance` bigint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_41dfcb70af895ddf9a53094515` (`username`)
);

--
-- Table structure for table `color`
--
CREATE TABLE `color` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `colorCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- Table structure for table `e_wallet`
--
CREATE TABLE `e_wallet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
  `pinCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `balance` decimal(15,2) NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ccf149a6d9d2548071bdd9e13c0` (`userId`),
  CONSTRAINT `FK_ccf149a6d9d2548071bdd9e13c0` FOREIGN KEY (`userId`) REFERENCES `account` (`id`)
);

--
-- Table structure for table `icon`
--
CREATE TABLE `icon` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `svgUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- Table structure for table `migrations`
--
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- Table structure for table `type_sprinding`
--
CREATE TABLE `type_sprinding` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `estimatedAmount` decimal(15,2) NOT NULL,
  `abbreviation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int DEFAULT NULL,
  `colorId` int DEFAULT NULL,
  `iconId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_fb3e42cb9940154393670fb24a1` (`userId`),
  KEY `FK_d386864cc16b3a4d3b52d226fd5` (`colorId`),
  KEY `FK_83c2524229af7b3cc91464a5ffa` (`iconId`),
  CONSTRAINT `FK_83c2524229af7b3cc91464a5ffa` FOREIGN KEY (`iconId`) REFERENCES `icon` (`id`),
  CONSTRAINT `FK_d386864cc16b3a4d3b52d226fd5` FOREIGN KEY (`colorId`) REFERENCES `color` (`id`),
  CONSTRAINT `FK_fb3e42cb9940154393670fb24a1` FOREIGN KEY (`userId`) REFERENCES `account` (`id`)
);

--
-- Table structure for table `expenditure`
--
CREATE TABLE `expenditure` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `dateSpinding` datetime NOT NULL,
  `paymentType` tinyint NOT NULL,
  `userId` int DEFAULT NULL,
  `typeSprindingId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_77eecfdc1c605914b53437aec49` (`userId`),
  KEY `FK_d40c3c3829e39943f2aea6bb181` (`typeSprindingId`),
  CONSTRAINT `FK_77eecfdc1c605914b53437aec49` FOREIGN KEY (`userId`) REFERENCES `account` (`id`),
  CONSTRAINT `FK_d40c3c3829e39943f2aea6bb181` FOREIGN KEY (`typeSprindingId`) REFERENCES `type_sprinding` (`id`)
);

--
-- Table structure for table `notification`
--
CREATE TABLE `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `typeNotifiction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL,
  `read` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1ced25315eb974b73391fb1c81b` (`userId`),
  CONSTRAINT `FK_1ced25315eb974b73391fb1c81b` FOREIGN KEY (`userId`) REFERENCES `account` (`id`)
);