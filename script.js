// =============================
// CHECK CONNECTION
// =============================
console.log("JavaScript Connected ✅");


// =============================
// SCROLL ANIMATION (IMPROVED)
// =============================
const elements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show'); // optional (re-animate)
        }
    });
}, {
    threshold: 0.2
});

elements.forEach(el => observer.observe(el));


// =============================
// SMOOTH SCROLL (NAV + BUTTONS)
// =============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const navbarHeight = document.getElementById("navbar").offsetHeight;

            window.scrollTo({
                top: targetSection.offsetTop - navbarHeight,
                behavior: "smooth"
            });
        }
    });
});


// =============================
// ACTIVE NAVBAR LINK ON SCROLL
// =============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-center a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


// =============================
// BUTTON SCROLL FUNCTION (FIXED)
// =============================
function scrollToProjects() {
    const section = document.getElementById("projects");
    const navbarHeight = document.getElementById("navbar").offsetHeight;

    window.scrollTo({
        top: section.offsetTop - navbarHeight,
        behavior: "smooth"
    });
}

// =============================
// CONTACT FORM SUBMIT (BACKEND)
// =============================
const form = document.getElementById("contact-form");

if (form) {
    form.addEventListener("submit", async function(e) {
        e.preventDefault();
        console.log("Form submitted ✅");

        const formData = {
            name: form.name.value,
            number: form.number.value,
            email: form.email.value,
            message: form.message.value
        };


        try {
            const res = await fetch("http://localhost:5000/contact", { // ✅ FIXED
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.text();
            alert(data);

            form.reset();

        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong ❌");
        }
    });
}