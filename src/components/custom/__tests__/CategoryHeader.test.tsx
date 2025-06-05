// src/app/api/categories/route.test.ts
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CategoryHeader from '../CategoryHeader'

describe('CategoryHeader', () => {
  const mockCategory = {
    id: '1',
    name: 'Test Category',
    description: 'Test Description',
    totalItems: 5
  }

  it('renders category name correctly', () => {
    render(<CategoryHeader category={mockCategory} />)
    expect(screen.getByText('Test Category')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<CategoryHeader category={mockCategory} />)
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('renders total items badge when provided', () => {
    render(<CategoryHeader category={mockCategory} />)
    expect(screen.getByText('5 items')).toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    const categoryWithoutDescription = {
      id: '1',
      name: 'Test Category',
      totalItems: 5
    }
    render(<CategoryHeader category={categoryWithoutDescription} />)
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument()
  })

  it('does not render total items badge when not provided', () => {
    const categoryWithoutTotal = {
      id: '1',
      name: 'Test Category',
      description: 'Test Description'
    }
    render(<CategoryHeader category={categoryWithoutTotal} />)
    expect(screen.queryByText(/items/)).not.toBeInTheDocument()
  })
})