/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50518
Source Host           : localhost:3306
Source Database       : case

Target Server Type    : MYSQL
Target Server Version : 50518
File Encoding         : 65001

Date: 2016-05-26 16:33:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for workouts
-- ----------------------------
DROP TABLE IF EXISTS `workouts`;
CREATE TABLE `workouts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `reps` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `lbs` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
