import { create, persist } from '../lib/zustand'
import { JobApplication } from '../types'

interface ApplicationStore {
  applications: JobApplication[]
  addApplication: (application: Omit<JobApplication, 'id'>) => void
  updateApplication: (id: string, updates: Partial<JobApplication>) => void
  deleteApplication: (id: string) => void
}

export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set) => ({
      applications: [],
      
      addApplication: (application) => set((state) => ({
        applications: [...state.applications, {
          ...application,
          id: Date.now().toString()
        }]
      })),
      
      updateApplication: (id, updates) => set((state) => ({
        applications: state.applications.map(app =>
          app.id === id ? { ...app, ...updates } : app
        )
      })),
      
      deleteApplication: (id) => set((state) => ({
        applications: state.applications.filter(app => app.id !== id)
      }))
    }),
    {
      name: 'job-application-tracker-data'
    }
  )
)