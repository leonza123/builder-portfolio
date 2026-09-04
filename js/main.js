const portfolioContainer = document.getElementById("portfolio");
const servicesContainer = document.getElementById("services");

const navButtons = document.querySelectorAll(".nav-button");
const tabSections = document.querySelectorAll(".tab-section");

const modal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalCounter = document.getElementById("modal-counter");
const modalClose = document.getElementById("modal-close");
const modalPrevious = document.getElementById("modal-previous");
const modalNext = document.getElementById("modal-next");

let activeProject = null;
let activeImageIndex = 0;

function renderPortfolio() {
    portfolioContainer.innerHTML = "";

    if (!Array.isArray(portfolioProjects) || portfolioProjects.length === 0) {
        portfolioContainer.innerHTML = `
            <div class="empty-state">
                No portfolio projects have been added yet.
            </div>
        `;
        return;
    }

    portfolioProjects.forEach((project) => {
        if (!project.images || project.images.length === 0) {
            return;
        }

        const card = document.createElement("article");
        card.className = "project-card";

        const button = document.createElement("button");
        button.className = "project-card-button";
        button.type = "button";
        button.setAttribute("aria-label", `Open ${project.title} gallery`);

        const imageCountText =
            project.images.length === 1
                ? "1 photo"
                : `${project.images.length} photos`;

        button.innerHTML = `
            <div class="project-image-wrapper">
                <img
                    class="project-image"
                    src="${project.images[0]}"
                    alt="${escapeHtml(project.title)}"
                    loading="lazy"
                >
                <span class="project-image-count">${imageCountText}</span>
            </div>

            <div class="project-copy">
                <h3>${escapeHtml(project.title)}</h3>
                <p>${escapeHtml(project.description || "")}</p>
            </div>
        `;

        button.addEventListener("click", () => {
            openProject(project);
        });

        card.appendChild(button);
        portfolioContainer.appendChild(card);
    });
}

function renderServices() {
    servicesContainer.innerHTML = "";

    if (!Array.isArray(services) || services.length === 0) {
        servicesContainer.innerHTML = `
            <div class="empty-state">
                No services have been added yet.
            </div>
        `;
        return;
    }

    services.forEach((group) => {
        const groupDetails = document.createElement("details");
        groupDetails.className = "service-group";

        const groupSummary = document.createElement("summary");
        groupSummary.textContent = group.title;

        const groupContent = document.createElement("div");
        groupContent.className = "service-group-content";

        (group.categories || []).forEach((category) => {
            const categoryDetails = document.createElement("details");
            categoryDetails.className = "service-category";

            const categorySummary = document.createElement("summary");
            categorySummary.textContent = category.title;

            const list = document.createElement("ul");
            list.className = "service-items";

            (category.services || []).forEach((service) => {
                const item = document.createElement("li");
                item.textContent = service;
                list.appendChild(item);
            });

            categoryDetails.appendChild(categorySummary);
            categoryDetails.appendChild(list);
            groupContent.appendChild(categoryDetails);
        });

        groupDetails.appendChild(groupSummary);
        groupDetails.appendChild(groupContent);
        servicesContainer.appendChild(groupDetails);
    });
}

function switchTab(tabName) {
    navButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.tab === tabName);
    });

    tabSections.forEach((section) => {
        section.classList.toggle(
            "active",
            section.id === `${tabName}-section`
        );
    });
}

function openProject(project) {
    activeProject = project;
    activeImageIndex = 0;
    updateModal();

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    modalClose.focus();
}

function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    activeProject = null;
    activeImageIndex = 0;
}

function updateModal() {
    if (!activeProject) {
        return;
    }

    const images = activeProject.images || [];
    const imagePath = images[activeImageIndex];

    modalImage.src = imagePath;
    modalImage.alt = activeProject.title || "Portfolio image";
    modalTitle.textContent = activeProject.title || "";
    modalDescription.textContent = activeProject.description || "";
    modalCounter.textContent =
        images.length > 1
            ? `${activeImageIndex + 1} / ${images.length}`
            : "";

    const hasMultipleImages = images.length > 1;
    modalPrevious.classList.toggle("hidden", !hasMultipleImages);
    modalNext.classList.toggle("hidden", !hasMultipleImages);
}

function showPreviousImage() {
    if (!activeProject || activeProject.images.length <= 1) {
        return;
    }

    activeImageIndex =
        (activeImageIndex - 1 + activeProject.images.length) %
        activeProject.images.length;

    updateModal();
}

function showNextImage() {
    if (!activeProject || activeProject.images.length <= 1) {
        return;
    }

    activeImageIndex =
        (activeImageIndex + 1) %
        activeProject.images.length;

    updateModal();
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

navButtons.forEach((button) => {
    button.addEventListener("click", () => {
        switchTab(button.dataset.tab);
    });
});

modalClose.addEventListener("click", closeModal);
modalPrevious.addEventListener("click", showPreviousImage);
modalNext.addEventListener("click", showNextImage);

document.querySelectorAll("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("open")) {
        return;
    }

    if (event.key === "Escape") {
        closeModal();
    } else if (event.key === "ArrowLeft") {
        showPreviousImage();
    } else if (event.key === "ArrowRight") {
        showNextImage();
    }
});

renderPortfolio();
renderServices();
