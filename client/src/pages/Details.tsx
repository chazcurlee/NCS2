import { Paper, Box, Container, Button } from "@mui/material"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
const youtubesearchapi = require("youtube-search-api");

interface FilteredCarInfo {
    Make: string | null,
    Model: string | null,
    Body: string | null,
    Year: string | null,
    Trans: string | null,
    Drive: string | null,
    Engine: string | null,
    Turbo: string | null,
    Speed: string | null,
    Price: string | null
}


let filteredCarInfo: FilteredCarInfo = {
    Make: "",
    Model: '',
    Body: '',
    Year: '',
    Trans: '',
    Drive: '',
    Engine: '',
    Turbo: '',
    Speed: '',
    Price: ''
}

const Details = () => {
    let { vin, date } = useParams()
    let [ carInfo, setCarInfo ]: any = useState({})
    let [ lock, setLock ] = useState(false)
    let [refresh, setRefresh] = useState(false)
    let [videoReview, setVideoReview] = useState()
    let markers: number[] = [7, 9, 10, 21, 23, 49, 51, 79, 87, 88]

   
    


    useEffect(() => {
        
        const getVinInfo = async () => {
            let results = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json&modelyear=${date}`)
            setCarInfo(results.data.Results)
            setLock(true)
        }
        if (!lock) {getVinInfo()}

        const updateCar = async () => {

            let key: keyof typeof filteredCarInfo
            

            markers.forEach((x: number) => {
                

                if (x === 87) {filteredCarInfo.Turbo = carInfo[x].Value}
                if (x === 88) {filteredCarInfo.Speed = carInfo[x].Value}
                if (x === 79) {filteredCarInfo.Engine = carInfo[x].Value}
                if (x === 51) {filteredCarInfo.Drive = carInfo[x].Value}
                if (x === 49) {filteredCarInfo.Trans = carInfo[x].Value}
                if (x === 23) {filteredCarInfo.Body = carInfo[x].Value}
                if (x === 21) {filteredCarInfo.Price = carInfo[x].Value}
                if (x === 10) {filteredCarInfo.Year = carInfo[x].Value}
                if (x === 9) {filteredCarInfo.Model = carInfo[x].Value}
                if (x === 7) {filteredCarInfo.Make = carInfo[x].Value}
                
              
            })

            for (key in filteredCarInfo) {
                if (filteredCarInfo[key] === null) {filteredCarInfo[key] = 'Not Available' }
            }
            let car = filteredCarInfo.Make + " " + filteredCarInfo.Model + " " + filteredCarInfo.Year
            console.log(car)
            let image = await youtubesearchapi.GetListByKeyword(`${car} review`,[true],[6], [{type:"video"}])
            setVideoReview(image.items)
            console.log(image.items)
            setRefresh(true)
        }
        if (lock && !refresh) {updateCar()}
        
        
        
    }, [lock, refresh])


    
    return  refresh ? (
    <Box display="grid" gridTemplateColumns='repeat(12, 1fr)' gridTemplateRows='repeat(12, 1fr)' gap={2} sx={{
        height: '100%'
    }}>
        <Box gridColumn=' 3' gridRow="2" sx={{
            positon: 'sticky',
            top: '0'
        }}>
            <Button>Back</Button>
        </Box>
        <Box gridColumn='4 / 10' gridRow='2 / 12'sx={{
            height: '80vh'
        }}>
            <Paper sx={{
                border: 'solid',
                borderColor: 'black',
                height: '100%'
            }}>
                <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gridTemplateRows="repeat(12, 1fr)" sx={{
                    height: '100%',
                    width: '100%'
                }}>
                     <Box display="grid" gridTemplateColumns='repeat(12, 1fr)' gridTemplateRows="repeat(12, 1fr)" gridColumn='span 12' gridRow=" span 7">
                         <Box gridColumn="span 12" gridRow='1'>
                             <Container><h3>VIN: {vin}</h3></Container>
                         </Box>
                         <Box display='grid' gridTemplateColumns='1fr' gridTemplateRows='repeat(5, 1fr)' gridColumn='1 / 7' gridRow='2 / 13' sx={{
                             textAlign: 'left'
                         }}>
                             
                            <Container><p>Make: {filteredCarInfo.Make}</p></Container> 
                            <Container><p>Model: {filteredCarInfo.Model}</p></Container>
                            <Container><p>Body Style: {filteredCarInfo.Body}</p></Container>
                            <Container><p>Year: {filteredCarInfo.Year}</p></Container>
                            <Container><p>Transmission Style: {filteredCarInfo.Trans}</p></Container>
                             
                         </Box>
                         <Box display='grid' gridTemplateColumns='1fr' gridTemplateRows='repeat(5, 1fr)' gridColumn='7 / 13' gridRow='2 / 13' sx={{
                             textAlign: 'left'
                         }}>
                              <Container><p>Drive Type: {filteredCarInfo.Drive}</p></Container>
                             <Container><p>Engine Configuration: {filteredCarInfo.Engine}</p></Container>
                             <Container><p>Turbo: {filteredCarInfo.Turbo}</p></Container>
                             <Container><p>Top Speed: {filteredCarInfo.Speed}</p></Container>
                             <Container><p>Base Price: {filteredCarInfo.Price}</p></Container> 
                         </Box>
                     </Box>
                    <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gridTemplateRows='repeat(12, 1fr)' gridColumn='span 12' gridRow='8 / 13' sx={{
                        borderTop: "solid",
                        
                    }}>
                        
                        <Box gridColumn='5 / 9' gridRow='1' sx={{
                            borderRight: 'solid',
                            borderBottom: 'solid',
                            borderLeft: 'solid',
                            borderColor: 'grey',
                            zIndex: '1',
                            backgroundColor: 'white'
                        }}>Reviews</Box>
                        <Box gridColumn='1' gridRow='5 / 8' sx={{
                            borderTop: 'solid',
                            borderBottom: 'solid',
                            borderRight: 'solid',
                            borderColor: 'grey',
                            zIndex: '1',
                            backgroundColor: 'white'
                        }}>


                        </Box>
                        <Box gridColumn='1 / 13' gridRow='1 / 13' sx={{backgroundColor: 'black'}}></Box>
                        <Box gridColumn='12' gridRow='5 / 8' sx={{
                            borderTop: 'solid',
                            borderBottom: 'solid',
                            borderLeft: 'solid',
                            borderColor: 'grey',
                            zIndex: '1',
                            backgroundColor: 'white'
                        }}></Box>
                    </Box>

                   
                </Box>
            </Paper>
        </Box>
        {/* <Box gridColumn='10 /13' gridRow='' ></Box> */}
    </Box>
    ) : (<div>Loading</div>)
}

export default Details