export const GET = async () => {
  return Response.json(
    { message: 'Logout from next server is successfully.' },
    {
      status: 200,
      headers: {
        'Set-Cookie': `token=; Path=/; HttpOnly; Max-Age=0`
      }
    }
  )
}
