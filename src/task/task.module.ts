import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthModule } from 'src/auth/auth.module';
import { PriorityModule } from 'src/priority/priority.module';
import { ProjectModule } from 'src/project/project.module';
import { StatusModule } from 'src/status/status.module';
import { UserModule } from 'src/user/user.module';
import { TaskModel, TaskSchema } from './model ';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TaskModel.name, schema: TaskSchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const uploadPath = `./images`;
          cb(null, uploadPath);
        },
        filename: (_req, file, cb) =>
          cb(
            null,
            `${Date.now() + Math.random()}.${file.originalname
              .split('.')
              .pop()}`,
          ),
      }),
    }),
    forwardRef(() => AuthModule),
    forwardRef(() => StatusModule),
    forwardRef(() => ProjectModule), // Добавьте ProjectModule в imports
    forwardRef(() => PriorityModule),
    forwardRef(() => UserModule),
  ],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
