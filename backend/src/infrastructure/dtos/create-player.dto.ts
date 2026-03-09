import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty({ message: 'O apelido não pode ser vazio' })
  @MinLength(2, { message: 'O apelido precisa ter pelo menos 2 caracteres' })
  @MaxLength(20, { message: 'O apelido pode ter no máximo 20 caracteres' })
  nickname: string;
}
