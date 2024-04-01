import { serverConfig } from '@nimpl/config/server-config';

export async function GET() {
    const config = await serverConfig;
    return Response.json(config);
}