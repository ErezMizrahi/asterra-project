import { User } from '../types/user';
import { queryKeys } from '../utils/query.keys';
import { useQuery } from 'react-query';

const useUsers = () => {
    const { data, isLoading } = useQuery({
        queryKey: [ queryKeys.all ],
        queryFn: async () => { 
            await new Promise((resolve, reject) => setTimeout((a) =>  resolve(a), 1000));
            const res = await fetch('/api/users');
            return res.json();
            }
        });
  return {users: data, isLoading}
}

export default useUsers