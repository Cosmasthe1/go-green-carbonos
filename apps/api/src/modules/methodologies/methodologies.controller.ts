import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

// Registry API (spec section 46)
//   GET  /api/v1/methodologies?sector=agriculture
//   GET  /api/v1/methodologies/:code/:version
//   POST /api/v1/methodologies/eligibility
@Controller('methodologies')
export class MethodologiesController {
  @Get()
  list(@Query('sector') sector?: string) {
    return { todo: 'query methodology registry', sector };
  }

  @Get(':code/:version')
  get(@Param('code') code: string, @Param('version') version: string) {
    return { todo: 'fetch methodology version', code, version };
  }

  @Post('eligibility')
  eligibility(@Body() body: unknown) {
    // delegate to @carbonos/carbon-engine eligibility evaluator
    return { todo: 'run eligibility engine', body };
  }
}
