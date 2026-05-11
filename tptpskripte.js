
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
            event.preventDefault(); 
            const kat = this.getAttribute("data-kategorija");
            izvrsiFiltriranje(kat);
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
    const icon = document.getElementById('theme-icon');
    const currentTheme = localStorage.getItem('theme');

    function updateIcon(isDark) {
        if (icon) {
            if (isDark) {
                icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
            }
        }
    }

    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateIcon(true);
    }

    
    if (btn) {
        btn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateIcon(isDark);
        });
    }
});

	// Pri izradi funkcije za filtriranje kartica korišten je Gemini AI
	//Ovaj dio koda predstavlja implementaciju funkcije za filtriranje kartica
function izvrsiFiltriranje(kategorija) {
    const kartice = document.querySelectorAll('.card');
    const naslov = document.getElementById('naslov-kategorije');

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
               
                if (!kartica.classList.contains('theme-btn')) { 
                    kartica.style.display = "none";
                }
            }
        }
    });
}
