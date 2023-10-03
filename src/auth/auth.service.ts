import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { PayloadDto } from './dto/payload.dto';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/user/interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login(data: LoginDto) {
    const { email, password } = data;
    const user: IUser = await this.userService.findByEmail(email);
    const isMatch = await bcrypt.compare(password, user?.password || '');

    if (!user || !isMatch) {
      throw new BadRequestException('Email or password does not match');
    }

    const payload: PayloadDto = {
      sub: user._id as string,
      iat: Date.now(),
      exp: Date.now() + 8 * 60 * 60 * 1000,
    };

    const token = this.jwtService.sign(payload);

    return { profile: { email: user.email, id: user._id, token } };
  }

  async validate(token: string) {
    try {
      const { sub, exp }: PayloadDto = this.jwtService.decode(
        token.split(' ').pop(),
      ) as PayloadDto;

      if (Date.now() > exp) {
        throw new UnauthorizedException();
      }

      return await this.userService.findById(sub);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
