// Čekamo da se cijeli HTML učita (zbog defer atributa)
// defer atribut osigurava da browser preuzima JS skripte bez zaustavljanja HTML dokumenta
// Za pomoć pri izradu ovog koda koristila sam Gemini

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. DIO: FILTRIRANJE KARTICA
    
    // Pronalazimo sve linkove unutar navigacije koji imaju data-kategorija atribut
    const filterLinkovi = document.querySelectorAll("#glavna-navigacija a[data-kategorija]");

    filterLinkovi.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); 
            // Ovaj segment koda osigurava da stranica ne uradi reload ili skoči na vrh
           
            const kat = this.getAttribute("data-kategorija");
            // Uzimanje vrijednost iz data-kategorija (npr. 'restorani')
            
            izvrsiFiltriranje(kat);
            // Poziv funkcije za filtriranje
        });
    });

    // 2. DIO: SMOOTH SCROLL
    
    // Pronalazimo sve linkove koji vode na ID unutar stranice (počinju sa #)
    const smoothLinkovi = document.querySelectorAll('a[href^="#"]');

    smoothLinkovi.forEach(link => {
        link.addEventListener("click", function(e) {
            // Ako link ima i data-kategorija, filtriranje već rješava preventDefault,
            // ali za čiste bookmark linkove (poput #lokacija-mape) moramo ga ovdje zaustaviti.
            const ciljId = this.getAttribute("href");

            // Preskačemo linkove koji su samo "#" (često se koriste za vrh stranice ili prazne linkove)
            if (ciljId !== "#" && ciljId.startsWith("#")) {
                e.preventDefault();

                const ciljniElement = document.querySelector(ciljId);

                if (ciljniElement) {
                    // Pokrećemo glatko skrolovanje do ciljanog elementa
                    ciljniElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });
});

// Funkcija za filtriranje
function izvrsiFiltriranje(kategorija) {
    const kartice = document.querySelectorAll('.card');
    const naslov = document.getElementById('naslov-kategorije');

    // Ažuriranje naslova
    if (naslov) {
        if (kategorija === 'sve') {
            naslov.textContent = "Izaberi kategoriju";
        } else {
            naslov.textContent = "Kategorija: " + kategorija.charAt(0).toUpperCase() + kategorija.slice(1);
        }
    }

    // Logika sakrivanja/prikazivanja
    kartice.forEach(kartica => {
        if (kategorija === 'sve') {
            kartica.style.display = "block";
        } else {
            if (kartica.classList.contains(kategorija)) {
                kartica.style.display = "block";
            } else {
                kartica.style.display = "none";
            }
        }
    });
}