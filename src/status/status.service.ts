import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStatus } from './interface';
import { StatusModel } from './model';

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
