import {nanoid} from "nanoid";
import {Medal} from "./types";

const medalStartingList: Medal[] = [
    {id: '1', name: 'Gold', count: 0},
    {id: '2', name: 'Silver', count: 0},
    {id: '3', name: 'Bronze', count: 0},
]

export const countries = [
    {id: nanoid(5), name: 'USA', medals: medalStartingList},
    {id: nanoid(5), name: 'China', medals: medalStartingList},
    {id: nanoid(5), name: 'Canada', medals: medalStartingList},
    {id: nanoid(5), name: 'Russia', medals: medalStartingList},
    {id: nanoid(5), name: 'Mexico', medals: medalStartingList},
];