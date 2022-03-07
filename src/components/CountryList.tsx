import {FunctionComponent, useEffect, useState} from "react";
import {Grid} from "@mui/material";
import {CountryCard} from "./CountryCard";
import {nanoid} from "nanoid";
import {Country} from "../models/types";
import {AddCountryButton} from "./AddCountryButton";
import {AddCountryDialogForm} from "./AddCountryDialogForm";
import {CountryService} from "../modules/services/country-service";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";

type ICountryListProps = {}

export const CountryList: FunctionComponent<ICountryListProps> = () => {
    const [listOfCountries, setListOfCountries] = useState<Country[]>([]);
    const [showNewCountryDialog, setShowNewCountryDialog] = useState(false);
    const [connection, setConnection] = useState<HubConnection>();

    useEffect(() => {
        const initialCountries: Country[] = [];
        
        CountryService.getAllCountries()
            .then(resp => {
                if (resp){
                    resp.data.forEach((c: any) => {
                        initialCountries.push({
                            id: c.id,
                            name: c.name,
                            medals: [
                                {name: "Gold", count: c.gold},
                                {name: "Silver", count: c.silver},
                                {name: "Bronze", count: c.bronze},
                            ],
                        })
                    })
                }

                setListOfCountries(initialCountries);
            });
        
        setConnection(CountryService.getHubConnection());
    }, []);
    
    useEffect(() => {
        if (connection) {
            CountryService.startHubConnection(connection);
        }
    }, [connection]);
    
    connection?.on('ReceiveAddMessage', c => {
        setListOfCountries(prevState => {
            return prevState.some(x => x.id === c.id)
                ? prevState
                : [...prevState, {
                    id: c.id,
                    name: c.name,
                    medals: [
                        {name: 'Gold', count: c.gold},
                        {name: 'Silver', count: c.silver},
                        {name: 'Bronze', count: c.bronze},
                    ],
                }]
        });
    });
    
    connection?.on('ReceiveDeleteMessage', id => {
        setListOfCountries(prevState => prevState.filter(c => c.id !== id));
    });
    
    connection?.on('ReceivePatchMessage', c => {
        setListOfCountries(prevState => {
            return prevState.map(x => (
               x.id !== c.id 
                   ? x
                   : {
                       id: c.id,
                       name: c.name,
                       medals: [
                           {name: 'Gold', count: c.gold},
                           {name: 'Silver', count: c.silver},
                           {name: 'Bronze', count: c.bronze},
                       ],
                   }
            ));
        });
    });

    const addMedalToCountry = (countryId: number, medalName: string, currentCount: number) => {
        setListOfCountries(prevState => {
            return prevState.map(x => (
                x.id !== countryId
                    ? x
                    : {...x, medals: x.medals.map(m => (
                        m.name !== medalName
                            ? m
                            : {...m, count: m.count + 1}
                        ))}
            ));
        });
        
        CountryService.updateMedalCount(countryId, medalName, currentCount + 1);
    };

    const removeMedalFromCountry = (countryId: number, medalName: string, currentCount: number) => {
        setListOfCountries(prevState => {
            return prevState.map(x => (
                x.id !== countryId
                    ? x
                    : {...x, medals: x.medals.map(m => (
                            m.name !== medalName
                                ? m
                                : {...m, count: m.count - 1}
                        ))}
            ));
        });
        
        CountryService.updateMedalCount(countryId, medalName, currentCount - 1);
    };

    const removeCountryFromList = (countryId: number) => {
        setListOfCountries((prevState) => {
            return prevState.filter(x => !(x.id === countryId));
        });
        
        CountryService.deleteCountryById(countryId);
    };

    const displayAddCountryModal = () => {
        setShowNewCountryDialog(true);
    };

    const closeAddCountryDialog = () => {
        setShowNewCountryDialog(false);
    };

    const addCountryToList = (name: string) => {
        CountryService.addNewCountry(name);
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