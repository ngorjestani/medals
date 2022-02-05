import {FunctionComponent, useState} from "react";
import {Grid} from "@mui/material";
import {CountryCard} from "./CountryCard";
import {nanoid} from "nanoid";
import {Country} from "../models/types";
import {countries} from "../models/countries";
import {AddCountryButton} from "./AddCountryButton";

type ICountryListProps = {
    
}

export const CountryList : FunctionComponent<ICountryListProps> = () => {
    const [listOfCountries, setListOfCountries] = useState<Country[]>(countries);
    
    const addMedalToCountry = (countryId: string, medalId: string) => {
        setListOfCountries((prevState) => {
            return prevState.map((item) => (
                item.id === countryId 
                    ? {...item, medals: item.medals.map((m) => (
                        m.id === medalId
                            ? {...m, count: m.count + 1} 
                            : m
                        ))} 
                    : item
            ));
        });
    };
    
    const removeMedalFromCountry = (countryId: string, medalId: string) => {
        setListOfCountries((prevState) => {
            return prevState.map((item) => (
                item.id === countryId
                    ? {...item, medals: item.medals.map((m) => (
                            m.id === medalId
                                ? {...m, count: m.count - 1}
                                : m
                        ))}
                    : item
            ));
        });
    };
    
    const displayAddCountryModal = () => {
        
    };
    
    const getCountryComponents = () => {
        return listOfCountries.map((item) => (
            <CountryCard 
                key={item.id} 
                country={item} 
                handleAddMedal={addMedalToCountry}
                handleRemoveMedal={removeMedalFromCountry}
            />
        ));
    };
    
    return (
        <>
            <Grid container spacing={2} sx={{p: 2}}>
                {getCountryComponents()}
            </Grid>
            <AddCountryButton handleClick={displayAddCountryModal}/>
        </>
    );
}