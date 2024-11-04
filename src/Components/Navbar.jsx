import { useState } from "react";

export default function Navbar(props) {
  const { moviesLength, children } = props;

  return (
    <>
      {/* Navbar */}
      <nav className='nav-bar'>
        <Logo />
        <Input />
        {children}
      </nav>
    </>
  );
}

function Input() {
  const [query, setQuery] = useState("");

  return <input className='search' type='text' placeholder='Search movies...' value={query} onChange={(e) => setQuery(e.target.value)} />;
}

function Logo() {
  return (
    <div className='logo'>
      <span role='img'>🍿</span>
      <h1>Movilist</h1>
    </div>
  );
}

export function MoviesLength({ moviesLength }) {
  return (
    <p className='num-results'>
      Found <strong>{moviesLength}</strong> results
    </p>
  );
}
