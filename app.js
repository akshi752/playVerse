const hamburger = document.querySelector(".hamburger");
      const navBar = document.querySelector(".nav-bar");
      const headingRobo = document.querySelector(".heading-robo");

      hamburger.addEventListener("click", () => {
        navBar.classList.toggle("show");
        headingRobo.classList.toggle("space");
      });
      document.addEventListener("mousemove", (e) => {
        const eyes = document.querySelectorAll(".eye");
        eyes.forEach((eye) => {
          const rect = eye.getBoundingClientRect();
          const eyeCenterX = rect.left + rect.width / 2;
          const eyeCenterY = rect.top + rect.height / 2;

          const angle = Math.atan2(
            e.clientY - eyeCenterY,
            e.clientX - eyeCenterX
          );
          const maxOffset = 10;

          const x = Math.cos(angle) * maxOffset;
          const y = Math.sin(angle) * maxOffset;

          eye.style.transform = `translate(${x}px, ${y}px)`;
        });
      });
      document.addEventListener("mousemove", function (e) {
        const trail = document.createElement("div");
        trail.className = "trail";
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 100);
      });
      const gameData = [
        {
          title: "Simon Says",
          desc: "Simon Says is a fun memory game where players repeat a growing sequence of colors or sounds. Each round gets harder, testing your focus and recall.",
        },
        {
          title: "Tic Tac Toe",
          desc: "A two-player game on a 3x3 grid where players take turns marking X or O. The goal is to get three of their marks in a row—horizontally, vertically, or diagonally."
        },
        {
          title: "Sudoku",
          desc: "A number-placement puzzle played on a 9x9 grid, divided into 3x3 boxes. The objective is to fill the grid so each row, column, and box contains the digits 1 through 9 without repetition"
        },
        {
          title: "Chess",
          desc: "A strategic two-player board game played on an 8x8 grid. Each player commands an army of pieces with unique movements, aiming to checkmate the opponent's king"
        },
        {
          title: "HangMan",
          desc: "A word-guessing game where one player thinks of a word, and the other tries to guess it letter by letter. Each wrong guess adds a part to a stick-figure 'hangman'.",
        },
      ];

      const boxes = document.querySelectorAll(".gameBox");

      boxes.forEach((box, i) => {
        const h2 = box.querySelector("h2");
        const p = box.querySelector("p");
        const content = box.querySelector(".content");
        h2.innerText = gameData[i].title;

        box.addEventListener("mouseover", () => {
          box.classList.remove("shrink");
          box.classList.add("card");
          content.classList.add("row");
          h2.classList.add("designh2");
          p.classList.add("designp");

          h2.innerText = gameData[i].title;

          p.innerText = gameData[i].desc;
        });

        box.addEventListener("mouseout", () => {
          box.classList.remove("card");
          box.classList.add("shrink");
          content.classList.remove("row");
          h2.classList.remove("designh2");
          p.classList.remove("designp");

          h2.innerText = gameData[i].title;

          p.innerText = "";
        });
      });
      const scrollBtn = document.getElementById("scrollUp");

    
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        scrollBtn.style.display = "block";
      } else {
        scrollBtn.style.display = "none";
      }
    });
    scrollBtn.addEventListener("click", () => {
      scrollBtn.classList.add("fly");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        scrollBtn.classList.remove("fly");
      }, 800);
    });