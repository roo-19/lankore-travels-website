import { toursData } from './data/tours-data.js';

document.addEventListener('DOMContentLoaded', () => {
    // Determine the tour ID from the URL (e.g., ?id=classic-3-days)
    const urlParams = new URLSearchParams(window.location.search);
    const tourId = urlParams.get('id');

    const tour = toursData[tourId];

    if (!tour) {
        document.getElementById('tour-page-title').innerHTML = "Tour Not Found";
        document.getElementById('tour-overview-content').innerHTML = "<p>We couldn't find the requested tour. Please return to the Tours catalog to try again.</p>";
        // Hide UI elements that shouldn't show
        const metaGrid = document.querySelector('.tour-meta-grid');
        if (metaGrid) metaGrid.style.display = 'none';
        return;
    }

    // Populate Page Title & Meta
    document.title = `${tour.pageTitle} | Lankore Travels`;
    setText('tour-page-title', tour.pageTitle);
    setText('tour-duration-meta', tour.duration);
    setText('tour-type-meta', tour.tourType);
    setText('tour-location-meta', tour.location);
    setText('tour-overview-title', tour.overviewTitle);

    // Dynamic Rating Stars
    const ratingContainer = document.querySelector('.meta-rating');
    if (ratingContainer) {
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(tour.rating)) {
                starsHtml += '<i class="fas fa-star"></i>';
            } else if (i < tour.rating && tour.rating % 1 !== 0) {
                starsHtml += '<i class="fas fa-star-half-alt"></i>';
            } else {
                starsHtml += '<i class="far fa-star"></i>';
            }
        }
        ratingContainer.innerHTML = starsHtml;
    }

    // Populate Overview
    const overviewContainer = document.getElementById('tour-overview-content');
    if (overviewContainer && tour.overviewParagraphs) {
        overviewContainer.innerHTML = tour.overviewParagraphs.map(p => `<p>${p}</p>`).join('');
    }

    // Populate Itinerary Accordion
    const itineraryContainer = document.getElementById('tour-itinerary');
    if (itineraryContainer && tour.itinerary) {
        let itineraryHtml = '';
        tour.itinerary.forEach((day, index) => {
            const isFirst = index === 0;
            itineraryHtml += `
            <div class="accordion-item ${isFirst ? 'active' : ''}">
                <div class="accordion-header">
                    ${day.dayTitle} <i class="fas fa-chevron-down"></i>
                </div>
                <div class="accordion-content" style="${isFirst ? 'max-height: 2000px;' : 'max-height: null;'}">
                    <div class="accordion-body">
                        <p>${day.description}</p>
                        ${day.accommodation ? `
                        <div class="day-overview">
                            <strong>ACCOMMODATION:</strong>
                            <ul class="info-list" style="margin-top: 10px;">
                                <li>Type: ${day.accommodation.type}</li>
                                <li>Meal Plan: ${day.accommodation.mealPlan}</li>
                            </ul>
                        </div>` : ''}
                    </div>
                </div>
            </div>`;
        });
        itineraryContainer.innerHTML = itineraryHtml;
        
        // Re-attach accordion logic after inserting new HTML
        setupAccordion();
    }

    // Populate Inclusions & Exclusions
    const inclusionsContainer = document.getElementById('tour-inclusions');
    if (inclusionsContainer && tour.inclusions) {
        inclusionsContainer.innerHTML = tour.inclusions.map(inc => `<li><i class="fas fa-check"></i> ${inc}</li>`).join('');
    }

    const exclusionsContainer = document.getElementById('tour-exclusions');
    if (exclusionsContainer && tour.exclusions) {
        exclusionsContainer.innerHTML = tour.exclusions.map(exc => `<li><i class="fas fa-times"></i> ${exc}</li>`).join('');
    }
});

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function setupAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        // Remove existing listener if any, by cloning (edge case guard, but usually this is fresh HTML)
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);

        newHeader.addEventListener('click', () => {
            // Close other items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            const content = item.querySelector('.accordion-content');
            
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // Need to reset the max-height of the active one to absolute pixel value after DOM render
    setTimeout(() => {
        const firstActive = document.querySelector('.accordion-item.active .accordion-content');
        if (firstActive) {
            firstActive.style.maxHeight = firstActive.scrollHeight + "px";
        }
    }, 100);
}
