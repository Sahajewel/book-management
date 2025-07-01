import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <div>
      <Link className="cursor-pointer mr-5" to="/">Home</Link>
      <Link className="cursor-pointer" to="/about">About</Link>
    </div>
  )
}
