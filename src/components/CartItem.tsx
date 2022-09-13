import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import StoreItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

interface CartItemProps {
  id: number;
  quantity: number;
}

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeCartQuantiry } = useShoppingCart();
  const item = StoreItems.find((item) => item.id === id);
  if (item == null) return null;
  return (
    <>
      <Stack
        direction="horizontal"
        gap={2}
        className="d-flex align-items-center"
      >
        <img
          src={item.imgUrl}
          style={{ width: 125, height: 75, objectFit: "cover" }}
        />
        <div className="me-auto">
          <div>
            {item.name}
            {quantity > 1 ? (
              <span className="text-muted ms-1" style={{ fontSize: ".65rem" }}>
                x{quantity}
              </span>
            ) : null}

            <div className="text-muted" style={{ fontSize: ".65rem" }}>
              {formatCurrency(item.price)}
            </div>
          </div>
        </div>
        <div style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price * quantity)}
        </div>
        <Button
          variant="outline-danger"
          onClick={() => removeCartQuantiry(id)}
          size="sm"
        >
          &times;
        </Button>
      </Stack>
    </>
  );
};

export default CartItem;
