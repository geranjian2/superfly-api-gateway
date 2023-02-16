import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ClientProxySuperFligths } from '../common/proxy/client-proxy';
import { UserDTO } from './dto/user.dto';
import { Observable } from 'rxjs';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserMSG } from '../common/contants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('api/v2/user')
export class UserController {
  constructor(private readonly clientProxy: ClientProxySuperFligths) {}
  private _clientProxyUser = this.clientProxy.clientProxyUsers();
  onModuleInit() {
    console.log(`The module has been initialized.`);
  }
  async onApplicationBootstrap() {
    await this._clientProxyUser.connect();
  }
  @Post()
  create(@Body() _userDTO: UserDTO): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.CREATE, _userDTO);
  }
  @Get()
  findAll(): Observable<IUser[]> {
    return this._clientProxyUser.send(UserMSG.FIND_ALL, '');
  }
  @Get(':id')
  findOne(@Param('id') id: string): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.FIND_ONE, id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() _userDTO: UserDTO) {
    return this._clientProxyUser.send(UserMSG.UPDATE, { id, _userDTO });
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this._clientProxyUser.send(UserMSG.DELETE, id);
  }
}
