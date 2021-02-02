import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert = ({ message }) => {
  useEffect(() => {
    const unsubscribe = toast.dark(message, {
      position: 'bottom-right',
      autoClose: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });

    return unsubscribe;
  }, [message]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Alert;
