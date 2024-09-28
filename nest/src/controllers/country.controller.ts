import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { CountryService } from '../services/country.service';

@Controller()
export class CountryController {
  constructor(private readonly appService: CountryService) {}

  @Get()
  list() {
    try {
      return this.appService.list();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Get('/:countryCode')
  get(@Param('countryCode') countryCode: string) {
    try {
      return this.appService.get(countryCode);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
