export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export function formatImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/storage/')) return `${BACKEND_URL}${path}`;
  return path;
}

export function cleanWhatsAppNumber(phone) {
  if (!phone) return '6281290008899';
  let cleaned = String(phone).replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  }
  return cleaned || '6281290008899';
}

async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  // Don't set Content-Type for FormData
  if (options.body instanceof FormData) {
    delete mergedOptions.headers['Content-Type'];
  }

  try {
    const response = await fetch(url, mergedOptions);
    let data;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      throw new Error(data?.error || data?.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    if (typeof window !== 'undefined') {
      console.warn(`[API] Tidak dapat menghubungi ${endpoint}:`, error.message || error);
    }
    throw error;
  }
}

// News
export async function getNews(page = 1, limit = 9, category = '') {
  try {
    const params = new URLSearchParams({ page, limit });
    if (category) params.append('category', category);
    return await fetchAPI(`/news?${params}`);
  } catch {
    return { data: [] };
  }
}

export async function getNewsSafe(page = 1, limit = 20, category = '') {
  try {
    const params = new URLSearchParams({ page, limit });
    if (category) params.append('category', category);
    const res = await fetch(`${API_BASE}/news?${params}`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) return { data: [] };
    return await res.json();
  } catch {
    return { data: [] };
  }
}

export async function getCategories() {
  try {
    const res = await fetch(`${API_BASE}/categories`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) return { success: false, data: [] };
    return await res.json();
  } catch {
    return { success: false, data: [] };
  }
}

export async function getTags() {
  try {
    const res = await fetch(`${API_BASE}/tags`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) return { success: false, data: [] };
    return await res.json();
  } catch {
    return { success: false, data: [] };
  }
}

export async function getFeaturedNews(limit = 3) {
  try {
    return await fetchAPI(`/news/featured?limit=${limit}`);
  } catch {
    return { data: [] };
  }
}

export async function getNewsDetail(slug) {
  try {
    return await fetchAPI(`/news/${slug}`);
  } catch {
    return { data: null };
  }
}

// Gallery (Photos & Videos with category & event_name)
export async function getGallery(category = '', eventName = '', mediaType = '') {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'Semua' && category !== 'semua') params.append('category', category);
    if (eventName) params.append('event_name', eventName);
    if (mediaType && mediaType !== 'all') params.append('media_type', mediaType);
    const query = params.toString() ? `?${params.toString()}` : '';
    return await fetchAPI(`/gallery${query}`);
  } catch {
    return { data: [] };
  }
}

// Facilities (Sarana & Prasarana)
export async function getFacilities(category = '') {
  try {
    const params = category && category !== 'all' ? `?category=${category}` : '';
    return await fetchAPI(`/facilities${params}`);
  } catch {
    return { data: [] };
  }
}

// Testimonials
export async function getTestimonials() {
  try {
    return await fetchAPI('/testimonials');
  } catch {
    return { data: [] };
  }
}

// Admission Schedules (Jadwal Gelombang Pendaftaran)
export async function getAdmissionSchedules() {
  try {
    return await fetchAPI('/admission-schedules');
  } catch {
    return { data: [] };
  }
}

// Contact
export async function submitContact(data) {
  return fetchAPI('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// PMB
export async function submitPMB(data) {
  return fetchAPI('/pmb', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Settings (Safe with fallback)
export async function getSettings() {
  try {
    const res = await fetch(`${API_BASE}/settings`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) return { success: false, data: null };
    return await res.json();
  } catch {
    return { success: false, data: null };
  }
}

// Article Author (Media Arlindo)
export async function getArticleAuthor() {
  try {
    const res = await fetch(`${API_BASE}/article-author`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) return { success: false, data: null };
    return await res.json();
  } catch {
    return { success: false, data: null };
  }
}

// Comments
export async function getNewsComments(slug) {
  if (!slug) return { success: true, data: [] };
  try {
    const res = await fetch(`${API_BASE}/news/${slug}/comments`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) return { success: true, data: [] };
    return await res.json();
  } catch {
    return { success: true, data: [] };
  }
}

export async function submitNewsComment(slug, data) {
  if (!slug) return { success: false, message: 'Slug artikel tidak valid.' };
  try {
    const res = await fetch(`${API_BASE}/news/${slug}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    return resData;
  } catch (err) {
    return { success: false, message: 'Terjadi kendala jaringan saat mengirim komentar.' };
  }
}
