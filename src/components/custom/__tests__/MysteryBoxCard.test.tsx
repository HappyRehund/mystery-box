import "@testing-library/jest-dom";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import MysteryBoxCard from "../MysteryBoxCard";
import { CartProvider } from "@/lib/cart-context";

describe("MysteryBoxCard", () => {
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
  const renderCard = async () => {
    let result;
    await act(async () => {
      result = render(
        <CartProvider>
          <MysteryBoxCard {...mockProps} />
        </CartProvider>
      );
    });
    // Wait for any effects to complete
    await waitFor(() => expect(screen.getByRole("button")).toBeInTheDocument());
    return result;
  };

  it("shows loading state when adding to cart", async () => {
    await renderCard();
    const addButton = screen.getByRole("button");
    
    // Initial state
    expect(addButton).toHaveTextContent("Add to Cart");
    
    // Click button and wait for loading state
    await act(async () => {
      fireEvent.click(addButton);
      await waitFor(() => {
        expect(addButton).toHaveTextContent("Adding...");
      });
    });
  });

  it("renders mystery box details correctly", async () => {
    await renderCard();

    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description!)).toBeInTheDocument();
    expect(screen.getByText(mockProps.categoryName!)).toBeInTheDocument();
    expect(screen.getByText("Rp 99,99")).toBeInTheDocument();
  });

  it("renders image with correct attributes", async () => {
    await renderCard();

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src");
    expect(image).toHaveAttribute("alt", mockProps.name);
  });

  it("renders with default image when imageUrl is not provided", async () => {
    await act(async () => {
      render(
        <CartProvider>
          <MysteryBoxCard {...mockProps} imageUrl={undefined} />
        </CartProvider>
      );
    });

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src");
  });

  it("shows loading state when adding to cart", async () => {
    await renderCard();

    const addButton = screen.getByRole("button");
    expect(addButton).toHaveTextContent("Add to Cart");

    fireEvent.click(addButton);
    expect(addButton).toHaveTextContent("Adding...");
  });

  it("has correct links to mystery box detail page", async () => {
    await renderCard();

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("href", `/mystery-box/${mockProps.id}`);
    });
  });
});
