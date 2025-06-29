import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchDoctors = () => api.get('/doctors');
export const fetchDoctorById = (id) => api.get(`/doctors/${id}`);
export const fetchDoctorsByDepartment = (department) => api.get(`/doctors/department/${department}`);
export const createDoctor = (doctor) => api.post('/doctors', doctor);
export const assignPatient = (doctorId, patientId) => api.post('/doctors/assign', null, {
  params: { doctorId, patientId }
});

export const fetchPatients = () => api.get('/patients');
export const fetchPatientById = (id) => api.get(`/patients/${id}`);
export const fetchPatientsByDoctor = (doctorId) => api.get(`/patients/doctor/${doctorId}`);
export const createPatient = (patient) => api.post('/patients', patient);
export const deletePatient = (id) => api.delete(`/patients/${id}`);

export const fetchAppointments = () => api.get('/appointments');
export const createAppointment = (appointmentId, doctorId, patientId) => api.post('/appointments', null, {
  params: { appointmentId, doctorId, patientId }
});
export const fetchAppointmentsByDoctor = (doctorId) => api.get(`/appointments/doctor/${doctorId}`);
export const fetchAppointmentsByPatient = (patientId) => api.get(`/appointments/patient/${patientId}`);

export const createBill = (billNumber, amount, patientId) => api.post('/billing', null, {
  params: { billNumber, amount, patientId }
});
export const fetchTotalEarnings = () => api.get('/billing/earnings');

export default api;