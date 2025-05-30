// Load saved tasks on page load
  window.onload = function () {
    const saved = JSON.parse(localStorage.getItem("todoList")) || [];
    saved.forEach(item => additem(item.text, item.completed));
  };

  function saveToLocalStorage() {
    const items = document.querySelectorAll("#ul li");
    const data = Array.from(items).map(li => {
      return {
        text: li.childNodes[0].textContent.trim(),
        completed: li.classList.contains("completed")
      };
    });
    localStorage.setItem("todoList", JSON.stringify(data));
  }

  function additem(textFromStorage = null, isCompleted = false) {
    const input = document.getElementById("id");
    const value = textFromStorage || input.value.trim();

    if (value !== "") {
      const li = document.createElement("li");
      li.textContent = value;

      const deletebtn = document.createElement("button");
      deletebtn.textContent = "x";
      deletebtn.className = "ahm";
      deletebtn.onclick = function (e) {
        e.stopPropagation(); // prevent toggle
        li.remove();
        saveToLocalStorage();
      };

      li.onclick = function () {
        if (li.classList.contains("completed")) {
          li.classList.remove("completed");
          li.classList.add("undo");
        } else {
          li.classList.add("completed");
          li.classList.remove("undo");
        }
        saveToLocalStorage();
      };

      li.appendChild(deletebtn);

      if (isCompleted) {
        li.classList.add("completed");
      }

      document.getElementById("ul").appendChild(li);

      if (!textFromStorage) {
        input.value = "";
      }

      saveToLocalStorage();
    }
  }