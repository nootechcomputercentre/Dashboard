let isAdmin = false;

const categories = [
    "Notifications",
    "Advertisements",
    "Videos",
    "Notices",
    "Students",
    "Faculty"
];

function login() {
    let pass = prompt("Enter Admin Password:");
    if(pass === "Nootech@2026") {
        isAdmin = true;
        alert("Admin Login Success");
        render();
    }
}

function render() {
    let grid = document.getElementById("grid");
    grid.innerHTML = "";

    categories.forEach(cat => {
        let data = JSON.parse(localStorage.getItem(cat)) || {};

        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${cat}</h3>
            <img src="${data.image || 'https://via.placeholder.com/300'}">
            <p>${data.title || 'No Content Yet'}</p>
            <button class="admin-only" onclick="upload('${cat}', event)">Upload</button>
            <p style="font-size:12px;color:lightgreen">${data.drive || ''}</p>
        `;

        card.onclick = () => openDetail(cat);

        grid.appendChild(card);
    });

    if(isAdmin) {
        document.querySelectorAll(".admin-only").forEach(btn=>{
            btn.style.display="block";
        });
    }
}

function upload(cat, event) {
    event.stopPropagation();

    let title = prompt("Enter Title:");
    let image = prompt("Paste Image/Video URL:");
    let drive = prompt("Paste Google Drive Link:");

    let data = { title, image, drive };

    localStorage.setItem(cat, JSON.stringify(data));

    alert("Uploaded Successfully (Stored in Google Drive)");
    render();
}

function openDetail(cat) {
    let data = JSON.parse(localStorage.getItem(cat));

    if(!data) return;

    let newTab = window.open();

    newTab.document.write(`
        <h1>${data.title}</h1>
        <img src="${data.image}" style="width:100%">
        <br><br>
        <button onclick="window.close()">Close</button>
    `);
}

render();