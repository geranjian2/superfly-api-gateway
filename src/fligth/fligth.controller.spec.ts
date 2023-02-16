import { Test, TestingModule } from '@nestjs/testing';
import { FligthController } from './fligth.controller';

describe('FligthController', () => {
  let controller: FligthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FligthController],
    }).compile();

    controller = module.get<FligthController>(FligthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
