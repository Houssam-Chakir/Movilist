import { useState } from "react";

export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className='box'>
        <ToggleListButton isOpen={isOpen} setIsOpen={setIsOpen} />
        {isOpen && children}
      </div>
    </>
  );
}

export function ToggleListButton({ isOpen, setIsOpen }) {
  return (
    <button className='btn-toggle' onClick={() => setIsOpen((open) => !open)}>
      {isOpen ? "–" : "+"}
    </button>
  );
}
