<?php

class Database
{
    private static ?PDO $connection = null;

    public static function connect(): PDO
    {
        if (self::$connection === null) {
            self::$connection = new PDO("sqlite:" . __DIR__ . "/../webshop.sqlite");
            self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Activate foreign keys for SQLite
            self::$connection->exec("PRAGMA foreign_keys = ON;");
        }

        return self::$connection;
    }
}
