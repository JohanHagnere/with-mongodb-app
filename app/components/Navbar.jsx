import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav>
        <ul
          style={{
            display: "flex",
            gap: "1rem",
            listStyleType: "none",
            justifyContent: "center",
          }}
        >
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/movies">Movies</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
