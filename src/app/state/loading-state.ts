import { Olympic } from "../models/olympic";

export type LoadingStatus = 'empty' | 'loading' | 'loaded' | 'error';

export interface LoadingState {
    status: LoadingStatus;
    data?: Olympic[];
    error?: string;

}
