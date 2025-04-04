// API Service for interacting with backend endpoints

/**
 * Base API request function with error handling
 */
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

/**
 * Authentication API
 */
export const authApi = {
  // Login user
  login: async (email: string, password: string) => {
    // For demo, we'll simulate a successful login with mock data
    // In a real app, this would call a backend endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate API response
        resolve({
          success: true,
          message: "Login successful",
          userData: {
            id: "user-123",
            name: "Rahul Sharma",
            email: email,
            phone: "+91 98765 43210",
            aadhaar: {
              number: "XXXX-XXXX-6789",
              verified: true,
              verifiedAt: new Date().toISOString()
            },
            location: {
              city: "New Delhi",
              state: "Delhi",
              postalCode: "110001"
            },
            profileCompleted: true,
            createdAt: new Date().toISOString()
          }
        });
      }, 800);
    });
  },
  
  // Register user
  register: async (formData: any) => {
    // For demo, we'll simulate a successful registration with mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate API response
        resolve({
          success: true,
          message: "Registration successful",
          userData: {
            id: "user-" + Math.floor(100 + Math.random() * 900),
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            aadhaar: {
              number: formData.aadhaarNumber.substring(0, 8).replace(/\d/g, "X") + 
                     formData.aadhaarNumber.substring(8),
              verified: false
            },
            profileCompleted: false,
            createdAt: new Date().toISOString()
          }
        });
      }, 1200);
    });
  },
};

/**
 * User Profile API
 */
export const userApi = {
  // Get user profile
  getProfile: async (userId: string) => {
    return fetchAPI(`/api/user/profile?userId=${userId}`);
  },
  
  // Update user profile
  updateProfile: async (userId: string, profileData: any) => {
    return fetchAPI('/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify({ userId, ...profileData }),
    });
  },
};

/**
 * Finance API
 */
export const financeApi = {
  // Get user's financial accounts
  getAccounts: async (userId: string) => {
    return fetchAPI(`/api/finance/accounts?userId=${userId}`);
  },
  
  // Get user's transactions
  getTransactions: async (userId: string, limit = 10, offset = 0) => {
    return fetchAPI(`/api/finance/transactions?userId=${userId}&limit=${limit}&offset=${offset}`);
  },

  // Get financial opportunities
  getOpportunities: async (userId: string) => {
    return fetchAPI(`/api/finance/opportunities?userId=${userId}`);
  }
};

/**
 * Civic API
 */
export const civicApi = {
  // Get social credit score
  getSocialCredit: async (userId: string) => {
    return fetchAPI(`/api/civic/social-credit?userId=${userId}`);
  },
  
  // Get civic engagement opportunities
  getEngagement: async (userId: string) => {
    return fetchAPI(`/api/civic/engagement?userId=${userId}`);
  },
};

// Export combined API service
const apiService = {
  auth: authApi,
  user: userApi,
  finance: financeApi,
  civic: civicApi,
};

export default apiService; 