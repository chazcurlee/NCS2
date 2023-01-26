import { Grid, Button, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from 'axios'


const Home = (props: any) => {
    let navigate = useNavigate()
    let [ vin, setVin] = useState("")
    let [date, setDate] = useState()

    const handleChangeVin = (e: any) => {
        let vinUp = e.target.value
        setVin(vinUp)
    }

    const handleChangeDate = (e: any) => {
        let tempDate = e.target.value
        setDate(tempDate)
    }

    const handleSubmit = () => {
        navigate(`details/${vin}/${date}`)
        
    }



    return (
        <Grid container direction="row" justifyContent='center' alignContent='center'>
            <Grid item container direction="column" justifyContent='center' alignContent='center' xs={12} md={6}>
            <Grid item direction="column" container justifyContent='center' alignContent='center' spacing={2}>
                <Grid item>
                    <h3>Enter VIN Number</h3>
                </Grid>
                <Grid item>
                    <form onSubmit={handleSubmit}>
                        <TextField sx={{
                            position: 'relative'
                        }} variant="outlined"
                        onChange={handleChangeVin} />
                        <TextField variant='outlined' 
                        onChange={handleChangeDate}/>
                        <Button type='submit'  variant="contained">Submit</Button>
                    </form>
                </Grid>
                
                
                
            </Grid>
            </Grid>
        </Grid>
        )
}

export default Home