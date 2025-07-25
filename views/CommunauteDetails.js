import createElement from '../lib/createElement.js';
import { getCommunauteById, getAllCommunautes, getCommunauteMemberCount } from '../Models/communauteModel.js';
import { getUserById } from '../Models/userModel.js';
import { ajouterMembreCommunaute, retirerMembreCommunaute, estMembreCommunaute } from '../Models/communauteMembresModel.js';
import { getCurrentUser } from '../Models/userModel.js';

export function CommunauteDetails(props) {
    const params = props.params || {};
    const communauteId = params.id;
    
    setTimeout(() => chargerDetailCommunaute(), 100);
    
    return {
        tag: 'div',
        attributes: [['class', 'community-details-page']],
        children: [
            {
                tag: 'div',
                attributes: [['class', 'community-hero']],
                children: [
                    {
                        tag: 'div',
                        attributes: [['class', 'community-hero-card']],
                        children: [
                            {
                                tag: 'p',
                                attributes: [['class', 'community-category-badge h3'], ['id', 'community-status-badge']],
                            },
                            {
                                tag: 'div',
                                attributes: [['class', 'community-hero-card-container']],
                                children: [
                                    {
                                        tag: 'h1',
                                        attributes: [['class', 'community-hero-title'], ['id', 'community-title']],
                                    },
                                    {
                                        tag: 'p',
                                        attributes: [['class', 'community-hero-date h3'], ['id', 'community-date']],
                                    },
                                    {
                                        tag: 'p',
                                        attributes: [['class', 'community-hero-location'], ['id', 'community-location']],
                                    }
                                ]
                            },
                            {
                                tag: 'div',
                                attributes: [['class', 'community-hero-buttons']],
                                children: [
                                    {
                                        tag: 'button',
                                        attributes: [['class', 'community-subscribe-btn bouton-primary-2'], ['id', 'join-community-btn']],
                                        children: ['Rejoindre la communauté']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: 'div',
                        attributes: [['class', 'community-hero-image'], ['id', 'community-hero-image']],
                        children: []
                    }
                ]
            },
            {
                tag: 'div',
                attributes: [['class', 'community-main-content']],
                children: [
                    {
                        tag: 'div',
                        attributes: [['class', 'community-content-left']],
                        children: [
                            {
                                tag: 'div',
                                attributes: [['class', 'community-about']],
                                children: [
                                    {
                                        tag: 'h2',
                                        attributes: [['class', 'h1']],
                                        children: ['À propos']
                                    },
                                    {
                                        tag: 'p',
                                        attributes: [['class', 'community-description-details'], ['id', 'community-description']],
                                        children: ['Chargement de la description...']
                                    }
                                ]
                            },
                            {
                                tag: 'div',
                                attributes: [['class', 'community-stats']],
                                children: [
                                    {
                                        tag: 'div',
                                        attributes: [['class', 'community-stat']],
                                        children: [
                                            {
                                                tag: 'p',
                                                attributes: [['class', 'community-stat-label']],
                                                children: ['Membres']
                                            },
                                            {
                                                tag: 'p',
                                                attributes: [['class', 'community-stat-number h2-chiffres-bento'], ['id', 'community-members']],
                                                children: ['0']
                                            }
                                        ]
                                    },
                                    {
                                        tag: 'div',
                                        attributes: [['class', 'community-stat']],
                                        children: [
                                            {
                                                tag: 'p',
                                                attributes: [['class', 'community-stat-label']],
                                                children: ['Statut :']
                                            },
                                            {
                                                tag: 'p',
                                                attributes: [['class', 'community-stat-number h2-chiffres-bento'], ['id', 'community-status']],
                                                children: ['---']
                                            }
                                        ]
                                    },
                                    {
                                        tag: 'div',
                                        attributes: [['class', 'community-stat']],
                                        children: [
                                            {
                                                tag: 'p',
                                                attributes: [['class', 'community-stat-label']],
                                                children: ['Référent :']
                                            },
                                            {
                                                tag: 'p',
                                                attributes: [['class', 'community-stat-number h2-chiffres-bento'], ['id', 'community-referent']],
                                                children: ['---']
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: 'div',
                        attributes: [['class', 'community-content-right']],
                        children: [
                            {
                                tag: 'div',
                                attributes: [['class', 'community-details-card']],
                                children: [
                                    {
                                        tag: 'h3',
                                        children: ['Détails']
                                    },
                                    {
                                        tag: 'div',
                                        attributes: [['class', 'community-details-list']],
                                        children: [
                                            {
                                                tag: 'p',
                                                attributes: [['class', 'community-detail-item']],
                                                children: [
                                                    {
                                                        tag: 'strong',
                                                        children: ['Date de création :']
                                                    },
                                                    {
                                                        tag: 'span',
                                                        attributes: [['id', 'community-creation-date']],
                                                        children: ['---']
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                tag: 'section',
                attributes: [['class', 'similar-communities-section']],
                children: [
                    {
                        tag: 'h2',
                        children: ['D\'autres communautés similaires']
                    },
                    {
                        tag: 'div',
                        attributes: [['class', 'similar-communities-carousel']],
                        children: [
                            {
                                tag: 'div',
                                attributes: [['class', 'similar-communities-container']],
                                children: [
                                    {
                                        tag: 'div',
                                        attributes: [['class', 'similar-communities-grid'], ['id', 'similar-communities']],
                                        children: []
                                    }
                                ]
                            },
                            {
                                tag: 'div',
                                attributes: [['class', 'carousel-controls']],
                                children: [
                                    {
                                        tag: 'div',
                                        attributes: [['class', 'carousel-indicators'], ['id', 'carousel-indicators']],
                                        children: []
                                    },
                                    {
                                        tag: 'div',
                                        attributes: [['class', 'carousel-nav-buttons']],
                                        children: [
                                            {
                                                tag: 'button',
                                                attributes: [['class', 'carousel-nav-btn carousel-prev'], ['id', 'carousel-prev'], ['aria-label', 'Communauté précédente']],
                                            },
                                            {
                                                tag: 'button',
                                                attributes: [['class', 'carousel-nav-btn carousel-next'], ['id', 'carousel-next'], ['aria-label', 'Communauté suivante']],
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };

    async function chargerDetailCommunaute() {
        if (!communauteId) {
            showError('ID de communauté manquant');
            return;
        }

        try {
            const communaute = await getCommunauteById(communauteId);
            updateCommunauteDisplay(communaute);
        } catch (error) {
            showError('Communauté non trouvée');
        }
    }

    function showError(message) {
        const communityContent = document.getElementById('community-content');
        if (communityContent) {
            communityContent.innerHTML = `
                <div class="error-message">
                    <h2>Erreur</h2>
                    <p>${message}</p>
                    <button onclick="window.history.back()" class="back-to-communities-btn">
                        Retour aux communautés
                    </button>
                </div>
            `;
        }
    }

    async function updateCommunauteDisplay(communaute) {
        const communityTitle = document.getElementById('community-title');
        const communityDate = document.getElementById('community-date');
        const communityLocation = document.getElementById('community-location');
        const communityDescription = document.getElementById('community-description');
        const communityMembers = document.getElementById('community-members');
        const communityStatus = document.getElementById('community-status');
        const communityReferent = document.getElementById('community-referent');
        const communityCreationDate = document.getElementById('community-creation-date');
        const joinButton = document.getElementById('join-community-btn');
        const communityHeroImage = document.getElementById('community-hero-image');
        const communityStatusBadge = document.getElementById('community-status-badge');

        if (communityTitle) communityTitle.textContent = communaute.nom || 'Communauté';
        if (communityDate) communityDate.textContent = formatDateWithTime(communaute.date_creation);
        if (communityLocation) communityLocation.textContent = communaute.lieu || 'Lieu non précisé';
        
        if (communityStatusBadge) {
            const statusText = communaute.status === 'active' ? 'Active' : 'Inactive';
            communityStatusBadge.textContent = statusText;
        }
        
        if (communityDescription) {
            const description = communaute.description || 'Description non disponible';
            communityDescription.textContent = description;
        }
        
        if (communityMembers) {
            const memberCount = await getCommunauteMemberCount(communauteId);
            communityMembers.textContent = memberCount.toString();
        }
        
        if (communityStatus) {
            const statusText = communaute.status === 'active' ? 'Active' : 'Inactive';
            communityStatus.textContent = statusText;
        }
        
        if (communityReferent) {
            if (communaute.referent) {
                loadReferentName(communaute.referent);
            } else {
                communityReferent.textContent = 'Référent non défini';
            }
        }
        
        if (communityCreationDate) {
            communityCreationDate.textContent = formatSimpleDate(communaute.date_creation);
        }

        if (communityHeroImage) {
            const imageUrl = communaute.image || '/Assets/images/eventImage.png';
            communityHeroImage.style.backgroundImage = `url(${imageUrl})`;
        }

        if (joinButton) {
            checkUserMembershipStatus(communaute.id);
        }

        loadSimilarCommunities();
    }

    async function checkUserMembershipStatus(communauteId) {
        try {
            const userStorage = localStorage.getItem('user');
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const currentUser = userStorage && isLoggedIn ? JSON.parse(userStorage) : null;
            
            if (!currentUser?.id || !isLoggedIn) {
                return setupJoinButton(communauteId, false, false);
            }

            const isMember = await estMembreCommunaute(currentUser.id, communauteId);
            setupJoinButton(communauteId, isMember, true);
        } catch (error) {
            setupJoinButton(communauteId, false, false);
        }
    }

    function setupJoinButton(communauteId, isMember, isLoggedIn) {
        const joinButton = document.getElementById('join-community-btn');
        if (!joinButton) return;

        if (!isLoggedIn) {
            joinButton.textContent = 'Se connecter pour rejoindre';
            joinButton.classList.remove('joined');
            joinButton.onclick = () => {
                window.router.navigate('/connexion');
            };
            return;
        }

        if (isMember) {
            joinButton.textContent = 'Quitter la communauté';
            joinButton.classList.add('joined');
        } else {
            joinButton.textContent = 'Rejoindre la communauté';
            joinButton.classList.remove('joined');
        }

        joinButton.onclick = () => {
            handleCommunityMembership(communauteId, !isMember);
        };
    }

    async function loadReferentName(referentId) {
        try {
            const referent = await getUserById(referentId);
            
            const communityReferent = document.getElementById('community-referent');
            if (communityReferent && referent) {
                const referentName = getReferentDisplayName(referent);
                communityReferent.textContent = referentName;
            }
        } catch (error) {
            const communityReferent = document.getElementById('community-referent');
            if (communityReferent) {
                communityReferent.textContent = 'Référent inconnu';
            }
        }
    }

    function getReferentDisplayName(referent) {
        return referent.prenom && referent.nom ? `${referent.prenom} ${referent.nom}` :
               referent.pseudo || referent.username || referent.nom_complet || referent.full_name || 
               referent.nom || referent.prenom || 'Référent';
    }

    async function handleCommunityMembership(communauteId, join) {
        try {
            const userStorage = localStorage.getItem('user');
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const currentUser = userStorage && isLoggedIn ? JSON.parse(userStorage) : null;
            
            if (!currentUser?.id || !isLoggedIn) {
                alert('Vous devez être connecté pour rejoindre une communauté');
                return window.router.navigate('/connexion');
            }

            const joinButton = document.getElementById('join-community-btn');
            if (joinButton) {
                joinButton.disabled = true;
                joinButton.textContent = join ? 'Inscription...' : 'Désinscription...';
            }

            if (join) {
                await ajouterMembreCommunaute(currentUser.id, communauteId);
                showNotification('Vous avez rejoint la communauté avec succès !', 'success');
            } else {
                const confirmLeave = confirm('Êtes-vous sûr de vouloir quitter cette communauté ?');
                if (!confirmLeave) {
                    setupJoinButton(communauteId, true, true);
                    return;
                }
                await retirerMembreCommunaute(currentUser.id, communauteId);
                showNotification('Vous avez quitté la communauté', 'success');
            }

            setupJoinButton(communauteId, join, true);
            updateCommunauteMembersDisplay(await getCommunauteMemberCount(communauteId));

        } catch (error) {
            showNotification(error.message || 'Une erreur est survenue', 'error');
            setupJoinButton(communauteId, !join, true);
        } finally {
            const joinButton = document.getElementById('join-community-btn');
            if (joinButton) joinButton.disabled = false;
        }
    }

    function updateCommunauteMembersDisplay(memberCount) {
        const communityMembers = document.getElementById('community-members');
        if (communityMembers) {
            communityMembers.textContent = memberCount.toString();
        }
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {success: '#4CAF50', error: '#f44336', info: '#2196F3'};
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `position:fixed;top:20px;right:20px;padding:1rem 2rem;background:${colors[type]||colors.info};color:white;border-radius:8px;z-index:10000;box-shadow:0 4px 12px rgba(0,0,0,0.3);opacity:0;transform:translateX(100%);transition:all 0.3s ease`;
        
        document.body.appendChild(notification);
        setTimeout(() => { notification.style.opacity='1'; notification.style.transform='translateX(0)'; }, 10);
        setTimeout(() => {
            notification.style.opacity='0';
            notification.style.transform='translateX(100%)';
            setTimeout(() => notification.parentNode?.removeChild(notification), 300);
        }, 3000);
    }

    function formatDateWithTime(dateString) {
        if (!dateString) return 'Date non précisée';
        const date = new Date(dateString);
        return `Créée le ${date.toLocaleDateString('fr-FR', {day:'2-digit',month:'2-digit',year:'numeric'})}`;
    }

    function formatSimpleDate(dateString) {
        return dateString ? new Date(dateString).toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'}) : 'Date à définir';
    }

    function truncateText(text, maxLength) {
        return text && text.length > maxLength ? text.substring(0, maxLength) + '...' : text || '';
    }

    async function loadSimilarCommunities() {
        const similarCommunitiesContainer = document.getElementById('similar-communities');
        if (!similarCommunitiesContainer) return;
        
        try {
            const allCommunities = await getAllCommunautes();
            const otherCommunities = allCommunities.filter(c => c.id != communauteId);
            
            if (otherCommunities.length === 0) {
                similarCommunitiesContainer.innerHTML = '<p style="color:white;text-align:center;padding:2rem;">Aucune autre communauté disponible pour le moment.</p>';
                return;
            }
            
            similarCommunitiesContainer.innerHTML = '';
            otherCommunities.forEach(community => {
                const communityCard = document.createElement('div');
                communityCard.className = 'community-card';
                
                const description = community.description || 'Description à venir';
                const memberCount = community.member_count || 0;
                const memberText = memberCount === 0 ? 'Aucun membre' : 
                                  memberCount === 1 ? '1 membre' : 
                                  `${memberCount} membres`;
                
                communityCard.innerHTML = `
                    <div class="similar-community-image">
                        <img src="${community.image || '/Assets/images/banner-femme.webp'}" alt="${community.nom}" style="width: 100%; height: 100%; object-fit: cover;" />
                    </div>
                    <div class="similar-community-content">
                        <h4>${community.nom || 'Communauté sans nom'}</h4>
                        <p class="similar-community-date">${formatSimpleDate(community.date_creation)}</p>
                        <p class="similar-community-location">${community.lieu || 'Lieu à définir'}</p>
                        <p class="similar-community-description">${truncateText(description, 80)}</p>
                        <p class="similar-community-price">${memberText}</p>
                    </div>
                `;
                communityCard.onclick = () => window.router.navigate(`/communautes/${community.id}`);
                similarCommunitiesContainer.appendChild(communityCard);
            });
            
            initializeCarousel();
        } catch (error) {
            similarCommunitiesContainer.innerHTML = '<p style="color:white;text-align:center;padding:2rem;">Erreur lors du chargement des communautés similaires.</p>';
        }
    }

    function initializeCarousel() {
        const container = document.getElementById('similar-communities');
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        const indicatorsContainer = document.getElementById('carousel-indicators');
        
        if (!container || !prevBtn || !nextBtn) return;
        
        const cards = container.children;
        const cardsPerView = window.innerWidth <= 768 ? 1 : 2;
        const totalCards = cards.length;
        const totalSlides = Math.ceil(totalCards / cardsPerView);
        let currentSlide = 0;
        
        const cardGroups = [];
        for (let i = 0; i < totalCards; i += cardsPerView) {
            cardGroups.push(Array.from(cards).slice(i, i + cardsPerView));
        }
        
        indicatorsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('button');
            indicator.className = `carousel-indicator ${i === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
        
        function updateCarousel() {
            const containerWidth = container.parentElement.offsetWidth;
            const translateX = -(currentSlide * containerWidth);
            container.style.transform = `translateX(${translateX}px)`;
            
            const indicators = indicatorsContainer.children;
            Array.from(indicators).forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
            
            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide === totalSlides - 1;
        }
        
        function goToSlide(slideIndex) {
            currentSlide = Math.max(0, Math.min(slideIndex, totalSlides - 1));
            updateCarousel();
        }
        
        function nextSlide() {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateCarousel();
            }
        }
        
        function prevSlide() {
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
            }
        }
        
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        updateCarousel();
        
        window.addEventListener('resize', () => setTimeout(initializeCarousel, 100));
    }
}

export default CommunauteDetails;
