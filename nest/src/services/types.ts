export type CountryList = {
  countryCode: string;
  name: string;
}[];

export type GetCountryInfoResponse = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: GetCountryInfoResponse[] | null;
};

export interface GetFlagResponse {
  error: boolean;
  msg: string;
  data: {
    name: string;
    flag: string;
    iso2: string;
    iso3: string;
  };
}

export interface GetPopulationResponse {
  error: boolean;
  msg: string;
  data: {
    country: string;
    code: string;
    iso3: string;
    populationCounts: {
      year: number;
      value: number;
    }[];
  };
}

export type Population = {
  year: number;
  value: number;
};

export type CountryInfo = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: CountryInfo[] | null;
};

export type CountryServiceGetResponse = CountryInfo & {
  population: {
    year: number;
    value: number;
  }[];
  flagURL: string;
};

export type ConfigService = {
  PORT: string;
  COUNTRY_LIST_API_URL: string;
  COUNTRY_INFO_API_URL: string;
};
