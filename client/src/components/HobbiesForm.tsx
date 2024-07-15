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
    const { users, isLoading } = useUsers();
    const queryClient = useQueryClient();

    const { register, handleSubmit, setError, formState: { errors, isSubmitting }, reset } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });


    const { mutate } = useMutation({
        mutationKey: [queryKeys.addHobby],
        mutationFn: async (data: FormFields) => {
            const response = await fetch('http://localhost:4000/api/users/hobby' ,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(JSON.stringify(error.errors))
              }

              return response.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(queryKeys.all);
            reset();
          },

        onError: (errors: any) => {
            const messages = JSON.parse(errors.message).map((e: { message: string }) => e.message).join('/n/r');
            setError("root", {
                message: messages,
            });
          }
      });
      
      const onSubmit: SubmitHandler<FormFields> = async (data) => {
          mutate({ userId: data.userId, hobby: data.hobby});
      };

  return (
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <h2>Hobbies Form</h2>

        <label htmlFor="users">Users</label>
        {errors.userId && (
            <div className="text-red">{errors.userId.message}</div>
        )}
       
       <select {...register("userId")}>
        {isLoading && <option key="loadingusers" value="">Loading users...</option> }
        
        <option key="selectauser" value="">Select a user</option>
        {users?.map( (user: User, index: number) => (
          <option key={`${user.id}-${index}`} value={user.id}>
            {user.firstName} {user.lastName}
          </option>
        ))}
        </select>
        
        <label htmlFor="hobby">Hobby</label>
        {errors.hobby && (
            <div className="text-red">{errors.hobby.message}</div>
        )}
        <input {...register("hobby")} type="text" placeholder="" />
        
        {errors.root && <div className="text-red">{errors.root.message}</div>}
        
        <div className='btn-container'>
            <button className='forms-btn' disabled={isSubmitting} type="submit">
                {isSubmitting ? "Loading..." : "Submit"}
            </button>
        </div>
        
        </form>
  )
}

export default HobbiesForm