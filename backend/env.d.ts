declare namespace NodeJS {
    interface ProcessEnv {
        readonly PORT: number;
        readonly DB: string;
        readonly NODE_ENV: 'development' | 'production';
        readonly BASE_URL: string;
        readonly JWT_SECRET: string;
        readonly JWT_EXPIRE: string;
    }
}