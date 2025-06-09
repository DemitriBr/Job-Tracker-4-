import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useApplicationStore } from './applicationStore'
import { ApplicationStatus, JobType } from '../types'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock as any

describe('applicationStore', () => {
  beforeEach(() => {
    // Clear localStorage and reset store
    localStorage.clear()
    useApplicationStore.setState({ applications: [] })
  })

  it('should add an application', () => {
    const { addApplication } = useApplicationStore.getState()
    const newApp = {
      company: 'Test Company',
      jobTitle: 'Software Engineer',
      dateApplied: '2024-01-01',
      status: ApplicationStatus.Applied,
      jobType: JobType.FullTime
    }

    addApplication(newApp)

    const { applications } = useApplicationStore.getState()
    expect(applications).toHaveLength(1)
    expect(applications[0]).toMatchObject(newApp)
    expect(applications[0].id).toBeDefined()
  })

  it('should update an application', () => {
    const { addApplication, updateApplication } = useApplicationStore.getState()
    const newApp = {
      company: 'Test Company',
      jobTitle: 'Software Engineer',
      dateApplied: '2024-01-01',
      status: ApplicationStatus.Applied,
      jobType: JobType.FullTime
    }

    addApplication(newApp)
    const { applications: appsAfterAdd } = useApplicationStore.getState()
    const appId = appsAfterAdd[0].id

    updateApplication(appId, { status: ApplicationStatus.Interviewing })

    const { applications: appsAfterUpdate } = useApplicationStore.getState()
    expect(appsAfterUpdate[0].status).toBe(ApplicationStatus.Interviewing)
  })

  it('should delete an application', () => {
    const { addApplication, deleteApplication } = useApplicationStore.getState()
    const newApp = {
      company: 'Test Company',
      jobTitle: 'Software Engineer',
      dateApplied: '2024-01-01',
      status: ApplicationStatus.Applied,
      jobType: JobType.FullTime
    }

    addApplication(newApp)
    const { applications: appsAfterAdd } = useApplicationStore.getState()
    const appId = appsAfterAdd[0].id

    deleteApplication(appId)

    const { applications: appsAfterDelete } = useApplicationStore.getState()
    expect(appsAfterDelete).toHaveLength(0)
  })

  it('should persist to localStorage', () => {
    const { addApplication } = useApplicationStore.getState()
    const newApp = {
      company: 'Test Company',
      jobTitle: 'Software Engineer',
      dateApplied: '2024-01-01',
      status: ApplicationStatus.Applied,
      jobType: JobType.FullTime
    }

    addApplication(newApp)

    // Check that localStorage.setItem was called
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'job-application-tracker-data',
      expect.any(String)
    )
  })
})