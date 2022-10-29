import { IsNotEmpty, IsOptional } from 'class-validator';

export class AreasOfInterestDto {
  @IsOptional()
  uuid: string;

  @IsNotEmpty()
  title: string;
}
