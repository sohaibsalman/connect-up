import { IsNotEmpty, IsOptional } from 'class-validator';

export class UserProfileDto {
  @IsOptional()
  avatar: string;

  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsNotEmpty()
  dateOfBirth: string;

  @IsNotEmpty()
  mobileNumber: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  addressCountry: string;

  @IsNotEmpty()
  addressState: string;

  @IsNotEmpty()
  addressCity: string;

  @IsOptional()
  bio: string;

  @IsOptional()
  headline: string;

  @IsNotEmpty()
  companyName: string;

  @IsOptional()
  companyWebsite: string;

  @IsNotEmpty()
  linkedInProfile: string;
}
