/* drop */
DROP TABLE IF EXISTS `rpoint_amount`;

/* create */
create table IF not exists rpoint_payment
(
 id               INT AUTO_INCREMENT,
 issue_date       DATE NOT NULL, /* 発行日 */
 service_name     VARCHAR(20) NOT NULL, /* サービス名 */
 type             VARCHAR(20) NOT NULL,
 amount           INT NOT NULL, /* 金額 */
 memo             VARCHAR(100), /* 備考 */
 effective_date   DATE , /* 有効日（抽出） */
 place            VARCHAR(100) , /* 店名（抽出） */
 credate_date     Datetime DEFAULT NULL,
 update_date      Datetime DEFAULT NULL,
    PRIMARY KEY (id)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
