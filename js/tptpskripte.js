
document.addEventListener("DOMContentLoaded", function() {

	// Validacija kontakt forme
	// Pri izradi koda za validaciju forme pomoću Regex obrazaca korišten je Gemini AI 
	const kontaktForma = document.getElementById("kontaktForma");
	if (kontaktForma) {
    kontaktForma.addEventListener("submit", function(e) {
        e.preventDefault();

        
        let ime = document.getElementById("ime").value.trim();
        let prezime = document.getElementById("prezime").value.trim();
        let email = document.getElementById("email").value.trim();
        let telefon = document.getElementById("telefon").value.trim();
        let tema = document.getElementById("tema").value; // Dodata tema
        let poruka = document.getElementById("poruka").value.trim();
        let ispis = document.getElementById("porukaGreske"); 

        let validno = true;

        
        ispis.textContent = "";

        
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let telefonRegex = /^[0-9+\s-]{9,15}$/;

        
        
        if (ime === "" || prezime === "" || email === "" || telefon === "" || poruka === "" || tema === "") {
            ispis.textContent = "Sva polja moraju biti popunjena, uključujući i odabir teme.";
            ispis.style.color = "red";
            validno = false;
        } 
        
        else if (!emailRegex.test(email)) {
            ispis.textContent = "Email adresa nije u ispravnom formatu.";
            ispis.style.color = "red";
            validno = false;
        } 
        
        else if (!telefonRegex.test(telefon)) {
            ispis.textContent = "Telefon mora sadržavati 9-15 cifara (dozvoljeni +, - i razmaci).";
            ispis.style.color = "red";
            validno = false;
        }

       
        if (validno) {
            ispis.textContent = "Hvala " + ime + ", vaša poruka vezana za temu '" + tema + "' je uspješno poslana!";
            ispis.style.color = "green";
            
        }
    });
} //Ovdje se završava kod za validaciju kontakt forme

    // Pri izradi funkcije za filtriranje kartica korišten je Gemini AI
    //Ovaj dio koda predstavlja poziv funkcije (dodjeljivanje logike na klik)
    const filterLinkovi = document.querySelectorAll("#glavna-navigacija a[data-kategorija]");

filterLinkovi.forEach(link => {
    link.addEventListener("click", function(event) {
        const putanja = this.getAttribute("href");
        const kategorija = this.getAttribute("data-kategorija");

        if (putanja !== "#" && putanja !== "") {
            return; 
        }

        event.preventDefault(); 
        izvrsiFiltriranje(kategorija);
    });
});
	//Ovdje se završava poziv funkcije za filtriranje kartica
    
    const smoothLinkovi = document.querySelectorAll('a[href^="#"]');

    smoothLinkovi.forEach(link => {
        link.addEventListener("click", function(e) {
            const ciljId = this.getAttribute("href");

            if (ciljId !== "#" && ciljId.startsWith("#")) {
                e.preventDefault();
                const ciljniElement = document.querySelector(ciljId);

                if (ciljniElement) {
                    ciljniElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });

const btn = document.getElementById('dark-mode-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

if (btn) {
    btn.addEventListener('click', () => {
		
        document.body.classList.toggle('dark-mode');
        
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}
// Pri izradi funkcije za interaktivni element kartica korišten je Gemini AI
//Ovaj dio koda predstavlja niz objekata koji se koriste za interkativni element (gastro picker) 
const gastroObjekti = [
    {
        naziv: "Poslastičarnica Evropa",
        opis: "Poslastičarnica Evropa nudi širok izbor ukusnih kolača, torti i osvježavajućih sladoleda.",
        emoji: "\u{1F9C1}" // Cupcake 
    },
    {
        naziv: "Caffe Sloboda",
        opis: "Najbolja kafa s pogledom na Trg Slobode. Idealno za opuštanje.",
        emoji: "\u{2615}"  // Hot Beverage 
    },
    {
        naziv: "Poslastičarna Fontana",
        opis: "Od svježih kolača do ukusnih sladoleda, svaki zalogaj donosi pravo osvježenje.",
        emoji: "\u{1F9C1}" // Cupcake 
    },
    {
        naziv: "Ćevandžinica Limenka",
        opis: "Prepoznatljivi su po svojim vrhunskim ćevapima, ali i domaćoj lepinji s poljevom.",
        emoji: "\u{1F374}" // Utensils 
    },
    {
        naziv: "Kvin",
        opis: "Kvin je idealan za porodične ručkove, poslovne sastanke ili opušteno druženje s prijateljima.",
        emoji: "\u{1F374}" // Utensils 
    },
    {
        naziv: "MamaMia Origins",
        opis: "Od raznih jela od teletine, vrhunskih steakova pa sve do tjestenina, rižota i ribljih specijaliteta.",
        emoji: "\u{1F374}" // Utensils 
    },
    {
        naziv: "Caffe Zona",
        opis: "Caffe Zona nudi prijatan ambijent i odličan izbor napitaka u Tuzli.",
        emoji: "\u{2615}"  // Hot Beverage 
    },
    {
        naziv: "Meeting Tuzla",
        opis: "Meeting je moderan kafić u Tuzli poznat po ugodnom ambijentu i kvalitetnoj kafi.",
        emoji: "\u{2615}"  // Hot Beverage 
    },
    {
        naziv: "Poslastičarna San Marco",
        opis: "Svaki desert je pažljivo pripremljen kako bi pružio savršen spoj okusa i kvaliteta.",
        emoji: "\u{1F9C1}" // Cupcake 
    }
];

//Ovaj dio koda predstavlja logiku iza interaktivnog elementa
const pickerBtn = document.getElementById("pickerBtn");
const nazivPreporuke = document.getElementById("naziv-preporuke");
const opisPreporuke = document.getElementById("opis-preporuke");
const preporukaKutija = document.getElementById("prikaz-preporuke");

const ikonaPreporuke = document.querySelector(".ikona-pocetna");

if (pickerBtn) {
    pickerBtn.addEventListener("click", function() {
   
        const randomIndex = Math.floor(Math.random() * gastroObjekti.length);
        const izabraniObjekat = gastroObjekti[randomIndex];

        
        nazivPreporuke.textContent = izabraniObjekat.naziv;
        opisPreporuke.textContent = izabraniObjekat.opis;
        
        
        ikonaPreporuke.textContent = izabraniObjekat.emoji;

        
        preporukaKutija.classList.remove("aktivno");
        void preporukaKutija.offsetWidth; // Reset animacije
        preporukaKutija.classList.add("aktivno");
    });
}
	
});

	// Pri izradi funkcije za filtriranje kartica korišten je Gemini AI
	//Ovaj dio koda predstavlja implementaciju funkcije za filtriranje kartica
function izvrsiFiltriranje(kategorija) {
    const kartice = document.querySelectorAll('.card');
    const naslov = document.getElementById('naslov-kategorije');

    if (kartice.length === 0) return;

    if (naslov) {
        if (kategorija === 'sve') {
            naslov.textContent = "Izaberi kategoriju";
        } else {
            naslov.textContent = "Kategorija: " + kategorija.charAt(0).toUpperCase() + kategorija.slice(1);
        }
    }

    kartice.forEach(kartica => {
        if (kategorija === 'sve') {
            kartica.style.display = "block";
        } else {
			
            if (kartica.classList.contains(kategorija)) {
                kartica.style.display = "block";
            } else {
              
                const gastroKategorije = ['restorani', 'kafici', 'poslasticarne'];
                const pripadaDrugojKategoriji = gastroKategorije.some(kat => kartica.classList.contains(kat));

                if (pripadaDrugojKategoriji) {
                    kartica.style.display = "none";
                }
            }
        }
    });
}