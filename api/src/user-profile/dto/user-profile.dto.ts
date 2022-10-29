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
}
