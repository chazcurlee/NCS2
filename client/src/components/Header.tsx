import { Button, Grid } from "@mui/material"
import { useNavigate } from "react-router-dom"
const Header = () => {
    let navigate = useNavigate()


    const handleClick = (e: any): void => {
        let navPoint = e.target.id
        navigate(`${navPoint}`)
    }


    return (
    <Grid container direction='row' justifyContent='space between' alignContent="center" sx={{
        borderBottom: "solid",
        position: 'sticky',
        top: '0',
        backgroundColor: 'white',
        zIndex: '1'
    }}>
        <Grid container justifyContent='center' item xs={0} md={4} >
            <Button>Light/Dark Mode</Button>
        </Grid>
        <Grid item xs={12} md={4} >
            <h1 id="/" className="header-title clickable" onClick={handleClick}>VINquery</h1>
        </Grid>
        <Grid item xs={12} md={4} >
            <h1 id="login-signup clickable" className="login-signup" onClick={handleClick}>Sign Up/Login</h1>
        </Grid>
    </Grid>)
}

export default Header