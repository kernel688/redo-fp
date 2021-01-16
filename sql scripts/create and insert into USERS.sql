CREATE TABLE users(
	[date] DATE,
	[username] VARCHAR(20),
	[fullname] VARCHAR(200),
	[password] VARCHAR(20),
	[entered] BIGINT,
	[lastupdated] BIGINT
);

CREATE TABLE [REDO_FP].[dbo].transactions(
  [_id] INT IDENTITY(1,1) PRIMARY KEY,
	[date] DATE,
  [type] VARCHAR(20),
  [amount] DECIMAL(12,2),
	[description] VARCHAR(200),
	[entered] BIGINT,
	[lastupdated] BIGINT
);

CREATE TABLE [REDO_FP].[dbo].providers(
	[date] DATE,
  [idnumber] BIGINT,
  [fullname] VARCHAR(200),
  [country] VARCHAR(50),
	[hidden] BIT,
  [entered] BIGINT,
	[lastupdated] BIGINT,
  PRIMARY KEY (idnumber,country)
);
