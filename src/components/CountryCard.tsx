import {FormEvent, FunctionComponent, MouseEventHandler, useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Country} from "../models/types";
import DeleteIcon from '@mui/icons-material/Delete';
import {MedalDisplay} from "./MedalDisplay";

type ICountryCardProps = {
    country: Country,
    handleAddMedal: (countryId: string, medalId: string) => void,
    handleRemoveMedal: (countryId: string, medalId: string) => void,
    handleRemoveCountry: (countryId: string) => void,
}

export const CountryCard : FunctionComponent<ICountryCardProps> = ({country, handleAddMedal, handleRemoveMedal, handleRemoveCountry}) => {
    const handleAddMedalClick = (medalId: string) => {
        handleAddMedal(country.id, medalId);
    };

    const handleRemoveMedalClick = (medalId: string) => {
        handleRemoveMedal(country.id, medalId);
    };
    
    const handleRemoveCountryClick : MouseEventHandler = (e) => {
        e.preventDefault();
        handleRemoveCountry(country.id);
    };
    
    const getMedalDisplays = () => {
        return country.medals.map((m) => (
            <MedalDisplay key={m.id} medalProp={m} handleAddMedal={handleAddMedalClick} handleRemoveMedal={handleRemoveMedalClick}/>
        ));
    };
    
    return (
        <Grid item xs={1} sm={6} lg={4} xl={3}>
            <Card sx={{minWidth: 275}} >
                <CardContent>
                    <Typography variant='h4'>
                        {country.name}
                    </Typography>
                    {getMedalDisplays()}
                </CardContent>
                <CardActions>
                    <Button color='error' onClick={handleRemoveCountryClick}>
                        <DeleteIcon />
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}