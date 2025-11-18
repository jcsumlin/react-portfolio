import { drizzle } from 'drizzle-orm/d1';
import { users } from '../src/db/schema.ts';

export default {
  async fetch(request: Request, env: Env) {
    const db = drizzle(env.portfolio_blog_prod);
    const result = await db.select().from(users).all();
    return Response.json(result);
  },
};
