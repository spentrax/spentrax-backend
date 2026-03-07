import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

const apiKeyRoutes = [
  { route: "/api/v1/auth/login", method: "POST" },
  { route: "/api/v1/auth/signup", method: "POST" },
];

const publicRoutes = [{ route: "/health", method: "GET" }];

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const path = request.route?.path || request.url;
    const method = request.method;

    const isPublicRoute = publicRoutes.some(
      (r) => path === r.route && method === r.method,
    );

    if (isPublicRoute) {
      return true;
    }

    const isApiKeyRoute = apiKeyRoutes.some(
      (r) => path === r.route && method === r.method,
    );

    if (isApiKeyRoute) {
      const apiKey = request.headers["x-api-key"] || request.headers["api_key"];

      if (!apiKey || apiKey !== process.env.API_KEY) {
        throw new UnauthorizedException("Invalid API key");
      }

      return true;
    }

    // 🔐 JWT verification
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      (request as any).user = decoded;

      return true;
    } catch (err) {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}
