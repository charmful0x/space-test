import koa from "koa";
import path from "path";
import render from "koa-ejs";
import koaRouter from "koa-router";
import axios from "axios";
import { fileURLToPath } from "url";
import { getProfile } from "./utils/api.js";
import { DEFAULT_PROFILE_LABEL } from "./utils/constants.js";

const app = new koa();
const router = new koaRouter();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 2021;

render(app, {
  root: path.join(__dirname, "views/profile"),
  layout: "index",
  viewExt: "ejs",
  async: true,
});

router.get("/", async (ctx) => {
  const label = ctx.host.split(".")[0];

  let user_profile = await getProfile(label);

  if (!user_profile?.currentLabel) {
    // if the subdomain is a non-valid label,
    // display a default account (decent.land)
    user_profile = await getProfile(DEFAULT_PROFILE_LABEL);
  }

  return ctx.render("index", {
    profile: user_profile,
  });
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(PORT, () => console.log(`running on port:${PORT}`));
