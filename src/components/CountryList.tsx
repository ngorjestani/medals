import {FunctionComponent, useState} from "react";
import {Grid} from "@mui/material";
import {CountryCard} from "./CountryCard";
import {nanoid} from "nanoid";
import {Country} from "../models/types";
import {countries} from "../models/countries";

type ICountryListProps = {
    
}

export const CountryList : FunctionComponent<ICountryListProps> = () => {
    const [listOfCountries, setListOfCountries] = useState<Country[]>(countries);
    
    const addGoldToCountry = (id: string) => {
        setListOfCountries((prevState) => {
            return prevState.map((item) => (
                item.id === id 
                    ? {...item, gold: item.gold + 1} 
                    : item
            ));
        });
    };
    
    const removeGoldFromCountry = (id: string) => {
        setListOfCountries((prevState) => {
            return prevState.map((item) => (
                item.id === id
                    ? {...item, gold: item.gold - 1}
                    : item
            ));
        });
    };
    
    const getCountryComponents = () => {
        return listOfCountries.map((item) => (
            <CountryCard 
                key={item.id} 
                country={item} 
                handleAddGold={addGoldToCountry}
                handleRemoveGold={removeGoldFromCountry}
            />
        ));
    };
    
    return (
        <Grid container spacing={2} sx={{p: 2}}>
            {getCountryComponents()}
        </Grid>
    );
}