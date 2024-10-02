import * as Yup from 'yup';

export type ValidationErrors = {
  [key: string]: string;
};

export const mapYupErrors = (error: Yup.ValidationError): ValidationErrors => {
  const newErrors: ValidationErrors = {};
  error.inner.forEach((err) => {
    if (err.path) {
      newErrors[err.path] = err.message;
    }
  });
  return newErrors;
};