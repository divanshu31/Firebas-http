const deleteUser = async (key) => {
    try {
      const res = await fetch(`https://demoproject-6dcc4-default-rtdb.firebaseio.com/users/${key}.json`, {
        method: 'DELETE',
      });
  
      if (!res.ok) throw new Error('Delete failed');
  
      console.log("User deleted successfully");
      loadUsers(); // Refresh table after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
};