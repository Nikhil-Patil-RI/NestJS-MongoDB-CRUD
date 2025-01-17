import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDTO } from './signup.dto';
import { LoginDTO } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: signUpDTO): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Get('/login')
  login(@Body() LoginDTO: LoginDTO): Promise<{ token: string }> {
    return this.authService.login(LoginDTO);
  }

  @Post('/validate/:email/:password') 
  validateUser(
    @Param('email') email: string,
    @Param('password') password: string,
  ): Promise<string> {
    return this.authService.validateUser(email, password);
  }
}
