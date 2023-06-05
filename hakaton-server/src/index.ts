import { Router, IRequest } from "itty-router";
import { createClient } from "@supabase/supabase-js";
import { Config, connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { z } from "zod";
import { events } from "./db/schema/events";
import { academies } from "./db/schema/academies";

export interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  DATABASE_HOST: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
}

const router = Router();

const eventShema = z.object({
  name_of_event: z.string(),
  location: z.string(),
  type_of_event: z.string(),
  submission_deadline: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  academies_part: z.string(),
  event_info: z.string(),
  client_info: z.string(),
});

const academySchema = z.object({
  id: z.number(),
  name: z.string(),
});

const groupSchema = z.object({
  id: z.number(),
  name: z.string(),
  academyId: z.number(),
});

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
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

  const config = {
    host: env.DATABASE_HOST,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    fetch: (url: string, init: IRequest) => {
      delete init["cache"];
      return fetch(url, init);
    },
  };
  const conn = connect(config as unknown as Config);

  const db = drizzle(conn);
  const allEvents = await db.select().from(events);
  console.log(allEvents);

  return new Response(JSON.stringify({ allEvents }), {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

async function handleGetAcademies(request: IRequest, env: Env) {
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

  const config = {
    host: env.DATABASE_HOST,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    fetch: (url: string, init: IRequest) => {
      delete init["cache"];
      return fetch(url, init);
    },
  };
  const conn = connect(config as unknown as Config);

  const db = drizzle(conn);
  const allAcademy = await db.select().from(academies);
  console.log(allAcademy);

  return new Response(JSON.stringify({ allAcademy }), {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}
async function handlePostEvents(request: IRequest, env: Env) {
  const reqBody = await request.json();
  const parsedBody = eventShema.safeParse(reqBody);

  if (!parsedBody.success) {
    return new Response(JSON.stringify(parsedBody.error), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
      },
    });
  }

  const config = {
    host: env.DATABASE_HOST,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    fetch: (url: string, init: IRequest) => {
      delete init["cache"];
      return fetch(url, init);
    },
  };
  const conn = connect(config as unknown as Config);

  const db = drizzle(conn);
  await db.insert(events).values(parsedBody.data);

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
  .post("/api/events", handlePostEvents)
  .get("/api/academies", handleGetAcademies);

export default {
  fetch: router.handle,
};
