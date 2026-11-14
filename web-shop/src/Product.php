<?php

final class Product
{
    public static function all(): array
    {
        return Database::connect()->query('SELECT * FROM products ORDER BY id')->fetchAll();
    }

    public static function find(int $id): ?array
    {
        $stmt = Database::connect()->prepare('SELECT * FROM products WHERE id = ?');
        $stmt->execute([$id]);

        return $stmt->fetch() ?: null;
    }

    /** @return array<int, array> products keyed by id */
    public static function findMany(array $ids): array
    {
        if (!$ids) {
            return [];
        }

        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $stmt = Database::connect()->prepare("SELECT * FROM products WHERE id IN ($placeholders)");
        $stmt->execute(array_values($ids));

        return array_column($stmt->fetchAll(), null, 'id');
    }

    public static function others(int $exceptId): array
    {
        $stmt = Database::connect()->prepare('SELECT * FROM products WHERE id != ? ORDER BY id');
        $stmt->execute([$exceptId]);

        return $stmt->fetchAll();
    }
}
