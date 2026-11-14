<?php

/**
 * The cart lives in the session as [productId => quantity].
 */
final class Cart
{
    public const MAX_QUANTITY = 10;

    public static function add(int $productId, int $quantity = 1): void
    {
        self::set($productId, self::quantityOf($productId) + $quantity);
    }

    /** Sets an exact quantity. 0 or less removes the product. */
    public static function set(int $productId, int $quantity): void
    {
        if ($quantity <= 0) {
            unset($_SESSION['cart'][$productId]);
            return;
        }

        $_SESSION['cart'][$productId] = min($quantity, self::MAX_QUANTITY);
    }

    public static function remove(int $productId): void
    {
        self::set($productId, 0);
    }

    public static function clear(): void
    {
        $_SESSION['cart'] = [];
    }

    public static function quantityOf(int $productId): int
    {
        return $_SESSION['cart'][$productId] ?? 0;
    }

    public static function count(): int
    {
        return array_sum($_SESSION['cart'] ?? []);
    }

    /**
     * Cart rows joined with product data. Products that no longer
     * exist are dropped from the cart.
     *
     * @return list<array{product: array, quantity: int, subtotal: int}>
     */
    public static function lines(): array
    {
        $items = $_SESSION['cart'] ?? [];
        $products = Product::findMany(array_keys($items));
        $lines = [];

        foreach ($items as $id => $quantity) {
            if (!isset($products[$id])) {
                self::remove($id);
                continue;
            }

            $lines[] = [
                'product'  => $products[$id],
                'quantity' => $quantity,
                'subtotal' => $products[$id]['price'] * $quantity,
            ];
        }

        return $lines;
    }

    public static function total(array $lines): int
    {
        return array_sum(array_column($lines, 'subtotal'));
    }
}
