import './App.css'
import { ApplicationForm } from './components/ApplicationForm'
import { ApplicationList } from './components/ApplicationList'
import { useUIStore } from './store/uiStore'

function App() {
  const editingApplicationId = useUIStore((state) => state.editingApplicationId)
  const stopEditing = useUIStore((state) => state.stopEditing)

  return (
    <div className="app">
      <h1>Job Application Tracker</h1>
      
      {/* Main form for adding new applications */}
      {!editingApplicationId && <ApplicationForm />}
      
      <ApplicationList />
      
      {/* Modal for editing applications */}
      {editingApplicationId && (
        <div className="modal-overlay" onClick={stopEditing}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={stopEditing}>×</button>
            <ApplicationForm applicationId={editingApplicationId} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App