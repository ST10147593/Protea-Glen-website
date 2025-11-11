document.addEventListener("DOMContentLoaded", () => {
  const materials = JSON.parse(localStorage.getItem("pg_materials")) || [];
  const container = document.getElementById("materials-container"); // create this div in your HTML
  if (!container) return;

  const ul = document.createElement("ul");
  ul.style.listStyle = "none";
  ul.style.padding = "0";
  materials.forEach((m, i) => {
    const li = document.createElement("li");
    li.style.background = "#fff";
    li.style.marginBottom = "10px";
    li.style.padding = "12px";
    li.style.borderRadius = "8px";
    li.innerHTML = `
      <strong>${m.title}</strong>
      <div><small class="muted">${m.desc || m.filename}</small></div>
      <div style="margin-top:8px;">
        <a href="#" data-i="${i}" class="btn">Download</a>
      </div>
    `;
    ul.appendChild(li);
  });
  container.appendChild(ul);

  // download
  ul.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-i]");
    if (!a) return;
    e.preventDefault();
    const idx = Number(a.dataset.i);
    const m = materials[idx];
    if (!m || !m.dataBase64) return alert("File not available.");
    // create blob and download
    const arr = m.dataBase64.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    const blob = new Blob([u8arr], { type: mime });
    const url = URL.createObjectURL(blob);
    const dl = document.createElement('a');
    dl.href = url;
    dl.download = m.filename || m.title || 'file';
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
    URL.revokeObjectURL(url);
  });
});