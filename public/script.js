function saveUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  fetch("/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email })
  })
  .then(() => loadUsers());
}

function loadUsers() {
  fetch("/users")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("userList");
      list.innerHTML = "";
      data.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user.name} - ${user.email}`;
        list.appendChild(li);
      });
    });
}

loadUsers();
