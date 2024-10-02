import useForm from 'hooks/useForm';
import React from 'react';
import * as Yup from 'yup';
const SignIn = () => {

    const signIn = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

    const { values, errors, handleChange, validate } = useForm({
    initialValues: signIn,
    validationSchema,
  });


  const submitHandler = async (e:React.FormEvent) => {
    e.preventDefault()
    try {
      await validate();
      // Submit form data here
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  }



  return (
    <section className='w-full h-screen flex items-center justify-center'>
      <form onSubmit={submitHandler} className='w-9/12 h-[50%] flex flex-col gap-4'>
      <h1 className='font-bold text-xl' >Sign In</h1>
        <span>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            placeholder='Enter your username'
            className='border border-gray-300 rounded p-2 w-full'
            onChange={handleChange}
            name='username'
            value={values.username}
          />
          {errors.username && <p className='text-red-500' >{errors.username}</p>}
        </span>
        <span>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Enter your password'
            className='border border-gray-300 rounded p-2 w-full'
            onChange={handleChange}
            name='password'
            value={values.password}
          />
          {errors.password && <p className='text-red-500' >{errors.password}</p>}
        </span>
        <button type='submit' className='bg-blue-500 text-white rounded p-2'>
          Sign In
        </button>
      </form>
    </section>
  );
};

export default SignIn;
