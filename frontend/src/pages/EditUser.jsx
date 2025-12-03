import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    api.get(`/users/${id}`).then((res) => setUser(res.data));
  }, [id]);

  const updateHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    if (image) formData.append("image", image);

    await api.put(`/users/${id}`, formData);

    navigate("/");
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-3">Edit User</h1>

      <form onSubmit={updateHandler} className="w-80 space-y-3">
        <input
          type="text"
          className="border p-2 w-full"
          value={user.name || ""}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />

        <input
          type="email"
          className="border p-2 w-full"
          value={user.email || ""}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <input
          type="file"
          className="border p-2 w-full"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="bg-blue-600 text-white py-2 px-4 rounded w-full">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditUser;
