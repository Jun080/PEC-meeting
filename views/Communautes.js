import { getAllCommunautes } from '../Models/communauteModel.js';
import VerticalCard from '../components/VerticalCard.js';

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
    if (!communautes.length) {
      container.innerHTML = '<p>Aucune communauté trouvée.</p>';
      return;
    }
    container.innerHTML = '';
    communautes.forEach(c => {
      const card = VerticalCard({
        imageUrl: '../Assets/images/eventImage.png',
        title: c.nom,
        date: c.date_creation ? new Date(c.date_creation).toLocaleDateString() : '',
        place: c.lieu,
        price: c.status
      });
      container.appendChild(renderElement(card));
    });
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
