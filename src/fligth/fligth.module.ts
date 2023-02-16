import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { FligthController } from './fligth.controller';

@Module({
  imports: [ProxyModule],
  controllers: [FligthController],
})
export class FligthModule {}
