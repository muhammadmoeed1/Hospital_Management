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
import { fetchAppointments, createAppointment } from '../services/api';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    appointmentId: '',
    doctorId: '',
    patientId: ''
  });

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const response = await fetchAppointments();
        setAppointments(response.data);
      } catch (error) {
        console.error('Error loading appointments:', error);
      }
    };
    
    loadAppointments();
  }, []);

  const handleAddAppointment = async () => {
    try {
      const response = await createAppointment(
        newAppointment.appointmentId,
        newAppointment.doctorId,
        newAppointment.patientId
      );
      setAppointments([...appointments, response.data]);
      setOpenDialog(false);
      setNewAppointment({
        appointmentId: '',
        doctorId: '',
        patientId: ''
      });
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        Appointments Management
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary"
        onClick={() => setOpenDialog(true)}
        sx={{ mb: 2 }}
      >
        Create New Appointment
      </Button>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Appointment ID</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Doctor ID</TableCell>
              <TableCell>Patient ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.appointmentId}</TableCell>
                <TableCell>{new Date(appointment.time).toLocaleString()}</TableCell>
                <TableCell>{appointment.doctor.doctorId}</TableCell>
                <TableCell>{appointment.patient.patientId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create New Appointment</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Appointment ID"
            fullWidth
            value={newAppointment.appointmentId}
            onChange={(e) => setNewAppointment({ ...newAppointment, appointmentId: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Doctor ID"
            fullWidth
            value={newAppointment.doctorId}
            onChange={(e) => setNewAppointment({ ...newAppointment, doctorId: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Patient ID"
            fullWidth
            value={newAppointment.patientId}
            onChange={(e) => setNewAppointment({ ...newAppointment, patientId: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddAppointment} color="primary">Create</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AppointmentsPage;