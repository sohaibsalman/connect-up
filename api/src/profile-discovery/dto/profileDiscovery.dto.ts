import { IsObject } from 'class-validator';

import { SearchBy } from '../enums/search-by.enum';

export class ProfileDiscoveryDto {
  @IsObject()
  searchParams: {
    by: SearchBy;
    values: string[];
  };
}
