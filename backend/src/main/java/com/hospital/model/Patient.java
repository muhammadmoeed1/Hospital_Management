package com.hospital.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Patient {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String nationalId;
    
    @Column(unique = true)
    private String patientId;
    
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "bill_id", referencedColumnName = "id")
    private Bill bill;
}