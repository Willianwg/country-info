import { Injectable } from '@nestjs/common';
import type {
  CountryInfo,
  CountryList,
  CountryServiceGetResponse,
  GetFlagResponse,
  GetPopulationResponse,
  Population,
} from './types';

@Injectable()
export class CountryService {
  async list(): Promise<CountryList> {
    const response = await fetch(
      'https://date.nager.at/api/v3/AvailableCountries',
    );
    const countries = (await response.json()) as CountryList;
    return countries;
  }

  async get(code: string): Promise<CountryServiceGetResponse> {
    const [info, flag] = await Promise.all([
      this.getInfo(code),
      this.getFlag(code),
    ]);
    const population = await this.getPopulation(info.commonName);
    return {
      flagURL: flag,
      ...info,
      population,
    };
  }

  private async getInfo(code: string): Promise<CountryInfo> {
    const res = await fetch(`${process.env.COUNTRY_LIST_API_URL}/${code}`);
    const info = (await res.json()) as CountryInfo;
    return info;
  }
  private async getPopulation(countryName: string): Promise<Population[]> {
    const res = await fetch(`${process.env.COUNTRY_INFO_API_URL}/population`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        country: countryName,
      }),
    });
    const body = (await res.json()) as GetPopulationResponse;
    return body.data.populationCounts;
  }
  private async getFlag(code: string): Promise<string> {
    const res = await fetch(`${process.env.COUNTRY_INFO_API_URL}/flag/images`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        iso2: code,
      }),
    });
    const body = (await res.json()) as GetFlagResponse;
    return body.data.flag;
  }
}
