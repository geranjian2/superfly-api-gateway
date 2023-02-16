import { Module } from '@nestjs/common';
import { ClientProxySuperFligths } from './client-proxy';

@Module({
  providers: [ClientProxySuperFligths],
  exports: [ClientProxySuperFligths],
})
export class ProxyModule {}
