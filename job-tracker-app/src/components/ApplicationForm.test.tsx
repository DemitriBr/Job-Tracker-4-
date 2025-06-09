import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ApplicationForm } from './ApplicationForm'
import { useApplicationStore } from '../store/applicationStore'
import { useUIStore } from '../store/uiStore'
import { ApplicationStatus, JobType } from '../types'

// Mock the stores
vi.mock('../store/applicationStore')
vi.mock('../store/uiStore')

describe('ApplicationForm', () => {
  const mockAddApplication = vi.fn()
  const mockUpdateApplication = vi.fn()
  const mockStopEditing = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useApplicationStore as any).mockReturnValue({
      addApplication: mockAddApplication,
      updateApplication: mockUpdateApplication,
      applications: []
    })
    ;(useUIStore as any).mockReturnValue({
      stopEditing: mockStopEditing
    })
  })

  it('should render all form fields', () => {
    render(<ApplicationForm />)
    
    expect(screen.getByLabelText('Company *')).toBeInTheDocument()
    expect(screen.getByLabelText('Job Title *')).toBeInTheDocument()
    expect(screen.getByLabelText('Date Applied *')).toBeInTheDocument()
    expect(screen.getByLabelText('Status *')).toBeInTheDocument()
    expect(screen.getByLabelText('Job Type')).toBeInTheDocument()
    expect(screen.getByLabelText('Job Posting Link')).toBeInTheDocument()
    expect(screen.getByLabelText('Salary Range')).toBeInTheDocument()
    expect(screen.getByLabelText('Contact Info')).toBeInTheDocument()
    expect(screen.getByLabelText('Notes')).toBeInTheDocument()
    expect(screen.getByText('Add Application')).toBeInTheDocument()
  })

  it('should call addApplication on form submission with valid data', () => {
    render(<ApplicationForm />)
    
    // Fill in required fields
    fireEvent.change(screen.getByLabelText('Company *'), {
      target: { value: 'Test Company' }
    })
    fireEvent.change(screen.getByLabelText('Job Title *'), {
      target: { value: 'Software Engineer' }
    })
    fireEvent.change(screen.getByLabelText('Date Applied *'), {
      target: { value: '2024-01-01' }
    })

    // Submit form
    fireEvent.click(screen.getByText('Add Application'))

    expect(mockAddApplication).toHaveBeenCalledWith({
      company: 'Test Company',
      jobTitle: 'Software Engineer',
      dateApplied: '2024-01-01',
      status: ApplicationStatus.Applied,
      jobType: JobType.FullTime,
      link: '',
      salaryRange: '',
      contactInfo: '',
      notes: ''
    })
  })

  it('should clear form after successful submission', () => {
    render(<ApplicationForm />)
    
    const companyInput = screen.getByLabelText('Company *') as HTMLInputElement
    const jobTitleInput = screen.getByLabelText('Job Title *') as HTMLInputElement

    // Fill in fields
    fireEvent.change(companyInput, { target: { value: 'Test Company' } })
    fireEvent.change(jobTitleInput, { target: { value: 'Software Engineer' } })

    // Submit form
    fireEvent.click(screen.getByText('Add Application'))

    // Check that fields are cleared
    expect(companyInput.value).toBe('')
    expect(jobTitleInput.value).toBe('')
  })

  it('should pre-fill form when editing', () => {
    const mockApp = {
      id: '1',
      company: 'Existing Company',
      jobTitle: 'Existing Title',
      dateApplied: '2024-01-01',
      status: ApplicationStatus.Interviewing,
      jobType: JobType.Contract,
      salaryRange: '$100k-$120k',
      notes: 'Some notes'
    }
    
    ;(useApplicationStore as any).mockReturnValue({
      addApplication: mockAddApplication,
      updateApplication: mockUpdateApplication,
      applications: [mockApp]
    })

    render(<ApplicationForm applicationId="1" />)
    
    expect(screen.getByDisplayValue('Existing Company')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Existing Title')).toBeInTheDocument()
    expect(screen.getByDisplayValue('2024-01-01')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Interviewing')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Contract')).toBeInTheDocument()
    expect(screen.getByDisplayValue('$100k-$120k')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Some notes')).toBeInTheDocument()
  })

  it('should call updateApplication when submitting in edit mode', () => {
    const mockApp = {
      id: '1',
      company: 'Existing Company',
      jobTitle: 'Existing Title',
      dateApplied: '2024-01-01',
      status: ApplicationStatus.Applied,
      jobType: JobType.FullTime
    }
    
    ;(useApplicationStore as any).mockReturnValue({
      addApplication: mockAddApplication,
      updateApplication: mockUpdateApplication,
      applications: [mockApp]
    })

    render(<ApplicationForm applicationId="1" />)
    
    // Change a field
    fireEvent.change(screen.getByLabelText('Status *'), {
      target: { value: ApplicationStatus.Interviewing }
    })

    // Submit form
    fireEvent.click(screen.getByText('Update Application'))

    expect(mockUpdateApplication).toHaveBeenCalledWith('1', expect.objectContaining({
      status: ApplicationStatus.Interviewing
    }))
    expect(mockStopEditing).toHaveBeenCalled()
  })
})