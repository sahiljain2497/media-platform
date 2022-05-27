import { IsString, MaxLength } from 'class-validator';

export class CreatePlatformDto {
  @IsString()
  @MaxLength(100, {
    message: 'Maximum Length for platform name is 100 characters.',
  })
  public name: string;
}
