# OPIS APLIKACIJE 
 Aplikacija je podeljena na nekoliko ključnih komponenti, uključujući registraciju i prijavu korisnika, rešavanje izazova, pregled lekcija i upravljanje izazovima. Uz ove funkcionalnosti, postoji i administrativni panel sa statističkim podacima za praćenje napretka i uspeha korisnika u vezi sa rešavanjem izazova. Glavne funkcionalnosti aplikacije detaljno su opisane u nastavku.
1. Registracija korisnika
Aplikacija omogućava korisnicima da se registruju putem jednostavne forme koja prikuplja osnovne podatke poput imena, email adrese i lozinke. Tokom registracije, sistem proverava validnost unetih podataka i obezbeđuje sigurnost kroz potvrdu lozinke. Kada se korisnik uspešno registruje, automatski se preusmerava na stranicu za prijavu, gde može pristupiti aplikaciji. Sistem takođe prikazuje poruke o eventualnim greškama ako dođe do neuspešne registracije.
2. Prijava korisnika
Nakon što se korisnik registruje, može se prijaviti u aplikaciju pomoću email adrese i lozinke. Nakon uspešne prijave, korisniku se dodeljuje token za autentifikaciju koji se čuva u sessionStorage. Na osnovu uloge korisnika, aplikacija automatski preusmerava korisnika na odgovarajuće stranice. Administratorima je omogućen pristup stranici sa lekcijama, dok obični korisnici imaju pristup stranici za igranje edukativne igre Flexbox Froggy. Ako korisnik unese pogrešne kredencijale, aplikacija prikazuje odgovarajuću poruku o grešci.
3. Rešavanje izazova
Aplikacija nudi mogućnost rešavanja različitih izazova, koji su dizajnirani da testiraju znanje korisnika iz specifičnih oblasti. Korisnici mogu pregledati listu izazova, uneti svoje odgovore i proveriti tačnost odgovora u realnom vremenu. Ukoliko korisnik da netačan odgovor, aplikacija omogućava prikazivanje dodatnih saveta (hintova) kako bi korisnik mogao bolje razumeti izazov. Aplikacija takođe beleži uspešne i neuspešne pokušaje korisnika, šaljući te podatke na server radi statističke analize.
4. Praćenje statistike
Aplikacija nudi sveobuhvatan administrativni panel, gde administrator može videti detaljne statistike vezane za broj lekcija, broj učenika (korisnika) i broj izazova koji su dostupni u aplikaciji. Uz to, administratori mogu videti uspeh korisnika u rešavanju izazova kroz grafički prikaz uspešnih i neuspešnih pokušaja. Ova statistika se automatski ažurira na osnovu podataka prikupljenih iz baze, pružajući precizan uvid u napredak korisnika. Grafik omogućava vizuelni prikaz sa različitim bojama za uspešne i neuspešne pokušaje, što administratorima olakšava praćenje uspeha na nivou pojedinačnih izazova.
5. Upravljanje izazovima
Administratori i korisnici sa odgovarajućim privilegijama mogu kreirati nove izazove ili ažurirati postojeće izazove. Prilikom kreiranja izazova, korisnik može uneti različite parametre, uključujući pitanje, tačan odgovor, težinu izazova, kao i broj dozvoljenih pokušaja i vremensko ograničenje. Ove funkcionalnosti omogućavaju fleksibilnost u kreiranju edukativnog sadržaja prilagođenog potrebama korisnika. Svi izazovi se mogu pretraživati po ključnim rečima, dok je moguće i filtriranje i paginacija izazova kako bi se olakšalo upravljanje velikim brojem stavki.
6. Upravljanje lekcijama
Pored izazova, aplikacija omogućava administrativno upravljanje lekcijama. Korisnici koji imaju ovlašćenja mogu kreirati nove lekcije, menjati postojeće ili ih brisati. Svaka lekcija može sadržavati osnovne podatke kao što su naslov, sadržaj, težina, opis, kao i opcionalne linkove ka video materijalima i slikama koji dopunjuju lekciju. Kao i kod izazova, lekcije se mogu pretraživati i filtrirati prema različitim parametrima, a sistem podržava paginaciju radi lakšeg upravljanja velikim brojem lekcija.
7. Flexbox Froggy igra
Jedan od ključnih edukativnih sadržaja aplikacije je igra Flexbox Froggy, koja pomaže korisnicima da nauče osnove CSS Flexbox-a kroz interaktivne zadatke. Korisnici dobijaju zadatak da pravilno pozicioniraju elemente koristeći Flexbox pravila, a svako rešenje se dinamički primenjuje i proverava u realnom vremenu. Igra beleži pokušaje korisnika i omogućava im da prate svoj napredak kroz lokalnu memoriju (localStorage), prikazujući listu poslednjih pet pokušaja sa nivoima i datumima kada su završeni.
# Kako pokrenuti aplikaciju

      cd app
      php artisan serve

      cd reactapp
      npm start
