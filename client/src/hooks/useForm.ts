// useForm.ts
import { useState } from 'react';

interface UseFormProps<T> {
  initialValues: T;
  validationSchema?: any; // You can specify your Yup validation schema here
}

const useForm = <T>({ initialValues, validationSchema }: UseFormProps<T>) => {
  const [values, setValues] = useState<any>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string | undefined>> | any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev: any) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleAutocompleteChange = (name: keyof T) => (event: React.SyntheticEvent, value: any) => {
    setValues((prev: any) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setValues((prev: any) => ({ ...prev, [name]: checked }));
  };

  const validate = async () => {
    if (validationSchema) {
      try {
        await validationSchema.validate(values, { abortEarly: false });
      } catch (error: any) {
        const newErrors: any = {};
        error.inner.forEach((err: any) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
        throw newErrors; // Re-throw for the caller to handle if needed
      }
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleAutocompleteChange,
    handleCheckboxChange,
    validate,
    setValues,
  };
};

export default useForm;
