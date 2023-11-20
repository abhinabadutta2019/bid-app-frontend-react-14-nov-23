import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Link to="/">
        <h2>BidApp</h2>
      </Link>
      <Link to="/add">Add product</Link>
    </>
  );
};

export default Navbar;
