import VerticalCard from "../components/VerticalCard.js";
import HorizontalCard from "../components/HorizontalCard.js";
import {
  getAllPopularEvents,
  getMatchingEvents,
} from "../Services/eventService.js";
import { getCurrentUser } from "../Models/userModel.js";

function formatEventDate(dateString) {
  if (!dateString) return "Date inconnue";
  const date = new Date(dateString);
  const optionsDate = { day: "2-digit", month: "long", year: "numeric" };
  const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: false };
  const datePart = date.toLocaleDateString("fr-FR", optionsDate);
  const timePart = date.toLocaleTimeString("fr-FR", optionsTime);
  return `${datePart} - ${timePart}`;
}

async function geocodeCity(cityName) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1&countrycodes=fr`
    );
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        displayName: data[0].display_name
      };
    }
    return null;
  } catch (error) {
    console.error("Erreur lors du géocodage:", error);
    return null;
  }
}

async function initializeMapWithUser() {
  let userLocation = null;
  let mapCenter = [48.85837, 2.294481];
  let mapZoom = 12;

  try {
    const user = await getCurrentUser();
    if (user && user.lieu) {
      console.log("Ville de l'utilisateur:", user.lieu);
      userLocation = await geocodeCity(user.lieu);
      if (userLocation) {
        mapCenter = [userLocation.lat, userLocation.lng];
        mapZoom = 13;
        console.log("Coordonnées trouvées:", userLocation);
      }
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données utilisateur:", error);
  }

  const checkMap = () => {
    const mapElement = document.getElementById("map");
    if (window.L && mapElement && !mapElement._leaflet_id) {
      try {
        const map = L.map("map").setView(mapCenter, mapZoom);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);
        
        if (userLocation) {
          const userMarker = L.marker([userLocation.lat, userLocation.lng], {
            icon: L.divIcon({
              className: 'user-location-marker',
              html: '🏠',
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            })
          }).addTo(map);
          
          userMarker.bindPopup(`
            <div style="text-align: center;">
              <strong>Votre ville</strong><br>
              ${userLocation.displayName}
            </div>
          `);
        }
        
        const eventMarkers = [
          { lat: 48.85837, lng: 2.294481, title: "Point Ephémère - Night Tapes", price: "18,13€" },
          { lat: 48.8566, lng: 2.3522, title: "Autre événement", price: "25€" },
          { lat: 48.8534, lng: 2.3488, title: "Concert jazz", price: "30€" }
        ];

        eventMarkers.forEach(event => {
          const eventMarker = L.marker([event.lat, event.lng], {
            icon: L.divIcon({
              className: 'event-marker',
              html: '🎵',
              iconSize: [25, 25],
              iconAnchor: [12, 12]
            })
          }).addTo(map);
          
          eventMarker.bindPopup(`
            <div style="text-align: center;">
              <strong>${event.title}</strong><br>
              Prix: ${event.price}
            </div>
          `);
        });
          
        console.log("Carte initialisée avec succès");
        
        if (userLocation) {
          const group = new L.featureGroup([
            L.marker([userLocation.lat, userLocation.lng]),
            ...eventMarkers.map(e => L.marker([e.lat, e.lng]))
          ]);
          map.fitBounds(group.getBounds().pad(0.1));
        }
        
      } catch (error) {
        console.error("Erreur lors de l'initialisation de la carte:", error);
      }
    }
  };

  checkMap();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        checkMap();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  setTimeout(() => observer.disconnect(), 10000);
}

export default async function Bienvenue() {
  let topEvents = [];
  let matchingEvents = [];
  
  try {
    const events = await getAllPopularEvents();
    topEvents = events.slice(0, 4);
  } catch (e) {
    topEvents = [];
  }
  
  try {
    const events = await getMatchingEvents();
    matchingEvents = events.slice(0, 4);
  } catch (e) {
    matchingEvents = [];
  }

  setTimeout(initializeMapWithUser, 100);

  return {
    tag: "div",
    attributes: [["class", "welcome"]],
    children: [
      {
        tag: "h1",
        attributes: [["class", "h1-big"]],
        children: ["Première fois sur le site ?"],
      },
      {
        tag: "section",
        attributes: [["class", "first-section"]],
        children: [
          {
            tag: "div",
            children: [
              {
                tag: "h2",
                attributes: [["class", "h2-big"]],
                children: ["Top !"],
              },
              {
                tag: "p",
                attributes: [["class", "p-highlight"]],
                children: ["de la semaine"],
              },
            ],
          },
          {
            tag: "div",
            attributes: [["class", "cards-row"]],
            children: topEvents.map((event) =>
              VerticalCard({
                imageUrl: event.imageUrl || "../Assets/images/eventImage.png",
                title: event.title || event.nom || "Événement",
                date:
                  event.date || event.date_event
                    ? formatEventDate(event.date || event.date_event)
                    : "Date inconnue",
                place: event.place || event.lieu || "Lieu inconnu",
                price:
                  event.price ||
                  (event.prix ? event.prix + "€" : "Prix inconnu"),
              })
            ),
          },
        ],
      },
      {
        tag: "section",
        attributes: [["class", "second-section"]],
        children: [
          {
            tag: "img",
            attributes: [["src", "../Assets/images/image1.png"]],
          },
          {
            tag: "div",
            attributes: [["class", "banner"]],
            children: [
              {
                tag: "h2",
                attributes: [["class", "h2"]],
                children: ["Pas intéressé.e ?"],
              },
              {
                tag: "p",
                attributes: [["class", "p"]],
                children: [
                  "Recherche l'évènnement de tes rêves et plus encore !",
                ],
              },
              {
                tag: "button",
                attributes: [["class", "bouton-primary-1"]],
                children: ["rechercher"],
              },
            ],
          },
        ],
      },
      {
        tag: "section",
        attributes: [["class", "third-section"]],
        children: [
          {
            tag: "h2",
            attributes: [["class", "h2-big"]],
            children: ["Évennements spécialement pour vous !"],
          },
          {
            tag: "div",
            attributes: [["class", "cards-row"]],
            children: matchingEvents.map((event) =>
              VerticalCard({
                imageUrl: event.imageUrl || "../Assets/images/eventImage.png",
                title: event.title || event.nom || "Événement",
                date:
                  event.date || event.date_event
                    ? formatEventDate(event.date || event.date_event)
                    : "Date inconnue",
                place: event.place || event.lieu || "Lieu inconnu",
                price:
                  event.price ||
                  (event.prix ? event.prix + "€" : "Prix inconnu"),
              })
            ),
          },
        ],
      },
      {
        tag: "section",
        attributes: [["class", "fourth-section"]],
        children: [
          {
            tag: "h2",
            attributes: [["class", "h2-big"]],
            children: ["Évennements proches de chez vous"],
          },
          {
            tag: "div",
            attributes: [["class", "map-section"]],
            children: [
              {
                tag: "div",
                attributes: [
                  ["id", "map"],
                  ["class", "leaflet-map"],
                ],
              },
              {
                tag: "div",
                attributes: [["class", "map-cards"]],
                children: [
                  HorizontalCard({
                    imageUrl: "../Assets/images/eventImage.png",
                    title: "Night Tapes",
                    date: "18 novembre 2025 - 19:30",
                    place: "Point Ephémère - Paris",
                    price: "18,13€",
                  }),
                  HorizontalCard({
                    imageUrl: "../Assets/images/eventImage.png",
                    title: "Night Tapes",
                    date: "18 novembre 2025 - 19:30",
                    place: "Point Ephémère - Paris",
                    price: "18,13€",
                  }),
                  HorizontalCard({
                    imageUrl: "../Assets/images/eventImage.png",
                    title: "Night Tapes",
                    date: "18 novembre 2025 - 19:30",
                    place: "Point Ephémère - Paris",
                    price: "18,13€",
                  }),
                ],
              },
            ],
          },
        ],
      },
      {
        tag: "section",
        attributes: [["class", "fifth-section"]],
        children: [
          {
            tag: "h2",
            attributes: [["class", "h2-footer"]],
            children: ["Convaincu ?"],
          },
          {
            tag: "button",
            attributes: [["class", "bouton-primary-1"]],
            children: ["Accéder à la page d'accueil"],
          },
        ],
      },
    ],
  };
}