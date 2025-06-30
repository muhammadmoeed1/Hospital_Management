package com.hospital.repository;

import com.hospital.model.Doctor;
import com.hospital.model.Department; // Add this import
import java.util.List;               // Add this import
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findByDepartment(Department department); // Now properly typed
}