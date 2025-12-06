document.querySelectorAll(".kp-nav-item").forEach(btn => {
    btn.addEventListener("click", () => {

        // Remove active from all
        document.querySelectorAll(".kp-nav-item").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".kp-section").forEach(sec => sec.hidden = true);

        // Activate clicked
        btn.classList.add("active");
        document.getElementById(btn.dataset.target).hidden = false;
    });
});



document.addEventListener("DOMContentLoaded", () => {

    /* ============================================================
       LEFT SIDEBAR → SWITCH SECTIONS
    ============================================================ */
    const buttons = document.querySelectorAll(".navl-item");
    const sections = document.querySelectorAll(".kp-section");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.target;

            // Remove active from sidebar buttons
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Hide all sections
            sections.forEach(sec => sec.hidden = true);

            // Show selected section
            document.getElementById(target).hidden = false;
        });
    });

    /* ============================================================
       LOAD JSON FILE
    ============================================================ */
    fetch("../data/files.json")
        .then(res => res.json())
        .then(data => {
            setupSection("bulletin", data.bulletin);
            setupSection("movies", data.movies);
            setupSection("archives", data.archives);
        })
        .catch(err => console.error("JSON Load Error:", err));
});



/* ============================================================
   SEARCH + SORT + RENDER TABLE FUNCTION
============================================================ */
function setupSection(type, list) {

    const search = document.getElementById(`search${capitalize(type)}`);
    const sort = document.getElementById(`sort${capitalize(type)}`);
    const tableContainer = document.getElementById(`${type}Table`);

    let filtered = [...list];

    /* ---------------------------
       RENDER TABLE
    --------------------------- */
    function render() {
        if (!filtered.length) {
            tableContainer.innerHTML = `<p class="loading">No files found.</p>`;
            return;
        }

        let html = `
            <table class="kp-table">
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
                    <td>${i + 1}</td>
                    <td><a class="file-link" href="${f.url}" target="_blank">${f.name}</a></td>
                    <td>${f.date}</td>
                    <td>${f.size}</td>
                    <td><a href="${f.url}" target="_blank">Download</a></td>
                </tr>
            `;
        });

        html += `</tbody></table>`;
        tableContainer.innerHTML = html;
    }

    /* ---------------------------
       SEARCH FUNCTIONALITY
    --------------------------- */
    search.addEventListener("input", () => {
        const q = search.value.toLowerCase();
        filtered = list.filter(f => f.name.toLowerCase().includes(q));
        render();
    });

    /* ---------------------------
       SORT FUNCTIONALITY
    --------------------------- */
    sort.addEventListener("change", () => {
        if (sort.value === "newest") {
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        else if (sort.value === "oldest") {
            filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
        else if (sort.value === "az") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }
        else if (sort.value === "za") {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        }

        render();
    });

    // Initial load
    render();
}


/* ============================================================
   HELPER FUNCTION
============================================================ */
function capitalize(x) {
    return x.charAt(0).toUpperCase() + x.slice(1);
}
