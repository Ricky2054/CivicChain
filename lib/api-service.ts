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
    return fetchAPI('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  // Register user
  register: async (formData: any) => {
    return fetchAPI('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData),
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
  
  // Get user's social credit information
  getSocialCredit: async (userId: string) => {
    return fetchAPI(`/api/user/social-credit?userId=${userId}`);
  },
  
  // Update user's social credit
  updateSocialCredit: async (userId: string, category: string, change: number, reason: string) => {
    return fetchAPI('/api/user/social-credit', {
      method: 'PUT',
      body: JSON.stringify({ userId, category, change, reason }),
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
  
  // Create a new account
  createAccount: async (accountData: any) => {
    return fetchAPI('/api/finance/accounts', {
      method: 'POST',
      body: JSON.stringify(accountData),
    });
  },
  
  // Update an account
  updateAccount: async (accountId: string, updateData: any) => {
    return fetchAPI('/api/finance/accounts', {
      method: 'PUT',
      body: JSON.stringify({ accountId, ...updateData }),
    });
  },
  
  // Deactivate an account
  deactivateAccount: async (accountId: string) => {
    return fetchAPI(`/api/finance/accounts?accountId=${accountId}`, {
      method: 'DELETE',
    });
  },
  
  // Get user's transactions
  getTransactions: async (userId: string, limit = 10, offset = 0, accountId?: string) => {
    let endpoint = `/api/finance/transactions?userId=${userId}&limit=${limit}&offset=${offset}`;
    if (accountId) {
      endpoint += `&accountId=${accountId}`;
    }
    return fetchAPI(endpoint);
  },
  
  // Create a new transaction
  createTransaction: async (transactionData: any) => {
    return fetchAPI('/api/finance/transactions', {
      method: 'POST',
      body: JSON.stringify(transactionData),
    });
  },
  
  // Update transaction status
  updateTransactionStatus: async (transactionId: string, status: string) => {
    return fetchAPI('/api/finance/transactions', {
      method: 'PUT',
      body: JSON.stringify({ transactionId, status }),
    });
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
  // Get civic engagement opportunities
  getEngagement: async (userId: string, category?: string, type?: string) => {
    let endpoint = `/api/civic/engagement?userId=${userId}`;
    if (category) endpoint += `&category=${category}`;
    if (type) endpoint += `&type=${type}`;
    return fetchAPI(endpoint);
  },
  
  // Register for an event
  registerForEvent: async (userId: string, eventId: string) => {
    return fetchAPI('/api/civic/engagement', {
      method: 'POST',
      body: JSON.stringify({ userId, eventId }),
    });
  },
  
  // Create a new civic event
  createEvent: async (eventData: any) => {
    return fetchAPI('/api/civic/engagement', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  },
  
  // Update participant status for an event
  updateParticipantStatus: async (eventId: string, userId: string, action: string) => {
    return fetchAPI('/api/civic/engagement', {
      method: 'PUT',
      body: JSON.stringify({ eventId, userId, action }),
    });
  },
  
  // Update an event
  updateEvent: async (eventId: string, updateData: any) => {
    return fetchAPI('/api/civic/engagement', {
      method: 'PUT',
      body: JSON.stringify({ eventId, ...updateData }),
    });
  },
  
  // Deactivate an event
  deactivateEvent: async (eventId: string) => {
    return fetchAPI(`/api/civic/engagement?id=${eventId}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Community API
 */
export const communityApi = {
  // Get staking information
  getStaking: async (userId: string) => {
    return fetchAPI(`/api/community/staking?userId=${userId}`);
  },
  
  // Get leaderboard data
  getLeaderboard: async () => {
    return fetchAPI(`/api/community/leaderboard`);
  },
  
  // Governance API
  governance: {
    // Get proposals
    getProposals: async (userId: string, status?: string, category?: string, limit = 10, offset = 0) => {
      let endpoint = `/api/community/governance?userId=${userId}&limit=${limit}&offset=${offset}`;
      if (status) endpoint += `&status=${status}`;
      if (category) endpoint += `&category=${category}`;
      return fetchAPI(endpoint);
    },
    
    // Create a new proposal
    createProposal: async (proposalData: any) => {
      return fetchAPI('/api/community/governance', {
        method: 'POST',
        body: JSON.stringify(proposalData),
      });
    },
    
    // Add a comment to a proposal
    addComment: async (proposalId: string, userId: string, comment: string) => {
      return fetchAPI('/api/community/governance', {
        method: 'POST',
        body: JSON.stringify({ proposalId, userId, comment }),
      });
    },
    
    // Vote on a proposal
    voteOnProposal: async (proposalId: string, userId: string, vote: string) => {
      return fetchAPI('/api/community/governance', {
        method: 'PUT',
        body: JSON.stringify({ proposalId, userId, action: 'vote', vote }),
      });
    },
    
    // Admin action on a proposal
    adminAction: async (proposalId: string, userId: string, adminAction: string) => {
      return fetchAPI('/api/community/governance', {
        method: 'PUT',
        body: JSON.stringify({ proposalId, userId, adminAction }),
      });
    },
    
    // Remove a proposal
    removeProposal: async (proposalId: string, userId: string) => {
      return fetchAPI(`/api/community/governance?id=${proposalId}&userId=${userId}`, {
        method: 'DELETE',
      });
    },
  },
  
  // Forums API
  forums: {
    // Get forums list
    getForums: async (category?: string, limit = 10, offset = 0) => {
      let endpoint = `/api/community/forums?limit=${limit}&offset=${offset}`;
      if (category) endpoint += `&category=${category}`;
      return fetchAPI(endpoint);
    },
    
    // Get single forum with posts
    getForum: async (forumId: string, limit = 10, offset = 0) => {
      return fetchAPI(`/api/community/forums?forumId=${forumId}&limit=${limit}&offset=${offset}`);
    },
    
    // Create a new forum
    createForum: async (title: string, description: string, category: string, userId: string) => {
      return fetchAPI('/api/community/forums', {
        method: 'POST',
        body: JSON.stringify({ 
          action: 'createForum',
          title, 
          description, 
          category, 
          userId 
        }),
      });
    },
    
    // Create a new post
    createPost: async (forumId: string, title: string, content: string, userId: string) => {
      return fetchAPI('/api/community/forums', {
        method: 'POST',
        body: JSON.stringify({ 
          action: 'createPost',
          forumId, 
          title, 
          content, 
          userId 
        }),
      });
    },
    
    // Add a comment to a post
    addComment: async (forumId: string, postId: string, content: string, userId: string) => {
      return fetchAPI('/api/community/forums', {
        method: 'POST',
        body: JSON.stringify({ 
          action: 'addComment',
          forumId, 
          postId, 
          content, 
          userId 
        }),
      });
    },
    
    // Like or unlike a post
    toggleLikePost: async (forumId: string, postId: string, userId: string) => {
      return fetchAPI('/api/community/forums', {
        method: 'PUT',
        body: JSON.stringify({ 
          action: 'likePost',
          forumId, 
          postId, 
          userId 
        }),
      });
    },
    
    // Edit a post
    editPost: async (forumId: string, postId: string, userId: string, title?: string, content?: string) => {
      return fetchAPI('/api/community/forums', {
        method: 'PUT',
        body: JSON.stringify({ 
          action: 'editPost',
          forumId, 
          postId, 
          userId,
          title,
          content 
        }),
      });
    },
    
    // Delete a post
    deletePost: async (forumId: string, postId: string, userId: string) => {
      return fetchAPI(`/api/community/forums?forumId=${forumId}&postId=${postId}&userId=${userId}`, {
        method: 'DELETE',
      });
    },
    
    // Delete a forum (admin only)
    deleteForum: async (forumId: string, userId: string) => {
      return fetchAPI(`/api/community/forums?forumId=${forumId}&userId=${userId}`, {
        method: 'DELETE',
      });
    },
  },
};

// Export combined API service
const apiService = {
  auth: authApi,
  user: userApi,
  finance: financeApi,
  civic: civicApi,
  community: communityApi
};

export default apiService; 