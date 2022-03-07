type Country = {
    
    id: number,
    name: string,
    medals: Medal[],
}

type Medal = {
    name: string,
    count: number,
}

export type {Country, Medal};