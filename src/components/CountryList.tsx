import {FunctionComponent, useState} from "react";
import {Grid} from "@mui/material";
import {CountryCard} from "./CountryCard";
import {nanoid} from "nanoid";
import {Country} from "../models/types";
import {countries, defaultMedalStartingList} from "../models/countries";
import {AddCountryButton} from "./AddCountryButton";
import {AddCountryDialogForm} from "./AddCountryDialogForm";

type ICountryListProps = {
    
}

export const CountryList : FunctionComponent<ICountryListProps> = () => {
    const [listOfCountries, setListOfCountries] = useState<Country[]>(countries);
    const [showNewCountryDialog, setShowNewCountryDialog] = useState(false);
    
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
    
    const removeCountryFromList = (countryId: string) => {
        setListOfCountries((prevState) => {
            return prevState.filter(x => !(x.id === countryId));
        })
    };
    
    const displayAddCountryModal = () => {
        setShowNewCountryDialog(true);
    };
    
    const closeAddCountryDialog = () => {
        setShowNewCountryDialog(false);
    };
    
    const addCountryToList = (name: string) => {
        setListOfCountries(prevState => (
            [...prevState, {id: nanoid(5), name: name, medals: defaultMedalStartingList}]
        ));
        closeAddCountryDialog();
    };
    
    const getCountryComponents = () => {
        return listOfCountries.map((item) => (
            <CountryCard 
                key={item.id} 
                country={item} 
                handleAddMedal={addMedalToCountry}
                handleRemoveMedal={removeMedalFromCountry}
                handleRemoveCountry={removeCountryFromList}
            />
        ));
    };
    
    return (
        <>
            <Grid container spacing={2} sx={{p: 2}}>
                {getCountryComponents()}
            </Grid>
            <AddCountryButton handleClick={displayAddCountryModal}/>
            <AddCountryDialogForm 
                open={showNewCountryDialog} 
                handleAddCountry={addCountryToList} 
                handleCloseDialog={closeAddCountryDialog} 
            />
        </>
    );
}