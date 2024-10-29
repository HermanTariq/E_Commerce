import { Box, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import ProductCard from "../../components/ProductCard";
import { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import { Base_URL } from "../../constants/baseUrl";

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${Base_URL}/product`);
                const data = await response.json();
                setProducts(data);
            } catch {
                setError(true);
            }
        };

        fetchData();
    }, []);

    if(error) {
        return <Box>Something went wrong, please try again!</Box>
    }
    return (
         <Container sx={{ mt:2}}>
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product._id}>
                    <ProductCard {...product}/>
                  </Grid>
                ))}

            </Grid>
        </Container>
    );
};

export default HomePage;  