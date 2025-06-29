import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { fetchTotalEarnings, fetchDoctors, fetchPatients } from '../services/api';

const HomePage = () => {
  const [earnings, setEarnings] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const earningsRes = await fetchTotalEarnings();
        setEarnings(earningsRes.data);
        
        const doctorsRes = await fetchDoctors();
        setDoctorCount(doctorsRes.data.length);
        
        const patientsRes = await fetchPatients();
        setPatientCount(patientsRes.data.length);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    loadData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        Hospital Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Doctors</Typography>
            <Typography variant="h4">{doctorCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Patients</Typography>
            <Typography variant="h4">{patientCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Earnings</Typography>
            <Typography variant="h4">${earnings.toFixed(2)}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;