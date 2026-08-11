import pkg from "pg"
const {Pool} = pkg

const pool = new Pool({
    user: "postgres",
    password: "payday2000",
    host: "localhost",
    port: 5432,
    database: "test"
})

export default pool