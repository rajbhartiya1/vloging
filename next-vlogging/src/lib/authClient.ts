const DJANGO_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE || "http://127.0.0.1:8000";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

type AuthResult = {
  ok: boolean;
  status: number;
  message: string;
  code?: string;
  user?: AuthUser;
  resetCode?: string;
};

async function request(path: string, payload: Record<string, string>): Promise<AuthResult> {
  try {
    const response = await fetch(`${DJANGO_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        message: data?.error || "Request failed",
        code: data?.code,
      };
    }

    return {
      ok: true,
      status: response.status,
      message: data?.message || "Success",
      user: data?.user,
      resetCode: data?.resetCode,
    };
  } catch {
    return {
      ok: false,
      status: 0,
      message: "Unable to connect to server. Make sure Django backend is running.",
    };
  }
}

export function registerUser(input: { name: string; email: string; password: string }) {
  return request("/api/auth/register/", input);
}

export function loginUser(input: { email: string; password: string }) {
  return request("/api/auth/login/", input);
}

export function forgotPassword(input: { email: string }) {
  return request("/api/auth/forgot-password/", input);
}

export function resetPassword(input: { email: string; code: string; newPassword: string }) {
  return request("/api/auth/reset-password/", input);
}
