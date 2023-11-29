import { useEffect } from 'react';
import css from './Modal.module.css';

export function Modal({ closeModal, modalImage }) {
  useEffect(() => {
    window.addEventListener('keydown', hendleKeyDown);

    return () => {
      window.removeEventListener('keydown', hendleKeyDown);
    };
  });

  const hendleKeyDown = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

  const closeOnBackdrop = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={css.Overlay} onClick={closeOnBackdrop}>
      <div className={css.Modal}>
        <img src={modalImage} alt="" />
      </div>
    </div>
  );
}
