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

## 2b. Öğrenme yöntemi (v2)

- **Çalış** = aralıklı tekrar, hatırlamayı test ederek. Kart önce yalnızca Hollandaca gelir; "Cevabı göster" ile anlam, açıklama ve örnekler açılır. Not: **Bilmedim** (başa, 20 dk; aynı turda 4 kart sonra bir daha), **Zor** (aynı basamak, yarım aralık), **Bildim** (bir basamak ileri; yeni kart ilk seferde bilindiyse 3 gün). Mevcut `sr_step` / `sr_next_due` alanları kullanılır.
- Yeni kartlar her gün kendiliğinden gelir (varsayılan 5, Ayarlar'dan 0–20), en eski karttan başlayarak. "Çalışmaya ekle" bir kartı hemen o günün çalışmasına sokar.
- İpucu: kelime kartında ilk örnek cümle (kelime işaretli), cümle kartında Hollandaca açıklama.
- **Tekrar** = sesli tekrar, çalışma takviminden bağımsız. "Tekrar ettim" yalnızca o cümleyi kaç kez sesli söylediğini sayar (`rehearse:<cihaz>`, app_state). Dinleme modu bu ekrandan açılır.
- **Tema**: tarihe ek gruplama. Kaynak sırası: elle seçilen (`tema_map`, app_state) → JSON'daki `tema` → ilk 183 kart için hazır eşleme → anahtar kelime tahmini. Temalar: gesprek, overleg, schulden, wonen, inkomen, zorg, recht, gemeente, taal.
- Yeni kart JSON'u Ayarlar'daki "Claude talimatını kopyala" ile istenir: kelime kartının ön yüzü tek kelime değil kalıp (`bezwaar maken tegen`, `de beschikking`).

## 3. Yoğunluk ve düzen

- Yoğunluk kadranı 5–6. Kart listesi sıkı, ilerleme kartları nefes alır.
- Alt navigasyon 4 öğe: Kartlar, Çalış, Tekrar, İlerleme (Gazete modu v27'de kaldırıldı; "GAZETE dd/mm" tarihli kartlar tarih grubu olarak durur). Ayarlar üst çubuktaki dişli düğmesinde, Dinle Tekrar ekranında. Aktif öğe `--accent`.
- Tarih grupları akordeon; ilk render'da en yeni grup açık, diğerleri kapalı.
- Kart düzeni: rozet + Hollandaca + Türkçe üstte; altta tek satır: ses, tema, "Çalışmaya ekle". Tema seçimi ve "Kartı sil" kart detayının en altında.

## 4. Dokunma ve erişilebilirlik

- Her tıklanabilir öğe en az 36 px yüksek; yalnız ikonlu düğmeler (`.icon-only`) 40 px geniş.
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

- Kısa, eylem odaklı etiketler: "Öğrendim", "Tekrar ettim", "Dinle". Aynı niyet için tek etiket.
- Geçici durum mesajlarında (✅ ❌ ⏳) emoji kalabilir; kalıcı arayüz öğelerinde kalamaz.
- Marka/ürün adı `Kantoor Woordenschat`; alt başlıkta "Hollandaca" (Hollandıca değil).

## 9. Değişiklik öncesi kontrol listesi

1. Yeni renk → token'a bağla.
2. Yeni düğme ≥ 36 px mi? `:focus-visible` çalışıyor mu?
3. Yeni animasyonun gerekçesi var mı?
4. Hollandaca metin öğesi `lang="nl"` taşıyor mu?
5. İki temada, 375 px genişlikte bakıldı mı?
6. `sw.js` içindeki `CACHE_NAME` artırıldı mı?
