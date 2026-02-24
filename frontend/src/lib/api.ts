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

export async function getAdminTestimonial(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/testimonials/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch testimonial');
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

// Fan Events CRUD (Admin)
export async function getAdminFanEvents(
  token: string,
  params?: { status?: string; page?: number; limit?: number; year?: number; month?: number; day?: number }
) {
  const queryParams = new URLSearchParams();
  if (params?.status) queryParams.append('status', params.status);
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.year) queryParams.append('year', params.year.toString());
  if (params?.month) queryParams.append('month', params.month.toString());
  if (params?.day) queryParams.append('day', params.day.toString());
  const response = await fetch(`${API_BASE_URL}/admin/content/fan-events?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch fan events');
  return response.json();
}

export async function getAdminFanEvent(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/fan-events/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch fan event');
  return response.json();
}

export async function approveFanEvent(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/fan-events/${id}/approve`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to approve fan event');
  }
  return response.json();
}

export async function rejectFanEvent(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/fan-events/${id}/reject`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to reject fan event');
  }
  return response.json();
}

export async function deleteFanEvent(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/fan-events/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to delete fan event');
  return response.json();
}

// ==================== PUBLIC APIs (No Authentication Required) ====================

// Get all active services (Our Services - public, no auth required)
export async function getPublicServices() {
  try {
    const response = await fetch(`${API_BASE_URL}/public/services`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
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
      throw new Error(errorData.message || `Failed to fetch services: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Cannot connect to backend server. Please ensure the backend is running.');
    }
    throw new Error(error.message || 'Failed to fetch services');
  }
}

// Get all active awards (Awards & Recognitions - public, no auth required)
export async function getPublicAwards() {
  try {
    const response = await fetch(`${API_BASE_URL}/public/awards`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
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
      throw new Error(errorData.message || `Failed to fetch awards: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Cannot connect to backend server. Please ensure the backend is running.');
    }
    throw new Error(error.message || 'Failed to fetch awards');
  }
}

// Admin: get all awards
export async function getAdminAwards(token: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/awards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to fetch awards');
  }
  return response.json();
}

// Admin: get single award
export async function getAdminAward(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/awards/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to fetch award');
  }
  return response.json();
}

// Admin: update award
export async function updateAward(token: string, id: string, data: { name?: string; description?: string; image?: string; bgColor?: string; order?: number; link?: string; active?: boolean }) {
  const response = await fetch(`${API_BASE_URL}/admin/content/awards/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to update award');
  }
  return response.json();
}

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

// Submit fan event (public - no auth required)
export async function submitFanEvent(data: {
  title: string;
  eventDate: string;
  eventBy: string;
  photos?: string[];
  videoBase64?: string;
  videoUrl?: string;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/public/fan-events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to submit fan event');
    return result;
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Cannot connect to backend server. Please try again later.');
    }
    throw error;
  }
}

// Get approved fan events (public - no auth required)
export async function getPublicFanEvents() {
  try {
    const response = await fetch(`${API_BASE_URL}/public/fan-events`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 },
      keepalive: true,
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch fan events: ${response.status}`);
    }
    return response.json();
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Cannot connect to backend server. Please try again later.');
    }
    throw error;
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

// Get all testimonials (public - no auth required)
export async function getPublicTestimonials() {
  try {
    const response = await fetch(`${API_BASE_URL}/public/testimonials`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
      const errorMessage = errorData.message || `Failed to fetch testimonials: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Cannot connect to backend server. Please ensure the backend is running on https://charitytrust-eykm.onrender.com');
    }
    throw new Error(error.message || 'Failed to fetch testimonials');
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

// ==================== TIMELINE APIs ====================

// Timeline CRUD (Admin)
export async function getAdminTimeline(token: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/timeline`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch timeline');
  return response.json();
}

export async function getAdminTimelineEntry(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/timeline/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch timeline entry');
  return response.json();
}

export async function createTimelineEntry(token: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/admin/content/timeline`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create timeline entry');
  return response.json();
}

export async function updateTimelineEntry(token: string, id: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/admin/content/timeline/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update timeline entry');
  return response.json();
}

export async function deleteTimelineEntry(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/timeline/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to delete timeline entry');
  return response.json();
}

export async function reorderTimeline(token: string, orderedIds: string[]) {
  const response = await fetch(`${API_BASE_URL}/admin/content/timeline/reorder`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderedIds }),
  });
  if (!response.ok) throw new Error('Failed to reorder timeline');
  return response.json();
}

// Get timeline (public - no auth required)
export async function getPublicTimeline() {
  try {
    const response = await fetch(`${API_BASE_URL}/public/timeline`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
      const errorMessage = errorData.message || `Failed to fetch timeline: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Cannot connect to backend server. Please ensure the backend is running on https://charitytrust-eykm.onrender.com');
    }
    throw new Error(error.message || 'Failed to fetch timeline');
  }
}

// ==================== TEAM (Our Team section) APIs ====================

// Get team categories with members (public - no auth required)
export async function getPublicTeam() {
  try {
    const response = await fetch(`${API_BASE_URL}/public/team`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch team: ${response.status}`);
    }
    return response.json();
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch team');
  }
}

// Get all team categories (admin)
export async function getAdminTeamCategories(token: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/team-categories`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to fetch team categories');
  }
  return response.json();
}

// Get single team category (admin)
export async function getAdminTeamCategory(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/team-categories/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to fetch team category');
  }
  return response.json();
}

// Create team category (admin)
export async function createTeamCategory(token: string, body: Record<string, unknown>) {
  const response = await fetch(`${API_BASE_URL}/admin/content/team-categories`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    const msg = typeof error?.error === 'string' ? error.error : (error.message || 'Failed to create team category');
    throw new Error(msg);
  }
  return response.json();
}

// Update team category (admin)
export async function updateTeamCategory(token: string, id: string, body: Record<string, unknown>) {
  const response = await fetch(`${API_BASE_URL}/admin/content/team-categories/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to update team category');
  }
  return response.json();
}

// Delete team category (admin)
export async function deleteTeamCategory(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/team-categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to delete team category');
  }
  return response.json();
}

// Add team member to a category (admin)
export async function addTeamMember(
  token: string,
  categoryId: string,
  body: { teamNumber?: string; name: string; position: string; imageUrl?: string; bio?: string; order?: number }
) {
  const response = await fetch(`${API_BASE_URL}/admin/content/team-categories/${categoryId}/members`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to add team member');
  }
  return response.json();
}

// Update team member (admin)
export async function updateTeamMember(
  token: string,
  categoryId: string,
  memberId: string,
  body: { teamNumber?: string; name?: string; position?: string; imageUrl?: string; bio?: string; order?: number }
) {
  const response = await fetch(
    `${API_BASE_URL}/admin/content/team-categories/${categoryId}/members/${memberId}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to update team member');
  }
  return response.json();
}

// Delete team member (admin)
export async function deleteTeamMember(token: string, categoryId: string, memberId: string) {
  const response = await fetch(
    `${API_BASE_URL}/admin/content/team-categories/${categoryId}/members/${memberId}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to remove team member');
  }
  return response.json();
}

// ==================== FAQ APIs ====================

// Get FAQs (public - no auth required)
export async function getPublicFaqs() {
  try {
    const response = await fetch(`${API_BASE_URL}/public/faqs`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch FAQs: ${response.status}`);
    }
    return response.json();
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch FAQs');
  }
}

// Get all FAQs (admin)
export async function getAdminFaqs(token: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/faqs`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to fetch FAQs');
  }
  return response.json();
}

// Create FAQ (admin)
export async function createFaq(
  token: string,
  body: { question: string; answer: string; order?: number }
) {
  const payload = {
    question: body.question?.trim() ?? '',
    answer: body.answer?.trim() ?? '',
    order: typeof body.order === 'number' && !Number.isNaN(body.order) ? body.order : 0,
  };
  const response = await fetch(`${API_BASE_URL}/admin/content/faqs`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const msg = data.message || data.error || (typeof data.error === 'string' ? data.error : 'Failed to create FAQ');
    throw new Error(msg);
  }
  return data;
}

// Update FAQ (admin)
export async function updateFaq(
  token: string,
  id: string,
  body: { question?: string; answer?: string; order?: number }
) {
  const response = await fetch(`${API_BASE_URL}/admin/content/faqs/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to update FAQ');
  }
  return response.json();
}

// Delete FAQ (admin)
export async function deleteFaq(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/faqs/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to delete FAQ');
  }
  return response.json();
}

// ==================== EYE DONATION PLEDGE APIs ====================

export interface EyeDonationPledgeData {
  fullName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  nextOfKin: {
    name: string;
    relationship: string;
    phone: string;
  };
  wearingSpectacles?: boolean;
  hadEyeSurgery?: boolean;
  eyeSurgeryDetails?: string;
  hasEyeDisease?: boolean;
  eyeDiseaseDetails?: string;
  hasConsented: boolean;
  familyAware: boolean;
  howDidYouHear?: string;
  additionalNotes?: string;
}

// Submit eye donation pledge (public - no auth required)
export async function submitEyeDonationPledge(data: EyeDonationPledgeData) {
  try {
    const response = await fetch(`${API_BASE_URL}/public/eye-donation-pledge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to submit eye donation pledge');
    }

    return result;
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Cannot connect to backend server. Please try again later.');
    }
    throw new Error(error.message || 'Failed to submit eye donation pledge');
  }
}

// ==================== BLOOD DONATION APIs ====================

export interface BloodDonorData {
  fullName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  weight?: number;
  lastDonationDate?: string;
  hasTattoo?: boolean;
  tattooDate?: string;
  hasRecentIllness?: boolean;
  illnessDetails?: string;
  takingMedication?: boolean;
  medicationDetails?: string;
  hasChronicDisease?: boolean;
  chronicDiseaseDetails?: string;
  availableForEmergency?: boolean;
  preferredDonationCenter?: string;
  howDidYouHear?: string;
  additionalNotes?: string;
  hasConsented: boolean;
}

export interface BloodPatientData {
  fullName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  hospitalName: string;
  hospitalAddress?: string;
  doctorName?: string;
  doctorPhone?: string;
  patientCondition?: string;
  surgeryDate?: string;
  unitsRequired: number;
  urgency?: 'immediate' | 'within_24_hours' | 'within_week' | 'scheduled';
  attendant?: {
    name: string;
    relationship: string;
    phone: string;
  };
  howDidYouHear?: string;
  additionalNotes?: string;
  hasConsented: boolean;
}

// Submit blood donor registration (public - no auth required)
export async function submitBloodDonorRegistration(data: BloodDonorData) {
  try {
    const response = await fetch(`${API_BASE_URL}/public/blood-donation/donor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to submit blood donor registration');
    }

    return result;
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Cannot connect to backend server. Please try again later.');
    }
    throw new Error(error.message || 'Failed to submit blood donor registration');
  }
}

// Submit blood request for patient (public - no auth required)
export async function submitBloodPatientRequest(data: BloodPatientData) {
  try {
    const response = await fetch(`${API_BASE_URL}/public/blood-donation/patient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to submit blood request');
    }

    return result;
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Cannot connect to backend server. Please try again later.');
    }
    throw new Error(error.message || 'Failed to submit blood request');
  }
}

// Get available blood donors count (public)
export async function getAvailableBloodDonors(bloodGroup?: string, city?: string) {
  try {
    const params = new URLSearchParams();
    if (bloodGroup) params.append('bloodGroup', bloodGroup);
    if (city) params.append('city', city);
    
    const response = await fetch(`${API_BASE_URL}/public/blood-donation/donors?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch donor availability');
    }

    return result;
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Cannot connect to backend server. Please try again later.');
    }
    throw new Error(error.message || 'Failed to fetch donor availability');
  }
}

// ==================== ADMIN - EYE DONATION PLEDGES ====================

// Get all eye donation pledges (admin)
export async function getAdminEyeDonationPledges(
  token: string, 
  params?: { status?: string; search?: string; page?: number; limit?: number }
) {
  const queryParams = new URLSearchParams();
  if (params?.status) queryParams.append('status', params.status);
  if (params?.search) queryParams.append('search', params.search);
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  
  const response = await fetch(`${API_BASE_URL}/admin/content/eye-donation-pledges?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch eye donation pledges');
  return response.json();
}

// Get single eye donation pledge (admin)
export async function getAdminEyeDonationPledge(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/eye-donation-pledges/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch eye donation pledge');
  return response.json();
}

// Update eye donation pledge status (admin)
export async function updateEyeDonationPledgeStatus(token: string, id: string, status: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/eye-donation-pledges/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update pledge status');
  return response.json();
}

// Issue card for eye donation pledge (admin)
export async function issueEyeDonationCard(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/eye-donation-pledges/${id}/issue-card`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to issue card');
  return response.json();
}

// Delete eye donation pledge (admin)
export async function deleteEyeDonationPledge(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/eye-donation-pledges/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to delete eye donation pledge');
  return response.json();
}

// Get eye donation stats (admin)
export async function getEyeDonationStats(token: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/eye-donation-pledges/stats/overview`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch eye donation stats');
  return response.json();
}

// ==================== ADMIN - BLOOD DONATIONS ====================

// Get all blood donation entries (admin)
export async function getAdminBloodDonations(
  token: string,
  params?: { type?: string; status?: string; bloodGroup?: string; search?: string; page?: number; limit?: number }
) {
  const queryParams = new URLSearchParams();
  if (params?.type) queryParams.append('type', params.type);
  if (params?.status) queryParams.append('status', params.status);
  if (params?.bloodGroup) queryParams.append('bloodGroup', params.bloodGroup);
  if (params?.search) queryParams.append('search', params.search);
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  
  const response = await fetch(`${API_BASE_URL}/admin/content/blood-donations?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch blood donations');
  return response.json();
}

// Get single blood donation entry (admin)
export async function getAdminBloodDonation(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/blood-donations/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch blood donation entry');
  return response.json();
}

// Update blood donation status (admin)
export async function updateBloodDonationStatus(token: string, id: string, status: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/blood-donations/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update blood donation status');
  return response.json();
}

// Fulfill patient blood request (admin)
export async function fulfillBloodRequest(token: string, id: string, units: number, donorId?: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/blood-donations/${id}/fulfill`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ units, donorId }),
  });
  if (!response.ok) throw new Error('Failed to fulfill blood request');
  return response.json();
}

// Delete blood donation entry (admin)
export async function deleteBloodDonation(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/blood-donations/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to delete blood donation entry');
  return response.json();
}

// Get blood donation stats (admin)
export async function getBloodDonationStats(token: string) {
  const response = await fetch(`${API_BASE_URL}/admin/content/blood-donations/stats/overview`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch blood donation stats');
  return response.json();
}

