<?php

final class Database
{
    private const DB_FILE = __DIR__ . '/../webshop.sqlite';
    private const SCHEMA_FILE = __DIR__ . '/../database/schema.sql';

    private static ?PDO $connection = null;

    public static function connect(): PDO
    {
        if (self::$connection === null) {
            $isNew = !file_exists(self::DB_FILE);

            self::$connection = new PDO('sqlite:' . self::DB_FILE, options: [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
            self::$connection->exec('PRAGMA foreign_keys = ON');

            if ($isNew) {
                self::reset();
            }
        }

        return self::$connection;
    }

    /** Drops everything and rebuilds the database from schema.sql. */
    public static function reset(): void
    {
        self::connect()->exec(file_get_contents(self::SCHEMA_FILE));
    }
}
