export enum ApplicationStatus {
  Applied = 'Applied',
  Interviewing = 'Interviewing',
  Offer = 'Offer',
  Rejected = 'Rejected',
  Ghosted = 'Ghosted'
}

export enum JobType {
  FullTime = 'Full-time',
  PartTime = 'Part-time',
  Internship = 'Internship',
  Contract = 'Contract',
  Freelance = 'Freelance',
  Temporary = 'Temporary'
}

export interface JobApplication {
  id: string
  company: string
  jobTitle: string
  dateApplied: string
  status: ApplicationStatus
  link?: string
  salaryRange?: string
  contactInfo?: string
  notes?: string
  jobType: JobType
}