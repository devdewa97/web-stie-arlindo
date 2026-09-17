'use client';

import { useState, useEffect } from 'react';
import { getSettings } from './api';

export const defaultSettings = {
  site_name: 'STIE ARLINDO',
  site_tagline: 'Sekolah Tinggi Ilmu Ekonomi Arlindo',
  site_description: 'Menjadi lembaga pendidikan tinggi manajemen dan ekonomi yang unggul dan bermartabat di ASEAN pada tahun 2030.',
  address: 'Jl. Lurah Namat, RT.002/RW.003, Jatirangga, Kec. Jatisampurna, Kota Bekasi, Jawa Barat',
  phone: '(021) 845-8899',
  whatsapp: '0812-9000-8899',
  email: 'info@arlindo.ac.id',
  instagram: 'https://instagram.com/stiearlindo',
  facebook: 'https://facebook.com/stiearlindo',
  youtube: 'https://youtube.com/@stiearlindo',
  ejournal_url: '#',
  siakad_url: '#',
  portal_url: '#',
  pmb_open: 'true',
  pmb_period: '2026/2027',
  popup_enabled: 'false',
  popup_type: 'text',
  popup_title: '',
  popup_content: '',
  popup_image: '',
  popup_image_url: '',
  popup_image_link: '',
  popup_button_text: '',
  popup_button_link: '',
};

let cachedSettings = null;
let fetchPromise = null;

export function useSettings() {
  const [settings, setSettings] = useState(cachedSettings || defaultSettings);
  const [loading, setLoading] = useState(!cachedSettings);

  useEffect(() => {
    if (cachedSettings) {
      setSettings(cachedSettings);
      setLoading(false);
      return;
    }

    if (!fetchPromise) {
      fetchPromise = getSettings()
        .then((res) => {
          if (res?.data) {
            cachedSettings = { ...defaultSettings, ...res.data };
          } else {
            cachedSettings = defaultSettings;
          }
          return cachedSettings;
        })
        .catch(() => {
          cachedSettings = defaultSettings;
          return defaultSettings;
        });
    }

    fetchPromise.then((data) => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  return { settings, loading };
}
