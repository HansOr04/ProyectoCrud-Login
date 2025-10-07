export class ServerConfig{
    public static readonly PORT: number = parseInt(process.env.PORT || "5000", 10);
    public static readonly NODE_ENV: string = process.env.NODE_ENV || "development";
    public static readonly FRONTEND_URL: string = process.env.FRONTEND_URL || "http://localhost:3000";

    public static isDevelopment(): boolean {
        return this.NODE_ENV === "development";
    }
    public static isProduction(): boolean {
        return this.NODE_ENV === "production";
    }   
}