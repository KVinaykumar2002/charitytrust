// API client for backend communication

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://charitytrust-eykm.onrender.com/api';

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    role: string;
    redirectPath: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
    redirectPath: string;
  };
}

// Register user
export async function register(
  name: string,
  email: string,
  password: string,
  role: string = 'user'
): Promise<RegisterResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, role }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }

  return response.json();
}

// Login user
export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
}

// Verify token
export async function verifyToken(token: string) {
  const response = await fetch(`${API_BASE_URL}/auth/verify`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Token verification failed');
  }

  return response.json();
}

// Get user dashboard data
export async function getUserDashboard(token: string) {
  const response = await fetch(`${API_BASE_URL}/user/dashboard`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }

  return response.json();
}

// Get admin dashboard data
export async function getAdminDashboard(token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch admin dashboard data: ${response.status}`);
    }

    return response.json();
  } catch (error: any) {
    console.error('getAdminDashboard error:', error);
    throw error;
  }
}

// Get monthly donations data for chart
export async function getMonthlyDonations(token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard/monthly-donations`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch monthly donations');
    }

    return response.json();
  } catch (error: any) {
    console.error('getMonthlyDonations error:', error);
    throw error;
  }
}

// Get program distribution data for pie chart
export async function getProgramDistribution(token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard/program-distribution`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch program distribution');
    }

    return response.json();
  } catch (error: any) {
    console.error('getProgramDistribution error:', error);
    throw error;
  }
}

// Get recent activity
export async function getRecentActivity(token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard/recent-activity`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recent activity');
    }

    return response.json();
  } catch (error: any) {
    console.error('getRecentActivity error:', error);
    throw error;
  }
}

// ==================== USER DASHBOARD APIs ====================

// Get user dashboard stats
export async function getUserDashboardStats(token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/dashboard`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user dashboard stats');
    }

    return response.json();
  } catch (error: any) {
    console.error('getUserDashboardStats error:', error);
    throw error;
  }
}

// Get user's donations
export async function getUserDonations(token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/donations`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user donations');
    }

    return response.json();
  } catch (error: any) {
    console.error('getUserDonations error:', error);
    throw error;
  }
}

// Get user's events
export async function getUserEvents(token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/events`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user events');
    }

    return response.json();
  } catch (error: any) {
    console.error('getUserEvents error:', error);
    throw error;
  }
}

// ==================== USER CONTENT APIs (Read-Only) ====================

// Get all programs (read-only)
export async function getUserPrograms(token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/content/programs`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch programs');
    }

    return response.json();
  } catch (error: any) {
    console.error('getUserPrograms error:', error);
    throw error;
  }
}

// Get all projects (read-only)
export async function getUserProjects(token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/content/projects`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    return response.json();
  } catch (error: any) {
    console.error('getUserProjects error:', error);
    throw error;
  }
}

// Get all events (read-only)
export async function getUserContentEvents(token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/content/events`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    return response.json();
  } catch (error: any) {
    console.error('getUserContentEvents error:', error);
    throw error;
  }
}

// Get all testimonials (read-only)
export async function getUserTestimonials(token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/content/testimonials`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch testimonials');
    }

    return response.json();
  } catch (error: any) {
    console.error('getUserTestimonials error:', error);
    throw error;
  }
}

// ==================== ADMIN CONTENT APIs (CRUD) ====================

// Programs CRUD
export async function getAdminPrograms(token: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/programs`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch programs');
  return response.json();
}

export async function createProgram(token: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/admin/content/programs`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create program');
  return response.json();
}

export async function updateProgram(token: string, id: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/admin/content/programs/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update program');
  return response.json();
}

export async function deleteProgram(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/programs/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to delete program');
  return response.json();
}

// Events CRUD
export async function getAdminEvents(token: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/events`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch events');
  return response.json();
}

export async function getAdminEvent(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/events/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch event');
  return response.json();
}

export async function createEvent(token: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/admin/content/events`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create event');
  return response.json();
}

export async function updateEvent(token: string, id: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/admin/content/events/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update event');
  return response.json();
}

export async function deleteEvent(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/events/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to delete event');
  return response.json();
}

// Projects CRUD
export async function getAdminProjects(token: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/projects`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
}

export async function createProject(token: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/admin/content/projects`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create project');
  return response.json();
}

export async function updateProject(token: string, id: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/admin/content/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update project');
  return response.json();
}

export async function deleteProject(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/projects/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to delete project');
  return response.json();
}

// Testimonials CRUD
export async function getAdminTestimonials(token: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/testimonials`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch testimonials');
  return response.json();
}

export async function createTestimonial(token: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/admin/content/testimonials`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create testimonial');
  return response.json();
}

export async function updateTestimonial(token: string, id: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/admin/content/testimonials/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update testimonial');
  return response.json();
}

export async function deleteTestimonial(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/testimonials/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to delete testimonial');
  return response.json();
}

export async function updateTestimonialStatus(token: string, id: string, status: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/testimonials/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update testimonial status');
  return response.json();
}

// ==================== PUBLIC APIs (No Authentication Required) ====================

// Get all active programs (public - no auth required)
export async function getPublicPrograms() {
  try {
    const response = await fetch(`${API_BASE_URL}/public/programs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Use revalidation for better performance - cache for 60 seconds
      next: { revalidate: 60 },
      keepalive: true,
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
      }
      const errorMessage = errorData.message || `Failed to fetch programs: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Cannot connect to backend server. Please ensure the backend is running on https://charitytrust-eykm.onrender.com');
    }
    throw new Error(error.message || 'Failed to fetch programs');
  }
}

// Get all projects (public - no auth required)
export async function getPublicProjects() {
  try {
    const response = await fetch(`${API_BASE_URL}/public/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Use revalidation for better performance - cache for 60 seconds
      next: { revalidate: 60 },
      keepalive: true,
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
      }
      const errorMessage = errorData.message || `Failed to fetch projects: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Cannot connect to backend server. Please ensure the backend is running on https://charitytrust-eykm.onrender.com');
    }
    throw new Error(error.message || 'Failed to fetch projects');
  }
}

// Get all events (public - no auth required)
export async function getPublicEvents() {
  try {
    const response = await fetch(`${API_BASE_URL}/public/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Use revalidation for better performance - cache for 60 seconds
      next: { revalidate: 60 },
      // Add keepalive for better connection reuse
      keepalive: true,
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
      }
      const errorMessage = errorData.message || `Failed to fetch events: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    // Handle network errors (CORS, connection refused, etc.)
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Cannot connect to backend server. Please ensure the backend is running on https://charitytrust-eykm.onrender.com');
    }
    
    // Handle other errors
    throw new Error(error.message || 'Failed to fetch events');
  }
}

// Get all hero images (public - no auth required)
export async function getPublicHeroImages() {
  try {
    const response = await fetch(`${API_BASE_URL}/public/hero-images`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch hero images');
    }

    return response.json();
  } catch (error: any) {
    console.error('getPublicHeroImages error:', error);
    throw error;
  }
}

// Hero Images CRUD
export async function getAdminHeroImages(token: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/hero-images`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch hero images');
  return response.json();
}

export async function getAdminHeroImage(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/hero-images/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch hero image');
  return response.json();
}

export async function createHeroImage(token: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/admin/content/hero-images`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create hero image');
  return response.json();
}

export async function updateHeroImage(token: string, id: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/admin/content/hero-images/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update hero image');
  return response.json();
}

export async function deleteHeroImage(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/hero-images/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to delete hero image');
  return response.json();
}

