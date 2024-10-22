/* eslint-disable react/prop-types */
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
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "../styles/RollTable.scss";
import { Box, Typography } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const RollTable = ({ students, setStudents }) => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null); 

  const handleSelectStudent = (studentCode) => {
    if (selectedStudents.includes(studentCode)) {
      setSelectedStudents(selectedStudents.filter((code) => code !== studentCode)); 
    } else {
      setSelectedStudents([...selectedStudents, studentCode]); 
    }
  };

  const deleteSelectedStudents = () => {
    const remainingStudents = students.filter((student) => !selectedStudents.includes(student.code));
    setStudents(remainingStudents); 
    setSelectedStudents([]); 
  };

  const deleteSingleStudent = (studentCode) => {
    if (selectedStudents.includes(studentCode)) {
      const remainingStudents = students.filter((student) => student.code !== studentCode);
      setStudents(remainingStudents);
      setSelectedStudents(selectedStudents.filter((code) => code !== studentCode)); 
    } else {
      alert('Please select the student before deleting.'); 
    }
  };

  const editStudent = (studentCode) => {
    const student = students.find((s) => s.code === studentCode);
    setEditingStudent(student);
  };

  const saveEditStudent = () => {
    const updatedStudents = students.map((student) =>
      student.code === editingStudent.code ? editingStudent : student
    );
    setStudents(updatedStudents);
    setEditingStudent(null); 
  };

  const cancelEdit = () => {
    setEditingStudent(null); 
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
              <TableRow key={student.code} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">
                  <Checkbox
                    checked={selectedStudents.includes(student.code)}
                    onChange={() => handleSelectStudent(student.code)}
                  />
                </TableCell>

                <TableCell component="th" scope="row">
                  {editingStudent?.code === student.code ? (
                    <input
                      value={editingStudent.name}
                      onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                    />
                  ) : (
                    student.name
                  )}
                </TableCell>

                <TableCell align="left">
                  {editingStudent?.code === student.code ? (
                    <input
                      value={editingStudent.code}
                      onChange={(e) => setEditingStudent({ ...editingStudent, code: e.target.value })}
                    />
                  ) : (
                    student.code
                  )}
                </TableCell>

                <TableCell align="left">
                  <Chip
                    label={student.status}
                    color={student.status === 'Active' ? 'success' : 'default'}
                    variant="outlined"
                  />
                </TableCell>

                <TableCell align="left">
                  {editingStudent?.code === student.code ? (
                    <>
                      <Button onClick={saveEditStudent}>Save</Button>
                      <Button onClick={cancelEdit}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => editStudent(student.code)}>Edit</Button>
                      <Button
                        color="secondary"
                        onClick={() => deleteSingleStudent(student.code)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default RollTable;
