import { Link } from "react-router-dom";

const UserTable = ({ users, onDelete }) => {
  return (
    <table className="w-full mt-5 border-collapse border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th className="border p-2">Image</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u) => (
          <tr key={u._id}>
            <td className="border p-2">
              <img
                src={u.imageUrl}
                alt="profile"
                className="w-14 h-14 rounded-full object-cover mx-auto"
              />
            </td>

            <td className="border p-2 text-center">{u.name}</td>
            <td className="border p-2 text-center">{u.email}</td>

            <td className="border p-2 text-center">
              <Link
                to={`/edit/${u._id}`}
                className="bg-blue-600 text-white py-1 px-3 rounded mr-3"
              >
                Edit
              </Link>

              <button
                onClick={() => onDelete(u._id)}
                className="bg-red-600 text-white py-1 px-3 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
