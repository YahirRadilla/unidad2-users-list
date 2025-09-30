import type { User } from "../types/User.type";

export const useUsers = () => {
    const path = "http://localhost:3000/api/users";

    const fetchAllUsers = async (): Promise<User[]> => {
        const response = await fetch(`${path}/all`);
        if (!response.ok) throw new Error("Error fetching users");
        const data = await response.json();

        return data.users;
    };


    const createUser = async (user: User): Promise<User> => {
        const response = await fetch(`${path}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user }),
        });
        console.log(response);
        if (!response.ok) throw new Error("Error creating user");
        return await response.json();
    };

    const updateUser = async (user: User): Promise<User> => {
        const response = await fetch(`${path}/update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user }),
        });
        if (!response.ok) throw new Error("Error updating user");
        return await response.json();
    };

    const deleteUser = async (id: number): Promise<void> => {
        const response = await fetch(`${path}/delete/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Error deleting user");
    };

    return { fetchAllUsers, createUser, updateUser, deleteUser };
};
