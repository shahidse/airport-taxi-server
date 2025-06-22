import { ApiOperation, ApiBody } from '@nestjs/swagger';
import { GetSecretDto } from '../dto/secret.dto';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { CreateUserDto } from '../dto/createOrUpdateUser.dto';
export function ApiPostSecret() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiTags('Users');
    ApiOperation({
      summary: 'Get secret',
      description: 'Retrieves a secret based on the provided secret key.',
    })(target, key, descriptor);

    ApiBody({
      description: 'Request body to fetch secret',
      type: GetSecretDto,
    })(target, key, descriptor);
  };
}
export function ApiGetRoles() {
  return applyDecorators(
    ApiTags('Users'), // Tag the endpoint as "Users" in Swagger UI
    ApiBearerAuth(), // Indicates this endpoint requires a bearer token (JWT)
    ApiOperation({
      summary: 'Get Roles', // A short description of what this endpoint does
      description: 'Retrieves the roles associated with the user or system.', // Full description of what the API does
    }),
    ApiResponse({
      status: 200,
      description: 'Roles retrieved successfully',
      type: 'object', // The DTO you use to structure the response for roles
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized - Missing or invalid JWT token',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - User does not have access to roles',
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    }),
  );
}

export function ApiSignup() {
  return applyDecorators(
    ApiTags('Users'),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'User Signup (Private)',
      description:
        'Creates a new user account. This is a private API and requires authorization.',
    }),
    ApiBody({
      type: CreateUserDto,
      description: 'User signup payload',
    }),
    ApiResponse({
      status: 201,
      description: 'User successfully registered',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized - Invalid or missing token',
    }),
    ApiResponse({
      status: 422,
      description: 'Validation Error (e.g., Email already exists)',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request (Invalid Data)',
    }),
  );
}
export function ApiSignIn() {
  return applyDecorators(
    ApiTags('Users'),
    ApiOperation({
      summary: 'User Login',
      description: 'Login using email, username, or phone number',
    }),
    ApiBearerAuth(), // Indicates this is a private API requiring authentication
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            example: 'demo_one',
            description: 'Email, Username, or Phone',
          },
          password: {
            type: 'string',
            example: 'admin123',
            description: 'User password',
          },
        },
        required: ['email', 'password'],
      },
    }),
    ApiResponse({
      status: 200,
      description: 'User successfully logged in',
      schema: { example: { token: 'JWT_TOKEN' } },
    }),
    ApiResponse({ status: 401, description: 'Invalid credentials' }),
    ApiResponse({ status: 422, description: 'Validation error' }),
  );
}
