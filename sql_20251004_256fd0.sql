-- Создание базы данных
IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'ToursDB')
BEGIN
    CREATE DATABASE ToursDB;
END
GO

USE ToursDB;
GO

-- Создание таблицы отелей
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Hotels' AND xtype='U')
BEGIN
    CREATE TABLE Hotels (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Name NVARCHAR(100) NOT NULL,
        CountOfStars INT NOT NULL CHECK (CountOfStars BETWEEN 1 AND 5),
        CountryCode NVARCHAR(2) NOT NULL,
        Description NVARCHAR(500) NULL,
        CreatedDate DATETIME2 DEFAULT GETDATE()
    );

    -- Добавление тестовых данных
    INSERT INTO Hotels (Name, CountOfStars, CountryCode, Description) VALUES
    ('Grand Hotel', 5, 'US', 'Роскошный отель в центре города с五星 сервисом'),
    ('Sea View Resort', 4, 'ES', 'Отель с видом на море и私人 пляжем'),
    ('Mountain Lodge', 3, 'FR', 'Уютный отель в горах с камином'),
    ('City Inn', 2, 'DE', 'Бюджетный отель для бизнес-поездок'),
    ('Beach Paradise', 5, 'IT', 'Эксклюзивный пляжный курорт премиум класса'),
    ('Tokyo Tower Hotel', 4, 'JP', 'Отель с видом на Токийскую башню'),
    ('Moscow Grand', 5, 'RU', 'Пятизвездочный отель в центре Москвы'),
    ('Paris Romance', 3, 'FR', 'Романтический отель в Париже'),
    ('Berlin Modern', 4, 'DE', 'Современный дизайн-отель'),
    ('London Royal', 5, 'GB', 'Королевский сервис в центре Лондона');

    PRINT 'База данных ToursDB создана успешно!';
    PRINT 'Добавлено ' + CAST(@@ROWCOUNT AS VARCHAR) + ' тестовых записей.';
END
ELSE
BEGIN
    PRINT 'База данных ToursDB уже существует.';
END
GO

-- Проверка данных
SELECT 
    Id,
    Name AS 'Название',
    CountOfStars AS 'Звезды',
    CountryCode AS 'Код страны',
    Description AS 'Описание'
FROM Hotels
ORDER BY Id;
GO