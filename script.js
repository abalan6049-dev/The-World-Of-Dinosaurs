/* =========================================
   DINOVERSE JAVASCRIPT
========================================= */

/* Hero T. rex image */
const hero = document.querySelector(".hero");

const heroImageStyle = document.createElement("style");
heroImageStyle.textContent = `
    .hero::before {
        content: "";
        background: none;
    }

    .hero-trex {
        position: absolute;
        z-index: 1;
        right: 4%;
        top: 17%;
        width: min(48vw, 650px);
        max-height: 75vh;
        object-fit: contain;
        object-position: center;
        filter: drop-shadow(0 25px 35px rgba(0, 0, 0, .55));
        opacity: .9;
        pointer-events: none;
        animation: trexFloat 5s ease-in-out infinite;
    }

    @keyframes trexFloat {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
        }

        50% {
            transform: translateY(-12px) rotate(-1deg);
        }
    }

    @media (max-width: 750px) {
        .hero-trex {
            width: 65vw;
            right: -12%;
            top: 48%;
            opacity: .28;
        }
    }

    @media (max-width: 450px) {
        .hero-trex {
            width: 75vw;
            top: 53%;
            right: -18%;
        }
    }
`;
document.head.appendChild(heroImageStyle);

const trexImage = document.createElement("img");
trexImage.className = "hero-trex";
trexImage.src =
    "https://upload.wikimedia.org/wikipedia/commons/3/37/Tyrannosaurus_Rex_by_Scott_Hartman.jpg";
trexImage.alt = "Tyrannosaurus rex illustration";
hero.appendChild(trexImage);


/* =========================================
   PRELOADER
========================================= */

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        preloader.classList.add("hidden");
    }, 900);
});


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
    });
});


/* =========================================
   DINOSAUR FILTER
========================================= */

const filters = document.querySelectorAll(".filter");
const dinoCards = document.querySelectorAll(".dino-card");

filters.forEach(filter => {
    filter.addEventListener("click", () => {
        filters.forEach(button => button.classList.remove("active"));
        filter.classList.add("active");

        const selectedFilter = filter.dataset.filter;

        dinoCards.forEach(card => {
            const matches =
                selectedFilter === "all" ||
                selectedFilter === card.dataset.type;

            if (matches) {
                card.style.display = "block";

                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                }, 20);
            } else {
                card.style.opacity = "0";
                card.style.transform = "translateY(20px)";

                setTimeout(() => {
                    card.style.display = "none";
                }, 300);
            }
        });
    });
});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    ".dino-card, .theory-card, .fossil-card, .timeline-item, .survivor-box"
);

revealElements.forEach(element => element.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

revealElements.forEach(element => revealObserver.observe(element));


/* =========================================
   BACK TO TOP
========================================= */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 600);
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* =========================================
   QUIZ
========================================= */

const quizQuestions = [
    {
        question: "Which dinosaur had three horns?",
        answers: [
            "Tyrannosaurus rex",
            "Triceratops",
            "Stegosaurus",
            "Velociraptor"
        ],
        correct: 1
    },
    {
        question: "Approximately when did the non-avian dinosaurs disappear?",
        answers: [
            "10 million years ago",
            "35 million years ago",
            "66 million years ago",
            "150 million years ago"
        ],
        correct: 2
    },
    {
        question: "Which dinosaur is famous for its large plates?",
        answers: [
            "Stegosaurus",
            "T. rex",
            "Ankylosaurus",
            "Velociraptor"
        ],
        correct: 0
    },
    {
        question: "What is the strongest scientific explanation for the K-Pg extinction?",
        answers: [
            "A giant asteroid impact",
            "Dinosaurs stopped eating",
            "Earth stopped rotating",
            "The Moon disappeared"
        ],
        correct: 0
    },
    {
        question: "Which living animals are considered surviving dinosaurs?",
        answers: [
            "Crocodiles",
            "Lizards",
            "Birds",
            "Turtles"
        ],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("nextQuestion");
const questionNumber = document.getElementById("questionNumber");
const progress = document.getElementById("progress");
const quizResult = document.getElementById("quizResult");

function loadQuestion() {
    selectedAnswer = false;
    nextButton.disabled = true;
    quizResult.textContent = "";

    const question = quizQuestions[currentQuestion];

    questionElement.textContent = question.question;
    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
    progress.style.width =
        `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;

    answersElement.innerHTML = "";

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "answer";
        button.textContent = answer;

        button.addEventListener("click", () => {
            selectAnswer(button, index);
        });

        answersElement.appendChild(button);
    });
}

function selectAnswer(button, index) {
    if (selectedAnswer) return;

    selectedAnswer = true;

    const question = quizQuestions[currentQuestion];
    const allAnswers = document.querySelectorAll(".answer");

    allAnswers.forEach(answer => {
        answer.disabled = true;
    });

    if (index === question.correct) {
        button.classList.add("correct");
        score++;
        quizResult.textContent =
            "✓ Correct! Excellent prehistoric knowledge.";
    } else {
        button.classList.add("wrong");
        allAnswers[question.correct].classList.add("correct");
        quizResult.textContent =
            "✕ Not quite! The highlighted answer is correct.";
    }

    nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {
        loadQuestion();
    } else {
        showQuizResult();
    }
});

function showQuizResult() {
    questionNumber.textContent = "QUIZ COMPLETE";
    progress.style.width = "100%";
    questionElement.textContent =
        `You scored ${score} out of ${quizQuestions.length}!`;
    answersElement.innerHTML = "";

    nextButton.textContent = "Play Again";
    nextButton.disabled = false;

    if (score === quizQuestions.length) {
        quizResult.textContent =
            "🏆 PERFECT SCORE! You are a true Dino Expert!";
    } else if (score >= 3) {
        quizResult.textContent =
            "🦖 Great job! You know a lot about dinosaurs.";
    } else {
        quizResult.textContent =
            "🌋 Keep exploring DinoVerse and try again!";
    }

    nextButton.onclick = () => {
        currentQuestion = 0;
        score = 0;
        nextButton.textContent = "Next Question →";
        nextButton.onclick = null;
        loadQuestion();
    };
}


/* =========================================
   PARALLAX EFFECT
========================================= */

window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition < window.innerHeight) {
        hero.style.backgroundPosition =
            `center ${scrollPosition * 0.25}px`;
    }
});


/* =========================================
   INITIALIZE QUIZ
========================================= */

loadQuestion();


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.style.color = "";

        if (link.getAttribute("href") === `#${current}`) {
            link.style.color = "var(--green-light)";
        }
    });
});


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
    "🦖 Welcome to DinoVerse — explore the prehistoric world!"
);
