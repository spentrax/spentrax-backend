import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string

  @IsString()
  @MinLength(6)
  password!: string
}

export class LoginDto {
  @IsEmail()
  email!: string

  @IsString()
  password!: string
}
