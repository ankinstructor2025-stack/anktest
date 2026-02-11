// Firebase読み込み（CDN版）
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ★ここにFirebaseコンソールで出た設定を貼る
// const firebaseConfig = {
//   apiKey: "ここ",
//   authDomain: "ここ",
//   projectId: "ここ",
//   appId: "ここ"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAv2McrXvVxr0cbm8IBE6epHw6OX-z0rpA",
  authDomain: "anktest-92615.firebaseapp.com",
  projectId: "anktest-92615",
  storageBucket: "anktest-92615.firebasestorage.app",
  messagingSenderId: "655855416600",
  appId: "1:655855416600:web:3d0730fd917b9ff76f5a6d",
  measurementId: "G-RRGRTX2Q7L"
};

// ★Cloud Run(API) のベースURL（あなたのURLに置き換える）
const API_BASE_URL = "https://anktest-api-986862757498.asia-northeast1.run.app";

// Firebase起動
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ログインボタン押下
document.getElementById("loginButton").addEventListener("click", async (e) => {
  e.preventDefault(); // これでsubmit/遷移を潰す

  try {
    // ① Googleログイン（既存の処理）
    const result = await signInWithPopup(auth, provider);

    // ② user_id を決める（この教材では user_id = firebase_uid）
    const user_id = result.user.uid;

    // ③ ログイン成功をAPIへ通知（追加した処理）
    //    ※この時点では「登録」ではなく「通知」でOK（最小構成）
    const res = await fetch(`${API_BASE_URL}/v1/session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id })
    });

    // APIが落ちていてもログイン自体は成功しているので、理由を表示できるようにする
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      alert(`session api error: ${res.status} ${text}`);
      return;
    }

    // ④ ここで次画面へ遷移するなら（必要になったら有効化）
    // location.href = "./qa.html";

  } catch (err) {
    alert(err.code || String(err)); // 理由だけ出す
  }
});
