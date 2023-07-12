import { Router, IRequest } from "itty-router";
import { createClient } from "@supabase/supabase-js";
import { Config, connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { z } from "zod";
import { events } from "./db/schema/events";
import { academies, groups } from "./db/schema/academies";
import { foodAllergies } from "./db/schema/food_allergies";
import { registration } from "./db/schema/registration";
import { eq } from "drizzle-orm";
import { teams } from "./db/schema/teams";
import { agenda } from "./db/schema/agenda";

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

const registrationSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  academy: z.string(),
  group: z.string(),
  number_months: z.string(),
  participation: z.string(),
  food_allergies: z.string(),
  food_preferences: z.string(),
  accept_terms: z.boolean(),
});
const registrationUpdateSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  academy: z.string(),
  group: z.string(),
  number_months: z.string(),
  participation: z.string(),
  food_allergies: z.string(),
  food_preferences: z.string(),
  accept_terms: z.boolean(),
});

const registrationUpdateTeamsSchema = z.object({
  allTeamsInState: z.array(
    z.object({
      id: z.number(),
      first_name: z.string().nonempty("Required"),
      last_name: z.string().nonempty("Required"),
      email: z.string().email().nonempty("Required"),
      phone: z.string().nonempty("Required"),
      academy: z.string().nonempty("Required"),
      group: z.string().nonempty("Required"),
      number_months: z.string().nonempty("Required"),
      participation: z.string().nonempty("Required"),
      food_allergies: z.string().nonempty("Required"),
      food_preferences: z.string().nonempty("Required"),
      accept_terms: z.boolean().optional(),
    })
  ),
});

const teamSchema = z.object({
  teams: z.array(
    z.object({
      id: z.number(), // Validate id as a number
      first_name: z.string().nonempty("Required"),
      last_name: z.string().nonempty("Required"),
      academy: z.string().nonempty("Required"),
    })
  ),
});


const agendaSchema = z.object({
  eventDurationFrom: z.string(),
  eventDurationTo: z.string(),
  eventOpeningFrom: z.string(),
  eventOpeningTo: z.string(),
  findYourSpotFrom: z.string(),
  findYourSpotTo: z.string(),
  firstRoundSessionsFrom: z.string(),
  firstRoundSessionsTo: z.string(),
  secondRoundSessionsFrom: z.string(),
  secondRoundSessionsTo: z.string(),
  registrationFrom: z.string(),
  registrationTo: z.string(),
  presentationsFrom: z.string(),
  presentationsTo: z.string(),
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

async function handleGetRegistration(request: IRequest, env: Env) {
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
  const allRegistration = await db.select().from(registration);
  console.log(allRegistration);

  return new Response(JSON.stringify({ allRegistration }), {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
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

async function handleGetAcademy(request: IRequest, env: Env) {
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
  const allAcademies = await db.select().from(academies);
  console.log(allAcademies);

  return new Response(JSON.stringify({ allAcademies }), {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

async function handleGetGroups(request: IRequest, env: Env) {
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
  const allGroups = await db.select().from(groups);
  console.log(allGroups);

  return new Response(JSON.stringify({ allGroups }), {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

async function handleGetFoods(request: IRequest, env: Env) {
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
  const allFoodsAllergies = await db.select().from(foodAllergies);
  console.log(allFoodsAllergies);

  return new Response(JSON.stringify({ allFoodsAllergies }), {
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
      status: 400,
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

async function handlePostRegistration(request: IRequest, env: Env) {
  const reqBody = await request.json();
  const parsedBody = registrationSchema.safeParse(reqBody);

  if (!parsedBody.success) {
    return new Response(JSON.stringify(parsedBody.error), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
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
  await db.insert(registration).values(parsedBody.data);

  return new Response(
    JSON.stringify({ message: "Registration created successfully" }),
    {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

async function handleDeleteRegistration(request: IRequest, env: Env) {
  const reqBody = await request.json();
  const teamId = reqBody.teamId;

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

  try {
    await db.select().from(registration);
    console.log(registration);

    await db.delete(registration).where(eq(registration.id, teamId));
    console.log(teamId);

    return new Response(
      JSON.stringify({ message: "Registration deleted successfully" }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to delete registration" }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
}

async function handlePostUpdate(request: IRequest, env: Env) {
  const reqBody = await request.json();
  const parsedBody = registrationUpdateSchema.safeParse(reqBody);

  if (!parsedBody.success) {
    return new Response(JSON.stringify(parsedBody.error), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT",
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

  if (parsedBody.data.id) {
    await db
      .update(registration)
      .set(parsedBody.data)
      .where(eq(registration.id, parsedBody.data.id));
  } else {
    // If registration ID is not present, insert a new registration
    await db.insert(registration).values(parsedBody.data);
  }

  return new Response(
    JSON.stringify({ message: "Registration created successfully" }),
    {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

async function handleGetTeams(request: IRequest, env: Env) {
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
  const allTeams = await db.select().from(teams);
  console.log(allTeams);

  return new Response(JSON.stringify({ allTeams }), {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

async function handlePostTeam(request: IRequest, env: Env) {
  const reqBody = await request.json();
  const parsedBody = teamSchema.safeParse(reqBody);

  if (!parsedBody.success) {
    return new Response(JSON.stringify(parsedBody.error), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
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
  console.log(parsedBody.data.teams);

  const teamData = parsedBody.data.teams.map((team) => {
    const { id, ...rest } = team;
    return { register_id: id.toString(), ...rest };
  });

  await db.insert(teams).values(teamData).execute();

  return new Response(JSON.stringify({ success: true }), {
    status: 201,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

async function handlePutTeam(request: IRequest, env: Env) {
  const reqBody = await request.json();
  const parsedBody = teamSchema.safeParse(reqBody);

  if (!parsedBody.success) {
    return new Response(JSON.stringify(parsedBody.error), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT",
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
  console.log(parsedBody.data.teams);

  const teamData = parsedBody.data.teams.map((team) => {
    const { id, ...rest } = team;
    return { register_id: id.toString(), ...rest };
  });

  await db
    .update(teams)
    .set(teamData[0])
    .where(eq(teams.register_id, teamData[0].register_id))
    .execute();

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

async function handlePutRegisterTeam(request: IRequest, env: Env) {
  try {
    const reqBody = await request.json();
    const parsedBody = registrationUpdateTeamsSchema.safeParse(reqBody);

    if (!parsedBody.success) {
      return new Response(JSON.stringify(parsedBody.error), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT",
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
    console.log(parsedBody.data);

    for (const team of parsedBody.data.allTeamsInState) {
      console.log("TEAM>ID", team.id);
      console.log("registration.id", team.id);
      const result = await db
        .update(registration)
        .set(team)
        .where(eq(registration.id, team.id))
        .execute();
      console.log("Updated team with ID", team.id);
      console.log("registration.id", team.id);
      console.log("Result:", result);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "An error occurred." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT",
        },
      }
    );
  }
}



async function handleGetAgenda(request: IRequest, env: Env) {
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
  const allAgendaItems = await db.select().from(agenda);
  console.log(allAgendaItems);

  return new Response(JSON.stringify({ allAgendaItems }), {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

async function handlePostAgenda(request: IRequest, env: Env) {
  const reqBody = await request.json();
  const parsedBody = agendaSchema.safeParse(reqBody);

  if (!parsedBody.success) {
    return new Response(JSON.stringify(parsedBody.error), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
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
  await db.insert(agenda).values(parsedBody.data);

  return new Response(JSON.stringify({ success: true }), {
    status: 201,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

async function handleScheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
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
  const allAgendaItems = await db.select().from(agenda);
  const allTeams = await db.select().from(teams);
  const allRegistration = await db.select().from(registration);
  const allEvents = await db.select().from(events);

  const { data } = await supabase.from("events").select("*");
 

  console.log("Cron executed at", new Date().toLocaleDateString());
}

router
  .options("*", handleOptions)
  .get("/api/academies", handleGetAcademy)
  .get("/api/events", handleGetEvents)
  .get("/api/groups", handleGetGroups)
  .get("/api/food_allergies", handleGetFoods)
  .post("/api/events", handlePostEvents)
  .post("/api/registration", handlePostRegistration)
  .get("/api/registration", handleGetRegistration)
  .delete("/api/registration", handleDeleteRegistration)
  .put("/api/registration/:id", handlePostUpdate)
  .get("/api/teams", handleGetTeams)
  .post("/api/teams", handlePostTeam)
  .put("/api/teams", handlePutTeam)
  .put("/api/registration", handlePutRegisterTeam)
  .get("/api/agenda", handleGetAgenda)
  .post("/api/agenda", handlePostAgenda);

export default {
  fetch: router.handle,
  scheduled: handleScheduled,
};
