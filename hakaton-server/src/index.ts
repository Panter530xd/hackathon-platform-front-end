import { Router, IRequest } from "itty-router";
import { createClient } from "@supabase/supabase-js";

export interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}
const router = Router();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "HEAD,GET,POST,PUT,PATCH,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

async function handleOptions(request: IRequest, env: Env) {
  return new Response(null, {
    status: 204,
    headers: { ...corsHeaders },
  });
}

async function handleGetEvents(request: IRequest, env: Env) {
  // CREATE CONNECTION TO SUPABASE
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

  // AUTHENTICATE THE USER

  //   const { data } = await supabase.auth.getUser(req.body.jwt);

  // use planetscale or neon.tech or supabase or whatever

  const { data } = await supabase.from("events").select("*");

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

async function handlePostEvents(request: IRequest, env: Env) {
  return new Response("200 OK", {
    status: 200,
  });
}

router
  .options("*", handleOptions)
  .get("/api/events", handleGetEvents)
  .post("/api/events", handlePostEvents);

export default {
  fetch: router.handle,
};
