import { Module } from '@nestjs/common';
import { MethodologiesController } from './methodologies.controller';

@Module({ controllers: [MethodologiesController] })
export class MethodologiesModule {}
