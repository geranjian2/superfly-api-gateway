import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ClientProxySuperFligths } from 'src/common/proxy/client-proxy';
import { PassengerDTO } from './dto/passenger.dto';
import { IPassenger } from '../common/interfaces/passenger.interface';
import { PassengerMSG } from 'src/common/contants';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('passengers')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/passenger')
export class PassengerController {
  constructor(private readonly clientProxy: ClientProxySuperFligths) {}
  private _clientProxyPassenger = this.clientProxy.clientProxyPassengers();
  async onApplicationBootstrap() {
    await this._clientProxyPassenger.connect();
  }
  @Post()
  create(@Body() _passengerDTO: PassengerDTO): Observable<IPassenger> {
    return this._clientProxyPassenger.send(PassengerMSG.CREATE, _passengerDTO);
  }
  @Get()
  findAll(): Observable<IPassenger[]> {
    return this._clientProxyPassenger.send(PassengerMSG.FIND_ALL, '');
  }
  @Get(':id')
  findOne(@Param('id') id: string): Observable<IPassenger> {
    return this._clientProxyPassenger.send(PassengerMSG.FIND_ONE, id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() _passengerDTO: PassengerDTO) {
    return this._clientProxyPassenger.send(PassengerMSG.UPDATE, {
      id,
      _passengerDTO,
    });
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this._clientProxyPassenger.send(PassengerMSG.DELETE, id);
  }
}
