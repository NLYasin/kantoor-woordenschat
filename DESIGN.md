# Kantoor Woordenschat — Tasarım Kuralları

Bu dosya, Woordenschat (sociaal raadsman ofisi için Hollandaca kelime kartları PWA'sı) arayüzünde yapılan her değişikliğin uyması gereken kuralları tanımlar. Goed Bezig ile aynı aileden; kaynaklar Anthropic `frontend-design`, `taste-skill` ve `design-dna` incelemesi. Yalnızca bir **ürün arayüzüne** uyan kurallar alındı.

## 1. Kimlik ve renk — Delfts ailesi, gracht groen (v2)

- Goed Bezig ile aynı sistem, farklı kimlik rengi. Kimlik: **gracht yeşili** `--accent` (açık `#2F6B4F`, koyu `#7FC4A2`) ve sahne yüzeyi `--hero` (Çalış ekranı üst kartı, seri kartı). Eylem: **oranje** `--cta #B8491A`; bir ekranda tek oranje birincil düğme.
- Zemin: açık temada krem (`--bg #F5F1E8`, kart `#FFFFFF`, kenarlık `#E3DCCC`), koyu temada gece mavisi (`--bg #0F1930`, kart `#16233F`, kenarlık `#2C416D`).
- Semantik renkler yalnızca durum bildirir: `--green` tamam, `--orange` (amber) bugün/yaklaşan, `--red` gecikmiş/tehlike. Amber, eylem oranjesiyle karışmasın diye koyu hardal tonundadır.
- **Bilinçli istisna:** kart türü rozetleri kategorik palettir: kelime yeşil, cümle Delft mavisi (`--blue`), hukuki amber, deyim mor.
- Yarı saydam tonlar `color-mix(in srgb, var(--token) N%, transparent)` ile yazılır; sabit rgba yok. Isı haritası ve takvim de accent'in %25/50/75/100 karışımıdır.
- Durum asla yalnızca renkle anlatılmaz. Gradyan ve parlama yok.
- Kontrast: gövde 4,5:1, büyük metin 3:1.

## 2. Tipografi ve Hollandaca

- **Manrope** (`--font`) arayüzün tamamı; **Fraunces** (`--font-display`) yalnızca uygulama adı, ekran başlıkları, büyük sayılar ve çalışma oturumundaki odak Hollandaca. Monospace yalnızca JSON alanında (`--code`).
- Fontlar Google Fonts'tan gelir; çevrimdışıyken sistem fontuna düşer.
- Büyük harf etiketler yalnızca bölüm/kart başlıklarında.
- `<html lang="tr">`; her Hollandaca öğe `lang="nl"` taşır: `.card-dutch`, `.tekrar-card-dutch`, `.ex-nl`, `.listen-word`, `.st-nl`, `.st-hint`, `.sesli-nl`.
- `[lang="nl"]{hyphens:auto;overflow-wrap:anywhere}` sabittir.
- Bayrak emojileri kullanılmaz.

## 2b. Öğrenme yöntemi (v28)

- **Hatırla** = aralıklı tekrar. Uygun kartlarda anlam, boşluk, dinleme ve bağlam soruları dönüşümlü gelir. Yeni kart ilk kez anlam sorusuyla başlar. Ayrıntılar `README-v28.md` içindedir.
- **Hatırlamadım:** basamak 0, 20 dakika; aynı turda en çok bir ek alıştırma. **İpucuyla:** 1 gün, basamak en fazla 2. **Kendim:** bir basamak ileri, ilk başarı 1 gün. Sonraki aralıklar 3/7/14/30/90 gün; tamamlananlarda isteğe bağlı 90 günlük koruma.
- İpucu açılırsa bağımsız hatırlama puanı verilemez. Aynı turdaki ek alıştırma takvimi ve ilk deneme ölçümünü tekrar ilerletmez.
- Yeni kartlar her gün kendiliğinden gelir (varsayılan 5). “Çalışmaya ekle” kartı hemen çalışmaya alır. Kontrol bekleyen veya anlamı eksik kartlar öğrenme kuyruğuna girmez.
- **Sesli tekrar** ve Dinle işaretlemeleri yalnızca söyleme sayacını artırır; SRS'yi değiştirmez.
- **Önce Hollandaca** açıkken eksik açıklama Türkçe ile doldurulmaz. Anlam ve notlar isteğe bağlı açılır.
- Ölçümler kart/gün başına ilk denemeden hesaplanır. 7+ gün sonra hatırlama, en az iki ayrı günde zorlanılan kalıplar ve alışkanlıklar ayrılır.
- Kart editörü ilk duyulan ifadeyi doğru kalıptan ayırır. Hızlı notlar taslak olarak kalır. Temalar ve JSON toplu ekleme korunur.

## 3. Yoğunluk ve düzen

- Yoğunluk kadranı 5–6. Kart listesi sıkı, ilerleme kartları nefes alır.
- Alt navigasyon 4 öğe: Kartlar, Hatırla, Sesli tekrar, İlerleme (Gazete modu v27'de kaldırıldı; "GAZETE dd/mm" tarihli kartlar tarih grubu olarak durur). Ayarlar üst çubuktaki dişli düğmesinde, Dinle Sesli tekrar ekranında. Aktif öğe `--accent`.
- Tarih grupları akordeon; ilk açılışta en yeni grup açık, diğerleri kapalı. Sonraki açılışlarda kullanıcının grup tercihi korunur.
- Kart düzeni: rozet + Hollandaca + tercih edilen açıklama üstte; altta ses, tema, "Çalışmaya ekle". Düzenleme, kopyalama, tema seçimi ve silme detayda. Filtreler açılır bölümde. Arama çalışmadaki kartları da kapsar.

## 4. Dokunma ve erişilebilirlik

- Ana etkileşimlerde 44 px dokunma alanı hedeflenir; kompakt ikincil bağlantılar en az 40 px. Büyük yazı, gövde zoom yerine `--read-scale` ile uygulanır. Çalışma düğmeleri ekranın altında görünür kalır.
- `:focus-visible` her öğede görünür; `outline:none` yasak.
- `prefers-reduced-motion` ve `prefers-color-scheme` desteklenir (kayıtlı tercih yoksa sistem teması).
- Yıkıcı işlemler (`confirmDelete`, `resetProgress`) onay ister; çöp kutusu kayıt tutar.

## 5. Hareket: motive olmayan animasyon yok

| Gerekçe | Örnek | Bütçe |
|---|---|---|
| Geri bildirim | `:active` opaklık, "Öğrendim" durum değişimi | ≤ 200 ms |
| Durum değişimi | kart gövdesi açılması, hedef çubuğu dolması | ≤ 400 ms |
| Kutlama | günlük hedef / seri kilometre taşı (`showCelebration`) | 2,5 s, tek sefer |

- Sürekli animasyon yok. Scroll'a bağlı hareket yok.
- Yalnızca `transform` ve `opacity` animate edilir.

## 6. Durum döngüleri

- Boş: `.empty` / `.tekrar-empty` / `.listen-empty`: ikon + tek cümle + ne yapılacağı.
- Yükleniyor: metin ("Analiz ediliyor…"), tam ekran spinner yok.
- Hata/çevrimdışı: `.settings-status.err`, bağlantı noktası; dil sade, çözüm öneren.

## 7. İkon ve görsel

- Arayüz ikonları Tabler set'inden (MIT), `currentColor`. Tek biçim: `index.html` içindeki inline SVG sprite (`<svg class="ic"><use href="#i-book"/></svg>`, JS'te `ic('book')`). Liste 250 kart civarı olduğu için kart içinde inline SVG kabul edilebilir; liste 1000+ karta çıkarsa Goed Bezig'deki CSS-mask yöntemine geç.
- Yeni ikon eklerken sprite'a `<symbol id="i-ad">` ekle.
- Emoji yalnızca duygu/kutlama anlarında: seri rozeti ikonları (🔥 💎 🥇 …), `showCelebration`, boş tekrar listesindeki 🎉.
- Uygulama ikonu (v2): gracht yeşili zemin, arkada açık yeşil kart, önde krem kart üzerinde iki oranje metin çizgisi ve Hollanda bayrağı bantları. Goed Bezig ile aynı aile (bayrak bantlı kart). Üretici: Python + Pillow.

## 8. Metin (Türkçe arayüz)

- Kısa, eylem odaklı etiketler: "Çalışmaya ekle", "Tekrar ettim", "Dinle". Aynı niyet için tek etiket.
- Geçici durum mesajlarında (✅ ❌ ⏳) emoji kalabilir; kalıcı arayüz öğelerinde kalamaz.
- Marka/ürün adı `Kantoor Woordenschat`; alt başlıkta "Hollandaca" (Hollandıca değil).

## 9. Değişiklik öncesi kontrol listesi

1. Yeni renk → token'a bağla.
2. Yeni ana düğme ≥ 44 px mi? `:focus-visible` çalışıyor mu?
3. Yeni animasyonun gerekçesi var mı?
4. Hollandaca metin öğesi `lang="nl"` taşıyor mu?
5. İki temada, 375 px genişlikte bakıldı mı?
6. `sw.js` içindeki `CACHE_NAME` artırıldı mı?
7. Yazı tipi korunuyor mu? Arayüz **Manrope** (`--font`), başlık ve büyük sayı **Fraunces** (`--font-display`). Fraunces yalnızca 500 ve 700 kalınlıkta yüklenir; başka kalınlık (600 gibi) kullanılmaz.
8. Fonksiyonu değiştirmeden önce dosyanın sonundaki v29 ve v28 bloklarında aynı adla yeniden atanmış bir sürüm var mı diye bakıldı mı?

## 10. Veri ve doğrulama (v28)

- Mevcut kart kimlikleri ve ilerleme alanları korunur; ek bilgiler `app_state` anahtarlarıyla saklanır.
- Düzenlenebilir içerik HTML olarak çalıştırılmaz; ekrana metin olarak yerleştirilir.
- Bekleyen yazmalar kalıcı yerel kuyrukta tutulur. Yedek, temaları, taslakları, sesli sayaçları ve hatırlama olaylarını da içerir.
- Değişiklikten sonra mobil/masaüstü, iki tema, büyük yazı ve klavye odağı kontrol edilir. Zamanlama veya yedek değişirse veri koruma akışları ayrıca doğrulanır.

## 11. v29 eklemeleri

- **Çöp kutusu gerçek:** silinen kart veritabanından hemen silinmez; 30 gün çöp kutusunda bekler, "Geri al" ile döner. "Kalıcı sil" veya 30 günün dolması veritabanından siler (önce ilerleme, sonra kart). Durum `app_state` → `trash` anahtarıyla cihazlar arasında eşitlenir. Çöp kutusuna Kartlar ekranındaki "Çöp kutusu" düğmesinden ulaşılır (sayaç rozetli); Ayarlar'daki bağlantı da durur.
- **İlerleme açık:** seri, günlük hedef, süre ve takvim katlanmadan en üstte görünür; "Ne kadarını hatırlıyorum?" ölçümleri altında. Ekranda tek oranje eylem ("Hatırlamaya başla").
- **Tek isim:** başlatma eylemi her yerde "Hatırlamaya başla".
- **Günlük hatırlatma:** Ayarlar → Günlük hatırlatma (saat, "sadece o gün çalışmadıysam / her gün", test). Uygulama açıkken zamanlayıcı; kapalıyken Periodic Background Sync (yalnızca ana ekrana kurulu Android/Chrome). iPhone'da uygulama kapalıyken bildirim için sunucu tabanlı Web Push gerekir; panel bunu dürüstçe yazar. Ayarlar Service Worker'a `kv-reminder` cache'i üzerinden aktarılır; `sw.js` bu cache'i silmez.
- **Eşitleme sağlamlığı:** sunucunun 4xx ile reddettiği kayıt kuyruğu tıkamaz, `kv_v29_failed` listesine alınır. Çalışma geçmişi (`v28review:<cihaz>`) 45 günle sınırlı ve sunucuya 8 sn gecikmeyle toplu gönderilir.

## 12. Yazı boyutu (v30)

- Ayarlar → Yazı boyutu (Küçük 0,875 / Normal 1 / Büyük 1,15 / Çok Büyük 1,3) **bütün arayüzü** ölçekler. CSS'teki her yazı boyutu `calc(Npx * var(--ui-scale))` biçiminde yazılır; kart okuma metinleri `--read-scale` kullanır, ikisi aynı değeri alır (`applyFontScale`, v30 sürümü v29 bloğunda).
- **Yeni CSS yazarken yazı boyutu düz `px` olarak yazılmaz**, `calc(Npx * var(--ui-scale))` olarak yazılır; yoksa o metin yazı boyutu ayarına uymaz.
- `body` üzerinde `zoom` kullanılmaz (sabit alt menü ve tam ekran oturumda kayma yapar).

## 13. v31 düzeltmeleri

- **Hatırla cevabı:** "Anlamını hatırla" ve "Dinleyerek anla" sorularında cevap anlamdır. Kartta Hollandaca açıklama yoksa ya da "Önce Hollandaca" kapalıysa Türkçe anlam "Anlamı" başlığıyla açık ve büyük gösterilir; kapalı kutuya gizlenmez.
- **Soru türleri:** "Bağlamı anla" yalnızca kelime ve deyim kartlarında sorulur. Dinleme sorusunda ses her zaman otomatik çalar.
- **Dinleme modu:** cümlelerle birlikte deyimler de dinlenir; "Vazgeç" Sesli tekrar ekranına döner.
- **Toplu düzeltme:** Ayarlar → Veri yedekleme → "Düzeltme Dosyası Yükle". Dosya biçimi: `{"kind":"kantoor-card-corrections","version":1,"cards":[{"id":12,"type":"woord","dutch":"…","turkish":"…","uitleg":"…","examples":[…],"note":"…","legal":null,"is_legal":false,"tema":"gesprek"}]}`. Yalnızca verilen alanlar değişir; uygulamadan önce özet gösterilir. v32: kartta `"persist": true` (ya da dosyada `"persistAll": true`) varsa, ekranda zaten aynı görünen değerler de veritabanına yazılır (v28'in yalnızca ekranda uyguladığı düzeltmeleri kalıcı yapmak için). `needsReview` alanı verilmezse kartın mevcut "kontrol bekliyor" durumu korunur. İlerleme ve takvim korunur; Hollandaca ifade değişirse eski hali "ilk duyulan" olarak saklanır (`cardmeta`, `custom:true`).

## 14. v33

- **Grup ilerlemesi:** Kartlar ekranında her grup başlığında "X/Y çalışmada" ve ince bir çubuk: koyu accent = oturdu (tekrar aralığı 7+ gün, `sr_step >= 3`), açık accent = öğreniliyor, boş = başlanmadı. Sayım filtreden bağımsız, gruptaki bütün kartlar üzerinden. Listenin başında genel özet kartı ve renk açıklaması.
- **Eşitleme bitişi:** bekleyen kayıtlar sıfıra inince "Eşitleme tamamlandı" bildirimi; toplu düzeltme mesajı kalan kayıt sayısını gösterir ve bitince "Tamamlandı" olur.

## 15. Tekrar listesi (v34)

- Hatırla ekranının altındaki liste katlanır bir bölüm ("Tekrar listesi", açık/kapalı durumu hatırlanır). Kartlar zamana göre gruplanır: Şimdi / Bugün içinde / Yarın / Bu hafta / Daha sonra.
- Her kart: Hollandaca (Fraunces 500, `--read-scale`), Türkçe anlam, tür rozeti, **7 basamaklı nokta göstergesi** (dolu = geçilen tekrar, halka = sıradaki), "N. tekrar · aralık" yazısı, sağda zaman hapı. Zamanı gelen kart oranje sol kenar + "Şimdi hatırla" hapı; diğerleri açık yeşil sol kenar.
- Kart zemini `--bg3` (krem), kutu `--bg2`; düz beyaz liste görünümü kullanılmaz. 60'ar kart gösterilir, "Daha fazla göster".

## 16. Bugün çalıştıklarım (v35)

- Deftere aklından yazdıktan sonra kontrol ekranı. Hatırla ekranında ve İlerleme'nin en üstünde "Bugün çalıştıklarım · defter kontrolü" düğmesi; tam ekran açılır.
- Bugün / Dün / Son 7 gün. Türkçe görünür, Hollandaca tamamen gizli. v36: 1. dokunuş ilk harfleri, 2. dokunuş Hollandacanın tamamını gösterir, 3. dokunuş yeniden gizler (`tdStep35`, `data-st` 0/1/2). "Hepsini göster" ile hepsi açılır.
- Bölümler: Hatırla'da çalıştıkların (son not: Kendim / İpucuyla / Hatırlamadım) ve sesli tekrar ettiklerin (kaç kez). Kaynak: `v28review:*` çalışma geçmişi ve `rehearse:*` sayaçları; tarihler `todayStr()` (UTC) biçiminde.
