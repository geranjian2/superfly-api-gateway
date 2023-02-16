import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FligthMSG, PassengerMSG } from 'src/common/contants';
import { IFligth } from 'src/common/interfaces/fligth.interface';
import { ClientProxySuperFligths } from 'src/common/proxy/client-proxy';
import { FligthDTO } from './dto/fligth.dto';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('fligths')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v2/fligth')
export class FligthController {
  constructor(private readonly clientProxy: ClientProxySuperFligths) {}
  private _clientProxyFligth = this.clientProxy.clientProxyFligths();
  private _clientProxyPassenger = this.clientProxy.clientProxyPassengers();
  async onApplicationBootstrap() {
    await this._clientProxyFligth.connect();
    await this._clientProxyPassenger.connect();
  }
  @Post()
  create(@Body() _fligthDTO: FligthDTO): Observable<IFligth> {
    return this._clientProxyFligth.send(FligthMSG.CREATE, _fligthDTO);
  }
  @Get()
  findAll(): Observable<IFligth[]> {
    return this._clientProxyFligth.send(FligthMSG.FIND_ALL, '');
  }
  @Get(':id')
  findOne(@Param('id') id: string): Observable<IFligth> {
    return this._clientProxyFligth.send(FligthMSG.FIND_ONE, id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() _fligthDTO: FligthDTO) {
    return this._clientProxyFligth.send(FligthMSG.UPDATE, {
      id,
      _fligthDTO,
    });
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this._clientProxyFligth.send(FligthMSG.DELETE, id);
  }
  @Post(':fligthId/passenger/:passengerId')
  async addPassenger(
    @Param('fligthId') fligthId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this._clientProxyPassenger
      .send(PassengerMSG.FIND_ONE, passengerId)
      .toPromise();
    if (!passenger)
      throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);

    return this._clientProxyFligth.send(FligthMSG.ADD_PASSENGER, {
      fligthId,
      passengerId,
    });
  }
}
