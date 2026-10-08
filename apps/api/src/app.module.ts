import { Module } from '@nestjs/common';
import { MethodologiesModule } from './modules/methodologies/methodologies.module';
import { ClimateActionsModule } from './modules/climate-actions/climate-actions.module';

@Module({ imports: [MethodologiesModule, ClimateActionsModule] })
export class AppModule {}
