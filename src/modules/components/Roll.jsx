import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Container } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { Grid, Typography } from '@mui/material';
import "../styles/Roll.scss"
import CheckBox from './CheckBox';
import absent from "../../assets/images/absent_class.png"

const Roll = () => {
    return (
        <Container>
            {/* title */}
            <Box mt={5}>
                <Typography className='title-roll'>Manage Student</Typography>
            </Box>

            <Box mt={5}>
                <Typography className='title-add'>Add student</Typography>
            </Box>

            <Grid container marginTop={3}>
                {/* input */}
                <Grid xs={5}>
                    <Box>
                        <input className='input-info mb-4' type="text" placeholder='Enter Student Name' />
                    </Box>
                    <Box>
                        <input className='input-info' type="text" placeholder='Enter Student Code' />
                    </Box>
                    {/* checkbox */}
                    <Box mt={3}>
                        <CheckBox />
                    </Box>
                </Grid>

                {/* add */}
                <Grid xs={1}>
                    <Box marginLeft={2} sx={{ '& > :not(style)': { m: 0 } }}>
                        <Fab color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Box>
                </Grid>

                {/* banner */}
                {/* <Grid xs={5} className='banner-container'>
                    <img className="img-fluid" src={absent} alt="" />
                </Grid> */}
            </Grid>


        </Container>

    )
}

export default Roll