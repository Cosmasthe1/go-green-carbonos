import { Module } from '@nestjs/common';
import { ClimateActionsController } from './climate-actions.controller';

@Module({ controllers: [ClimateActionsController] })
export class ClimateActionsModule {}
