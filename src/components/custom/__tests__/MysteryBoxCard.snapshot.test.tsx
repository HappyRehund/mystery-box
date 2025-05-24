import { render, act } from "@testing-library/react";
import MysteryBoxCard from "../MysteryBoxCard";
import { CartProvider } from "@/lib/cart-context";

describe("MysteryBoxCard Snapshots", () => {
  const mockProps = {
    id: "1",
    name: "Test Box",
    description: "Test Description",
    price: 99.99,
    imageUrl: "/test-image.jpg",
    categoryName: "Test Category",
    onAddToCart: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should match snapshot with all props", async () => {
    let container;
    await act(async () => {
      const result = render(
        <CartProvider>
          <MysteryBoxCard {...mockProps} />
        </CartProvider>
      );
      container = result.container;
    });

    // Update snapshots to match current state
    await act(async () => {
      // Wait for any pending state updates
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot without optional props", async () => {
    let container;
    await act(async () => {
      const result = render(
        <CartProvider>
          <MysteryBoxCard
            id={mockProps.id}
            name={mockProps.name}
            price={mockProps.price}
            onAddToCart={mockProps.onAddToCart}
          />
        </CartProvider>
      );
      container = result.container;
    });
    expect(container).toMatchSnapshot();
  });
});
