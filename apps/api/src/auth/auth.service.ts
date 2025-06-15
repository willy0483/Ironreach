import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './dto/signin.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { User } from '@prisma/client';
import refreshConfig from './config/refresh.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    @Inject(refreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshConfig>,
  ) {}

  async validateLocalUser({ email, password }: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException('User Not Found');
    if (!user.password) throw new UnauthorizedException('Invalid credentials');

    const passwordMatched = await verify(user.password, password);

    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid Credentials!');
    }

    return user;
  }

  async generateTokens(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    return { accessToken, refreshToken };
  }

  async login(user: User) {
    const { accessToken, refreshToken } = await this.generateTokens(user.id);
    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      accessToken,
      refreshToken,
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new UnauthorizedException('User not found!');

    const currentUser = { id: user.id };
    return currentUser;
  }

  async validateRefreshToken(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new UnauthorizedException('User not found!');

    const currentUser = { id: user.id };
    return currentUser;
  }

  async refreshToken(userId: number, name: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    return {
      id: userId,
      name: name,
      accessToken,
      refreshToken,
    };
  }
}
