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
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box
} from '@mui/material';
import { fetchDoctors, fetchDoctorsByDepartment, createDoctor, assignPatient } from '../services/api';
import Department from '../models/Department';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    nationalId: '',
    doctorId: '',
    department: Department.GENERAL
  });
  const [assignData, setAssignData] = useState({
    doctorId: '',
    patientId: ''
  });

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const response = await fetchDoctors();
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      } catch (error) {
        console.error('Error loading doctors:', error);
      }
    };
    
    loadDoctors();
  }, []);

  useEffect(() => {
    if (departmentFilter === 'ALL') {
      setFilteredDoctors(doctors);
    } else {
      const loadDoctorsByDepartment = async () => {
        try {
          const response = await fetchDoctorsByDepartment(departmentFilter);
          setFilteredDoctors(response.data);
        } catch (error) {
          console.error('Error loading doctors by department:', error);
        }
      };
      
      loadDoctorsByDepartment();
    }
  }, [departmentFilter, doctors]);

  const handleAddDoctor = async () => {
    try {
      const response = await createDoctor(newDoctor);
      setDoctors([...doctors, response.data]);
      setOpenAddDialog(false);
      setNewDoctor({
        name: '',
        nationalId: '',
        doctorId: '',
        department: Department.GENERAL
      });
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  const handleAssignPatient = async () => {
    try {
      await assignPatient(assignData.doctorId, assignData.patientId);
      // Refresh doctors list to show updated patient assignments
      const response = await fetchDoctors();
      setDoctors(response.data);
      setFilteredDoctors(response.data);
      setOpenAssignDialog(false);
      setAssignData({
        doctorId: '',
        patientId: ''
      });
    } catch (error) {
      console.error('Error assigning patient:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        Doctors Management
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Department</InputLabel>
          <Select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            label="Department"
          >
            <MenuItem value="ALL">All Departments</MenuItem>
            {Object.values(Department).map(dept => (
              <MenuItem key={dept} value={dept}>{dept}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => setOpenAddDialog(true)}
        >
          Add New Doctor
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Doctor ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDoctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>{doctor.doctorId}</TableCell>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.department}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => {
                      setAssignData({ ...assignData, doctorId: doctor.doctorId });
                      setOpenAssignDialog(true);
                    }}
                  >
                    Assign Patient
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Add Doctor Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New Doctor</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={newDoctor.name}
            onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="National ID"
            fullWidth
            value={newDoctor.nationalId}
            onChange={(e) => setNewDoctor({ ...newDoctor, nationalId: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Doctor ID"
            fullWidth
            value={newDoctor.doctorId}
            onChange={(e) => setNewDoctor({ ...newDoctor, doctorId: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Department</InputLabel>
            <Select
              value={newDoctor.department}
              onChange={(e) => setNewDoctor({ ...newDoctor, department: e.target.value })}
              label="Department"
            >
              {Object.values(Department).map(dept => (
                <MenuItem key={dept} value={dept}>{dept}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddDoctor} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      
      {/* Assign Patient Dialog */}
      <Dialog open={openAssignDialog} onClose={() => setOpenAssignDialog(false)}>
        <DialogTitle>Assign Patient to Doctor</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Doctor ID"
            fullWidth
            value={assignData.doctorId}
            disabled
          />
          <TextField
            margin="dense"
            label="Patient ID"
            fullWidth
            value={assignData.patientId}
            onChange={(e) => setAssignData({ ...assignData, patientId: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAssignDialog(false)}>Cancel</Button>
          <Button onClick={handleAssignPatient} color="primary">Assign</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DoctorsPage;