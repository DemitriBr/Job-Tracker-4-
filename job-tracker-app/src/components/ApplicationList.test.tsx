import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ApplicationList } from './ApplicationList'
import { useApplicationStore } from '../store/applicationStore'
import { useUIStore } from '../store/uiStore'
import { ApplicationStatus, JobType } from '../types'

describe('ApplicationList', () => {
  beforeEach(() => {
    // Reset stores before each test
    useApplicationStore.setState({ applications: [] })
    useUIStore.setState({ editingApplicationId: null })
  })

  it('should display "No applications yet" message when empty', () => {
    render(<ApplicationList />)
    expect(screen.getByText('No applications yet. Add one to get started!')).toBeInTheDocument()
  })

  it('should display applications when they exist', () => {
    // Add mock applications to the store
    useApplicationStore.setState({
      applications: [
        {
          id: '1',
          company: 'Test Company 1',
          jobTitle: 'Software Engineer',
          dateApplied: '2024-01-01',
          status: ApplicationStatus.Applied,
          jobType: JobType.FullTime
        },
        {
          id: '2',
          company: 'Test Company 2',
          jobTitle: 'Frontend Developer',
          dateApplied: '2024-01-02',
          status: ApplicationStatus.Interviewing,
          jobType: JobType.FullTime
        }
      ]
    })

    render(<ApplicationList />)
    
    expect(screen.getByText('Test Company 1')).toBeInTheDocument()
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('Status: Applied')).toBeInTheDocument()
    
    expect(screen.getByText('Test Company 2')).toBeInTheDocument()
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('Status: Interviewing')).toBeInTheDocument()
  })

  it('should call deleteApplication when delete button is clicked', () => {
    const mockDeleteApplication = vi.fn()
    useApplicationStore.setState({
      applications: [{
        id: '1',
        company: 'Test Company',
        jobTitle: 'Software Engineer',
        dateApplied: '2024-01-01',
        status: ApplicationStatus.Applied,
        jobType: JobType.FullTime
      }],
      deleteApplication: mockDeleteApplication
    })

    // Mock window.confirm
    vi.spyOn(window, 'confirm').mockReturnValue(true)

    render(<ApplicationList />)
    
    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)
    
    expect(mockDeleteApplication).toHaveBeenCalledWith('1')
  })

  it('should call startEditing when edit button is clicked', () => {
    const mockStartEditing = vi.fn()
    useUIStore.setState({ startEditing: mockStartEditing })
    
    useApplicationStore.setState({
      applications: [{
        id: '1',
        company: 'Test Company',
        jobTitle: 'Software Engineer',
        dateApplied: '2024-01-01',
        status: ApplicationStatus.Applied,
        jobType: JobType.FullTime
      }]
    })

    render(<ApplicationList />)
    
    const editButton = screen.getByText('Edit')
    fireEvent.click(editButton)
    
    expect(mockStartEditing).toHaveBeenCalledWith('1')
  })
})