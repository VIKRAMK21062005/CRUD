import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", image);

    await api.post("/users", formData);

    navigate("/");
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-3">Add User</h1>

      <form onSubmit={submitHandler} className="w-80 space-y-3">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="file"
          className="border p-2 w-full"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="bg-green-600 text-white py-2 px-4 rounded w-full">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
