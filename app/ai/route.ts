import { cookies } from "next/headers";

export const POST = async (req: Request) => {
  const body = await req.json();
  const cookieStore = await cookies();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: cookieStore.toString(),
    },
    body: JSON.stringify(body),
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") ?? "text/plain",
    },
  });
};
