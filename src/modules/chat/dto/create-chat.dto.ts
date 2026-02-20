import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateChatDto {
  @IsInt()
  @IsNotEmpty()
  helpdeskRequestId: number;

  @IsInt()
  @IsNotEmpty()
  senderId: number;

  @IsString()
  @IsNotEmpty()
  message: string;
}
