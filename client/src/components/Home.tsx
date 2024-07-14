import { useQuery } from "react-query";
import { queryKeys } from "../utils/query.keys";
import Table from "./Table";

const Home = () => {
    const { data, isLoading } = useQuery({
        queryKey: [ queryKeys.all ],
        queryFn: async ({signal}) => { 
            const res = await fetch('http://localhost:4000/api/users');
            return res.json();
          }
      });
      

      if (isLoading) {
        return <>'loading'</>;
      }
  return (
    <Table tableData={data} />
  )
}

export default Home