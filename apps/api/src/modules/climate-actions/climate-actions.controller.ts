import { Controller, Get, Param } from '@nestjs/common';

// GET /api/v1/climate-actions/:actionCode/methodologies
@Controller('climate-actions')
export class ClimateActionsController {
  @Get(':actionCode/methodologies')
  methodologies(@Param('actionCode') actionCode: string) {
    return { todo: 'return mapped methodologies', actionCode };
  }
}
