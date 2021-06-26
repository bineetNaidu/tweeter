import { RegisterInput } from 'src/resolvers/users';

export const validateRegister = (options: RegisterInput) => {
  if (!options.email.includes('@')) {
    return [
      {
        field: 'email',
        message: 'invalid email',
      },
    ];
  }

  if (options.username.length <= 2) {
    return [
      {
        field: 'username',
        message: 'length must be greater than 2',
      },
    ];
  }

  if (options.username.includes('@')) {
    return [
      {
        field: 'username',
        message: 'cannot include an @',
      },
    ];
  }

  if (options.password.length <= 2) {
    return [
      {
        field: 'password',
        message: 'length must be greater than 2',
      },
    ];
  }

  if (options.first_name.length <= 2) {
    return [
      {
        field: 'first_name',
        message: 'length must be greater than 2',
      },
    ];
  }

  if (options.last_name.length <= 2) {
    return [
      {
        field: 'last_name',
        message: 'length must be greater than 2',
      },
    ];
  }

  return null;
};
