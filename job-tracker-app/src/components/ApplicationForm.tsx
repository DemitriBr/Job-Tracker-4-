import { useState, FormEvent, useEffect } from 'react'
import { useApplicationStore } from '../store/applicationStore'
import { useUIStore } from '../store/uiStore'
import { ApplicationStatus, JobType } from '../types'

interface ApplicationFormProps {
  applicationId?: string
}

export function ApplicationForm({ applicationId }: ApplicationFormProps) {
  const addApplication = useApplicationStore((state) => state.addApplication)
  const updateApplication = useApplicationStore((state) => state.updateApplication)
  const applications = useApplicationStore((state) => state.applications)
  const stopEditing = useUIStore((state) => state.stopEditing)
  
  const [formData, setFormData] = useState({
    company: '',
    jobTitle: '',
    dateApplied: new Date().toISOString().split('T')[0],
    status: ApplicationStatus.Applied,
    link: '',
    salaryRange: '',
    contactInfo: '',
    notes: '',
    jobType: JobType.FullTime
  })

  // Load existing data if editing
  useEffect(() => {
    if (applicationId) {
      const existingApp = applications.find(app => app.id === applicationId)
      if (existingApp) {
        setFormData({
          company: existingApp.company,
          jobTitle: existingApp.jobTitle,
          dateApplied: existingApp.dateApplied,
          status: existingApp.status,
          link: existingApp.link || '',
          salaryRange: existingApp.salaryRange || '',
          contactInfo: existingApp.contactInfo || '',
          notes: existingApp.notes || '',
          jobType: existingApp.jobType
        })
      }
    }
  }, [applicationId, applications])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.company || !formData.jobTitle || !formData.dateApplied) {
      alert('Please fill in all required fields')
      return
    }

    if (applicationId) {
      // Update existing application
      updateApplication(applicationId, formData)
      stopEditing()
    } else {
      // Add new application
      addApplication(formData)
      
      // Reset form
      setFormData({
        company: '',
        jobTitle: '',
        dateApplied: new Date().toISOString().split('T')[0],
        status: ApplicationStatus.Applied,
        link: '',
        salaryRange: '',
        contactInfo: '',
        notes: '',
        jobType: JobType.FullTime
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="application-form">
      <h2>{applicationId ? 'Edit Application' : 'Add New Application'}</h2>
      
      <div className="form-group">
        <label htmlFor="company">Company *</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="jobTitle">Job Title *</label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="dateApplied">Date Applied *</label>
        <input
          type="date"
          id="dateApplied"
          name="dateApplied"
          value={formData.dateApplied}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status *</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          {Object.values(ApplicationStatus).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="jobType">Job Type</label>
        <select
          id="jobType"
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
        >
          {Object.values(JobType).map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="link">Job Posting Link</label>
        <input
          type="url"
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="salaryRange">Salary Range</label>
        <input
          type="text"
          id="salaryRange"
          name="salaryRange"
          value={formData.salaryRange}
          onChange={handleChange}
          placeholder="e.g., $80,000 - $100,000"
        />
      </div>

      <div className="form-group">
        <label htmlFor="contactInfo">Contact Info</label>
        <input
          type="text"
          id="contactInfo"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleChange}
          placeholder="e.g., John Doe - john@company.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <button type="submit" className="submit-button">
        {applicationId ? 'Update Application' : 'Add Application'}
      </button>
    </form>
  )
}