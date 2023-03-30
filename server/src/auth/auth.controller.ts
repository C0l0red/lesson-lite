import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestUser } from '../common/decorators/request-user.decorator';
import { User } from '../users/user.schema';
import { AuthService } from './providers/auth.service';
import { Public } from './decorators/public.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiConsumes('application/x-www-form-urlencoded')
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.usersService.create(createUserDto);

    return { message: 'User Created successfully', data };
  }

  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@RequestUser() user: User) {
    const data = await this.authService.login(user);

    return { message: 'Login successful', data };
  }
}
