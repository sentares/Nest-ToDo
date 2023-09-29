import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StatusModel } from './model';
import { Model } from 'mongoose';
import { IStatus } from './interface';
import { StatusDto } from './dto';

@Injectable()
export class StatusService {
  constructor(
    @InjectModel(StatusModel.name)
    private readonly statusModel: Model<StatusModel>,
  ) {}

  async getAll(): Promise<IStatus[]> {
    return await this.statusModel.find();
  }

  // async create(data: StatusDto): Promise<IStatus> {
  //   const { title } = data;

  //   const exist = await this.statusModel.findOne({ title });
  //   if (exist) {
  //     throw new ConflictException('Such status already exists');
  //   }

  //   const newStatus = new this.statusModel({ title });
  //   return await newStatus.save();
  // }
}
