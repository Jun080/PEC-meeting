import { getAllUsers } from "../Models/userModel.js";

export async function getAllUserNames() {
    const users = await getAllUsers();
    return users.map((user) => user.prenom || "Sans nom");
}
