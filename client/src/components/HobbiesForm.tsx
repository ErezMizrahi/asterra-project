import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import './style/Forms.css';
import useUsers from '../hooks/useUsers';
import { User } from '../types/user';
import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../utils/query.keys';

const schema = z.object({
  userId: z.string().min(1, { message: 'Users field is invalid' }),
  hobby: z.string().min(2, { message: 'Hobby field is invalid' }),
});

type FormFields = z.infer<typeof schema>;

const HobbiesForm = () => {
    const { users } = useUsers();
    const queryClient = useQueryClient();

    const { register, handleSubmit, setError, formState: { errors, isSubmitting }, reset } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });


    const { mutate } = useMutation({
        mutationKey: [queryKeys.addHobby],
        mutationFn: async (data: FormFields) => {
            await fetch('http://localhost:4000/api/users/hobby' ,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
        }
      });
      
      const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
          mutate({ userId: data.userId, hobby: data.hobby});
          reset();
        } catch (error) {
          setError("root", {
            message: "This email is already taken",
          });
        }
      };

  return (
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <h2>Hobbies Form</h2>

        <label htmlFor="users">Users</label>
        {errors.userId && (
            <div className="text-red">{errors.userId.message}</div>
        )}
       
       <select {...register("userId")}>
        <option value="">Select a user</option>
        {users?.map((user: User) => (
          <option key={user.id} value={user.id}>
            {user.firstName} {user.lastName}
          </option>
        ))}
        </select>
        
        <label htmlFor="hobby">Hobby</label>
        {errors.hobby && (
            <div className="text-red">{errors.hobby.message}</div>
        )}
        <input {...register("hobby")} type="text" placeholder="" />
        
        
        <div className='btn-container'>
            <button className='forms-btn' disabled={isSubmitting} type="submit">
                {isSubmitting ? "Loading..." : "Submit"}
            </button>
        </div>
        
        {errors.root && <div className="text-red">{errors.root.message}</div>}
        </form>
  )
}

export default HobbiesForm