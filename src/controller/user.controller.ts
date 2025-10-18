import { Request, Response } from "express";
import { Usuario } from "../type/user.type";
import  userSchema from "../schema/user.schema";
import { db } from "../db/db";
import { usersTable } from "../db/schema/db.schema";
import { eq } from "drizzle-orm";

export async function createUser(req: Request, res: Response) {
    const valideUser = userSchema.safeParse(req.body);
    if(!valideUser.success) {
        return res.status(400).json({ error: valideUser.error.issues });
    }

    const user: Usuario = valideUser.data;
    const mappedUser: typeof usersTable.$inferInsert = {
        id: user.id,
        name: user.name,
        email: user.email,
    };

    await db.insert(usersTable).values(mappedUser);
    return res.status(201).json(user);
}

export async function updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    const user = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
    if(!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const valideUser = userSchema.partial().safeParse(req.body);
    if(!valideUser.success) {
        return res.status(400).json({ error: valideUser.error.issues });
    }

    const updatedUser = valideUser.data;
    await db.update(usersTable).set(updatedUser).where(eq(usersTable.id, userId));
    
    return res.status(200).json(user);
}

export async function deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    const user = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
    if(!user) {
        return res.status(404).json({error: 'Usuário não encontrado.'});
    }

    await db.delete(usersTable).where(eq(usersTable.id, userId));
    return res.status(204).json({ message: 'Usuário deletado com sucesso.' });
}

export async function getUserById(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    const user = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
    if(!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    return res.status(200).json(user);
}

export async function getAllUsers(req: Request, res: Response) {
    const usuarios = await db.select().from(usersTable);
    res.status(200).json(usuarios);
} 