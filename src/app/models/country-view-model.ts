import { LoadingStatus } from '../state/loading-state';
import { DataCard } from './data-card';

export interface CountryViewModel {
  state: LoadingStatus;
  titlePage: string;
  dataCards: DataCard[];
  chartData: {
    labels: number[];
    values: number[];
  };
  error?: string;
}