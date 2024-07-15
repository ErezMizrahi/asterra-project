import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import './style/Forms.css';
import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../utils/query.keys';

const schema = z.object({
  firstName: z.string().min(2, { message: 'First Name field is invalid' }),
  lastName: z.string().min(2, { message: 'Last Name field is invalid' }),
  address: z.string().min(2, { message: 'Address field is invalid' }),
  phoneNumber: z.string().regex(new RegExp(/^0?(([23489]{1}[0-9]{7})|[57]{1}[0-9]{8})+$/), { message: 'Phone Number field is invalid' }),
});

type FormFields = z.infer<typeof schema>;


const UserForm = () => {
    const queryClient = useQueryClient();

    const { register, handleSubmit, setError, formState: { errors, isSubmitting }, reset } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });

    const mutation = useMutation({
        mutationKey: [queryKeys.addUser],
        mutationFn: async (data: FormFields) => {
            await fetch('http://localhost:4000/api/users/create' ,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
        },
          onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: [queryKeys.all]});
          }
    });

      const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            mutation.mutate(data);
            reset();
        } catch (error) {
          setError("root", {
            message: "This email is already taken",
          });
        }
      };

  return (
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <h2>User Form</h2>

        <label htmlFor="firstName">First Name</label>
        {errors.firstName && (
            <div className="text-red">{errors.firstName.message}</div>
        )}
        <input {...register("firstName")} type="text" placeholder="" />
        
        <label htmlFor="lastName">Last Name</label>
        {errors.lastName && (
            <div className="text-red">{errors.lastName.message}</div>
        )}
        <input {...register("lastName")} type="text" placeholder="" />
        
        <label htmlFor="address">Address</label>
        {errors.address && (
            <div className="text-red">{errors.address.message}</div>
        )}
        <input {...register("address")} type="text" placeholder="" />
        
        <label htmlFor="phoneNumber">Phone Number</label>
        {errors.phoneNumber && (
            <div className="text-red">{errors.phoneNumber.message}</div>
        )}
        <input {...register("phoneNumber")} type="text" placeholder="" />
        
        <div className='btn-container'>
            <button className='forms-btn' disabled={isSubmitting} type="submit">
                {isSubmitting ? "Loading..." : "Submit"}
            </button>
        </div>
        
        {errors.root && <div className="text-red">{errors.root.message}</div>}
        </form>
  )
}

export default UserForm