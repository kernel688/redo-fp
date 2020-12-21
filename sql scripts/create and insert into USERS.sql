CREATE TABLE users(
	[date] DATE,
	[username] VARCHAR(20),
	[fullname] VARCHAR(200),
	[password] VARCHAR(20),
	[entered] VARCHAR(14),
	[lastupdated] VARCHAR(14)
);


INSERT INTO users (
	[date],
	[username],
	[fullname],
	[password],
	[entered],
	[lastupdated]
)
SELECT '2020-10-20','kernel688','Juan Camilo Martinez Cano','k688','20201020224743','20201020224743'