import { useApplicationStore } from '../store/applicationStore'
import { useUIStore } from '../store/uiStore'

export function ApplicationList() {
  const applications = useApplicationStore((state) => state.applications)
  const deleteApplication = useApplicationStore((state) => state.deleteApplication)
  const startEditing = useUIStore((state) => state.startEditing)

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteApplication(id)
    }
  }

  if (applications.length === 0) {
    return (
      <div className="application-list">
        <p>No applications yet. Add one to get started!</p>
      </div>
    )
  }

  return (
    <div className="application-list">
      {applications.map((app) => (
        <div key={app.id} className="application-item">
          <h3>{app.company}</h3>
          <p>{app.jobTitle}</p>
          <p>Status: {app.status}</p>
          <div className="application-actions">
            <button onClick={() => startEditing(app.id)}>Edit</button>
            <button onClick={() => handleDelete(app.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}