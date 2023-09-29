import { Module } from '@nestjs/common';
import { PriorityController } from './priority.controller';
import { PriorityService } from './priority.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PriorityModel, PrioritySchema } from './model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PriorityModel.name, schema: PrioritySchema },
    ]),
    // forwardRef(() => PostModule),
  ],
  providers: [PriorityService],
  controllers: [PriorityController],
  exports: [PriorityService],
})
export class PriorityModule {}
