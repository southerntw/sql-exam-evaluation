This is the old version of sql-exam-evaluation, query-checking only version.

## Prerequisites
- NodeJS
- MySQL Engine / MariaDB

## Install
1. Install all npm packages
```
npm i
```
2. Run MySQL Script to create database schema
```sql
-- Dumping database structure for exam
CREATE DATABASE IF NOT EXISTS `exam` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `exam`;

-- Dumping structure for table exam.questions
CREATE TABLE IF NOT EXISTS `questions` (
  `id` varchar(50) NOT NULL,
  `soal` varchar(50) NOT NULL,
  `jawaban` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
```
3. Dump data into the database through an SQL script or CSV file.

## Run
```
npm start
```

## Notes
- The website will be hosted on localhost at port 3000, while the backend operates on a proxy at port 3001.
- When making changes to the answers, use database management tools like MySQL Workbench, HeidiSQL, Datagrip, etc.
- Consider utilizing data dumping methods available in your chosen database management tool for optimal efficiency.
