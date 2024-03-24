import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function RequireWhenIndicatedPropertIsEmpty(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'requireWhenIndicatedPropertIsEmpty',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const relatedValue = (args.object as any)[property];
          return !!value || !!relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          const relatedProperty = args.constraints[0];
          return `${args.property} or ${relatedProperty} is required`;
        },
      },
    });
  };
}
