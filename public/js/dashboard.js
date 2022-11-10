const newBlog = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const text = document.querySelector('#post-text').value.trim();
  
    if (title && text) {
      const response = await fetch('/api/blog', {
        method: 'POST',
        body: JSON.stringify({ title, text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create blog');
      }
    }
  };

  document.querySelector('#blogpost').addEventListener('submit', newBlog);


  const deleteButton = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete project');
      }
    }
  };

  document.querySelector('.deleteBtn').addEventListener('click', deleteButton)