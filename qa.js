const API_BASE_URL = "https://anktest-api-986862757498.asia-northeast1.run.app";

// user_id表示
const user_id = localStorage.getItem("user_id");
document.getElementById("uidLabel").textContent = user_id || "-";

const fileInput = document.getElementById("fileInput");
const createBtn = document.getElementById("createBtn");
const statusEl = document.getElementById("status");

function setStatus(msg) {
  statusEl.textContent = msg;
}

// -------------------
// 履歴取得
// -------------------
async function loadHistory(){
  if(!user_id) return;

  const res = await fetch(`${API_BASE}/v1/history?user_id=${user_id}`);
  if(!res.ok) return;

  const data = await res.json();

  const table = document.getElementById("historyTable");
  table.innerHTML = "";

  data.records.forEach(r=>{
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.innerHTML = `<a href="${r.upload_file}" target="_blank">DL</a>`;

    const td2 = document.createElement("td");
    td2.innerHTML = r.qa_file
      ? `<a href="${r.qa_file}" target="_blank">DL</a>`
      : "-";

    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
  });
}

loadHistory();

createBtn.addEventListener("click", async () => {
  const file = fileInput.files?.[0];
  if (!user_id) return alert("user_id がありません（ログインからやり直し）");
  if (!file) return alert("ファイルを選択してください");

  createBtn.disabled = true;
  setStatus("アップロード中...");

  try {
    const fd = new FormData();
    fd.append("user_id", user_id);
    fd.append("file", file, file.name);

    const res = await fetch(`${API_BASE_URL}/v1/qa_build`, {
      method: "POST",
      body: fd
    });

    const text = await res.text();
    if (!res.ok) throw new Error(`qa_build error: ${res.status}\n${text}`);

    setStatus(`OK\n${text}`);
  } catch (e) {
    setStatus(String(e));
  } finally {
    createBtn.disabled = false;
  }
});

// -------------------
function logout(){
  localStorage.removeItem("user_id");
  location.href = "index.html";
}
