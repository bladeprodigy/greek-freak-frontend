import {Container, Grid, Typography} from "@mui/material";
import React from "react";

interface MenuSectionProps {
    title: string;
    items: string[];
}
const MenuSection: React.FC<MenuSectionProps> = ({ title, items }) => {
    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: '"GFS Neohellenic", serif', fontWeight: 'bold' }}>
                {title}
            </Typography>
            {items.map((item, index) => (
                <Typography key={index} variant="body1" sx={{ fontFamily: '"GFS Neohellenic", serif', mb: 1 }}>
                    {item}
                </Typography>
            ))}
        </>
    );
};

const Menu = () => {
    const starters = ["Halloumi Cheese - 8$", "Calamari - 12$", "Shrimps - 13$"];
    const mainDishes = ["Pita Gyros - 22$", "Greek Salad - 19$", "Souvlaki - 23$", "Fish of the Day - 25$", "Kypriako Burger - 23$"];
    const desserts = ["Sokolatopita - 15$", "Baklava - 14$"];
    const beverages = ["Soda - 5$", "Lemonade - 6$", "Wine - 12$", "Water - 3$", "Coffee - 8$", "Tea - 8$"];

    return (
        <Container maxWidth="md" sx={{ py: 4, position: 'relative', textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom sx={{
                fontFamily: '"GFS Neohellenic", serif',
                fontWeight: 'bold',
                position: 'absolute',
                left: '50%',
                top: '20px',
                transform: 'translateX(-50%)',
                width: '100%',
                maxWidth: 'calc(100% - 64px)',
            }}>
                Menu
            </Typography>

            <Grid container spacing={2} justifyContent="center" sx={{ mt: 12 }}>
                <Grid item xs={12} sm={6}>
                    <MenuSection title="Starters" items={starters} />
                    <MenuSection title="Main Dishes" items={mainDishes} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <MenuSection title="Desserts" items={desserts} />
                    <MenuSection title="Beverages" items={beverages} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Menu;
