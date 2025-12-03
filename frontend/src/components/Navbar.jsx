import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-indigo-600 text-white flex justify-between">
      <h1 className="font-bold text-xl">CRUD + AWS</h1>

      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/add">Add User</Link>
      </div>
    </nav>
  );
};

export default Navbar;
