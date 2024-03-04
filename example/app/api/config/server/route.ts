import { serverConfig } from 'next-impl-config/server-config';

export async function GET() {
    const config = await serverConfig;
    return Response.json(config);
}