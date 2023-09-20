const app = require("./app");
const port = process.env.PORT || 5000;

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

const connectToDB = require("./database");
connectToDB();

const server = app.listen(port, () => {
  console.log(`server is listening on http://localhost:${port}`);
});

//Unhadled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
