import {nanoid} from "nanoid";
import {Medal} from "./types";

export const defaultMedalStartingList: Medal[] = [
    {id: '1', name: 'Gold', count: 0},
    {id: '2', name: 'Silver', count: 0},
    {id: '3', name: 'Bronze', count: 0},
]

export const countries = [
    {id: nanoid(5), name: 'USA', medals: defaultMedalStartingList},
    {id: nanoid(5), name: 'China', medals: defaultMedalStartingList},
    {id: nanoid(5), name: 'Canada', medals: defaultMedalStartingList},
    {id: nanoid(5), name: 'Russia', medals: defaultMedalStartingList},
    {id: nanoid(5), name: 'Mexico', medals: defaultMedalStartingList},
];