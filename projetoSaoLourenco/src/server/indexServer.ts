import app from "./app";
import pool from "./database";

// Conexão com a database
pool
  .connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Server is accessible at https://localhost:${PORT}`);
});

export default app;
