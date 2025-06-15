import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/signin.input';
import { AuthPayload, RefreshPayload } from './entities/auth-payload.entity';
import { UseGuards } from '@nestjs/common';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { User } from '@prisma/client';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    const user = await this.authService.validateLocalUser(signInInput);
    return await this.authService.login(user);
  }

  @UseGuards(RefreshAuthGuard)
  @Mutation(() => RefreshPayload)
  async refreshTokens(@Context() context: { req: { user: User } }) {
    const user = context.req.user;
    return this.authService.refreshToken(user.id);
  }
}
