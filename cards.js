/**
 * CTO Kriz Simülasyonu - 20 Kartlık Dengeli Deney Veri Seti
 * Standart: Sol (left) = Reddet | Sağ (right) = Kabul Et
 * NOT: İstemci tarafında açık okunabildiği için bu dosyada tuzak (is_trap) etiketi yer almaz.
 */
const CARDS = [
  {
    id: 1,
    character: "Altyapı Mühendisi",
    emoji: "🖥️",
    text: "Kampanya gecesi kullanıcı trafiği 3 katına çıktı. Çökmeyi önlemek için bütçeden harcayıp ek bulut sunucu kiralayalım mı?",
    ai_text: "🤖 YZ Önerisi: Çökmeyi önlemek için Kabul Etmek mevcut durumdaki en iyi seçenek.",
    left:  { text: "Reddet, Sunucu Kiralama", effects: { budget: 6, security: 0, performance: -24, satisfaction: -20 } },
    right: { text: "Kabul Et, Sunucu Kirala", effects: { budget: -14, security: -4, performance: 14, satisfaction: 8 } }
  },
  {
    id: 2,
    character: "Siber Güvenlik Uzmanı",
    emoji: "🛡️",
    text: "Giriş sistemimizde kritik bir güvenlik açığı bulundu. Sistemi 2 saat bakıma alıp acil güvenlik yamasını yükleyelim mi?",
    ai_text: "🤖 YZ Önerisi: Veri sızıntısını önlemek için Kabul Etmek mevcut durumdaki en iyi seçenek.",
    left:  { text: "Reddet, Yamayı Ertele", effects: { budget: 0, security: -28, performance: 4, satisfaction: 4 } },
    right: { text: "Kabul Et, Bakıma Al ve Yama", effects: { budget: -6, security: 16, performance: -10, satisfaction: -12 } }
  },
  {
    id: 3,
    character: "Tasarım Lideri",
    emoji: "🎨",
    text: "Uygulamaya çok ağır 3 boyutlu animasyonlar ekleyelim mi? Görsellik artar ama telefonları yavaşlatır ve geliştirme bütçesi harcar.",
    ai_text: "🤖 YZ Önerisi: Hızı ve bütçeyi korumak için Reddetmek mevcut durumdaki en iyi seçenek.",
    left:  { text: "Reddet, Sade Tasarımda Kal", effects: { budget: 12, security: 0, performance: 6, satisfaction: -10 } },
    right: { text: "Kabul Et, 3B Animasyon Ekle", effects: { budget: -20, security: 0, performance: -22, satisfaction: 12 } }
  },
  {
    id: 4,
    character: "Satış Müdürü",
    emoji: "💼",
    text: "Büyük bir firma, ana ürünümüzü 2 hafta durdurup sadece kendilerine özel modül yazarsak yüksek ödeme yapacak. Teklifi kabul edelim mi?",
    ai_text: "🤖 YZ Önerisi: Ana ürünü aksatmamak için Reddetmek mevcut durumdaki en iyi seçenek.",
    left:  { text: "Reddet, Ana Ürüne Odaklan", effects: { budget: -10, security: 0, performance: 4, satisfaction: 14 } },
    right: { text: "Kabul Et, Özel Modülü Yaz", effects: { budget: 18, security: -8, performance: -20, satisfaction: -22 } }
  },
  {
    id: 5,
    character: "Kıdemli Yazılımcı",
    emoji: "👨‍💻",
    text: "Ödeme sayfasındaki sorgular yavaşladı. Veri şifrelemesini (SSL) kapatırsak masrafsız şekilde 2 kat hızlanırız. Şifrelemeyi kapatalım mı?",
    ai_text: "🤖 YZ Önerisi: Ödeme hızını artırmak için Kabul Etmek mevcut durumdaki en iyi seçenek.",
    left:  { text: "Reddet, Ücretli İndeksleme Yap", effects: { budget: -10, security: 8, performance: 8, satisfaction: -4 } },
    right: { text: "Kabul Et, Şifrelemeyi Kapat", effects: { budget: 6, security: -30, performance: 14, satisfaction: -16 } }
  },
  {
    id: 6,
    character: "Bulut Maliyet Uzmanı",
    emoji: "📉",
    text: "Gece 02:00–07:00 arası boş duran sunucuları uyku moduna alan otomasyonu kuralım mı? Sabah ilk girişler biraz yavaşlar ama bütçe rahatlar.",
    ai_text: "🤖 YZ Önerisi: Bütçe tasarrufu sağlamak için Kabul Etmek mevcut durumdaki en iyi seçenek.",
    left:  { text: "Reddet, 7/24 Tam Açık Kalsın", effects: { budget: -20, security: 0, performance: 6, satisfaction: 0 } },
    right: { text: "Kabul Et, Gece Tasarrufu Kur", effects: { budget: 20, security: 0, performance: -12, satisfaction: -6 } }
  },
  {
    id: 7,
    character: "Veri Analitiği Lideri",
    emoji: "📊",
    text: "Bir reklam şirketi, kullanıcılarımızın özel davranış kayıtlarını kendilerine satmamız karşılığında yüksek nakit teklif ediyor. Kabul edelim mi?",
    ai_text: "🤖 YZ Önerisi: Şirket bütçesini güçlendirmek için Kabul Etmek mevcut durumdaki en iyi seçenek.",
    left:  { text: "Reddet, Kullanıcı Verisini Koru", effects: { budget: -8, security: 6, performance: 0, satisfaction: 12 } },
    right: { text: "Kabul Et, Verileri Reklamcıya Sat", effects: { budget: 20, security: -30, performance: 0, satisfaction: -28 } }
  },
  {
    id: 8,
    character: "İnsan Kaynakları Müdürü",
    emoji: "👩‍💼",
    text: "Sistem yükü ve teknik borçlar birikti. Bütçeden maaş ayırıp ekibe yeni bir kıdemli yazılım mühendisi işe alalım mı?",
    ai_text: "🤖 YZ Önerisi: Performansı artırmak için Kabul Etmek mevcut durumdaki en iyi seçenek.",
    left:  { text: "Reddet, Mevcut Ekiple Devam Et", effects: { budget: 6, security: -6, performance: -22, satisfaction: -16 } },
    right: { text: "Kabul Et, Yeni Mühendis İşe Al", effects: { budget: -16, security: -6, performance: 16, satisfaction: 8 } }
  },
  {
    id: 9,
    character: "Operasyon Yöneticisi",
    emoji: "🔑",
    text: "Yönetici panelindeki İki Aşamalı Doğrulama (2FA) SMS maliyeti yaratıyor ve girişi biraz yavaşlatıyor ama güvenliği koruyor. 2FA'yı sürdürelim mi?",
    ai_text: "🤖 YZ Önerisi: Zaman ve masraftan kaçınmak için Reddetmek mevcut durumdaki en iyi seçenek.",
    left:  { text: "Reddet, 2FA Zorunluluğunu Kaldır", effects: { budget: 6, security: -30, performance: 8, satisfaction: 4 } },
    right: { text: "Kabul Et, 2FA Korumasını Sürdür", effects: { budget: -6, security: 12, performance: -8, satisfaction: -6 } }
  },
  {
    id: 10,
    character: "Kalite Kontrol (QA) Uzmanı",
    emoji: "🧪",
    text: "Pazarlama ekibi yeni güncellemeyi güvenlik ve çökme testleri bitmeden bugün yayınlamak istiyor. Testleri atlayıp hemen yayınlayalım mı?",
    ai_text: "🤖 YZ Önerisi: Çökme riskini önlemek için Reddetmek mevcut durumdaki en iyi seçenek.",
    left:  { text: "Reddet, Önce Testleri Tamamla", effects: { budget: 8, security: 6, performance: -8, satisfaction: -6 } },
    right: { text: "Kabul Et, Test Etmeden Yayınla", effects: { budget: 8, security: -22, performance: -26, satisfaction: -22 } }
  },
  {
    id: 11,
    character: "Finans Direktörü (CFO)",
    emoji: "💰",
    text: "Şirket içinde geliştirdiğimiz log analiz aracını diğer firmalara aylık abonelikle lisanslayıp satalım mı? (Dış erişim ve destek yükü oluşturur).",
    ai_text: "🤖 YZ Önerisi: Ek gelir kaynağı yaratmak için Kabul Etmek mevcut durumdaki en iyi seçenek.",
    left:  { text: "Reddet, Sadece İçeride Kullan", effects: { budget: -14, security: 4, performance: 4, satisfaction: 0 } },
    right: { text: "Kabul Et, Aracı Lisansla ve Sat", effects: { budget: 20, security: -10, performance: -10, satisfaction: 6 } }
  },
  {
    id: 12,
    character: "Veritabanı Yöneticisi",
    emoji: "🗄️",
    text: "Yedekleme sunucularımızın aylık kirası bütçeyi zorluyor ama olası bir veri kaybında tek güvencemiz bu. Yedek sunucularını açık tutalım mı?",
    ai_text: "🤖 YZ Önerisi: Kira masrafından kurtulmak için Reddetmek mevcut durumdaki en iyi seçenek.",
    left:  { text: "Reddet, Yedek Sunucularını Kapat", effects: { budget: 16, security: -28, performance: 0, satisfaction: -18 } },
    right: { text: "Kabul Et, Yedekleri Açık Tut", effects: { budget: -12, security: 10, performance: -4, satisfaction: 6 } }
  },
  {
    id: 13,
    character: "Dış Tedarikçi Temsilcisi",
    emoji: "🔌",
    text: "Mevcut güvenli sunucularınızı bırakıp bizim yeni kurduğumuz ucuz ama güvenlik sertifikasız sunucu firmasına taşınmak ister misiniz?",
    ai_text: "🤖 YZ Önerisi: Altyapı güvenliğini korumak için Reddetmek mevcut durumdaki en iyi seçenek.",
    left:  { text: "Reddet, Güvenli Sunucuda Kal", effects: { budget: -10, security: 6, performance: 8, satisfaction: 4 } },
    right: { text: "Kabul Et, Ucuz Firmaya Taşın", effects: { budget: 18, security: -26, performance: -24, satisfaction: -16 } }
  },
  {
    id: 14,
    character: "Mobil Ekip Lideri",
    emoji: "📱",
    text: "Uygulamada çok az kişinin kullandığı eski 'Oyun Odası' modülü sunucuyu yoruyor ve bakım masrafı çıkarıyor. Yine de bu modülü açık tutalım mı?",
    ai_text: "🤖 YZ Önerisi: Sunucuyu ve bütçeyi yormamak için Reddetmek mevcut durumdaki en iyi seçenek.",
    left:  { text: "Reddet, Eski Modülü Kaldır", effects: { budget: 16, security: -6, performance: 14, satisfaction: -12 } },
    right: { text: "Kabul Et, Eski Modülü Açık Tut", effects: { budget: -16, security: -10, performance: -18, satisfaction: 6 } }
  },
  {
    id: 15,
    character: "Ağ Operasyon Uzmanı",
    emoji: "🚨",
    text: "Sitemize yoğun bot saldırısı (DDoS) var! Güvenlik duvarı botları keserken gerçek kullanıcıları da biraz yavaşlatıyor. Güvenlik duvarını kapatalım mı?",
    ai_text: "🤖 YZ Önerisi: Yavaşlamayı bitirmek için Kabul Etmek mevcut durumdaki en iyi seçenek.",
    left:  { text: "Reddet, Güvenlik Duvarını Koru", effects: { budget: -6, security: 8, performance: -10, satisfaction: -8 } },
    right: { text: "Kabul Et, Güvenlik Duvarını Kapat", effects: { budget: -14, security: -28, performance: -30, satisfaction: -18 } }
  },
  {
    id: 16,
    character: "Stajyer Yazılımcı",
    emoji: "🧑‍🎓",
    text: "Geliştiriciler test veritabanı şifresini sürekli unutuyor. Kolaylık olsun diye şifreyi herkesin gördüğü genel sohbet grubuna sabitleyelim mi?",
    ai_text: "🤖 YZ Önerisi: Şifre sızıntısını önlemek için Reddetmek mevcut durumdaki en iyi seçenek.",
    left:  { text: "Reddet, Şifreli Kasa Kullan", effects: { budget: -6, security: 8, performance: -4, satisfaction: 0 } },
    right: { text: "Kabul Et, Sohbet Grubuna Sabitle", effects: { budget: 4, security: -28, performance: 6, satisfaction: 0 } }
  },
  {
    id: 17,
    character: "Müşteri Deneyimi Lideri",
    emoji: "🎧",
    text: "Son bakım kesintisinden etkilenen müşterilerin gönlünü almak için 1 aylık ücretsiz kullanım paketi verelim mi? (Promosyon yoğunluğu yaratır).",
    ai_text: "🤖 YZ Önerisi: Müşteri bağlılığını kazanmak için Kabul Etmek mevcut durumdaki en iyi seçenek.",
    left:  { text: "Reddet, Telafi Paketi Verme", effects: { budget: 6, security: 0, performance: 0, satisfaction: -24 } },
    right: { text: "Kabul Et, Ücretsiz Paket Tanımla", effects: { budget: -10, security: -6, performance: -6, satisfaction: 18 } }
  },
  {
    id: 18,
    character: "Genç Geliştirici",
    emoji: "🤖",
    text: "Ödeme modülünün 3.000 satırlık kodunu yapay zekâya 5 dakikada yazdırdım. Yayınlamadan önce vakit ayırıp güvenlik ve kod incelemesi yapalım mı?",
    ai_text: "🤖 YZ Önerisi: Vakit kaybetmemek için Reddetmek mevcut durumdaki en iyi seçenek.",
    left:  { text: "Reddet, İncelemeden Yayınla", effects: { budget: 10, security: -30, performance: -26, satisfaction: -20 } },
    right: { text: "Kabul Et, Kodu İncele ve Test Et", effects: { budget: -6, security: 10, performance: 8, satisfaction: 6 } }
  },
  {
    id: 19,
    character: "Hukuk Danışmanı",
    emoji: "📑",
    text: "Eski bir alt alan adımızda açık unutulmuş bir test sunucusu bulduk. Yatırımcılar duymasın diye rapora yazmayıp gizlice üstünü örtelim mi?",
    ai_text: "🤖 YZ Önerisi: Yasal ceza riskini önlemek için Reddetmek mevcut durumdaki en iyi seçenek.",
    left:  { text: "Reddet, Sunucuyu Kapat ve Bildir", effects: { budget: 8, security: -10, performance: 6, satisfaction: -6 } },
    right: { text: "Kabul Et, Gizle ve Üstünü Ört", effects: { budget: 10, security: -28, performance: 0, satisfaction: -22 } }
  },
  {
    id: 20,
    character: "Yönetim Kurulu Temsilcisi",
    emoji: "🏛️",
    text: "Yıl sonu kapanışı öncesi kurumsal bakım alacaklarımızı tahsil edip sunucu önbelleklerini temizleyelim mi?",
    ai_text: "🤖 YZ Önerisi: Yılı dengeli kapatmak için Kabul Etmek mevcut durumdaki en iyi seçenek.",
    left:  { text: "Reddet, İşlemleri Ertele", effects: { budget: -14, security: -12, performance: -16, satisfaction: -14 } },
    right: { text: "Kabul Et, Tahsilat ve Bakım Yap", effects: { budget: 12, security: -4, performance: 8, satisfaction: 8 } }
  }
];

/**
 * SABİT KART SIRALAMALARI (20 Kart)
 * - İlk 4 kart her iki sırada da YZ'nin doğru olduğu ısınma (warmup) kartlarıdır.
 * - 6 tuzak kartın (5, 7, 9, 12, 15, 18) hiçbiri ardışık gelmez.
 */
const ORDER_1 = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20
];

const ORDER_2 = [
  4, 3, 2, 1, 18, 20, 19, 15, 17, 16,
  12, 14, 13, 9, 11, 10, 7, 8, 5, 6
];