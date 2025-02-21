document.addEventListener("DOMContentLoaded", function () {
    initializeDarkMode();
    initializeBackToTopButton();
    initializeSmoothScrolling();
    initializeTypingEffect();
    initializeProjectHoverEffect();
    initializeSkillProgressBars();
    initializeReadMoreButton();
});


function initializeDarkMode() {
    // create the button
    const darkModeToggle = document.createElement("button");
    darkModeToggle.textContent = "Dark Mode";
    darkModeToggle.style.position ="fixed";
    darkModeToggle.style.top = "4rem";
    darkModeToggle.style.right = "0.5rem";
    darkModeToggle.style.padding = "1rem";
    darkModeToggle.style.backgroundColor ="#4B164C";
    darkModeToggle.style.color = "#fff";
    darkModeToggle.style.border = "none";
    darkModeToggle.style.cursor = "pointer";
    document.body.appendChild(darkModeToggle);

    // create an i element to add the icon to it
    const iElementDarkMode = document.createElement("i")
    iElementDarkMode.classList.add("fa-solid", "fa-lightbulb");
    iElementDarkMode.style.marginLeft = "0.5rem";
    darkModeToggle.appendChild(iElementDarkMode)

    darkModeToggle.addEventListener("click", ()=>{
        document.body.classList.toggle("dark-mode");  
    });
}


function initializeBackToTopButton() { 
    // create the back to top btn
    const backToTop= document.createElement("button");
    backToTop.textContent = "Back to top";
    backToTop.style.position ="fixed";
    backToTop.style.bottom = "1rem";
    backToTop.style.right = "1rem";
    backToTop.style.padding = "0.7rem";
    backToTop.style.backgroundColor ="white";
    backToTop.style.color = "#4B164C";
    backToTop.style.border = "none";
    backToTop.style.fontWeight ="600"
    backToTop.style.borderRadius = "0.5rem";
    backToTop.style.cursor = "pointer";
    backToTop.style.display="none";
    document.body.appendChild(backToTop);

    // create an i element to add the icon to it
    const iElementTop = document.createElement("i")
    iElementTop.classList.add("fa-solid", "fa-arrow-up");
    iElementTop.style.marginLeft = "0.5rem";
    backToTop.appendChild(iElementTop);
    
    // add event listener to scroll to top
    window.addEventListener("scroll", () =>{
        if(window.scrollY > 200){
            backToTop.style.display="block";
        } else{
            backToTop.style.display="none";
        }
        });
    backToTop.addEventListener("click", ()=>{
            window.scrollTo({top: 0, behavior: "smooth" });
        });

}

//Smooth Scrolling for Nav Links
function initializeSmoothScrolling() {
    document.querySelectorAll("nav ul a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
        });
    });
}

// Typing Effect for Intro Section
function initializeTypingEffect() {
    const introText = "Front-End Developer | HTML, CSS, JavaScript, and Python.";
    let i = 0;

    function typeEffect() {
        if (i < introText.length) {
            document.getElementById("intro-text").textContent += introText.charAt(i);
            i++;
            setTimeout(typeEffect, 50);
        }
    }

    typeEffect(); // Call function to start typing effect
}

// Hover Effect for Project Images
function initializeProjectHoverEffect() {
    document.querySelectorAll(".project img").forEach(img => {
        img.addEventListener("mouseover", () => {
            img.style.transform = "scale(1.1)";
            img.style.transition = "0.3s ease-in-out"; // Fixed missing 's'
        });
        img.addEventListener("mouseleave", () => {
            img.style.transform = "scale(1)";
        });
    });
}

// Skill Progress Bars

function initializeSkillProgressBars() {
    const skills = [
        { name: "HTML", level: 90 },
        { name: "CSS", level: 85 },
        { name: "JavaScript", level: 75 },
        { name: "Python", level: 65 },
        { name: "APIs", level: 60 },
        { name: "Version Control", level: 70 },
        { name: "UX/UI Design", level: 70 }
    ];

    const skillsContainer = document.querySelector(".skills");
    if (!skillsContainer) {
        console.error("Error: Skills container not found.");
        return;
    }

    skillsContainer.innerHTML = `<h3>Skills:</h3>`;

    skills.forEach(skill => {
        const skillDiv = document.createElement("div");
        skillDiv.classList.add("skill");

        skillDiv.innerHTML = `
            <p>${skill.name}</p>
            <div class="progress-bar">
                <div class="progress" style="width: 0%;" data-width="${skill.level}%"></div>
            </div>
        `;

        skillsContainer.appendChild(skillDiv);
    });

    // Animate Progress Bars
    setTimeout(() => {
        document.querySelectorAll(".progress").forEach(progressBar => {
            progressBar.style.transition = "width 1s ease-in-out";
            progressBar.style.width = progressBar.getAttribute("data-width");
        });
    }, 500);
}



// Read More Button

function initializeReadMoreButton(){
    const experience = document.querySelector(".experience");
    const readMoreButton = document.createElement("button");
    readMoreButton.textContent = "Read More";
    readMoreButton.classList.add("read-more-btn");

    let isExpanded = false;
    const fullText = experience.innerHTML;
    const shortText = fullText.split("<br>")[0] + "...";
    experience.innerHTML = shortText;
    experience.appendChild(readMoreButton);

    readMoreButton.addEventListener("click", () => {
        isExpanded =!isExpanded;
        experience.innerHTML = isExpanded ? fullText :shortText;
        experience.appendChild(readMoreButton);
        readMoreButton.textContent = isExpanded? "Read Less" : "Read More";
    });
};