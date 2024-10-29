import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "../styles/RollTable.scss";
import { Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { deleteStudentRequest, updateStudentRequest } from "../../redux/actions/action";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const RollTable = ({ students, setStudents }) => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  
  // State cho từng biến tên và trạng thái
  const [studentName, setStudentName] = useState('');
  const [studentStatus, setStudentStatus] = useState('');

  const [editingStudent, setEditingStudent] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleView = (studentId) => {
    navigate(`/student/${studentId}`);
  };

  const handleSelectStudent = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const deleteSelectedStudents = () => {
    const remainingStudents = students.filter((student) => !selectedStudents.includes(student._id));
    setStudents(remainingStudents);
    setSelectedStudents([]);
  };

  const openDeleteConfirm = (studentId) => {
    setStudentToDelete(studentId);
    setOpenDeleteDialog(true);
  };

  const deleteSingleStudent = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      openDeleteConfirm(studentId);
    } else {
      alert('Please select the student before deleting.');
    }
  };

  const confirmDeleteStudent = () => {
    dispatch(deleteStudentRequest(studentToDelete));
    setOpenDeleteDialog(false);
    setStudentToDelete(null);
  };

  const editStudent = (student) => {
    setEditingStudent(student);
    setStudentName(student.name);
    setStudentStatus(student.isActive ? 'Active' : 'Absent');
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setEditingStudent(null);
  };

  const handleSubmit = () => {
    const updatedData = {
      name: studentName,
      isActive: studentStatus === 'Active',
    };

    console.log(updatedData);
    console.log(editingStudent._id);

    dispatch(updateStudentRequest(editingStudent._id, updatedData));
    handleEditDialogClose();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box mb={2}>
        <Typography className='total-student' variant="h6">
          Total Selected Students: {selectedStudents.length}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          disabled={selectedStudents.length === 0}
          onClick={deleteSelectedStudents}
        >
          Delete Selected
        </Button>
      </Box>

      {/* TABLE */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '50px' }}>Select</TableCell>
              <TableCell align="left">Student Name</TableCell>
              <TableCell align="left">Student Code</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student._id}
                className='row-table'
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">
                  <Checkbox
                    checked={selectedStudents.includes(student._id)}
                    onChange={() => handleSelectStudent(student._id)}
                  />
                </TableCell>

                {/* STUDENT NAME */}
                <TableCell component="th" scope="row" onClick={() => handleView(student._id)}>
                  {student.name}
                </TableCell>

                {/* STUDENT CODE */}
                <TableCell align="left" onClick={() => handleView(student._id)}>
                  {student.studentCode}
                </TableCell>

                {/* ACTIVE */}
                <TableCell align="left">
                  <Chip
                    label={student.isActive ? 'Active' : 'Absent'}
                    color={student.isActive ? 'success' : 'default'}
                    variant="outlined"
                  />
                </TableCell>

                {/* ACTION */}
                <TableCell align="left">
                  <Button onClick={() => editStudent(student)}>Edit</Button>
                  <Button color="secondary" onClick={() => deleteSingleStudent(student._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Student Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please update the fields below and click "Save" to save your changes.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <FormControl fullWidth variant="outlined" margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              value={studentStatus}
              onChange={(e) => setStudentStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Absent">Absent</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this student?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteStudent} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default RollTable;
