document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------
     SUBMENU TOGGLE
  -------------------------- */
  document.querySelectorAll(".has-sub").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const submenu = document.getElementById(targetId);

      if (!submenu) return;

      submenu.classList.toggle("show");
    });
  });

  /* -------------------------
     LOAD JSON
  -------------------------- */
  fetch("../data/pa.json")
    .then(res => res.json())
    .then(data => {
      window.paData = data;

      // ✅ Default load
      loadSection("standing", "Standing Orders");

      // ✅ Auto highlight default
      document
        .querySelector('[data-section="standing"]')
        ?.classList.add("active");
    });

  /* -------------------------
     SUB SECTION CLICK
  -------------------------- */
  document.querySelectorAll(".navl-sub").forEach(btn => {
    btn.addEventListener("click", () => {
      const section = btn.dataset.section;
      const title = btn.innerText;

      // ✅ Active state reset
      document.querySelectorAll(".navl-sub").forEach(b =>
        b.classList.remove("active")
      );
      btn.classList.add("active");

      loadSection(section, title);
    });
  });

  /* -------------------------
     SEARCH + SORT
  -------------------------- */
  document.getElementById("paSearch").addEventListener("input", renderTable);
  document.getElementById("paSort").addEventListener("change", renderTable);
});


let currentList = [];

function loadSection(section, title) {
  document.getElementById("paTitle").innerText = title;
  currentList = window.paData[section] || [];
  renderTable();
}


function renderTable() {
  const search = document.getElementById("paSearch").value.toLowerCase();
  const sort = document.getElementById("paSort").value;

  let filtered = currentList.filter(f =>
    f.name.toLowerCase().includes(search)
  );

  if (sort === "newest")
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (sort === "oldest")
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

  let html = `
    <table class="pa-table">
      <thead>
        <tr>
          <th>S.No</th>
          <th>File Name</th>
          <th>Date</th>
          <th>Size</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
  `;

  filtered.forEach((f, i) => {
    html += `
      <tr>
        <td data-label="S.No">${i + 1}</td>
        <td data-label="File Name">
          <a class="file-link" href="${f.url}" target="_blank">${f.name}</a>
        </td>
        <td data-label="Date">${f.date}</td>
        <td data-label="Size">${f.size}</td>
        <td data-label="Action">
          <a href="${f.url}" target="_blank">Download</a>
        </td>
      </tr>
    `;
  });

  html += "</tbody></table>";
  document.getElementById("paTable").innerHTML = html;
}
