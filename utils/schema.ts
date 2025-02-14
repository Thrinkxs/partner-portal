import z from 'zod';

export const CompanySchema = z.object({
  name: z.string().min((1), { message: 'Name is too short' }).max(100, { message: 'Name is too long' }),
  phone: z.string().min(10, { message: 'Enter a valid phone number' }).max(10, { message: 'Enter a valid phone number' })
});

