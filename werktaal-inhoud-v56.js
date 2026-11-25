const werkSituaties = [
  {
    "id": "dagstart",
    "title": "Sabah toplantısı",
    "place": "Teamoverleg",
    "speaker": "Collega",
    "context": "Sabah toplantısında ekip günün işlerini paylaşıyor.",
    "heard": {
      "nl": "Waar willen jullie vandaag mee beginnen?",
      "tr": "Bugün neyle başlamak istiyorsunuz?"
    },
    "choices": [
      "Bugün önce ne yapmak istiyorsunuz?",
      "Bugün hangi işi bitirdiniz?",
      "Yarın hangi işi devralacaksınız?"
    ],
    "correct": 0,
    "cue": "Önce yeni e-postaları ele almayı öner.",
    "line": {
      "nl": "Zullen we beginnen met de nieuwe mails?",
      "tr": "Yeni e-postalarla başlayalım mı?"
    },
    "variants": [
      {
        "cue": "Önce yeni başvuruları ele almayı öner.",
        "nl": "Zullen we beginnen met de nieuwe aanmeldingen?",
        "tr": "Önce yeni başvuruları ele alalım mı?"
      },
      {
        "cue": "Önce bugünkü randevuları ele almayı öner.",
        "nl": "Zullen we beginnen met de afspraken van vandaag?",
        "tr": "Önce bugünkü randevuları ele alalım mı?"
      }
    ],
    "chunk": {
      "nl": "Waar ... mee beginnen?",
      "tr": "Neyle başlanacağını sorar. “Waar” ile “mee” ayrı yerlerde durabilir."
    },
    "choicesNl": [
      "Wat willen jullie vandaag als eerste doen?",
      "Welk werk hebben jullie vandaag afgerond?",
      "Welke taak nemen jullie morgen over?"
    ],
    "frame": [
      "Zullen we beginnen met ",
      "?"
    ],
    "tip": {
      "nl": "beginnen met …",
      "tr": "Neyle başlanacağını met ile ekle. Ekip içinde bir öneri yaparken Zullen we …? kullanabilirsin."
    },
    "related": {
      "use": [
        "We moeten de werkverdeling onderling bespreken.",
        "Wat is dan de juiste route?",
        "afstemmen",
        "aankaarten",
        "Hoe staan jullie tegenover dit voorstel?",
        "Hoe kijken jullie hiertegenaan?",
        "Dan gaan we naar het volgende onderwerp.",
        "Heb je daar suggesties voor?",
        "Laten we het zo afspreken.",
        "Laten we eerst de mogelijkheden op een rij zetten.",
        "Ik ben er ook bij.",
        "Dat wil ik voorstellen.",
        "Hoe ver zijn we gevorderd?",
        "Dat moeten we helder krijgen."
      ],
      "hear": [
        "triageteam",
        "de stagnatie",
        "de raad van toezicht (RvT)",
        "intern inzetten",
        "stroperig",
        "een zaakje inbrengen",
        "Sommige cliënten komen met een heel boodschappenlijstje aan vragen."
      ]
    }
  },
  {
    "id": "balie",
    "title": "Danışmayı devralma",
    "place": "Receptie",
    "speaker": "Collega",
    "context": "Bir görüşme sırasında danışmada birinin kalması gerekiyor.",
    "heard": {
      "nl": "Hoe laat heb je iemand nodig aan de balie?",
      "tr": "Danışmada saat kaçta birine ihtiyacın var?"
    },
    "choices": [
      "Danışma saat kaçta kapanıyor?",
      "Danışmada saat kaçta birine ihtiyacın var?",
      "Danışmaya saat kaçta dönebilirsin?"
    ],
    "correct": 1,
    "cue": "Saat on ile on bir arasında danışmaya bakmasını iste.",
    "line": {
      "nl": "Kun jij van tien tot elf de balie overnemen?",
      "tr": "Saat on ile on bir arasında danışmaya sen bakabilir misin?"
    },
    "variants": [
      {
        "cue": "Arkadaşından öğle arasında danışmaya bakmasını iste.",
        "nl": "Kun jij tijdens de lunchpauze de balie overnemen?",
        "tr": "Öğle arasında danışmaya sen bakabilir misin?"
      },
      {
        "cue": "Arkadaşından bugünkü son yarım saatte danışmaya bakmasını iste.",
        "nl": "Kun jij het laatste halfuur van de dag de balie overnemen?",
        "tr": "Bugün son yarım saatte danışmaya sen bakabilir misin?"
      }
    ],
    "chunk": {
      "nl": "aan de balie",
      "tr": "Danışma bankosunda anlamına gelir."
    },
    "choicesNl": [
      "Hoe laat gaat de balie dicht?",
      "Hoe laat moet er iemand aan de balie staan?",
      "Hoe laat kun je terug zijn bij de balie?"
    ],
    "frame": [
      "Kun jij ",
      " de balie overnemen?"
    ],
    "tip": {
      "nl": "de balie overnemen",
      "tr": "Overnemen bir işi başka birinden devralmaktır. Kun jij …? ile bir meslektaşından rica edebilirsin."
    },
    "related": {
      "use": [
        "Wil jij mevrouw helpen?",
        "overnemen",
        "Dan kunnen we het gelijk bespreken.",
        "Ik ga het even navragen.",
        "terugbelverzoek",
        "Het loopt uit."
      ],
      "hear": [
        "bemenst",
        "achterwacht",
        "We hebben extra collega's nodig om de telefoonlijn goed te bemensen.",
        "Is hij bezet?",
        "uitgevallen",
        "aanhaken"
      ]
    }
  },
  {
    "id": "inloop",
    "title": "İlk görüşme",
    "place": "Inloopspreekuur",
    "speaker": "Inwoner",
    "context": "Randevusuz başvuru saatinde biri ilk kez geliyor.",
    "heard": {
      "nl": "Ik ben hier voor het eerst en weet niet waar ik moet beginnen.",
      "tr": "Buraya ilk kez geliyorum ve nereden başlayacağımı bilmiyorum."
    },
    "choices": [
      "Daha önce gelmiştim, randevumu bulamıyorum.",
      "İlk görüşmeden sonra ne yapacağımı bilmiyorum.",
      "İlk kez geliyorum, nereden başlayacağımı bilmiyorum."
    ],
    "correct": 2,
    "cue": "Karşındaki kişiden ne için geldiğini anlatmasını iste.",
    "line": {
      "nl": "Kunt u vertellen waarvoor u komt?",
      "tr": "Ne için geldiğinizi anlatabilir misiniz?"
    },
    "variants": [
      {
        "cue": "Hangi konuda yardım istediğini sor.",
        "nl": "Kunt u vertellen waar u hulp bij wilt?",
        "tr": "Hangi konuda yardım istediğinizi anlatabilir misiniz?"
      },
      {
        "cue": "Şimdiye kadar ne denediğini sor.",
        "nl": "Kunt u vertellen wat u al hebt geprobeerd?",
        "tr": "Şimdiye kadar neleri denediğinizi anlatabilir misiniz?"
      }
    ],
    "chunk": {
      "nl": "voor het eerst",
      "tr": "Bir şeyi ilk kez yaptığını belirtir."
    },
    "choicesNl": [
      "Ik ben al eens geweest, maar ik kan mijn afspraak niet vinden.",
      "Ik weet niet wat ik na het eerste gesprek moet doen.",
      "Ik ben hier nog nooit geweest en weet niet hoe ik moet beginnen."
    ],
    "frame": [
      "Kunt u vertellen ",
      "?"
    ],
    "tip": {
      "nl": "Kunt u vertellen …?",
      "tr": "Bu kibar soru girişinin arkasından neyi öğrenmek istediğini söyle. Dolaylı soruda fiil sona gider."
    },
    "related": {
      "use": [
        "Heeft u hier meer vragen over?",
        "Ik ga het even uitleggen.",
        "Ik ben van Stichting ZO!",
        "Welk e-mailadres mag ik gebruiken?",
        "een beter beeld krijgen",
        "Komt u er samen niet uit?",
        "Hoe gaan we dit aanpakken?"
      ],
      "hear": [
        "Ben je weleens bij ons geweest?",
        "Daar hebben we een inloopuur voor.",
        "Ik kan hier niet meer mee.",
        "Ik kan hier niet meer mee — het is te veel geworden.",
        "Het enige wat ik kan toezeggen is...",
        "het zwaar hebben"
      ]
    }
  },
  {
    "id": "postkamer",
    "title": "Mektuptaki tarih",
    "place": "Postkamer",
    "speaker": "Inwoner",
    "context": "Başvuran kişi iki tarih yazılı bir mektup getiriyor.",
    "heard": {
      "nl": "Ik begrijp niet voor welke datum ik moet reageren.",
      "tr": "Hangi tarihten önce cevap vermem gerektiğini anlamıyorum."
    },
    "choices": [
      "Hangi tarihten önce cevap vermem gerekiyor?",
      "Hangi tarihte cevap alacağım?",
      "Mektup hangi tarihte gönderildi?"
    ],
    "correct": 0,
    "cue": "Mektuptaki tarihlere birlikte bakmayı öner.",
    "line": {
      "nl": "Zullen we samen naar de data in de brief kijken?",
      "tr": "Mektuptaki tarihlere birlikte bakalım mı?"
    },
    "variants": [
      {
        "cue": "Bu kez cevap süresine birlikte bakmayı öner.",
        "nl": "Zullen we samen naar de reactietermijn kijken?",
        "tr": "Cevap süresine birlikte bakalım mı?"
      },
      {
        "cue": "Mektubun son paragrafına birlikte bakmayı öner.",
        "nl": "Zullen we samen naar de laatste alinea van de brief kijken?",
        "tr": "Mektubun son paragrafına birlikte bakalım mı?"
      }
    ],
    "chunk": {
      "nl": "voor welke datum",
      "tr": "Bir işi hangi tarihten önce yapmak gerektiğini sorar."
    },
    "choicesNl": [
      "Vóór welke datum moet ik antwoord geven?",
      "Op welke datum krijg ik antwoord?",
      "Op welke datum is de brief verstuurd?"
    ],
    "frame": [
      "Zullen we samen naar ",
      " kijken?"
    ],
    "tip": {
      "nl": "samen naar … kijken",
      "tr": "Neye bakacağınızı naar ile belirt. Mektubun tamamını ya da tek bir bölümünü söyleyebilirsin."
    },
    "related": {
      "use": [
        "Kunt u dit naar mij mailen?",
        "bijhouden",
        "aanleveren",
        "Wat staat daarin?",
        "uitzoeken",
        "aangeven"
      ],
      "hear": [
        "zienswijze",
        "woonachtig",
        "vonnis",
        "gerechtsdeurwaarder",
        "Er is een brief van de gerechtsdeurwaarder binnengekomen.",
        "ontvankelijk",
        "inzage",
        "ten aanzien van",
        "omtrent",
        "hetgeen"
      ]
    }
  },
  {
    "id": "toestemming",
    "title": "Aramak için izin",
    "place": "Spreekkamer",
    "speaker": "Inwoner",
    "context": "Masada belediyeden gelen bir mektup var.",
    "heard": {
      "nl": "Ik weet niet wat de gemeente met deze brief bedoelt.",
      "tr": "Belediyenin bu mektupla ne demek istediğini bilmiyorum."
    },
    "choices": [
      "Belediyenin mektubumu aldığından emin değilim.",
      "Belediyenin mektupta ne demek istediğini bilmiyorum.",
      "Mektubu belediyeye nasıl göndereceğimi bilmiyorum."
    ],
    "correct": 1,
    "cue": "Mektup hakkında belediyeyi başvuran kişiyle birlikte aramak için izin iste.",
    "line": {
      "nl": "Mag ik samen met u de gemeente bellen over deze brief?",
      "tr": "Bu mektup hakkında belediyeyi sizinle birlikte arayabilir miyim?"
    },
    "variants": [
      {
        "cue": "Aynı aramada bu kez yanıt süresini sormak için izin iste.",
        "nl": "Mag ik samen met u de gemeente bellen over de reactietermijn?",
        "tr": "Yanıt süresi hakkında belediyeyi sizinle birlikte arayabilir miyim?"
      },
      {
        "cue": "Aynı aramada eksik belgeleri sormak için izin iste.",
        "nl": "Mag ik samen met u de gemeente bellen over de ontbrekende stukken?",
        "tr": "Eksik belgeler hakkında belediyeyi sizinle birlikte arayabilir miyim?"
      }
    ],
    "chunk": {
      "nl": "wat de gemeente ... bedoelt",
      "tr": "Belediyenin ne demek istediğini anlatır."
    },
    "choicesNl": [
      "Ik weet niet zeker of de gemeente mijn brief heeft ontvangen.",
      "Ik begrijp niet wat de gemeente in de brief wil zeggen.",
      "Ik weet niet hoe ik de brief naar de gemeente moet sturen."
    ],
    "frame": [
      "Mag ik samen met u de gemeente bellen over ",
      "?"
    ],
    "tip": {
      "nl": "Mag ik samen met u …?",
      "tr": "Aramadan önce izin isterken kullan. Over ile aramanın konusunu ekle."
    },
    "related": {
      "use": [
        "Ik neem het mee.",
        "Ik ga het er met haar over hebben.",
        "bevestigen",
        "opvragen",
        "Voordat we verder gaan, moeten we dat helder krijgen."
      ],
      "hear": [
        "warme overdracht",
        "de toeleiding (naar)",
        "bespreekbaar maken",
        "handelingsbekwaam",
        "behartigen",
        "betrokken"
      ]
    }
  },
  {
    "id": "loonstrook",
    "title": "Bordrodaki fark",
    "place": "Spreekkamer",
    "speaker": "Inwoner",
    "context": "Randstad üzerinden çalışan biri son iki bordrosunu getirdi.",
    "heard": {
      "nl": "Op mijn loonstrook van Randstad staan minder uren dan vorige week.",
      "tr": "Randstad bordromda geçen haftaya göre daha az saat görünüyor."
    },
    "choices": [
      "Randstad geçen haftanın ücretini yatırmadı.",
      "Bu hafta saat ücretim daha düşük görünüyor.",
      "Bordromda geçen haftaya göre daha az saat görünüyor."
    ],
    "correct": 2,
    "cue": "Son iki bordrodaki saatleri karşılaştırmayı öner.",
    "line": {
      "nl": "Zullen we de uren op beide loonstroken vergelijken?",
      "tr": "İki bordrodaki saatleri karşılaştıralım mı?"
    },
    "variants": [
      {
        "cue": "Bu kez iki bordrodaki saat ücretini karşılaştırmayı öner.",
        "nl": "Zullen we het uurloon op beide loonstroken vergelijken?",
        "tr": "İki bordrodaki saat ücretini karşılaştıralım mı?"
      },
      {
        "cue": "Bu kez iki bordrodaki net tutarları karşılaştırmayı öner.",
        "nl": "Zullen we de nettobedragen op beide loonstroken vergelijken?",
        "tr": "İki bordrodaki net tutarları karşılaştıralım mı?"
      }
    ],
    "chunk": {
      "nl": "minder uren dan",
      "tr": "İki dönemi karşılaştırırken saat sayısının daha az olduğunu belirtir."
    },
    "choicesNl": [
      "Randstad heeft het loon van vorige week niet overgemaakt.",
      "Mijn uurloon lijkt deze week lager te zijn.",
      "Op mijn loonstrook staan minder uren dan een week geleden."
    ],
    "frame": [
      "Zullen we ",
      " op beide loonstroken vergelijken?"
    ],
    "tip": {
      "nl": "… op beide loonstroken vergelijken",
      "tr": "Beide iki bordronun ikisini de kapsar. Karşılaştırmak istediğin bilgiyi önce söyle."
    },
    "related": {
      "use": [
        "We willen een beter beeld krijgen van de gezinssituatie.",
        "uitwerken",
        "vermelden",
        "onderbouwen"
      ],
      "hear": [
        "verrekenen",
        "Zijn inkomen valt in de laagste belastingschijf.",
        "Zijn uitkering is ingetrokken wegens fraude.",
        "De aanvraag is ingetrokken door de cliënt.",
        "Ze werkt parttime, vandaar het lagere inkomen.",
        "UWV begeleidt hem bij het re-integreren.",
        "re-integreren"
      ]
    }
  },
  {
    "id": "regeling",
    "title": "Taksitle ödeme",
    "place": "Geldzaken",
    "speaker": "Inwoner",
    "context": "Başvuran kişi önündeki faturayı tek seferde ödeyemiyor.",
    "heard": {
      "nl": "Kan ik dit bedrag ook in delen betalen?",
      "tr": "Bu tutarı taksitle de ödeyebilir miyim?"
    },
    "choices": [
      "Bu tutarı parça parça ödeyebilir miyim?",
      "Bu tutarı gelecek aya erteleyebilir miyim?",
      "Bu tutardan indirim alabilir miyim?"
    ],
    "correct": 0,
    "cue": "Alacaklıya bir ödeme planının mümkün olup olmadığını sorabileceğinizi söyle.",
    "line": {
      "nl": "We kunnen vragen of een betalingsregeling mogelijk is.",
      "tr": "Bir ödeme planının mümkün olup olmadığını sorabiliriz."
    },
    "variants": [
      {
        "cue": "Bu kez üç taksitle ödemenin mümkün olup olmadığını sormayı öner.",
        "nl": "We kunnen vragen of betaling in drie termijnen mogelijk is.",
        "tr": "Üç taksitte ödemenin mümkün olup olmadığını sorabiliriz."
      },
      {
        "cue": "Bu kez aylık tutarın düşürülmesinin mümkün olup olmadığını sormayı öner.",
        "nl": "We kunnen vragen of een lager maandbedrag mogelijk is.",
        "tr": "Aylık tutarın daha düşük olmasının mümkün olup olmadığını sorabiliriz."
      }
    ],
    "chunk": {
      "nl": "in delen betalen",
      "tr": "Bir tutarı parça parça ödemek."
    },
    "choicesNl": [
      "Mag ik het bedrag in termijnen betalen?",
      "Mag ik de betaling uitstellen tot volgende maand?",
      "Kan ik korting krijgen op het bedrag?"
    ],
    "frame": [
      "We kunnen vragen of ",
      " mogelijk is."
    ],
    "tip": {
      "nl": "vragen of … mogelijk is",
      "tr": "Bir seçeneğin mümkün olup olmadığını sormaya yarar. Of ile başlayan bölümde is sona gelir."
    },
    "related": {
      "use": [
        "een regeling treffen",
        "Hoeveel kunt u per maand afbetalen?",
        "afbetalen",
        "In principe kan dat, maar we moeten het eerst controleren.",
        "Hoe gaan we verder?"
      ],
      "hear": [
        "beslaglegging",
        "kwijtschelding",
        "een tegemoetkoming in de kosten",
        "bewindvoerder",
        "waarborgsom",
        "Hij probeert zijn schulden af te betalen met een betalingsregeling.",
        "Hij heeft kwijtschelding aangevraagd voor de gemeentelijke belastingen.",
        "De bewindvoerder beheert zijn financiën en betaalt de rekeningen."
      ]
    }
  },
  {
    "id": "verwijzen",
    "title": "Uygun desteğe yönlendirme",
    "place": "Team Geldzaken",
    "speaker": "Inwoner",
    "context": "Başvuran kişi başka bir uzmandan destek almayı düşünüyor.",
    "heard": {
      "nl": "Wie kan mij hier verder mee helpen?",
      "tr": "Bu konuda bana başka kim yardımcı olabilir?"
    },
    "choices": [
      "Bana daha önce kim yardımcı oldu?",
      "Bu konuda başka kimden destek alabilirim?",
      "Bu konuda kime yardımcı olmam gerekiyor?"
    ],
    "correct": 1,
    "cue": "Kime başvurabileceğine birlikte bakmayı öner.",
    "line": {
      "nl": "Zullen we samen kijken bij wie u terechtkunt?",
      "tr": "Kime başvurabileceğinize birlikte bakalım mı?"
    },
    "variants": [
      {
        "cue": "Nasıl randevu alabileceğine birlikte bakmayı öner.",
        "nl": "Zullen we samen kijken hoe u een afspraak kunt maken?",
        "tr": "Nasıl randevu alabileceğinize birlikte bakalım mı?"
      },
      {
        "cue": "İlk görüşmeye hangi belgeleri götürebileceğine birlikte bakmayı öner.",
        "nl": "Zullen we samen kijken welke documenten u kunt meenemen?",
        "tr": "Hangi belgeleri götürebileceğinize birlikte bakalım mı?"
      }
    ],
    "chunk": {
      "nl": "verder mee helpen",
      "tr": "Bir konuda desteği sürdürmek veya bir sonraki adımda yardımcı olmak demektir."
    },
    "choicesNl": [
      "Wie heeft mij eerder geholpen?",
      "Bij wie kan ik hiervoor nog meer hulp krijgen?",
      "Wie moet ik hiermee helpen?"
    ],
    "frame": [
      "Zullen we samen kijken ",
      "?"
    ],
    "tip": {
      "nl": "bij iemand terechtkunnen",
      "tr": "Yardım için kime başvurulacağını anlatır. Bij wie u terechtkunt dolaylı bir sorudur."
    },
    "related": {
      "use": [
        "Het is jammer, maar dit valt buiten onze mogelijkheden.",
        "Welke instelling is het meest geschikt voor deze cliënt?",
        "tussenpersoon",
        "Ik begrijp jouw signaal.",
        "Ik vraag me af of dit in de praktijk gaat werken."
      ],
      "hear": [
        "nazorg",
        "opschalen",
        "ketenpartners",
        "ontwrichten",
        "verschoonbaar",
        "inzage"
      ]
    }
  },
  {
    "id": "verzetten",
    "title": "Randevuyu değiştirme",
    "place": "Telefoon",
    "speaker": "Inwoner",
    "context": "Başvuran kişi takip görüşmesinin saatini değiştirmek için arıyor.",
    "heard": {
      "nl": "Er is iets tussengekomen. Kunnen we onze afspraak verzetten?",
      "tr": "Bir işim çıktı. Randevumuzu başka bir zamana alabilir miyiz?"
    },
    "choices": [
      "Görüşmemizi uzatabilir miyiz?",
      "Görüşmemizi telefonla yapabilir miyiz?",
      "Görüşmemizi başka bir zamana alabilir miyiz?"
    ],
    "correct": 2,
    "cue": "Yeni randevu için salı sabahının uygun olup olmadığını sor.",
    "line": {
      "nl": "Komt het u dinsdagochtend uit?",
      "tr": "Salı sabahı size uygun mu?"
    },
    "variants": [
      {
        "cue": "Yeni randevu için çarşamba öğleden sonrasını öner.",
        "nl": "Komt het u woensdagmiddag uit?",
        "tr": "Çarşamba öğleden sonra size uygun mu?"
      },
      {
        "cue": "Yeni randevu için cuma saat onu öner.",
        "nl": "Komt het u vrijdag om tien uur uit?",
        "tr": "Cuma saat on size uygun mu?"
      }
    ],
    "chunk": {
      "nl": "onze afspraak verzetten",
      "tr": "Randevumuzu başka bir zamana almak demektir."
    },
    "choicesNl": [
      "Kunnen we wat langer praten?",
      "Kunnen we elkaar telefonisch spreken?",
      "Kunnen we op een ander moment afspreken?"
    ],
    "frame": [
      "Komt het u ",
      " uit?"
    ],
    "tip": {
      "nl": "Komt het u … uit?",
      "tr": "Zaman önermek için kullan. U danışana hitap eder. Uit cümlenin sonunda kalır."
    },
    "related": {
      "use": [
        "Wat komt jou uit?",
        "Bel ik je gelegen?",
        "Kunnen we de afspraak verzetten naar een andere dag?",
        "Hoor ik later van je?",
        "de maandag erna",
        "afspraken nakomen",
        "Je had me gebeld."
      ],
      "hear": [
        "Mijn voorkeur gaat uit naar de ochtendafspraak.",
        "Trouwens, de afspraak is verplaatst naar volgende week.",
        "Ik heb een terugbelverzoek ingediend bij de balie.",
        "Je kunt niet van tevoren inschatten hoe lang een gesprek duurt."
      ]
    }
  },
  {
    "id": "overdracht",
    "title": "Görüşme notu",
    "place": "Teamoverleg",
    "speaker": "Collega",
    "context": "Görüşmenin ardından iş arkadaşın dosya notunu tamamlıyor.",
    "heard": {
      "nl": "Wat zal ik over ons gesprek in het dossier zetten?",
      "tr": "Görüşmemizle ilgili dosyaya ne yazayım?"
    },
    "choices": [
      "Görüşmeyle ilgili dosyaya ne yazayım?",
      "Görüşmeden önce hangi dosyayı okuyayım?",
      "Dosyadaki notu kime göndereyim?"
    ],
    "correct": 0,
    "cue": "Birlikte kararlaştırdığınız adımları not etmesini iste.",
    "line": {
      "nl": "Wil je noteren welke stappen we hebben afgesproken?",
      "tr": "Hangi adımları kararlaştırdığımızı not eder misin?"
    },
    "variants": [
      {
        "cue": "Bir sonraki görüşmenin ne zaman olduğunu not etmesini iste.",
        "nl": "Wil je noteren wanneer het volgende gesprek is?",
        "tr": "Bir sonraki görüşmenin ne zaman olduğunu not eder misin?"
      },
      {
        "cue": "Hangi belgelerin hâlâ eksik olduğunu not etmesini iste.",
        "nl": "Wil je noteren welke stukken nog ontbreken?",
        "tr": "Hangi belgelerin hâlâ eksik olduğunu not eder misin?"
      }
    ],
    "chunk": {
      "nl": "in het dossier zetten",
      "tr": "Bilgiyi dosyaya yazmak veya kaydetmek anlamına gelir."
    },
    "choicesNl": [
      "Wat moet ik over het gesprek opschrijven in het dossier?",
      "Welk dossier moet ik vóór het gesprek lezen?",
      "Naar wie moet ik de notitie sturen?"
    ],
    "frame": [
      "Wil je noteren ",
      "?"
    ],
    "tip": {
      "nl": "Wil je noteren …?",
      "tr": "Ekip içinde kayıt tutmasını rica etmek için kullan. Ardından neyin yazılacağını belirt."
    },
    "related": {
      "use": [
        "overdragen",
        "bijwerken",
        "afvinken",
        "We moeten ook rekening houden met onze doelgroep.",
        "Ik ben benieuwd hoe de vrijwilligers hierover denken.",
        "Het is belangrijk dat bezoekers weten waar ze aan toe zijn."
      ],
      "hear": [
        "onderbouwing",
        "afwegingen",
        "toezicht",
        "verantwoording afleggen (aan)",
        "een oplossing verzinnen",
        "Hiermee creëren we bepaalde verwachtingen."
      ]
    }
  }
];
