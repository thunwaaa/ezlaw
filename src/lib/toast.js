export const showToast = (message, type = 'info') => {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'fixed top-4 right-4 z-50 space-y-2';
      document.body.appendChild(toastContainer);
    }
  
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `
      p-4 rounded-lg shadow-lg transition-all duration-300 
      ${type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'}
    `;
    toast.textContent = message;
  
    // Add to container
    toastContainer.appendChild(toast);
  
    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-x-full');
      setTimeout(() => {
        toastContainer.removeChild(toast);
        // Remove container if no toasts left
        if (toastContainer.children.length === 0) {
          document.body.removeChild(toastContainer);
        }
      }, 300);
    }, 3000);
  };