import {FormEvent, FunctionComponent, MouseEventHandler, useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Country} from "../models/types";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

type ICountryCardProps = {
    country: Country,
    handleAddGold: (id: string) => void,
    handleRemoveGold: (id: string) => void,
}

export const CountryCard : FunctionComponent<ICountryCardProps> = ({country, handleAddGold, handleRemoveGold}) => {
    const handleAddGoldButtonClick : MouseEventHandler = (e) => {
        e.preventDefault();
        handleAddGold(country.id);
    };

    const handleRemoveGoldButtonClick : MouseEventHandler = (e) => {
        e.preventDefault();
        handleRemoveGold(country.id);
    };
    
    return (
        <Grid item xs={1} sm={6} lg={4} xl={3}>
            <Card sx={{minWidth: 275}} >
                <CardContent>
                    <Typography variant='h4'>
                        {country.name}
                    </Typography>
                    <Typography variant='h6'>
                        Gold medals: {country.gold}
                    </Typography>
                    <CardActions>
                        <Button
                            size='small'
                            color='primary'
                            onClick={handleRemoveGoldButtonClick}
                            disabled={country.gold < 1}
                        >
                            <RemoveCircleIcon />
                        </Button>
                        <Button
                            size='small'
                            color='primary'
                            onClick={handleAddGoldButtonClick}
                        >
                            <AddCircleIcon />
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Grid>
    );
}