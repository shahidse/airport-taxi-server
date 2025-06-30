import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

interface ParamOption {
  name: string;
  required?: boolean;
  description?: string;
  type?: any;
  example?: any;
  default?: any;
}

interface ApiEndpointOptions {
  summary: string;
  description?: string;
  tags?: string[];
  authRequired?: boolean;
  bodyType?: any;
  bodySchema?: any;
  responses?: {
    status: number;
    description: string;
    schema?: any;
  }[];
  queryParams?: ParamOption[];
  pathParams?: ParamOption[];
}

export function ApiEndpoint(options: ApiEndpointOptions) {
  const {
    summary,
    description = '',
    tags = ['Default'],
    authRequired = false,
    bodyType,
    bodySchema,
    responses = [],
    queryParams = [],
    pathParams = [],
  } = options;

  const decorators = [
    ApiTags(...tags),
    ApiOperation({
      summary,
      description:
        description + (authRequired ? ' (Requires Bearer Token)' : ''),
    }),
  ];

  if (authRequired) {
    decorators.push(ApiBearerAuth());
    decorators.push(
      ApiResponse({
        status: 401,
        description: 'Unauthorized - Bearer token missing or invalid',
      }),
    );
  }

  if (bodyType) {
    decorators.push(ApiBody({ type: bodyType }));
  } else if (bodySchema) {
    decorators.push(ApiBody({ schema: bodySchema }));
  }

  for (const res of responses) {
    decorators.push(
      ApiResponse({
        status: res.status,
        description: res.description,
        ...(res.schema ? { schema: res.schema } : {}),
      }),
    );
  }

  for (const param of queryParams) {
    decorators.push(
      ApiQuery({
        name: param.name,
        required: param.required ?? true,
        description: param.description ?? '',
        type: param.type ?? String,
        example: param.example,
      }),
    );
  }

  for (const param of pathParams) {
    decorators.push(
      ApiParam({
        name: param.name,
        required: param.required ?? true,
        description: param.description ?? '',
        type: param.type ?? String,
        example: param.example,
      }),
    );
  }

  return applyDecorators(...decorators);
}
