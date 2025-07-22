import { getAllCommunautes } from '../Models/communauteModel.js';
import VerticalCard from '../components/VerticalCard.js';
import { ajouterMembreCommunaute, retirerMembreCommunaute, estMembreCommunaute } from '../Models/communauteMembresModel.js';
import { getCurrentUser } from '../Models/userModel.js';

const Communautes = function () {
  setTimeout(() => afficherToutesCommunautes(), 100);
  return {
    tag: "div",
    attributes: [["class", "communautes-page"]],
    children: [
      {
        tag: "h1",
        children: ["Communautés"],
      },
      {
        tag: "p",
        children: ["Rejoignez des communautés qui partagent vos centres d'intérêt."],
      },
      {
        tag: "div",
        attributes: [["id", "all-communautes-list"], ["class", "communautes-list"]],
        children: []
      }
    ],
  };
};

export default Communautes;

async function afficherToutesCommunautes() {
  const container = document.getElementById('all-communautes-list');
  if (!container) return;
  container.innerHTML = 'Chargement...';
  try {
    const communautes = await getAllCommunautes();
    const user = await getCurrentUser();
    if (!communautes.length) {
      container.innerHTML = '<p>Aucune communauté trouvée.</p>';
      return;
    }
    container.innerHTML = '';
    for (const c of communautes) {
      const card = VerticalCard({
        imageUrl: c.image || '../Assets/images/eventImage.png',
        title: c.nom,
        place: c.lieu,
        description: c.description
      });
      const cardElement = renderElement(card);
      // Ajout du bouton rejoindre/quitter
      if (user && user.id !== c.referent) {
        const btn = document.createElement('button');
        btn.className = 'btn-comm-action';
        btn.textContent = '...'; // placeholder
        btn.disabled = true;
        cardElement.appendChild(btn);
        // Vérifier l'état d'abonnement
        estMembreCommunaute(user.id, c.id).then(isMember => {
          btn.textContent = isMember ? 'Quitter' : 'Rejoindre';
          btn.disabled = false;
          btn.onclick = async () => {
            btn.disabled = true;
            try {
              if (isMember) {
                await retirerMembreCommunaute(user.id, c.id);
                btn.textContent = 'Rejoindre';
              } else {
                await ajouterMembreCommunaute(user.id, c.id);
                btn.textContent = 'Quitter';
              }
              // Rafraîchir l'état
              afficherToutesCommunautes();
            } catch (e) {
              alert('Erreur : ' + e.message);
            } finally {
              btn.disabled = false;
            }
          };
        });
      }
      container.appendChild(cardElement);
    }
  } catch (e) {
    container.innerHTML = '<p>Erreur lors du chargement des communautés.</p>';
  }
}

// Fonction utilitaire pour rendre un objet virtuel en DOM réel
function renderElement(obj) {
  if (typeof obj === 'string') return document.createTextNode(obj);
  const el = document.createElement(obj.tag);
  if (obj.attributes) {
    obj.attributes.forEach(([key, value]) => {
      if (typeof value === 'object' && key === 'style') {
        Object.assign(el.style, value);
      } else {
        el.setAttribute(key, value);
      }
    });
  }
  if (obj.events) {
    Object.entries(obj.events).forEach(([event, handlers]) => {
      handlers.forEach(handler => el.addEventListener(event, handler));
    });
  }
  if (obj.children) {
    obj.children.forEach(child => el.appendChild(renderElement(child)));
  }
  return el;
}
