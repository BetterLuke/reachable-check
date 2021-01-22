const Koa = require("koa");
const app = new Koa();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.use(async (ctx) => {
  // Simulation delay time
  await sleep(3000);
  ctx.body = "Hello World!";
});

app.listen(4000, () => console.log("Server is listen on 0.0.0.0:4000 🙌"));
