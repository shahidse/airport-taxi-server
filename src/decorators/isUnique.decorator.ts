import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { UsersService } from 'src/modules/users/users.service';
import { EntityManager } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject('ENTITY_MANAGER') private readonly entityManager: EntityManager,
    private readonly userService: UsersService,
  ) {}

  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const field = args.property;
    const { tableName, column, isEdit }: IsUniqeInterface = args.constraints[0];
    if (isEdit) {
      value = '';
      await this.entityManager
        .getRepository(tableName)
        .createQueryBuilder()
        .update(tableName)
        .set({ [column]: value })
        .where({ [column]: value })
        .execute();
    }
    const dataExist = await this.entityManager
      .getRepository(tableName)
      .createQueryBuilder(tableName)
      .where({ [column]: value })
      .getExists();

    if (dataExist) {
      throw new HttpException(
        { message: `${field} already exists`, field },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} already exists`;
  }
}

// Define Options for Decorator
export type IsUniqeInterface = {
  tableName: any; // Should match entity class
  column: string;
  isEdit?: boolean;
};

// Unique Field Decorator
export function IsUnique(
  options: IsUniqeInterface,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint,
    });
  };
}
