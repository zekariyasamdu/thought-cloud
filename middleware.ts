import { adminAuth } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/auth/login", "/auth/signup"];

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.some((route) =>
        path.startsWith(route)
    );
    const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

    const sessionCookie = request.cookies.get("__session")?.value;

    if (!sessionCookie) {

        if (isProtectedRoute) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
        return NextResponse.next();
    }

    try {
        await adminAuth.verifySessionCookie(
            sessionCookie,
            true
        );
        if (isAuthRoute) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Error verifying session cookie:", error);
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("__session");
        return response;
    }
}
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
