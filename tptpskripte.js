//Pri izradi koda za filtriranje kartica korišten je Gemini AI
//Ovaj dio koda predstavlja poziv funkcije (dodjeljivanje logike na klik)
document.addEventListener("DOMContentLoaded", function() {
    
    
    const filterLinkovi = document.querySelectorAll("#glavna-navigacija a[data-kategorija]");

    filterLinkovi.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); 
            const kat = this.getAttribute("data-kategorija");
            izvrsiFiltriranje(kat);
        });
    });
//Ovdje završava poziv funkcije za filtriranje kartica
  
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

//Pri izradi funckije za filtriranje kartica korišten je Gemini AI
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
