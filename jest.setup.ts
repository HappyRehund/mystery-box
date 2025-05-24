import '@testing-library/jest-dom'
import 'whatwg-fetch'
import { act } from '@testing-library/react'

// Mock fetch calls
global.fetch = jest.fn(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ id: 'test-order-id', items: [] })
  })
) as jest.Mock;

global.fetch = jest.fn((url) => {
  if (url.includes('/api/mystery-boxes/')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        id: '1',
        name: 'Test Box',
        price: 99.99,
        imageUrl: '/test-image.jpg'
      })
    });
  }
  if (url.includes('/api/orders')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ 
        id: 'test-order-id', 
        items: [] 
      })
    });
  }
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({})
  });
}) as jest.Mock;

// Mock localStorage with all required Storage interface properties
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
  key: jest.fn(),
  length: 0
} as Storage;

global.localStorage = localStorageMock;

// Mock toast notifications
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  }
}));