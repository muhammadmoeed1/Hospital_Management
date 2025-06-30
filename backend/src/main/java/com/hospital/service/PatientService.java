package com.hospital.service;

import com.hospital.model.Patient;
import com.hospital.repository.PatientRepository; // Add this import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;                           // Add this import

@Service
public class PatientService {
    
    @Autowired
    private PatientRepository patientRepository; // Error resolved

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }
    
    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }
}