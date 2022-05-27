import { IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MaxLength(200, {
    message: 'Maximum Length for title is 200 characters.',
  })
  public title: string;

  @IsString()
  public description: string;
}
