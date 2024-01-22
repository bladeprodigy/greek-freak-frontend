import Navbar from "../components/Navbar.tsx";
import Home from "../components/Home.tsx";
import {Box} from "@mui/material";
import About from "../components/About.tsx";
import Menu from "../components/Menu.tsx";
import Footer from "../components/Footer.tsx";

const MainPage = () => {
    return (
        <Box sx={{ width: '100vw'}}>
            <Navbar />
            <section id="home">
                <Home/>
            </section>
            <section id="about">
                <About/>
            </section>
            <section id="menu">
                <Menu/>
            </section>
            <Footer/>
        </Box>
    );
};


export default MainPage;