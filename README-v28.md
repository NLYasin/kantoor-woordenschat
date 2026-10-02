# Kantoor Woordenschat v28

Tasarım ve öğrenme akışı güncellemesi · 2 Ekim 2026

## Mevcut uygulamaya yükleme

1. Mevcut uygulamada Ayarlar → Dışa aktar ile bir yedek indir.
2. Bu ZIP'i aç. İçindeki `index.html`, `sw.js`, `manifest.json`, ikonlar ve belgeleri mevcut GitHub projenin kök klasörüne, aynı adlı dosyaların üzerine koy.
3. Değişiklikleri kaydet/commit et. Mevcut GitHub → Vercel bağlantın yayını günceller.
4. Yayın tamamlanınca uygulamayı yeniden aç. Alt menüde **Hatırla** ve **Sesli tekrar**, Kartlar ekranında **+ Kelime ekle** görünmeli. Eski ekran görünüyorsa sayfayı yenile veya uygulamayı kapatıp aç.

Yeni bir veritabanı veya SQL değişikliği gerekmiyor. Mevcut `cards`, `progress` ve `app_state` tabloları kullanılıyor. Kart kimlikleri ve mevcut tekrar tarihleri yükleme sırasında topluca değiştirilmez. Yeni zamanlama kuralları sonraki değerlendirmede uygulanır. Paket hazırlanırken canlı veritabanına yazılmadı; yayınlama yapılmadı.

## Neler değişti?

- **Daha sade kart listesi:** filtreler ve gruplama açılır bölümde; ilk açılışta en yeni grup açık. Açtığın gruplar hatırlanır. Arama, çalışmaya aldığın kartları da bulur. Masaüstünde iki sütun, telefonda tek sütun kullanılır.
- **Hızlı not ve kart düzenleme:** duyduğun ifadeyi taslak kaydet; sonra doğru kalıbı, anlamı, Hollandaca açıklamayı ve örnekleri tamamla. Mevcut kartları detayındaki “Düzenle” düğmesiyle değiştirebilirsin. Kontrol bekleyen ifadeler otomatik çalışmaya girmez.
- **Dil içeriği:** ilk 183 kartın tamamına kısa Hollandaca açıklama eklendi. Belirgin dil hataları düzeltildi; ilk duyulan ifade ayrıca gösterilir. Belirsiz 7 ifade kontrol bekliyor olarak işaretlendi. Bu işaret, kartın editöründen kaldırılabilir. Daha önce kendin düzenlediğin alanlar, eski metinle aynı değilse otomatik düzeltmeyle değiştirilmez.
- **Önce Hollandaca:** açıklama yoksa Türkçe kendiliğinden ön yüze çıkmaz. Türkçe anlam ve notları istediğinde açarsın.
- **Hatırla:** anlam, boşluk doldurma, dinleme ve bağlam soruları, kartta uygun içerik bulunduğunda dönüşümlü gelir. Yeni kartın ilk sorusu anlam çalışmasıdır. İstersen editörde özel boşluk/bağlam sorusu ekleyebilirsin. Karışık alıştırmalar Ayarlar'dan kapatılabilir.
- **İpucunu ayıran değerlendirme:** ipucu açıldıysa “Kendim” seçilemez. “Hatırlamadım” 20 dakika sonrasına planlanır ve aynı turda yeniden sorulur. Aynı turdaki ek alıştırma, tekrar takvimini tekrar ilerletmez.
- **Tutarlı aralıklar:** yeni kartı ilk kez kendi başına hatırladığında sonraki tekrar 1 gün sonradır; kartı elle çalışmaya eklemek bunu değiştirmez. Sonraki başarılı aralıklar 3, 7, 14, 30 ve 90 gündür. İpucuyla bulunan cevap 1 gün sonrasına alınır. Tamamlanan kartların 90 günlük koruma tekrarı Ayarlar'dan kapatılabilir.
- **Sesli tekrar:** hem bu sekmedeki hem Dinle ekranındaki işaretlemeler yalnızca sesli tekrar sayacını artırır. Hatırlama takvimini ilerletmez.
- **İlerleme:** her kartın günlük ilk denemesi, ipucusuz hatırlama, en az 7 gün sonra hatırlama ve ayrı günlerde tekrar zorlanılan kalıplar gösterilir. Aynı gün art arda tekrar ederek oran yükselmez. Seri, süre ve takvim açılır bölümde durur. Yeni ölçümler v28'den sonraki çalışmalarda oluşur.
- **Erişilebilirlik:** büyük yazıda cevap düğmeleri görünür kalır; uzun cevap kartın içinde kayar. Çalışma ekranında klavye odağı tutulur. Açık/koyu tema korunur.
- **Yedek:** kartlar, ilerleme, temalar, taslaklar, yeni hatırlama kayıtları, sesli tekrar sayaçları ve tercihler birlikte dışa aktarılır. Geri yükleme kart kimliklerini eşler; aynı yedeği tekrar yüklemek kartları ve sayaçları çoğaltmaz.
- **Çevrimdışı kayıt:** mevcut kart düzenlemeleri, taslaklar ve çalışma sonuçları cihazda bekletilip bağlantı geldiğinde eşitlenir. Yeni bir kartın veritabanına eklenmesi bağlantı ister; bağlantı yokken taslak kaydedebilirsin.
- **Konuşmaya taşıma:** kart detayındaki “Konuşma için kopyala”, kalıbı ve anlamını panoya alır. Goed Bezig'e otomatik aktarım yapılmaz; oraya yapıştırabilirsin.

## İlk kullanım

**Kartlar → + Kelime ekle:** sadece duyduğun ifadeyi yazarak not al. “Tamamlanacak notlar” bölümünden sonradan tamamla.

**Hatırla → Hatırlamaya başla:** cevabı görmeden düşün veya sesli söyle. Gerekiyorsa ipucunu aç. Cevabı kontrol ettikten sonra sana uyan değerlendirmeyi seç.

**Sesli tekrar:** cümleyi söyleyip “Tekrar ettim”e dokun. Bu sayaç, cümleyi bağımsız hatırladığının kanıtı olarak kullanılmaz.

## Teknik devam notları

- Çalıştırmak için derleme veya npm kurulumu gerekmez. Uygulama statik HTML/CSS/JavaScript'tir.
- Arayüz ve kod `index.html` içindedir. v28 CSS ve JavaScript bölümleri mevcut yapıya eklenmiştir; başlatma `initV28()` üzerinden yapılır.
- `V28_CONTENT`: ilk 183 kart için eski/yeni içerik eşlemesi. `enrich28()` açıklamaları ve uygun düzeltmeleri karta uygular. Editörde kaydetmek, kartın güncel alanlarını `cards` tablosuna yazar.
- `app_state` ekleri: `cardmeta:<id>` (ilk ifade, kontrol durumu, özel alıştırma), `draft:<cihaz>:<id>`, `v28review:<cihaz>`, `newbaseline:<cihaz>` ve `review_reset_at`. Şema değişmez.
- `kv_v28_outbox`: bekleyen yazma işlemleri. `kv_v28_rows`: ek durumların yerel kopyası. Cihazdaki bu kayıtları silmek, henüz eşitlenmemiş değişiklikleri kaybettirir.
- `question28`, `studyNext`, `stGrade`: soru türleri ve zamanlama. `learning28`: ilk denemeye dayanan ölçümler. `backup28` / `restoreBackup28`: yedek akışı.
- Cihazın yerel takvim günü günlük sayaçlarda kullanılır. Tarih/saat alanları saklanırken ISO biçimi korunur.
- Service worker önbelleği: `woordenschat-v28`. Sonraki sürümde artırılmalı.
- Mevcut TTS Worker ve Web Speech yedeği korunmuştur.

## Doğrulama kapsamı

Chromium'da 375 × 812 telefon ve 1280 × 900 masaüstü görünümleri, açık/koyu tema ve %130 okuma yazısı kontrol edildi. JavaScript sözdizimi kontrolünden geçti.

Tarayıcı kontrolleri test verileriyle yapıldı: içerik düzeltmeleri, dört soru türü, ipucu değerlendirmesi, dinleme/hatırlama ayrımı, taslak ve editör, çevrimdışı kayıt/eşitleme, ilerleme ölçümleri, klavye odağı, mevcut ve boş veritabanına yedek geri yükleme, farklı kart kimlikleri, tekrarlı içe aktarma ve ilerlemeyi sıfırlama.

Gerçek Supabase ve ses servisine bağlanılmadı. iPhone/Safari ve canlı Vercel yayını bu ortamda test edilmedi.
