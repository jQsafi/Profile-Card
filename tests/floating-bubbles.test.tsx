import React from 'react'
import { render, screen } from '@testing-library/react'
import FloatingBubblesBackground from '../components/floating-bubbles'

describe('FloatingBubblesBackground', () => {
  it('renders profile card with given props', () => {
    render(<FloatingBubblesBackground name="Test Name" title1="Title One" title2="Title Two" />)
    expect(screen.getByText('Test Name')).toBeInTheDocument()
    expect(screen.getByText('Title One')).toBeInTheDocument()
    expect(screen.getByText('Title Two')).toBeInTheDocument()
  })

  it('renders additional bubbles', () => {
    render(<FloatingBubblesBackground name="Test" title1="T1" title2="T2" />)
    const bubbles = screen.getAllByRole('presentation')
    expect(bubbles.length).toBeGreaterThan(0)
  })
})
