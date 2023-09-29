import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPriority } from './interface';
import { PriorityModel } from './model';

@Injectable()
export class PriorityService {
  constructor(
    @InjectModel(PriorityModel.name)
    private readonly priorityModel: Model<PriorityModel>,
  ) {}

  async getAll(): Promise<IPriority[]> {
    return await this.priorityModel.find();
  }

  // async create(data: any): Promise<IPriority> {
  //   const { title } = data;

  //   const exist = await this.priorityModel.findOne({ title });
  //   if (exist) {
  //     throw new ConflictException('Such category already exists');
  //   }

  //   const newType = new this.priorityModel({ title });
  //   return await newType.save();
  // }
}
