import { IsArray, isNotEmpty } from 'class-validator';

export class UserAreasOfInterestDto {
  @IsArray()
  interestsToAdd: string[];

  @IsArray()
  interestsToRemove: string[];
}
