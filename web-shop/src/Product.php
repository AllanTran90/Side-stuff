<?php

require_once 'Database.php';

class Product
{
    public static function all(): array
    {
        $db = Database::connect();
        return $db->query("SELECT * FROM products")->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function find(int $id): ?array
    {
        $db = Database::connect();
        $stmt = $db->prepare("SELECT * FROM products WHERE id = ?");
        $stmt->execute([$id]);
        $product = $stmt->fetch(PDO::FETCH_ASSOC);

        return $product ?: null;
    }
}
