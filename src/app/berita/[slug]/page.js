import BeritaDetailClient from './BeritaDetailClient';
import { API_BASE, formatImageUrl, getCategories } from '@/lib/api';

const newsDatabase = {
  'pendaftaran-mahasiswa-baru-2026-2027': {
    slug: 'pendaftaran-mahasiswa-baru-2026-2027',
    title: 'Pendaftaran Mahasiswa Baru Tahun Akademik 2026/2027 Resmi Dibuka',
    category: 'PMB',
    categorySlug: 'pmb',
    date: '1 September 2026',
    readTime: '4 Menit Baca',
    author: 'Biro Penerimaan Mahasiswa Baru (PMB)',
    authorRole: 'Tim Admisi & Hubungan Masyarakat STIE ARLINDO',
    authorBio:
      'Biro PMB STIE ARLINDO bertugas memberikan konsultasi akademik, memproses pendaftaran calon mahasiswa, serta mengelola program beasiswa kemitraan industri Arlindo Group.',
    image: '/images/news-pmb.jpg',
    excerpt:
      'STIE ARLINDO membuka pendaftaran mahasiswa baru untuk tahun akademik 2026/2027. Dapatkan potongan biaya kuliah hingga 30% dan beasiswa kemitraan industri bagi pendaftar gelombang awal.',
    takeaways: [
      'Pendaftaran Mahasiswa Baru (PMB) Gelombang 1 dibuka mulai Januari hingga September 2026.',
      'Tersedia potongan biaya kuliah (early bird privilege) hingga 30% bagi pendaftar awal.',
      'Program Studi S1 Manajemen menyediakan 4 konsentrasi terapan berorientasi karir industri digital.',
      'Mahasiswa memiliki prioritas program magang bersertifikat dan rekrutmen kerja di ekosistem Arlindo Group.',
    ],
    content: `
      <p>Sekolah Tinggi Ilmu Ekonomi (STIE) ARLINDO secara resmi mengumumkan pembukaan Pendaftaran Mahasiswa Baru (PMB) untuk Tahun Akademik 2026/2027. Mengusung visi sebagai pusat keunggulan pendidikan manajemen dan ekonomi terapan di kawasan Jabodetabek, STIE ARLINDO berkomitmen mendampingi generasi muda meraih kompetensi profesional yang relevan dengan dinamika industri modern.</p>
      
      <h2>Komitmen Mencetak Sarjana Manajemen yang Adaptif &amp; Beretika</h2>
      <p>Dalam sambutan resminya, Ketua STIE ARLINDO menegaskan bahwa tahun akademik ini menghadirkan kurikulum berbasis Merdeka Belajar Kampus Merdeka (MBKM) yang telah diselaraskan dengan kebutuhan dunia usaha dan dunia industri (DUDI). Pembelajaran dirancang memadukan fondasi teori yang kokoh dengan studi kasus nyata, analitik data, dan simulasi pengambilan keputusan bisnis.</p>
      
      <blockquote>"Pendidikan tinggi di STIE ARLINDO tidak semata-mata mentransfer wawasan akademis di ruang kuliah, melainkan menempa karakter kepemimpinan, integritas, dan literasi digital yang menjadi modal utama dalam memenangkan kompetisi karir global." — Dr. Didik Setiyadi, S.Kom., M.Kom., Ketua STIE ARLINDO.</blockquote>
      
      <h2>4 Konsentrasi Strategis Siap Hadapi Era Digital</h2>
      <p>Calon mahasiswa baru program Sarjana (S1) Manajemen dapat menentukan fokus keilmuan melalui 4 pilihan konsentrasi unggulan yang memiliki prospek kerja tinggi:</p>
      <ul>
        <li><strong>Manajemen Keuangan &amp; Inklusi Keuangan:</strong> Analisis portofolio investasi, manajemen risiko korporasi, perbankan modern, dan instrumen fintech.</li>
        <li><strong>Manajemen Pemasaran Digital:</strong> Strategi periklanan digital, optimasi SEO/SEM, analitik perilaku konsumen modern, dan e-commerce.</li>
        <li><strong>Manajemen Sumber Daya Manusia &amp; Tata Kelola:</strong> Kepemimpinan strategis, manajemen talenta korporat, dan psikologi organisasi di era kerja hybrid.</li>
        <li><strong>Manajemen Operasional &amp; Rantai Pasok:</strong> Efisiensi logistik terintegrasi, lean management, serta tata kelola rantai pasok berkelanjutan.</li>
      </ul>

      <h2>Skema Keringanan Biaya &amp; Beasiswa Kemitraan</h2>
      <p>Sebagai bentuk dedikasi dalam memperluas aksesibilitas pendidikan tinggi berkualitas, STIE ARLINDO membuka fasilitas potongan biaya kuliah hingga 30% bagi pendaftar pada periode Gelombang 1 (Januari – Maret 2026). Selain itu, tersedia pula beasiswa prestasi akademik, beasiswa tahfidz, serta jalur kemitraan korporasi.</p>
      
      <p>Proses registrasi dapat dilakukan secara fleksibel melalui sistem pendaftaran online terpadu di website ini atau dengan berkonsultasi langsung ke Sekretariat PMB di Kampus Terpadu STIE ARLINDO Bekasi.</p>
    `,
  },

  'workshop-manajemen-pemasaran-digital': {
    slug: 'workshop-manajemen-pemasaran-digital',
    title: 'Workshop Manajemen Pemasaran Digital Bersama Praktisi Industri Ekosistem Arlindo',
    category: 'Akademik',
    categorySlug: 'akademik',
    date: '28 Agustus 2026',
    readTime: '3 Menit Baca',
    author: 'Laboratorium Pemasaran & Humas',
    authorRole: 'Divisi Riset & Pengembangan Akademik',
    authorBio:
      'Memfasilitasi penguasaan keahlian digital terapan, riset pemasaran, serta sinergi industri bagi mahasiswa Program Studi S1 Manajemen.',
    image: '/images/news-workshop.jpg',
    excerpt:
      'Meningkatkan kompetensi mahasiswa di era kecerdasan buatan, STIE ARLINDO menggelar workshop intensif strategi pemasaran digital dan analitik data pasar modern.',
    takeaways: [
      'Diikuti lebih dari 150 mahasiswa aktif Program Studi S1 Manajemen.',
      'Fokus materi pada integrasi Generative AI dalam riset pasar dan optimasi kampanye periklanan digital.',
      'Menghadirkan narasumber praktisi dari ekosistem bisnis Arlindo Group.',
    ],
    content: `
      <p>Perkembangan teknologi kecerdasan buatan (Artificial Intelligence) dan otomatisasi telah mendisrupsi pola perilaku konsumen serta strategi pemasaran secara fundamental. Menjawab tantangan tersebut, Program Studi S1 Manajemen STIE ARLINDO menyelenggarakan workshop bersertifikat bertajuk <em>"Digital Marketing Mastery: Navigating AI and Data Analytics for Modern Business Growth"</em>.</p>
      
      <h2>Integrasi Teori dengan Praktik Nyata</h2>
      <p>Acara yang berlangsung di Auditorium Utama Kampus Terpadu STIE ARLINDO ini mempertemukan mahasiswa dengan para praktisi yang berkecimpung langsung di industri. Mahasiswa diajak membedah studi kasus optimasi kampanye periklanan berbiaya efisien dengan return of investment (ROI) maksimal.</p>
      
      <blockquote>"Keahlian digital marketing bukan lagi sekadar nilai tambah, melainkan kompetensi inti yang harus dimiliki setiap calon manajer bisnis modern."</blockquote>
      
      <h2>Praktik Langsung Alat Analitik Modern</h2>
      <p>Tidak hanya menerima pemaparan materi, peserta juga mempraktikkan langsung penggunaan platform analitik digital, perancangan conversion funnel, optimasi search engine, serta penyusunan strategi konten berbasis persona konsumen.</p>
      
      <p>Kegiatan ini merupakan komitmen berkelanjutan STIE ARLINDO dalam menyelaraskan kurikulum kampus dengan standar kompetensi industri kerja masa kini.</p>
    `,
  },

  'wisuda-angkatan-15': {
    slug: 'wisuda-angkatan-15',
    title: 'Wisuda Angkatan ke-15 STIE ARLINDO: Lahirkan 250 Sarjana Manajemen Berdaya Saing',
    category: 'Kegiatan',
    categorySlug: 'kegiatan',
    date: '20 Agustus 2026',
    readTime: '5 Menit Baca',
    author: 'Panitia Wisuda & Humas Kampus',
    authorRole: 'Biro Kemahasiswaan & Ikatan Alumni',
    authorBio:
      'Mendokumentasikan pencapaian akademik civitas akademika serta mengawal sinergi jejaring ikatan alumni STIE ARLINDO di seluruh Indonesia.',
    image: '/images/news-wisuda.jpg',
    excerpt:
      'Sebanyak 250 wisudawan program S1 Manajemen resmi diwisuda dan siap menapaki karir profesional di sektor perbankan, korporasi multinasional, dan wirausaha.',
    takeaways: [
      'Pelepasan resmi 250 wisudawan bergelar Sarjana Manajemen (S.M.).',
      'Sebanyak 65% lulusan telah terserap kerja sebelum prosesi wisuda berlangsung.',
      'Penganugerahan predikat Cum Laude kepada 18 lulusan terbaik.',
    ],
    content: `
      <p>Suasana khidmat dan penuh rasa haru menyelimuti prosesi Sidang Terbuka Senat STIE ARLINDO dalam rangka Wisuda Sarjana Angkatan ke-15. Sebanyak 250 lulusan resmi dilantik menyandang gelar akademik Sarjana Manajemen (S.M.) setelah menuntaskan seluruh kewajiban akademik, magang industri, dan karya ilmiah skripsi.</p>
      
      <h2>Tingkat Penyerapan Kerja Lulusan Tinggi</h2>
      <p>Dalam laporan akademik tahunan, pimpinan kampus menyampaikan apresiasi atas tingginya tingkat serapan kerja lulusan. Lebih dari 65% wisudawan telah diterima bekerja di berbagai institusi perbankan, korporasi swasta, instansi publik, serta mengembangkan rintisan usaha mandiri sebelum hari wisuda.</p>
      
      <blockquote>"Gelar sarjana yang diraih hari ini adalah pintu gerbang menuju kontribusi nyata bagi masyarakat dan kemajuan perekonomian bangsa."</blockquote>
      
      <h2>Pesan Integritas &amp; Nilai Kepemimpinan</h2>
      <p>Ketua STIE ARLINDO berpesan agar para alumni senantiasa menjaga nama baik almamater, menjunjung etika profesi yang luhur, dan terus menjadi pembelajar sepanjang hayat dalam menyongsong tantangan karir masa depan.</p>
    `,
  },

  'kerjasama-perusahaan-mitra-baru': {
    slug: 'kerjasama-perusahaan-mitra-baru',
    title: 'STIE ARLINDO Jalin Kerjasama Strategis dengan 10 Perusahaan Mitra Terkemuka',
    category: 'Kerjasama',
    categorySlug: 'kerjasama',
    date: '15 Agustus 2026',
    readTime: '4 Menit Baca',
    author: 'Biro Kerjasama Industri & Karir',
    authorRole: 'Pusat Karir & Kemitraan DUDI',
    authorBio:
      'Menjalin kemitraan sinergis antara dunia kampus dan korporasi untuk mempercepat penyerapan kerja dan magang mahasiswa.',
    image: '/images/news-kerjasama.jpg',
    excerpt:
      'Memperluas jaringan kerja sama industri, STIE ARLINDO menandatangani nota kesepahaman (MoU) untuk program magang bersertifikat dan rekrutmen lulusan.',
    takeaways: [
      'Penandatanganan MoU dengan 10 perusahaan dari sektor logistik, perbankan, teknologi, dan ritel.',
      'Penyediaan kuota magang industri bersertifikat minimal 1 semester penuh.',
      'Program rekrutmen jalur cepat (fast-track hiring) bagi lulusan berprestasi.',
    ],
    content: `
      <p>STIE ARLINDO terus memperluas jejaring kemitraan strategis dengan Dunia Usaha dan Dunia Industri (DUDI). Bertempat di Ruang Rapat Senat Kampus Terpadu, STIE ARLINDO resmi menandatangani Nota Kesepahaman (MoU) bersama 10 pimpinan korporasi mitra skala nasional.</p>
      
      <h2>Ruang Lingkup Kemitraan</h2>
      <p>Kerjasama ini mencakup pengembangan kurikulum bersama berbasis kebutuhan pasar kerja, program magang mahasiswa bersertifikat, dosen tamu praktisi dari jajaran eksekutif, serta program rekrutmen kerja langsung bagi lulusan terbaik.</p>
      
      <blockquote>"Sinergi pentahelix antara perguruan tinggi dan dunia usaha adalah kunci utama mencetak talenta unggul yang siap kerja sejak hari pertama lulus."</blockquote>
    `,
  },

  'seminar-nasional-ekonomi-bisnis-berkelanjutan': {
    slug: 'seminar-nasional-ekonomi-bisnis-berkelanjutan',
    title: 'Seminar Nasional: Inovasi Model Bisnis & Tata Kelola Berkelanjutan di Era Digital',
    category: 'Akademik',
    categorySlug: 'akademik',
    date: '10 Agustus 2026',
    readTime: '4 Menit Baca',
    author: 'Lembaga Penelitian & Pengabdian Masyarakat (LPPM)',
    authorRole: 'Divisi Riset Manajemen Berkelanjutan',
    authorBio:
      'Mengembangkan riset terapan, pengabdian masyarakat, serta publikasi jurnal manajemen bereputasi.',
    image: '/images/news-seminar.jpg',
    excerpt:
      'Menghadirkan narasumber pakar ekonomi nasional dan regulator membahas arah transformasi tata kelola bisnis berkelanjutan (ESG) dan ekonomi sirkular.',
    takeaways: [
      'Seminar dihadiri lebih dari 300 akademisi, praktisi korporat, dan mahasiswa.',
      'Membahas implementasi prinsip Environmental, Social, and Governance (ESG) pada sektor bisnis Indonesia.',
      'Peluncuran call for papers jurnal ilmiah manajemen edisi semester genap.',
    ],
    content: `
      <p>Isu keberlanjutan dan tata kelola Environmental, Social, and Governance (ESG) kini menjadi barometer utama keberhasilan korporasi modern. Menanggapi diskursus ini, STIE ARLINDO menggelar Seminar Nasional bertajuk <em>"Sustainable Business Models and Ethical Governance in the Digital Economy Era"</em>.</p>
      
      <h2>Pakar dan Regulator Berbagi Wawasan</h2>
      <p>Seminar ini menghadirkan narasumber dari kementerian terkait, perwakilan asosiasi emiten, serta praktisi senior yang memaparkan langkah praktis implementasi model bisnis sirkular tanpa mengorbankan profitabilitas jangka panjang perusahaan.</p>
    `,
  },

  'juara-kompetisi-business-plan': {
    slug: 'juara-kompetisi-business-plan',
    title: 'Mahasiswa STIE ARLINDO Raih Juara Kompetisi Business Plan Tingkat Nasional 2026',
    category: 'Prestasi',
    categorySlug: 'prestasi',
    date: '5 Agustus 2026',
    readTime: '3 Menit Baca',
    author: 'Biro Kemahasiswaan & Prestasi',
    authorRole: 'Pusat Pengembangan Prestasi Mahasiswa',
    authorBio:
      'Membimbing dan mendampingi delegasi mahasiswa STIE ARLINDO dalam berbagai kompetisi akademik dan bisnis skala nasional.',
    image: '/images/news-prestasi.jpg',
    excerpt:
      'Tim mahasiswa S1 Manajemen STIE ARLINDO sukses menyabet juara pertama pada ajang kompetisi inovasi bisnis mahasiswa tingkat nasional.',
    takeaways: [
      'Tim mahasiswa STIE ARLINDO berhasil mengungguli lebih dari 80 tim dari berbagai universitas se-Indonesia.',
      'Mengusung inovasi platform rantai pasok agribisnis berbasis digitalisasi koperasi.',
      'Mendapatkan pendanaan inkubasi bisnis dari dewan juri praktisi modal ventura.',
    ],
    content: `
      <p>Kabar membanggakan kembali ditorehkan oleh mahasiswa STIE ARLINDO di kancah nasional. Delegasi mahasiswa Program Studi S1 Manajemen berhasil menyabet Juara 1 pada ajang <em>National Business Plan Competition 2026</em> yang diikuti perguruan tinggi negeri dan swasta se-Indonesia.</p>
      
      <h2>Inovasi Platform Rantai Pasok Berkelanjutan</h2>
      <p>Tim mahasiswa mengusung karya inovatif bertajuk platform digitalisasi rantai pasok pangan yang menghubungkan petani lokal langsung dengan ekosistem ritel secara transparan dan berkeadilan. Keunggulan rancangan model finansial dan kelayakan implementasi bisnis menjadi faktor penentu kemenangan.</p>
    `,
  },
};

// Default fallback categories
const defaultCategories = [
  { name: 'PMB & Pendaftaran', slug: 'pmb', count: 2 },
  { name: 'Akademik & Kurikulum', slug: 'akademik', count: 4 },
  { name: 'Kegiatan Kampus', slug: 'kegiatan', count: 3 },
  { name: 'Prestasi Mahasiswa', slug: 'prestasi', count: 2 },
  { name: 'Kerjasama Industri', slug: 'kerjasama', count: 2 },
  { name: 'Umum & Opini', slug: 'umum', count: 1 },
];

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const localArticle = newsDatabase[slug];

  let title = localArticle ? localArticle.title : slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  let description = localArticle ? localArticle.excerpt : `Baca berita dan liputan resmi: ${title}`;
  let image = localArticle ? localArticle.image : '/images/hero-bg.png';
  let publishedDate = localArticle ? localArticle.date : null;
  let author = localArticle ? localArticle.author : 'Tim Redaksi STIE ARLINDO';

  // Attempt backend API fetch
  try {
    const res = await fetch(`${API_BASE}/news/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.title) {
        title = json.data.title;
        description = json.data.excerpt || description;
        image = json.data.image ? formatImageUrl(json.data.image) : image;
        publishedDate = json.data.published_at || json.data.created_at || publishedDate;
        author = json.data.author || author;
      }
    }
  } catch (err) {
    // Silently fallback to local metadata
  }

  return {
    title: `${title} | STIE ARLINDO`,
    description,
    alternates: {
      canonical: `/berita/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://arlindo.ac.id/berita/${slug}`,
      type: 'article',
      publishedTime: publishedDate || undefined,
      authors: [author],
      siteName: 'STIE ARLINDO',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function BeritaDetailPage({ params }) {
  const { slug } = await params;

  // 1. Get base article from local database
  let article = newsDatabase[slug] || {
    slug,
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    category: 'Warta Kampus',
    categorySlug: 'umum',
    date: 'Terkini 2026',
    readTime: '3 Menit Baca',
    author: 'Tim Redaksi & Humas STIE ARLINDO',
    authorRole: 'Biro Komunikasi Publik & Media Akademik',
    authorBio:
      'Dikelola oleh Biro Humas & Publikasi STIE ARLINDO untuk menyajikan warta resmi, riset keilmuan, dan aktivitas akademik civitas kampus.',
    image: '/images/news-pmb.jpg',
    excerpt: 'Simak ulasan lengkap seputar kabar akademik dan kegiatan terbaru dari STIE ARLINDO.',
    takeaways: [
      'Informasi resmi terverifikasi dan dikeluarkan langsung oleh pihak STIE ARLINDO.',
      'Mendukung penguatan mutu akademik, kemitraan dunia usaha, dan karir mahasiswa.',
    ],
    content: '<p>Detail artikel resmi sedang dalam proses pembaruan oleh redaksi. Silakan kunjungi kembali halaman ini.</p>',
  };

  let dynamicCategories = defaultCategories;

  // 2. Try fetching dynamic article & categories from backend API
  try {
    const [newsRes, catRes] = await Promise.allSettled([
      fetch(`${API_BASE}/news/${slug}`, { next: { revalidate: 30 } }),
      getCategories(),
    ]);

    if (newsRes.status === 'fulfilled' && newsRes.value.ok) {
      const json = await newsRes.value.json();
      if (json.data) {
        const apiData = json.data;
        article = {
          ...article,
          title: apiData.title || article.title,
          category: apiData.category_rel ? apiData.category_rel.name : (apiData.category ? apiData.category.toUpperCase() : article.category),
          categorySlug: apiData.category_rel ? apiData.category_rel.slug : (apiData.category ? apiData.category.toLowerCase() : article.categorySlug),
          date: apiData.published_at
            ? new Date(apiData.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
            : apiData.created_at
            ? new Date(apiData.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
            : article.date,
          content: apiData.content || article.content,
          excerpt: apiData.excerpt || article.excerpt,
          author: apiData.author || article.author,
          image: apiData.image ? formatImageUrl(apiData.image) : article.image,
        };
      }
    }

    if (catRes.status === 'fulfilled' && catRes.value?.data?.length > 0) {
      dynamicCategories = catRes.value.data.map(c => ({
        name: c.name,
        slug: c.slug,
        count: c.news_count || c.count || 1,
      }));
    }
  } catch (err) {
    // Graceful fallback to rich local article
  }

  // 3. Prepare list of all available articles for related & recent sections
  const allArticlesList = Object.values(newsDatabase);

  // Filter related articles (same category or others, excluding current slug)
  let relatedArticles = allArticlesList
    .filter(item => item.slug !== slug)
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === article.category && b.category !== article.category) return -1;
      if (b.category === article.category && a.category !== article.category) return 1;
      return 0;
    })
    .slice(0, 3);

  // Recent articles for right sidebar
  const recentArticles = allArticlesList
    .filter(item => item.slug !== slug)
    .slice(0, 4);

  // JSON-LD Article Structured Data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image ? `https://arlindo.ac.id${article.image.startsWith('/') ? article.image : `/${article.image}`}` : 'https://arlindo.ac.id/images/hero-bg.png',
    datePublished: article.date,
    author: {
      '@type': 'Organization',
      name: article.author || 'STIE ARLINDO',
    },
    publisher: {
      '@type': 'Organization',
      name: 'STIE ARLINDO',
      logo: {
        '@type': 'ImageObject',
        url: 'https://arlindo.ac.id/images/hero-bg.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://arlindo.ac.id/berita/${slug}`,
    },
  };

  // BreadcrumbList Structured Data
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: 'https://arlindo.ac.id',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Berita',
        item: 'https://arlindo.ac.id/berita',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://arlindo.ac.id/berita/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BeritaDetailClient
        article={article}
        relatedArticles={relatedArticles}
        categories={dynamicCategories}
        recentArticles={recentArticles}
      />
    </>
  );
}
