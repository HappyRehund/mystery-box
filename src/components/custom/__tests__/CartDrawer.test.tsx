import '@testing-library/jest-dom'
import { render, screen, fireEvent, act } from '@testing-library/react'
import CartDrawer from '../CartDrawer'
import { CartProvider } from '@/lib/cart-context'

describe('CartDrawer', () => {
  const mockSetIsOpen = jest.fn()
  
  // Helper function to render with provider
  const renderCartDrawer = async (isOpen = true) => {
    let result;
    await act(async () => {
      result = render(
        <CartProvider>
          <CartDrawer isOpen={isOpen} setIsOpen={mockSetIsOpen} />
        </CartProvider>
      );
    });
    return result;
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render empty cart message when no items', async () => {
    await renderCartDrawer();
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('should close drawer when clicking backdrop', async () => {
    await renderCartDrawer();
    const backdrop = screen.getByTestId('cart-backdrop');
    fireEvent.click(backdrop);
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it('should close drawer when clicking close button', async () => {
    await renderCartDrawer();
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });
});