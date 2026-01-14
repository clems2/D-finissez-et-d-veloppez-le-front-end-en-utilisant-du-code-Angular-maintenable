//API Country datas
export interface CountryDatas {
    id: number;
    country: string;
    participations: [
        id: number,
        year: number,
        city: string,
        medalsCount: number,
        athleteCount: number
    ]
}
