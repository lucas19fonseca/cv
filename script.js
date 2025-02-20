// Rolagem para o topo ao clicar no botão
const button = document.getElementById('lucas');

if (button) { 
    button.addEventListener('click', () => {
        window.scrollTo({
            top:0,
            behavior: 'smooth' 
        });
    });
}

// Rolagem suave ao clicar nas âncoras
document.querySelectorAll('.hearder-info').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith("#")) {
            e.preventDefault(); 
            const targetElement = document.querySelector(href);
            
            if (targetElement) { 
                window.scrollTo({
                    top: targetElement.offsetTop - 190, 
                    behavior: 'smooth' 
                });
            }
        }
    });
});
function openModal(img) {
    let modal = document.getElementById("modal");
    let modalImg = document.getElementById("modal-img");
    
    modal.style.display = "flex";
    modalImg.src = img.src;
  }

  function closeModal() {
    document.getElementById("modal").style.display = "none";
  }

  document.getElementById("modal").addEventListener("click", function (event) {
    if (event.target === this) {
      closeModal();
    }
  });