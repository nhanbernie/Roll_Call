import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentsRequest, createStudentRequest } from "../../redux/actions/action"
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Grid, Typography } from '@mui/material';
import "../styles/Roll.scss";
import CheckBox from './CheckBox';
import RollTable from './RollTable';

const Roll = () => {
  const [studentName, setStudentName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [studentStatus, setStudentStatus] = useState(false); 

  const dispatch = useDispatch();
  
  const students = useSelector((state) => state.student.students);
  useEffect(() => {
    dispatch(fetchStudentsRequest()); 
  }, [dispatch]);

  const addStudent = () => {
    console.log('Student Status:', studentStatus);
    if (studentName && studentCode) {
      const newStudent = { 
        name: studentName, 
        studentCode: studentCode, 
        isActive: studentStatus 
      };
      dispatch(createStudentRequest(newStudent))
      // setStudents([
      //   newStudent, 
      //   ...students
      // ]);
      setStudentName(''); 
      setStudentCode('');
      setStudentStatus(false); 
    } else {
      alert('Please enter Name and Code');
    }
  };

  return (
    <Container>
      {/* title */}
      <Box mt={3}>
        <Typography className='title-roll'>Manage Student</Typography>
      </Box>

      <Box mt={3}>
        <Typography className='title-add'>Add student</Typography>
      </Box>

      <Grid container marginTop={3}>
        {/* input */}
        <Grid xs={5}>
          <Box>
            <input
              className='input-info mb-4'
              type="text"
              placeholder='Enter Student Name'
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </Box>
          <Box>
            <input
              className='input-info'
              type="text"
              placeholder='Enter Student Code'
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
            />
          </Box>

          <Box mt={3}>
            <CheckBox onStatusChange={(status) => setStudentStatus(status)} />
          </Box>
        </Grid>
        {/* end input */}


        <Grid xs={1}>
          <Box marginLeft={2} sx={{ '& > :not(style)': { m: 0 } }}>
            <Fab color="primary" aria-label="add" onClick={addStudent}>
              <AddIcon />
            </Fab>
          </Box>
        </Grid>

        <Grid xs={12} mt={5}>
          <RollTable students={students.slice().reverse()} /> 
        </Grid>
      </Grid>
    </Container>
  );
};

export default Roll;
