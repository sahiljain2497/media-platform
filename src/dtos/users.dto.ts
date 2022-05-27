import { IsEmail, IsString, MaxLength, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @MinLength(8, {
    message: 'Password too short. Minimum length of password is 8',
  })
  @MaxLength(100, {
    message: 'Maximum Length for password is 100 characters.',
  })
  @IsString()
  public password: string;

  @IsString()
  @MaxLength(100, {
    message: 'Maximum Length for name is 100 characters.',
  })
  public fullName: string;
}

export class UpdateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @MaxLength(100, {
    message: 'Maximum Length for name is 100 characters.',
  })
  public fullName: string;

  @IsString()
  public about: string;

  @IsString()
  public dob: string;

  @IsString()
  public interests: string;
}

export class ChangePasswordDto {
  @MinLength(8, {
    message: 'Password too short. Minimum length of password is 8',
  })
  @MaxLength(100, {
    message: 'Maximum Length for password is 100 characters.',
  })
  @IsString()
  public password: string;
}
