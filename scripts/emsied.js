document.addEventListener("DOMContentLoaded", () => {

    // Sidebar Navigation
    document.querySelectorAll(".ems-nav-item").forEach(btn => {
        btn.addEventListener("click", () => {

            document.querySelectorAll(".ems-nav-item").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            document.querySelectorAll(".ems-panel").forEach(p => p.classList.remove("show"));
            document.getElementById(btn.dataset.target).classList.add("show");
        });
    });

    // Load JSON file (same style as Knowledge Portal)
    fetch("../data/ems_ied.json")
        .then(res => res.json())
        .then(data => {
            loadTable("emsTable", data.ems);
            loadTable("iedTable", data.ied);
            loadTable("formsTable", data.forms);
            loadTable("sopTable", data.sop);
            loadTable("smpTable", data.smp);
            loadTable("sopNewTable", data.sopnew);
        });
});

function loadTable(id, list) {
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

    list.forEach((f, i) => {
        html += `
            <tr>
                <td>${i + 1}</td>
                <td><a href="${f.url}" target="_blank" class="file-link">${f.name}</a></td>
                <td>${f.date || '-'}</td>
                <td>${f.size || '-'}</td>
                <td><a href="${f.url}" target="_blank">Download</a></td>
            </tr>
        `;
    });

    html += "</tbody></table>";

    document.getElementById(id).innerHTML = html;
}
