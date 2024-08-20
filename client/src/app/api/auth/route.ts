export const POST = async (req: Request) => {
  // Get access token from request of next client
  const token = await req.json()

  // Check token
  if (!token)
    return Response.json({ message: 'Token is required.' }, { status: 400 })

  return Response.json(token, {
    status: 200,
    headers: {
      'Set-Cookie': `token=${JSON.stringify(
        token
      )}; Path=/; HttpOnly; SameSite=Lax; Secure`
    }
  })
}
