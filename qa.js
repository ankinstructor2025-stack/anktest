const API_BASE = "https://anktest-api-xxxxx.run.app"; //あとでenv化

// user_id表示
const user_id = localStorage.getItem("user_id");
document.getElementById("uidLabel").textContent = user_id || "-";

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

// -------------------
// アップロード
// -------------------
document.getElementById("uploadBtn").onclick = async () => {

  const file = document.getElementById("fileInput").files[0];
  if(!file) return alert("ファイル選択");

  const fd = new FormData();
  fd.append("file", file);
  fd.append("user_id", user_id);

  await fetch(`${API_BASE}/v1/upload`, {
    method:"POST",
    body:fd
  });

  alert("登録完了");
  loadHistory();
};

// -------------------
function logout(){
  localStorage.removeItem("user_id");
  location.href = "index.html";
}
