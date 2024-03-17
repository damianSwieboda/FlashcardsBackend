import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function HasDifferentValue(property: string, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'hasDifferentValue',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const relatedValue = args.object[property];
          return value !== relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          const relatedValue = args.object[property];
          return `${propertyName} must have a different value from ${relatedValue}, that were provided in another related place.`;
        },
      },
    });
  };
}
