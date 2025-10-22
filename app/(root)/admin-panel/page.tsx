"use client"

import { AdminDashboard } from "./_components/dashboard";
import { useEffect, useState } from "react";
import { login, logout, verifyAuth, updateProfile, AuthUser } from "@/lib/auth";
import { toast } from "sonner";
import { PasswordInput } from "@/components/ui/password-input";

function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({
    currentPassword: "",
    newUsername: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authResponse = await verifyAuth();
      if (authResponse.authenticated && authResponse.user) {
        setIsLoggedIn(true);
        setUser(authResponse.user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch {
      console.error('Auth check failed');
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(username, password);
      
      if (result.success) {
        setIsLoggedIn(true);
        setUser(result.user || null);
        setUsername("");
        setPassword("");
        toast.success("Login successful!");
      } else {
        setError(result.error || "Login failed");
        toast.error(result.error || "Login failed");
      }
    } catch {
      setError("An unexpected error occurred");
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const result = await logout();
      if (result.success) {
        setIsLoggedIn(false);
        setUser(null);
        setUsername("");
        setPassword("");
        setError("");
        toast.success("Logged out successfully!");
      } else {
        setError("Logout failed");
        toast.error("Logout failed");
      }
    } catch {
      setError("An unexpected error occurred");
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    if (profileData.newPassword && profileData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    if (profileData.newUsername && profileData.newUsername.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return;
    }

    setLoading(true);
    try {
      const result = await updateProfile(
        profileData.currentPassword,
        profileData.newUsername || undefined,
        profileData.newPassword || undefined
      );
      
      if (result.success) {
        toast.success("Profile updated successfully!");
        setShowProfileModal(false);
        setProfileData({ currentPassword: "", newUsername: "", newPassword: "", confirmPassword: "" });
        // Refresh auth status to get updated user info
        await checkAuthStatus();
      } else {
        toast.error(result.error || "Profile update failed");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#172f31]"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#172f31]">Admin Login</h2>
            <p className="text-gray-600 mt-2">Secure access to dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#172f31] focus:border-transparent outline-none transition-all font-poppins"
                placeholder="Enter username"
                required
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="px-4 py-3 transition-all"
                required
                disabled={loading}
              />
            </div>
            
            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#172f31] text-white py-3 px-4 rounded-lg hover:bg-[#1a3436] transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Login with your admin credentials</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#172f31] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-4 uppercase">
              Admin Dashboard
            </h1>
            <p className="text-lg text-gray-300 font-medium tracking-wide">
              Manage your product catalog
            </p>
            <div className="mt-4 flex items-center justify-center gap-4">
              {user && (
                <span className="text-sm text-gray-300">
                  Welcome, {user.username}
                </span>
              )}
              <button
                onClick={() => setShowProfileModal(true)}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Profile Settings
              </button>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="px-6 py-2 bg-white text-[#172f31] rounded-lg hover:bg-gray-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <AdminDashboard />

      {/* Profile Settings Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-6">Profile Settings</h3>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <PasswordInput
                  value={profileData.currentPassword}
                  onChange={(e) => setProfileData({...profileData, currentPassword: e.target.value})}
                  placeholder="Enter your current password"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Username (optional)
                </label>
                <input
                  type="text"
                  value={profileData.newUsername}
                  onChange={(e) => setProfileData({...profileData, newUsername: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#172f31] focus:border-transparent outline-none font-poppins"
                  placeholder="Leave empty to keep current username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password (optional)
                </label>
                <PasswordInput
                  value={profileData.newPassword}
                  onChange={(e) => setProfileData({...profileData, newPassword: e.target.value})}
                  placeholder="Leave empty to keep current password"
                />
              </div>
              {profileData.newPassword && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <PasswordInput
                    value={profileData.confirmPassword}
                    onChange={(e) => setProfileData({...profileData, confirmPassword: e.target.value})}
                    placeholder="Confirm your new password"
                    required
                  />
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#172f31] text-white py-2 px-4 rounded-lg hover:bg-[#1a3436] transition-colors disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileModal(false);
                    setProfileData({ currentPassword: "", newUsername: "", newPassword: "", confirmPassword: "" });
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminPage;
