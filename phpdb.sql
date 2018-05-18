--
-- Dumping data for table `game`
--

INSERT INTO `game` (`gameid`, `user_Tag`, `user_level`, `user_score`) VALUES
(4, 'Admin', 1, 1),
(5, 'Admin', 1, 4),
(6, 'Admin', 1, 4),
(7, 'Admin', 1, 0),
(8, 'Admin', 1, 0),
(9, 'Admin', 2, 6),
(10, 'Admin', 1, 0),
(11, 'Benji', 1, 0),
(12, 'Majid', 2, 8),
(13, 'Majid', 2, 4),
(14, 'Benji', 2, 8),
(15, 'Admin', 1, 0),
(16, 'Admin', 3, 14),
(17, 'Joshwa', 2, 9),
(18, 'Joshwa', 1, 0),
(19, 'Admin', 1, 0),
(20, 'Admin', 2, 5),
(21, 'Benji', 7, 30),
(22, 'Benji', 1, 0);

-- --------------------------------------------------------

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`user_send`, `user_recieve`, `message`) VALUES
(1, 'Admin', 'Hello I am the Admin!'),
(2, 'Joshwa', 'Im a nice guy'),
(3, 'Andrew', 'Hello guess what my name is?'),
(4, 'Benji', 'Im not happy today'),
(5, 'Majid', 'Would you like to play the snake game with me?');

-- --------------------------------------------------------


-- Dumping data for table `rnmembers`
--

INSERT INTO `rnmembers` (`user`, `pass`, `email`) VALUES
('Admin', 'Admin1', 'andrewpeliza@hotmail.com'),
('Joshwa', 'Joshwa1', 'Joshwa@hotmail.com'),
('Marrie', 'Larry12', 'larry@hotmail.com'),
('Majid', 'Nest12', 'Majid@hotmail.com'),
('Benji', 'Benji1', 'Benji@hotmail.com'),
('Andrew', 'Andrew1', 'andrewpeliza@hotmail.com');

-- --------------------------------------------------------

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`user_id`, `user_name`, `user_pass`, `user_firstname`, `user_surname`, `dob`) VALUES
(1, 'Admin', 'Admin1', 'Andrew', 'Peliza', '1994-11-10'),
(2, 'Joshwa', 'Joshwa1', NULL, NULL, NULL),
(3, 'Marrie', 'Larry12', NULL, NULL, NULL),
(4, 'Majid', 'Nest12', NULL, NULL, NULL),
(5, 'Benji', 'Benji1', NULL, NULL, NULL),
(6, 'Andrew', 'Andrew1', 'Andrew', 'Peliza', '1994-11-10');

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `game`
--
ALTER TABLE `game`
MODIFY `gameid` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
MODIFY `user_send` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `userinfo`
--
ALTER TABLE `userinfo`
MODIFY `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
