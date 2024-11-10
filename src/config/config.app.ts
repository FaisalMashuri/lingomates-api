export interface ConfigApp{
    serverHost:string;
    secretJwt: string;
    port:string
}

const configApp: ConfigApp = {
    serverHost: process.env.SERVER_HOST || '0.0.0.0',
    secretJwt: process.env.SECRET || "root",
    port: process.env.SERVER_PORT || "3000"
}

export default configApp