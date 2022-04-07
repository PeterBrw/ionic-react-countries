import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";

const ExploreContainer = () => {
    const [countries, setCountries] = React.useState([]);
    const [filter, setFilter] = React.useState("");

    React.useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all").then((response) => {
            setCountries(response.data);
        });
    }, []);

    const handleFilterChange = (e) => setFilter(e.target.value);

    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <>
            <Box
                component="form"
                sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-basic"
                    label="Search for a country"
                    variant="outlined"
                    onChange={handleFilterChange}
                />
            </Box>
            {filteredCountries.map((country, index) => {
                return (
                    <Card sx={{ maxWidth: 345 }} key={index}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={country.flags.png}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {country?.name.common}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {country.capital}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {country.region}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Population: {country.population}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                );
            })}
            <hr />
        </>
    );
};

export default ExploreContainer;