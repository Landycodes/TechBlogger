const signout = async () => {
    const response = await fetch('/api/user/signout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
      alert('you have been signed out!')
    } else {
      alert(response.statusText);
    }
  };
  
  document.querySelector('#sign-out').addEventListener('click', signout);