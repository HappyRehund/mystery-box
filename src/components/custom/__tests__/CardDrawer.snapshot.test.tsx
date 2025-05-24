import { render } from '@testing-library/react'
import CartDrawer from '../CartDrawer'
import { CartProvider } from '@/lib/cart-context'

// Snapshot test naming convention: ComponentName.snapshot.test.tsx
describe('CartDrawer Snapshots', () => {
  it('should match snapshot when closed', () => {
    const { container } = render(
      <CartProvider>
        <CartDrawer isOpen={false} setIsOpen={() => {}} />
      </CartProvider>
    )
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when open with empty cart', () => {
    const { container } = render(
      <CartProvider>
        <CartDrawer isOpen={true} setIsOpen={() => {}} />
      </CartProvider>
    )
    expect(container).toMatchSnapshot()
  })
})