import { useEffect, useState } from "react";
import api from "../api";
import UserTable from "../components/UserTable";
import Loader from "../components/Loader";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get("/users");
      setUsers(res.data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure?")) {
      await api.delete(`/users/${id}`);

      // reload users after delete
      const res = await api.get("/users");
      setUsers(res.data);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Users</h1>
      {loading ? <Loader /> : <UserTable users={users} onDelete={deleteUser} />}
    </div>
  );
};

export default Home;
