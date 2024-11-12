import { useState } from "react";

export default function Navbar(props) {
  const { query ,setQuery, children } = props;

  return (
    <>
      {/* Navbar */}
      <nav className='nav-bar'>
        <Logo />
        <Input query={query} setQuery={setQuery}/>
        {children}
      </nav>
    </>
  );
}

function Input({query, setQuery}) {


  return <input className='search' type='text' placeholder='Search movies...' value={query} onChange={(e) => setQuery(e.target.value)}/>;
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
