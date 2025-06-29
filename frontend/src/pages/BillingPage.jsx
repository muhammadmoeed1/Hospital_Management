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
  Box
} from '@mui/material';
import { fetchPatients, createBill, fetchTotalEarnings } from '../services/api';

const BillingPage = () => {
  const [patients, setPatients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [earnings, setEarnings] = useState(0);
  const [newBill, setNewBill] = useState({
    billNumber: '',
    amount: 0,
    patientId: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const patientsRes = await fetchPatients();
        setPatients(patientsRes.data);
        
        const earningsRes = await fetchTotalEarnings();
        setEarnings(earningsRes.data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    loadData();
  }, []);

  const handleAddBill = async () => {
    try {
      await createBill(newBill.billNumber, newBill.amount, newBill.patientId);
      
      // Refresh data
      const patientsRes = await fetchPatients();
      setPatients(patientsRes.data);
      
      const earningsRes = await fetchTotalEarnings();
      setEarnings(earningsRes.data);
      
      setOpenDialog(false);
      setNewBill({
        billNumber: '',
        amount: 0,
        patientId: ''
      });
    } catch (error) {
      console.error('Error adding bill:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        Billing Management
      </Typography>
      
      <Box sx={{ mb: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="h6">Total Earnings: ${earnings.toFixed(2)}</Typography>
      </Box>
      
      <Button 
        variant="contained" 
        color="primary"
        onClick={() => setOpenDialog(true)}
        sx={{ mb: 2 }}
      >
        Create New Bill
      </Button>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Bill Number</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              patient.bill && (
                <TableRow key={patient.id}>
                  <TableCell>{patient.patientId}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.bill.billNumber}</TableCell>
                  <TableCell>${patient.bill.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(patient.bill.generatedDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              )
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create New Bill</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Bill Number"
            fullWidth
            value={newBill.billNumber}
            onChange={(e) => setNewBill({ ...newBill, billNumber: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={newBill.amount}
            onChange={(e) => setNewBill({ ...newBill, amount: parseFloat(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Patient ID"
            fullWidth
            value={newBill.patientId}
            onChange={(e) => setNewBill({ ...newBill, patientId: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddBill} color="primary">Create</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BillingPage;