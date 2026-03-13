import { LoadingStatus } from "../state/loading-state";
import { DataCard } from "./data-card";

export interface HomeViewModel {
    state: LoadingStatus;
    dataCards: DataCard[];
    chartData: {
    ids: number[];
    labels: string[];
    values: number[];
  };
  error?: string;
}
