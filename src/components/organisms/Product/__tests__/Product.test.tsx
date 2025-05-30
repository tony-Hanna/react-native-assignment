import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Product } from '../Product'
import { ThemeProvider } from '../../../../store/themeContext'

// Mock navigation
const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate
  })
}))

// Mock react-native-config
jest.mock('react-native-config', () => ({
  default: {
    API_URL: 'https://mock-api.com/'
  }
}))

const wrapper = ({ children }: any) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe('Product Component', () => {
  const props = {
    _id: '1',
    title: 'Test title',
    description: 'sample description',
    price: 25.5,
    createdAt: '2023-01-01T00:00:00Z',
    images: [{ url: '/images/sample.jpg' }]
  }

  it('matches snapshot', () => {
    const { toJSON } = render(<Product {...props} />, { wrapper });
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders product component', () => {
    const {getByText} = render(<Product {...props}/>, {wrapper})

    expect(getByText('Test title')).toBeTruthy()
    expect(getByText('sample description')).toBeTruthy()
    expect(getByText('$25.5')).toBeTruthy()
    expect(getByText('Jan 1, 2023')).toBeTruthy()
  })

  it('navigates to Details screen when pressed', () => {
    const { getByText } = render(<Product {...props} />, { wrapper })
       //  Navigate up the component tree to find the Pressable component
    // parent?.parent means:
    // - first parent: the View containing the title
    // - second parent: the Pressable component that wraps everything
    const titleElement = getByText('Test title')
    const productCard = titleElement.parent?.parent
    if (!productCard) throw new Error('Could not find product card element')
    
    fireEvent.press(productCard)

    expect(mockNavigate).toHaveBeenCalledWith('Details', { id: '1' })
  })
})
