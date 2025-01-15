import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './auth.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { signUpDTO } from './signup.dto';
import { LoginDTO } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private userModel: Model<Auth>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDTO: signUpDTO): Promise<{ token: string }> {
    const { name, email, password } = signUpDTO;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(loginDTO: LoginDTO): Promise<{ token: string }> {
    const { email, password } = loginDTO;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
}
