import { z } from 'zod';

const usuarioSchema = z.object({
    id: z.number().positive(),
    name: z.string("O nome precisa possuir só letras").min(4, "O nome deve ter pelo menos 4 caracteres."),
    email: z.string().email("Formato de email inválido."),
});

export default usuarioSchema;