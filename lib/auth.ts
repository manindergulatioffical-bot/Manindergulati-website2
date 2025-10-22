export interface AuthUser {
  id: string;
  username: string;
  email?: string;
  role: string;
}

export interface AuthResponse {
  authenticated: boolean;
  user?: AuthUser;
  error?: string;
}

export async function login(username: string, password: string): Promise<{ success: boolean; message: string; error?: string; user?: AuthUser }> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.error || 'Login failed',
        error: data.error
      };
    }

    return {
      success: true,
      message: data.message,
      user: data.user
    };
  } catch {
    return {
      success: false,
      message: 'Network error occurred',
      error: 'Network error'
    };
  }
}

export async function logout(): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.error || 'Logout failed'
      };
    }

    return {
      success: true,
      message: data.message
    };
  } catch {
    return {
      success: false,
      message: 'Network error occurred'
    };
  }
}

export async function verifyAuth(): Promise<AuthResponse> {
  try {
    const response = await fetch('/api/auth/verify', {
      method: 'GET',
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        authenticated: false,
        error: data.error || 'Authentication failed'
      };
    }

    return {
      authenticated: data.authenticated,
      user: data.user
    };
  } catch {
    return {
      authenticated: false,
      error: 'Network error occurred'
    };
  }
}



export async function updateProfile(currentPassword: string, newUsername?: string, newPassword?: string): Promise<{ success: boolean; message: string; error?: string }> {
  try {
    const response = await fetch('/api/auth/update-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currentPassword, newUsername, newPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.error || 'Profile update failed',
        error: data.error
      };
    }

    return {
      success: true,
      message: data.message
    };
  } catch {
    return {
      success: false,
      message: 'Network error occurred',
      error: 'Network error'
    };
  }
}
