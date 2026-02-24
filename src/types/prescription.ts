export interface DoctorInfo {
  name: string;
  degree: string;
  clinicName: string;
}

export interface PatientInfo {
  name: string;
  age: string;
  gender: string;
  phone: string;
  address: string;
}

export interface Medicine {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  duration: string;
  notes?: string;
}

export interface Prescription {
  id: string;
  doctorInfo: DoctorInfo;
  patientInfo: PatientInfo;
  symptoms: string;
  diagnosis: string;
  medicines: Medicine[];
  advice: string;
  followUp: string;
  createdAt: string;
}