import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

interface ApiEndpointOptions {
  summary: string;
  description?: string;
  tags?: string[];
  authRequired?: boolean; // Add this
  bodyType?: any; // DTO class
  bodySchema?: any; // Raw schema
  responses?: {
    status: number;
    description: string;
    schema?: any;
  }[];
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

  return applyDecorators(...decorators);
}
