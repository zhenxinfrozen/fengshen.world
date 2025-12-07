export async function onRequestGet(context) {
  console.log("GET /api/guestbook called");
  try {
    if (!context.env.DB) {
      console.error("DB binding missing");
      throw new Error("DB binding is missing.");
    }
    const { results } = await context.env.DB.prepare(
      "SELECT * FROM guestbook ORDER BY id DESC"
    ).all();
    return Response.json(results);
  } catch (e) {
    console.error("GET Error:", e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function onRequestPost(context) {
  console.log("POST /api/guestbook called");
  try {
    const { request, env } = context;
    
    // 读取请求体
    let body;
    try {
      body = await request.json();
    } catch (err) {
      console.error("Error parsing JSON body:", err);
      return new Response("Invalid JSON body", { status: 400 });
    }
    
    const { name, content } = body;

    if (!name || !content) {
      return new Response("Missing name or content", { status: 400 });
    }

    if (!env.DB) {
       throw new Error("DB binding is missing in POST");
    }

    await env.DB.prepare(
      "INSERT INTO guestbook (name, content) VALUES (?, ?)"
    ).bind(name, content).run();

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (e) {
    console.error("POST Error:", e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}