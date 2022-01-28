type Country = {
    
    id: string,
    name: string,
    medals: Medal[],
}

type Medal = {
    id: string,
    name: string,
    count: number,
}

export type {Country, Medal};