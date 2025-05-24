import { render } from '@testing-library/react'
import CategoryHeader from '../CategoryHeader'

describe('CategoryHeader Snapshots', () => {
  it('should match snapshot with all props', () => {
    const mockCategory = {
      id: '1',
      name: 'Test Category',
      description: 'Test Description',
      totalItems: 5
    }

    const { container } = render(<CategoryHeader category={mockCategory} />)
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot without optional props', () => {
    const mockCategory = {
      id: '1',
      name: 'Test Category'
    }

    const { container } = render(<CategoryHeader category={mockCategory} />)
    expect(container).toMatchSnapshot()
  })
})