import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Box, Paper, Avatar, Grid, Chip } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#000",
    },
    text: {
      primary: "#fff",
      secondary: "#aaa",
    },
  },
});

const StudentDetail = () => {
  const { studentId } = useParams();
  const students = useSelector((state) => state.student.students);
  const student = students.find((s) => s._id === studentId);

  if (!student) {
    return <Typography variant="h6" color="error">Student not found</Typography>;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Paper 
          elevation={10} 
          sx={{ 
            padding: 5, 
            maxWidth: 500, 
            borderRadius: "24px", 
            textAlign: "center", 
            backgroundColor: "background.paper",
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: "#1976d2", mb: 3 }}>
              <AccountCircleIcon fontSize="large" />
            </Avatar>
            <Typography variant="h4" fontWeight="bold">
              Student Details
            </Typography>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            {/* Name */}
            <Grid item xs={6}>
              <Typography variant="h6" color="text.secondary">Name:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="medium">{student.name}</Typography>
            </Grid>

            {/* Student Code */}
            <Grid item xs={6}>
              <Typography variant="h6" color="text.secondary">Code:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="medium">{student.studentCode}</Typography>
            </Grid>

            {/* Status */}
            <Grid item xs={6}>
              <Typography variant="h6" color="text.secondary">Status:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Chip
                label={student.isActive ? "Active" : "Inactive"}
                color={student.isActive ? "success" : "error"}
                icon={student.isActive ? <CheckCircleOutlineIcon /> : <CancelOutlinedIcon />}
                variant="outlined"
                sx={{ fontSize: "16px", padding: "10px", fontWeight: "bold" }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default StudentDetail;
