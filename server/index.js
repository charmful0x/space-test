const koa = require("koa");
const path = require("path");
const render = require("koa-ejs");
const koaRouter = require("koa-router");
const axios = require("axios");

const app = new koa();
const router = new koaRouter();

async function getProfile(label) {
  try {
    const profile = (
      await axios.get(`https://ans-testnet.herokuapp.com/profile/${label}`)
    ).data;
    return profile;
  } catch (error) {
    console.log(`${error.name} : ${error.description}`);
  }
}

render(app, {
  root: path.join(__dirname, "views"),
  layout: "index",
  viewExt: "html",
});

router.get("/", async (ctx) => {
  console.log("HOST", ctx.host)
  const label = ctx.host.split(".")[0];
  console.log(label);
  const user_profile = await getProfile(label);

  return ctx.render("index", {
    profile: user_profile,
  });
});

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 2021;
app.listen(PORT, () => console.log(`running on port:${PORT}`));
