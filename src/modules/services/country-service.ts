import axios from "axios";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {Country} from "../../models/types";

export class CountryService {
    private static baseUri = 'https://ng-olympic-medals.azurewebsites.net/Api';
    private static hubUri = 'https://ng-olympic-medals.azurewebsites.net/medalsHub';
    
    public static getAllCountries = async () => {
        try {
            return await axios.get(`${CountryService.baseUri}/country`);
        } catch (e) {
            console.error('Getting countries failed', e);
        }
    }
    
    public static deleteCountryById = async (id: number) => {
        try {
            await axios.delete(`${CountryService.baseUri}/country/${id}`);
        } catch(e) {
            console.error("Deleting country failed: ", e);
        }
    };
    
    public static addNewCountry = async (name: string) => {
        try {
            await axios.post(`${CountryService.baseUri}/country`, {name: name});
        } catch (e) {
            console.error('Adding country failed', e);
        }
    };
    
    public static updateMedalCount = async (id: number, name: string, value: number) => {
        const patch = [{op: 'replace', path: name.toLowerCase(), value: value}];
        try {
            await axios.patch(`${CountryService.baseUri}/country/${id}`, patch);
        } catch (e) {
            console.error('Updating count failed', e)
        }
    };
    
    public static getHubConnection = () => {
        return new HubConnectionBuilder()
            .withUrl(CountryService.hubUri)
            .withAutomaticReconnect()
            .build();
    }
    
    public static startHubConnection = async (connection: HubConnection) => {
        try {
            await connection.start();
        } catch (e) {
            console.error('Error starting SignalR: ', e);
        }
    };
}