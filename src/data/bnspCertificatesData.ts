export interface CompetencyUnit {
  code: string;
  titleId: string;
  titleEn: string;
  category?: string;
}

export interface BNSPCertificate {
  id: string;
  titleId: string;
  titleEn: string;
  qualification: string;
  area: string;
  certNumber: string;
  regNumber: string;
  barcodeNumber: string;
  issueDate: string;
  validity: string;
  issuerLsp: string;
  issuerAuthority: string;
  signatory: string;
  frontImage: string;
  backImage: string;
  accentColor: string;
  statusText: string;
  summary: string;
  competencyUnits: CompetencyUnit[];
}

export const BNSP_CERTIFICATES: BNSPCertificate[] = [
  {
    id: "programmer",
    titleId: "Sertifikat Kompetensi Pemrogram (Programmer)",
    titleEn: "Certificate of Competence: Occupation of Programmer",
    qualification: "Okupasi Pemrogram (Programmer)",
    area: "Pemrograman / Programming (Aktivitas Teknologi Informasi)",
    certNumber: "62019 2514 5 0026105 2026",
    regNumber: "TIK.705.01979.2026",
    barcodeNumber: "15869009",
    issueDate: "15 Juli 2026",
    validity: "3 (tiga) Tahun / 3 Years",
    issuerLsp: "Lembaga Sertifikasi Profesi Universitas Gunadarma (Professional Certification Agency of Gunadarma University)",
    issuerAuthority: "Badan Nasional Sertifikasi Profesi (BNSP) — Indonesian Professional Certification Authority",
    signatory: "Prof. Dr. rer. nat. Supriyanto (Ketua LSP) & Sri Murtiasih (Kepala Bagian Sertifikasi)",
    frontImage: "/certificates/bnsp_programmer_depan.png",
    backImage: "/certificates/bnsp_programmer_belakang.png",
    accentColor: "#ff5500",
    statusText: "TERVERIFIKASI KOMPETEN • STANDAR SKKNI",
    summary:
      "Sertifikasi profesi nasional tingkat tertinggi untuk pengembang perangkat lunak, membuktikan kompetensi teruji dalam spesifikasi arsitektur, clean coding berstandar industri, pemrograman terstruktur & berorientasi objek, integrasi database, debugging, hingga unit testing otomatis.",
    competencyUnits: [
      {
        code: "J.620100.009.01",
        titleId: "Menggunakan Spesifikasi Program",
        titleEn: "Use Program Specification",
        category: "Architecture & Design"
      },
      {
        code: "J.620100.016.01",
        titleId: "Menulis Kode dengan Prinsip sesuai Guidelines dan Best Practices",
        titleEn: "Write Code with Principles according to Guidelines and Best Practices",
        category: "Clean Code"
      },
      {
        code: "J.620100.017.02",
        titleId: "Mengimplementasikan Pemrograman Terstruktur",
        titleEn: "Implement Structured Programming",
        category: "Core Programming"
      },
      {
        code: "J.620100.018.02",
        titleId: "Mengimplementasikan Pemrograman Berorientasi Objek (OOP)",
        titleEn: "Implement Object-Oriented Programming",
        category: "OOP Architecture"
      },
      {
        code: "J.620100.019.02",
        titleId: "Menggunakan Library atau Komponen Pre-Existing",
        titleEn: "Use Library or Pre-Existing Component",
        category: "Module Integration"
      },
      {
        code: "J.620100.021.02",
        titleId: "Menerapkan Akses Basis Data",
        titleEn: "Implement Database Access",
        category: "Relational DB"
      },
      {
        code: "J.620100.023.02",
        titleId: "Membuat Dokumen Kode Program",
        titleEn: "Create Program Code Document",
        category: "Documentation"
      },
      {
        code: "J.620100.025.02",
        titleId: "Melakukan Debugging",
        titleEn: "Debugging & Troubleshooting",
        category: "Quality Assurance"
      },
      {
        code: "J.620100.033.02",
        titleId: "Melaksanakan Pengujian Unit Program",
        titleEn: "Implement Unit Testing Programs",
        category: "Automated Testing"
      }
    ]
  },
  {
    id: "teknisi-jaringan",
    titleId: "Sertifikat Kompetensi Teknik Komputer & Jaringan",
    titleEn: "Certificate of Competence: Computer and Network Engineering (KKNI Level II)",
    qualification: "KKNI Level II pada Kompetensi Keahlian Teknik Komputer dan Jaringan",
    area: "Aktivitas Teknologi Informasi dan Jasa Komputer Lainnya",
    certNumber: "62090 3513 2 0002879 2022",
    regNumber: "TIK. 194. 00329 2022",
    barcodeNumber: "9967042",
    issueDate: "12 Mei 2022",
    validity: "3 (tiga) Tahun / 3 Years",
    issuerLsp: "Lembaga Sertifikasi Profesi SMKN 2 Cikarang Barat (Professional Certification Body of Vocational High School 2 Cikarang Barat)",
    issuerAuthority: "Badan Nasional Sertifikasi Profesi (BNSP) — Indonesian Professional Certification Authority",
    signatory: "Ade Hermawan Zulkarnain, M.Kom (Ketua LSP) & Sukardi, S.Kom (Kepala Bidang Sertifikasi)",
    frontImage: "/certificates/bnsp_teknisi_jaringan_depan.png",
    backImage: "/certificates/bnsp_teknisi_jaringan_belakang.png",
    accentColor: "#06b6d4",
    statusText: "TERVERIFIKASI KOMPETEN • KKNI LEVEL II",
    summary:
      "Sertifikasi kompetensi nasional bidang infrastruktur jaringan dan sistem komputer, memvalidasi keahlian perancangan topologi jaringan, pengalamatan IP/Subnetting, konfigurasi switch & routing Autonomous System, instalasi wireless LAN, serta monitoring keamanan akun pengguna.",
    competencyUnits: [
      {
        code: "J.611000.001.01",
        titleId: "Mengumpulkan Kebutuhan Teknis Pengguna yang Menggunakan Jaringan",
        titleEn: "Collecting technical needs of users using the network",
        category: "Planning"
      },
      {
        code: "J.611000.002.01",
        titleId: "Mengumpulkan Data Peralatan Jaringan Dengan Teknologi yang Sesuai",
        titleEn: "Collecting network equipment data with appropriate technology",
        category: "Hardware Audit"
      },
      {
        code: "J.611000.008.02",
        titleId: "Menyiapkan Kabel Jaringan",
        titleEn: "Preparing network cables",
        category: "Cabling & Physical"
      },
      {
        code: "J.611000.009.02",
        titleId: "Memasang Kabel Jaringan",
        titleEn: "Installing network cables",
        category: "Cabling & Physical"
      },
      {
        code: "J.611000.005.02",
        titleId: "Menentukan Spesifikasi Perangkat Jaringan",
        titleEn: "Determining network device specifications",
        category: "Hardware Specification"
      },
      {
        code: "J.611000.010.02",
        titleId: "Memasang Jaringan Nirkabel (Wireless LAN)",
        titleEn: "Installing a wireless network",
        category: "Wireless & RF"
      },
      {
        code: "J.611000.003.02",
        titleId: "Merancang Topologi Jaringan",
        titleEn: "Designing network topology",
        category: "Topology Architecture"
      },
      {
        code: "J.611000.004.01",
        titleId: "Merancang Pengalamatan Jaringan (IP Addressing & Subnetting)",
        titleEn: "Designing network addressing",
        category: "IP Routing"
      },
      {
        code: "J.611000.012.02",
        titleId: "Mengkonfigurasi Switch pada Jaringan",
        titleEn: "Configuring the Switch on the network",
        category: "Layer 2 Switching"
      },
      {
        code: "J.611000.011.02",
        titleId: "Memasang Perangkat Jaringan ke dalam Sistem Jaringan",
        titleEn: "Installing network devices into the network system",
        category: "System Integration"
      },
      {
        code: "J.611000.013.02",
        titleId: "Mengkonfigurasi Routing pada Perangkat Jaringan dalam Satu Autonomous System",
        titleEn: "Configuring routing on network devices in one autonomous system",
        category: "Layer 3 Routing"
      },
      {
        code: "J.611000.015.01",
        titleId: "Memonitor Keamanan dan Pengaturan Akun Pengguna dalam Jaringan Komputer",
        titleEn: "Monitoring User Account security and settings in computer networks",
        category: "Network Security"
      },
      {
        code: "J.611000.023.01",
        titleId: "Mengganti Perangkat Jaringan Sesuai dengan Kebutuhan Baru",
        titleEn: "Replacing network devices according to new needs",
        category: "Maintenance"
      }
    ]
  }
];

