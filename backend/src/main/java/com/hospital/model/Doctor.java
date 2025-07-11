package com.hospital.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Doctor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String nationalId;
    
    @Column(unique = true)
    private String doctorId;
    
    @Enumerated(EnumType.STRING)
    private Department department;
}