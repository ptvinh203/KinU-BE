-- Migration table
insert into migrations (id, timestamp, name)
values  (1, 1729576714801, 'NewMigration1729576714801'),
        (2, 1730540307094, 'NewMigration1730540307094'),
        (3, 1730543400801, 'NewMigration1730543400801'),
        (4, 1730635095763, 'NewMigration1730635095763'),
        (5, 1731925982979, 'NewMigration1731925982979');

-- Account table
insert into account (id, username, password, email, fullname, phone, birthday, gender, currentBalance)
values  (2, 'VinhThanh73', '$2a$10$uglVKVXRk0lqTFHx0oItPOMj73JGTOMQE1woYGvyfLKaEYv/Ez2wO', 'vinh@gmail.com', 'KinU', '012345678', '2003-01-01 00:00:00', 0, 10000000),
        (3, 'NgoTruong', '$2a$10$WrfHZqWqMaE48rkNtJBEG.H5vqMUlBwAsbg4mdjmNkDzNDbYJRGpq', 'truong@gmail.com', 'KinU', '012345678', '2003-01-01 00:00:00', 0, 10000000);

-- Color table
insert into color (id, name, colorCode)
values  (1, 'E0E0E0', '#E0E0E0'),
        (2, 'FFFBF3', '#FFFBF3'),
        (3, '90CDF4', '#90CDF4'),
        (4, 'F5F5F5', '#F5F5F5'),
        (5, '65100B', '#65100B'),
        (6, '515669', '#515669'),
        (7, 'FA508D', '#FA508D'),
        (8, 'E89E08', '#E89E08'),
        (9, '102C57', '#102C57'),
        (10, '6B7EDF', '#6B7EDF'),
        (11, '219653', '#219653'),
        (12, '00AC54', '#00AC54'),
        (13, '171314', '#171314'),
        (14, '1A1F36', '#1A1F36'),
        (15, 'C00045', '#C00045'),
        (16, '737373', '#737373'),
        (17, 'EE3E2C', '#EE3E2C'),
        (18, 'A5ACB8', '#A5ACB8'),
        (19, '452E02', '#452E02'),
        (20, 'FFFFFF', '#FFFFFF'),
        (21, 'FD5A33', '#FD5A33'),
        (22, 'E11616', '#E11616'),
        (23, '7F42FF', '#7F42FF'),
        (24, 'EB001B', '#EB001B'),
        (25, '00510C', '#00510C'),
        (26, 'E89B00', '#E89B00'),
        (27, '000000', '#000000'),
        (28, '697386', '#697386'),
        (29, '000300', '#000300'),
        (30, 'E95744', '#E95744');

-- Icon table
insert into icon (id, name, svgUrl)
values  (1, 'moneyBill', 'faMoneyBill'),
        (2, 'house', 'faHouse'),
        (3, 'magnifying-glass', 'faMagnifyingGlass'),
        (4, 'user', 'faUser'),
        (5, 'facebook', 'faFacebook'),
        (6, 'check', 'faCheck'),
        (7, 'download', 'faDownload'),
        (8, 'twitter', 'faTwitter'),
        (9, 'image', 'faImage'),
        (10, 'instagram', 'faInstagram'),
        (11, 'phone', 'faPhone'),
        (12, 'tiktok', 'faTiktok'),
        (13, 'bars', 'faBars'),
        (14, 'envelope', 'faEnvelope'),
        (15, 'linkedin', 'faLinkedin'),
        (16, 'star', 'faStar'),
        (17, 'location-dot', 'faLocationDot'),
        (18, 'github', 'faGithub'),
        (19, 'music', 'faMusic'),
        (20, 'wand-magic-sparkles', 'faWandMagicSparkles'),
        (21, 'heart', 'faHeart'),
        (22, 'arrow-right', 'faArrowRight'),
        (23, 'discord', 'faDiscord'),
        (24, 'circle-xmark', 'faCircleXmark'),
        (25, 'bomb', 'faBomb'),
        (26, 'poo', 'faPoo'),
        (27, 'camera-retro', 'faCameraRetro'),
        (28, 'xmark', 'faXmark'),
        (29, 'youtube', 'faYoutube'),
        (30, 'cloud', 'faCloud');

-- TypeSpending table
insert into kinu.type_sprinding (id, name, estimatedAmount, abbreviation, userId, colorId, iconId)
values  (1, 'Chi tiêu khác', 0.00, '', 2, 1, 1),
        (2, 'Chi tiêu khác', 0.00, '', 3, 1, 1),
        (3, 'Ăn uống', 2000000.00, 'AU', 2, 8, 21),
        (4, 'Quần áo', 500000.00, 'QA', 2, 24, 8),
        (5, 'Mỹ phẩm', 500000.00, 'MP', 2, 7, 4),
        (6, 'Y tế', 500000.00, 'YT', 2, 12, 20),
        (7, 'Giáo dục', 500000.00, 'GD', 2, 10, 14),
        (8, 'Tiền nhà', 3000000.00, 'TN', 2, 15, 2),
        (9, 'Internet', 100000.00, 'DT', 2, 6, 11),
        (10, 'Thú nuôi', 500000.00, 'TNN', 2, 24, 8),
        (11, 'Giải trí', 300000.00, 'GT', 2, 3, 25),
        (12, 'Chụp ảnh', 40000.00, 'CA', 2, 6, 9),
        (13, 'Ăn uống', 2000000.00, 'AU', 3, 8, 21),
        (14, 'Quần áo', 500000.00, 'QA', 3, 24, 8),
        (15, 'Mỹ phẩm', 500000.00, 'MP', 3, 7, 4),
        (16, 'Y tế', 500000.00, 'YT', 3, 12, 20),
        (17, 'Giáo dục', 500000.00, 'GD', 3, 10, 14),
        (18, 'Tiền nhà', 3000000.00, 'TN', 3, 15, 2),
        (19, 'Internet', 100000.00, 'DT', 3, 6, 11),
        (20, 'Thú nuôi', 500000.00, 'TNN', 3, 24, 8),
        (21, 'Giải trí', 300000.00, 'GT', 3, 3, 25),
        (22, 'Chụp ảnh', 40000.00, 'CA', 3, 6, 9);

-- Expenditure table

-- Notification table

-- E_Wallet table