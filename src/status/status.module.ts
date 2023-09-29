import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusModel, StatusSchema } from './model';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StatusModel.name, schema: StatusSchema },
    ]),
    // forwardRef(() => PostModule),
  ],
  providers: [StatusService],
  controllers: [StatusController],
  exports: [StatusService],
})
export class StatusModule {}
