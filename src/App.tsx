import { useState, useEffect } from 'react';
import ListContainer from './components/ListContainer.tsx';
import ListItem from './components/ListItem.tsx';
import FormWithInput from './components/FormWithInput.tsx';
import { useUsers } from './hooks/useUsers.ts';
import type { User } from './types/User.type.ts';

function App() {
  const { fetchAllUsers, createUser, updateUser, deleteUser } = useUsers();
  const [list, setList] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await fetchAllUsers();
        setList(Array.isArray(users) ? users : []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setList([]);
      }
    };
    fetchUsers();
  }, [fetchAllUsers]);


  const handleOnSubmit = async ({ name, email }: { name: string; email: string }) => {
    if (!name || !email) return;

    const newUser: User = {
      id: Math.floor(Math.random() * 10000),
      name,
      email,
      created: new Date().toISOString(),
    };

    try {
      const created = await createUser(newUser);
      setList([...list, created]);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setList(list.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };


  const handleEditSubmit = async ({ name, email }: { name: string; email: string }) => {
    if (editingId === null) return;

    const updatedUser: User = {
      id: editingId,
      name,
      email,
      created: new Date().toISOString(),
    };

    try {
      const updated = await updateUser(updatedUser);
      setList(list.map(user => (user.id === editingId ? updated : user)));
      setEditingId(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="content">
      <h1>User list</h1>

      {editingId === null ? (
        <FormWithInput buttonText="Agregar" onSubmit={handleOnSubmit} />
      ) : (
        <FormWithInput
          buttonText="Guardar cambios"
          onSubmit={handleEditSubmit}
          initialValues={list.find(u => u.id === editingId) || { name: '', email: '' }}
        />
      )}


      <ListContainer>
        {list.map(user => (
          <ListItem key={user.id}>
            {user.id}: {user.name} - ({user.email})
            <div className='action-buttons'>
              <button onClick={() => setEditingId(user.id)}>Editar</button>
              <button onClick={() => handleDelete(user.id)}>Eliminar</button>

            </div>
          </ListItem>
        ))}
      </ListContainer>
    </div>
  );
}

export default App;
