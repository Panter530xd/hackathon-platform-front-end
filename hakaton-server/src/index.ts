import { Router, IRequest } from "itty-router";
import { createClient } from "@supabase/supabase-js";
import { connect } from "@planetscale/database";

export interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  DATABASE_HOST: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
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

  // const { data } = await supabase.auth.getUser(req.body.jwt);

  // Use Supabase for some functionality
  // const { data: supabaseData } = await supabase.from("events").select("*");

  // CREATE CONNECTION TO PLANETSCALE
  const config = {
    host: env.DATABASE_HOST,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    fetch: (url: string, init: IRequest) => {
      delete init["cache"];
      return fetch(url, init);
    },
  };
  const conn = connect(config as any);

  // RUN QUERIES ON PLANETSCALE
  const { rows: planetscaleData } = await conn.execute("SELECT * FROM events");

  return new Response(JSON.stringify({ planetscaleData }), {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

async function handlePostEvents(request: IRequest, env: Env) {
  const reqBody = await request.json();
  console.log(reqBody);

  const config = {
    host: env.DATABASE_HOST,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    fetch: (url: string, init: IRequest) => {
      delete init["cache"];
      return fetch(url, init);
    },
  };
  const conn = connect(config as any);

  // INSERT DATA INTO PLANETSCALE
  await conn.execute(
    "INSERT INTO events (name_of_event, location, type_of_event, submission_deadline, start_date, end_date, academies_part, event_info, client_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      reqBody.name_of_event,
      reqBody.location,
      reqBody.type_of_event,
      reqBody.submission_deadline,
      reqBody.start_date,
      reqBody.end_date,
      reqBody.academies_part,
      reqBody.event_info,
      reqBody.client_info,
    ]
  );

  return new Response("200 OK", {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

router
  .options("*", handleOptions)
  .get("/api/events", handleGetEvents)
  .post("/api/events", handlePostEvents);

export default {
  fetch: router.handle,
};
