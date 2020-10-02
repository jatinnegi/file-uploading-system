import { Pool } from "pg";

const pool = new Pool();

export default {
  query: (text: string, params: string[]) => pool.query(text, params),
};
