import Navbar from "../components/Navbar.tsx";
import Home from "../components/Home.tsx";
import {Box} from "@mui/material";
import About from "../components/About.tsx";
import Menu from "../components/Menu.tsx";
import RegisterAndLogin from "../components/RegisterAndLogin.tsx";
import Footer from "../components/Footer.tsx";

const MainPage = () => {
    return (
        <Box sx={{ width: '100vw'}}> {/* Add overflow hidden to prevent horizontal scroll */}
            <Navbar />
            <Home />
            <About />
            <Menu />
            <RegisterAndLogin />
            <Footer />
        </Box>
    );
};


export default MainPage;