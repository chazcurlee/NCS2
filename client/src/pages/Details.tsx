import { Paper, Box, Container, Button } from "@mui/material"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import CarCarousel from '../components/CarCarousel'
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

const Details = (props: any) => {
    let { vin, date } = useParams()
    let [ carInfo, setCarInfo ]: any = useState({})
    let [ lock, setLock ] = useState(false)
    let [refresh, setRefresh] = useState(false)
    let [final, setFinal] = useState(false)
    let [videoReview, setVideoReview] = useState([])
    let [id, setId]: any = useState([])
    let [title, setTitle]: any = useState([])
    let [thumbnailUrl, setThumbnailUrl]: any = useState([])
    let [vidHeight, setVidHeight]: any = useState([])
    let [vidWidth, setVidWidth]: any = useState([])
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
                let entry = carInfo[x].Value
        
                if (x === 87) {filteredCarInfo.Turbo = entry}
                if (x === 88) {filteredCarInfo.Speed = entry}
                if (x === 79) {filteredCarInfo.Engine = entry}
                if (x === 51) {filteredCarInfo.Drive = entry}
                if (x === 49) {filteredCarInfo.Trans = entry}
                if (x === 23) {filteredCarInfo.Body = entry}
                if (x === 21) {filteredCarInfo.Price = entry}
                if (x === 10) {filteredCarInfo.Year = entry}
                if (x === 9) {filteredCarInfo.Model = entry}
                if (x === 7) {filteredCarInfo.Make = entry}
                
              
            })

            for (key in filteredCarInfo) {
                if (filteredCarInfo[key] === null) {filteredCarInfo[key] = 'Not Available' }
            }


            let car = filteredCarInfo.Make + " " + filteredCarInfo.Model + " " + filteredCarInfo.Year
            
            let image = await youtubesearchapi.GetListByKeyword(`${car} review`,[true],[6], [{type:"video"}])
            setVideoReview(image.items)
            
            
            setRefresh(true)
        }
        

        const finalPush = () => {
            
            videoReview.map((info: any) => {
                
                setId((prevState: any) => [...prevState, info.id])
                setTitle((prevState: any) => [...prevState, info.title])
                setThumbnailUrl((prevState: any) => [...prevState, info.thumbnail.thumbnails[0].url])
                setVidHeight((prevState: any) => [...prevState, info.thumbnail.thumbnails[0].height])
                setVidWidth((prevState: any) => [...prevState, info.thumbnail.thumbnails[0].width])
                
            })
            setFinal(true)
        }

        if (lock && !refresh) {updateCar()}
        if (lock && refresh && !final) {finalPush()}
        
        
        
        
    }, [lock, refresh, final])

    
    return  final ? (
    <Box display="grid" gridTemplateColumns='repeat(12, 1fr)' gridTemplateRows='repeat(12, 1fr)' gap={2} className={props.darkMode} sx={{
        height: '100%'
    }}>
        <Box gridColumn=' 3' gridRow="2" className={props.darkMode} sx={{
            positon: 'sticky',
            top: '0'
        }}>
            <Button>Back</Button>
        </Box>
        <Box gridColumn='4 / 10' gridRow='2 / 12' className={props.darkMode}sx={{
            height: '80vh'
        }}>
            <Paper className={props.darkMode} sx={{
                border: 'solid',
                borderColor: 'black',
                height: '100%'
            }}>
                <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gridTemplateRows="repeat(16, 1fr)" sx={{
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

                     <CarCarousel id={id} title={title} thumbnailUrl={thumbnailUrl} vidHeight={vidHeight} vidWidth={vidWidth} darkMode={props.darkMode}/>
                    {/* <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gridTemplateRows='repeat(12, 1fr)' gridColumn='span 12' gridRow='8 / 13' sx={{
                        borderTop: "solid",
                        
                    }}>
                        
                        <Box gridColumn='5 / 9' gridRow='1' sx={{
                            borderRight: 'solid',
                            borderBottom: 'solid',
                            borderLeft: 'solid',
                            borderColor: 'grey',
                            zIndex: '1',
                            backgroundColor: 'grey',
                            opacity: '0.95'
                        }}>Reviews</Box>
                        <Box gridColumn='1' gridRow='5 / 8' sx={{
                            borderTop: 'solid',
                            borderBottom: 'solid',
                            borderRight: 'solid',
                            borderColor: 'grey',
                            zIndex: '1',
                            backgroundColor: 'grey',
                            opacity: '0.5'
                        }}  onClick={() => handleClick(1)}>


                        </Box>
                        <Box gridColumn='1 / 13' gridRow='1 / 13' sx={{
                            backgroundImage: `url(${thumbnailUrl[vidScroll]})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: 'center'
                            }}>

                        </Box>
                        <Box gridColumn='12' gridRow='5 / 8' sx={{
                            borderTop: 'solid',
                            borderBottom: 'solid',
                            borderLeft: 'solid',
                            borderColor: 'grey',
                            zIndex: '1',
                            backgroundColor: 'grey',
                            opacity: '0.5'
                        }}></Box>
                    </Box> */}

                   
                </Box>
            </Paper>
        </Box>
        {/* <Box gridColumn='10 /13' gridRow='' ></Box> */}
    </Box>
    ) : (<div>Loading</div>)
}

export default Details