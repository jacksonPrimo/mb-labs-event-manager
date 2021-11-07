import emailValidator from 'email-validator';

export const validateEmail = (email: string): boolean => {
  return emailValidator.validate(email);
};

export const objectReturn = (message: string, data: Object | Array<any>, error: boolean, statusCode: number) => {
  return {
    message,
    data,
    error,
    statusText: error ? 'NOK' : 'OK',
    statusCode
  };
};

export const filterByToday = (array: Array<Object>, field: string) => {
  const currentDate = new Date();
  return array.filter((register: any) => {
    const dateToCheck = new Date(register[field]);
    dateToCheck.setDate(dateToCheck.getDate() + 1);
    return dateToCheck.toLocaleDateString() === currentDate.toLocaleDateString();
  });
};
