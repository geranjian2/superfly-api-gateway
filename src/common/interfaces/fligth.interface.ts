import { IPassenger } from './passenger.interface';
import { IWeather } from './weather.interface';
export interface IFligth {
  _id?: string;
  pilot: string;
  airplane: string;
  destinationCity: string;
  fligthDate: Date;
  passengers: IPassenger[];
  weather: IWeather[];
}
