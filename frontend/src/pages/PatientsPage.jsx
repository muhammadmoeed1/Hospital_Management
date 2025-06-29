import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { fetchPatients, createPatient, deletePatient } from '../services/api';

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    nationalId: '',
    patientId: ''
  });

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const response = await fetchPatients();
        setPatients(response.data);
      } catch (error) {
        console.error('Error loading patients:', error);
      }
    };
    
    loadPatients();
  }, []);

  const handleAddPatient = async () => {
    try {
      const response = await createPatient(newPatient);
      setPatients([...patients, response.data]);
      setOpenDialog(false);
      setNewPatient({
        name: '',
        nationalId: '',
        patientId: ''
      });
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await deletePatient(id);
      setPatients(patients.filter(patient => patient.id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        Patients Management
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary"
        onClick={() => setOpenDialog(true)}
        sx={{ mb: 2 }}
      >
        Add New Patient
      </Button>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>National ID</TableCell>
              <TableCell>Assigned Doctor</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.patientId}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.nationalId}</TableCell>
                <TableCell>{patient.doctor ? patient.doctor.doctorId : 'None'}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    color="error"
                    size="small"
                    onClick={() => handleDeletePatient(patient.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={newPatient.name}
            onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="National ID"
            fullWidth
            value={newPatient.nationalId}
            onChange={(e) => setNewPatient({ ...newPatient, nationalId: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Patient ID"
            fullWidth
            value={newPatient.patientId}
            onChange={(e) => setNewPatient({ ...newPatient, patientId: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddPatient} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PatientsPage;