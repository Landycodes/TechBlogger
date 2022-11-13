
const updateBlog = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#update-title').value.trim();
    const text = document.querySelector('#update-text').value.trim();
    const id = event.target.getAttribute('data-id');
    if (title && text) {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
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

  document.querySelector('#updateblog').addEventListener('submit', updateBlog);