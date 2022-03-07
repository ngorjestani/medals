import {FormEvent, FunctionComponent, MouseEventHandler, useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Country} from "../models/types";
import DeleteIcon from '@mui/icons-material/Delete';
import {MedalDisplay} from "./MedalDisplay";

type ICountryCardProps = {
    country: Country,
    handleAddMedal: (countryId: number, medalName: string, currentCount: number) => void,
    handleRemoveMedal: (countryId: number, medalName: string, currentCount: number) => void,
    handleRemoveCountry: (countryId: number) => void,
}

export const CountryCard : FunctionComponent<ICountryCardProps> = ({country, handleAddMedal, handleRemoveMedal, handleRemoveCountry}) => {
    const handleAddMedalClick = (medalName: string, count: number) => {
        handleAddMedal(country.id, medalName, count);
    };

    const handleRemoveMedalClick = (medalName: string, count: number) => {
        handleRemoveMedal(country.id, medalName, count);
    };
    
    const handleRemoveCountryClick : MouseEventHandler = (e) => {
        e.preventDefault();
        handleRemoveCountry(country.id);
    };
    
    const getMedalDisplays = () => {
        return country.medals.map((m) => (
            <MedalDisplay key={m.name} medalProp={m} handleAddMedal={handleAddMedalClick} handleRemoveMedal={handleRemoveMedalClick}/>
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