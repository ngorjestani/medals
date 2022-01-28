import {FormEvent, FunctionComponent, MouseEventHandler, useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Country} from "../models/types";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {MedalDisplay} from "./MedalDisplay";

type ICountryCardProps = {
    country: Country,
    handleAddMedal: (countryId: string, medalId: string) => void,
    handleRemoveMedal: (countryId: string, medalId: string) => void,
}

export const CountryCard : FunctionComponent<ICountryCardProps> = ({country, handleAddMedal, handleRemoveMedal}) => {
    const handleAddMedalClick = (medalId: string) => {
        handleAddMedal(country.id, medalId);
    };

    const handleRemoveMedalClick = (medalId: string) => {
        handleRemoveMedal(country.id, medalId);
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
            </Card>
        </Grid>
    );
}