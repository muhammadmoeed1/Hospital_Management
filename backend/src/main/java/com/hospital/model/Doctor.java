package com.hospital.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Doctor extends Person {
    @Column(unique = true)
    private String doctorId;
    
    @Enumerated(EnumType.STRING)
    private Department department;
    
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Patient> patients = new ArrayList<>();
    
    public static final int MAX_PATIENTS = 5;
    
    // No need for custom exceptions here - we'll handle them in the service layer
}