/*
Navicat MySQL Data Transfer

Source Server         : blog
Source Server Version : 50513
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50513
File Encoding         : 65001

Date: 2018-09-22 11:23:27
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `comments`
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `comid` int(10) NOT NULL,
  `uid` int(10) DEFAULT NULL,
  `uname` varchar(10) DEFAULT NULL,
  `cid` int(10) DEFAULT NULL,
  `ctime` varchar(40) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`comid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comments
-- ----------------------------

-- ----------------------------
-- Table structure for `contents`
-- ----------------------------
DROP TABLE IF EXISTS `contents`;
CREATE TABLE `contents` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `tid` int(11) NOT NULL COMMENT '类型表的外键',
  `uid` int(11) NOT NULL COMMENT '用户表的外键',
  `title` varchar(30) CHARACTER SET utf8 NOT NULL COMMENT '文章标题',
  `addTime` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '文章添加时间',
  `description` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '描述',
  `content` varchar(2000) CHARACTER SET utf8 NOT NULL COMMENT '内容',
  `comments` varchar(200) CHARACTER SET utf8 DEFAULT NULL COMMENT '评论',
  `views` int(11) NOT NULL,
  PRIMARY KEY (`cid`),
  KEY `ttid` (`tid`),
  KEY `cuid` (`uid`),
  CONSTRAINT `cuid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`),
  CONSTRAINT `ttid` FOREIGN KEY (`tid`) REFERENCES `type` (`tid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of contents
-- ----------------------------
INSERT INTO contents VALUES ('1', '1', '2', '测试1', '2017,2,22 17:14:55:168', '测试1', '测试1', null, '0');
INSERT INTO contents VALUES ('2', '1', '2', '测试2', '2017,2,22 17:15:47:520', '测试2', '测试2', null, '0');
INSERT INTO contents VALUES ('3', '1', '2', '测试2', '2017,2,22 17:16:16:962', '测试2', '测试2', null, '0');
INSERT INTO contents VALUES ('4', '1', '2', '测试2', '2017,2,22 17:18:11:728', '测试2', '测试2', null, '0');
INSERT INTO contents VALUES ('5', '1', '2', '测试2', '2017,2,22 17:19:13:277', '测试2', '测试2', null, '0');
INSERT INTO contents VALUES ('6', '1', '2', '测试2', '2017,2,22 17:19:53:891', '测试2', '测试2', null, '0');
INSERT INTO contents VALUES ('7', '1', '2', '测试2', '2017,2,22 17:20:22:976', '测试2', '测试2', null, '0');
INSERT INTO contents VALUES ('8', '1', '2', '测试2', '2017,2,22 17:21:33:120', '测试2', '测试2', null, '0');
INSERT INTO contents VALUES ('9', '1', '2', '测试2', '2017,2,22 17:23:3:231', '测试2', '测试2', null, '0');
INSERT INTO contents VALUES ('10', '6', '2', '小测试', '2017,2,28 14:49:31:648', '小测试小测试小测试小测试', '小测试小测试小测试小测试小测试小测试小测试小测试', null, '0');
INSERT INTO contents VALUES ('11', '6', '2', '小测试', '2017,2,28 14:50:43:985', '小测试小测试小测试小测试', '小测试小测试小测试小测试小测试小测试小测试小测试', null, '0');
INSERT INTO contents VALUES ('12', '6', '2', '小测试', '2017,2,28 14:51:6:160', '小测试小测试小测试小测试', '小测试小测试小测试小测试小测试小测试小测试小测试', null, '0');
INSERT INTO contents VALUES ('13', '6', '2', '小测试', '2017,2,28 14:52:14:569', '小测试小测试小测试小测试', '小测试小测试小测试小测试小测试小测试小测试小测试', null, '0');
INSERT INTO contents VALUES ('14', '6', '2', '小测试', '2017,2,28 14:54:33:431', '小测试小测试小测试小测试', '小测试小测试小测试小测试小测试小测试小测试小测试', null, '0');
INSERT INTO contents VALUES ('15', '6', '2', '小测试', '2017,2,28 14:54:48:691', '小测试小测试小测试小测试', '小测试小测试小测试小测试小测试小测试小测试小测试', null, '0');
INSERT INTO contents VALUES ('16', '6', '2', '小测试', '2017,2,28 14:56:1:616', '小测试小测试小测试小测试', '小测试小测试小测试小测试小测试小测试小测试小测试', null, '0');
INSERT INTO contents VALUES ('17', '7', '2', 'zxc', '2017,2,28 15:9:14:101', 'zxczxczxczxczxczxc', 'zxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxc', null, '0');
INSERT INTO contents VALUES ('18', '3', '2', 'vcxvcx', '2017,2,28 15:10:44:697', 'vcxvcxvcxvcxvcxvcxvcxvcxvcxvcx', 'vcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcx', null, '0');
INSERT INTO contents VALUES ('19', '3', '2', 'vcxvcx', '2017,2,28 15:10:49:983', 'vcxvcxvcxvcxvcxvcxvcxvcxvcxvcx', 'vcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcx', null, '0');
INSERT INTO contents VALUES ('20', '2', '2', 'qe', '2017,2,28 15:12:20:253', 'adsa', 'vxcxzxczcxz', null, '0');
INSERT INTO contents VALUES ('21', '8', '2', 'zc', '2017,2,28 15:12:44:191', '12312', 'zcxzcxz', null, '0');

-- ----------------------------
-- Table structure for `type`
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `classs` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(2000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `tname` varchar(20) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`tid`),
  UNIQUE KEY `tname` (`tname`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of type
-- ----------------------------
INSERT INTO type VALUES ('fa-flag-o', '以前我没得选，现在我选择我全都要', '1', '全部');
INSERT INTO type VALUES ('fa-paper-plane-o', '元丰六年十月十二日夜，解衣欲睡，月色入户，欣然起行。念无与为乐者，遂至承天寺寻张怀民。怀民亦未寝，相与步于中庭。庭下如积水空明，水中藻荇交横，盖竹柏影也。何夜无月？何处无竹柏？但少闲人如吾两人者耳。', '2', '旅行小纪');
INSERT INTO type VALUES ('fa-laptop', '第一定律：机器人不得伤害人类个体，或者目睹人类个体将遭受危险而袖手不管 第二定律：机器人必须服从人给予它的命令，当该命令与第一定律冲突时例外 第三定律：机器人在不违反第一、第二定律的情况下要尽可能保护自己的生存。', '3', '电子科技、代码');
INSERT INTO type VALUES ('fa-code', '已而夕阳在山，人影散乱，太守归而宾客从也。树林阴翳，鸣声上下，游人去而禽鸟乐也。然而禽鸟知山林之乐，而不知人之乐；人知从太守游而乐，而不知太守之乐其乐也。醉能同其乐，醒能述以文者，太守也。太守谓谁？庐陵欧阳修也。', '4', '各类标签');
INSERT INTO type VALUES ('fa-headphones', '雾一早就散了，我在花园里干活。蜂鸟停在忍冬花上。这世上没有一样东西我想占有。我知道没有一个人值得我羡慕。任何我曾遭受的不幸，我都已忘记，想到故我今我同为一个人并不使我难为情。在我身上没有痛苦。直起腰来，我望见蓝色的大海和帆影。', '6', '音乐');
INSERT INTO type VALUES ('fa-heart-o', '对我们大多数人而言，人生就是这样——充满了令人不快的琐事而非伟大的悲剧；有着各种微弱无望的期待，却没有历史或小说里抛下一切的勇气与充满戏剧变数的恋爱故事。', '7', '生活健康');
INSERT INTO type VALUES ('fa-flag-o', '每个人的一生里，都会遇见某人，喜欢上他，有些人在适合的时间相遇，就好像在春天遇到花开，于是一切都会很好。 而有些人在错误的时间相遇，就像是在冬天隔着冰看见浮上来换气的鱼，鱼换完气沉到水下去，再也看不见了。 什么结果都没有。', '8', '目标（flag）');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(10) NOT NULL AUTO_INCREMENT,
  `uname` varchar(20) CHARACTER SET utf8 NOT NULL,
  `pwd` varchar(20) CHARACTER SET utf8 NOT NULL,
  `isAdmin` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO user VALUES ('1', 'fpc', 'a', '0');
INSERT INTO user VALUES ('2', 'leaf', 'a', '1');
INSERT INTO user VALUES ('3', 'wy', 'a', '0');
INSERT INTO user VALUES ('4', 'aaa', 'a', '0');
INSERT INTO user VALUES ('5', 'bbb', 'a', '0');
INSERT INTO user VALUES ('6', 'ccc', 'a', '0');
INSERT INTO user VALUES ('7', 'ddd', 'a', '0');
INSERT INTO user VALUES ('8', 'eee', 'b', '0');
INSERT INTO user VALUES ('9', 'gwx', 'c', '1');
INSERT INTO user VALUES ('10', 'wfx', 'h', '0');
