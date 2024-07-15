import { useQuery } from "react-query";
import { queryKeys } from "../utils/query.keys";
import Table from "./Table";
import useUsers from "../hooks/useUsers";
import Loader from "./Loader";

const Home = () => {
    const { users, isLoading } = useUsers();

    if (isLoading) {
    return <Loader />;
    }

  return (
    <Table tableData={users} />
  )
}

export default Home