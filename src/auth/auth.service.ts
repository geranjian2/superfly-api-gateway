import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '../user/dto/user.dto';
import { ClientProxySuperFligths } from 'src/common/proxy/client-proxy';
import { UserMSG } from 'src/common/contants';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxy: ClientProxySuperFligths,
    private readonly jwtService: JwtService,
  ) {}
  private _clientProxyUser = this.clientProxy.clientProxyUsers();
  async onApplicationBootstrap() {
    await this._clientProxyUser.connect();
  }
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this._clientProxyUser
      .send(UserMSG.VALIDATE_USER, {
        username,
        password,
      })
      .toPromise();
    if (user) return user;
    return null;
  }
  async signIn(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
  async signUp(userDto: UserDTO) {
    return await this._clientProxyUser
      .send(UserMSG.CREATE, userDto)
      .toPromise();
  }
}
