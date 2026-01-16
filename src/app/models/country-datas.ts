import { ParticipationDatas } from "./participation-datas";

//API Country datas
export interface CountryDatas {
    id: number;
    country: string;
    participations: ParticipationDatas[];
}
