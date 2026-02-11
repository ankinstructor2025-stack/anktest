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
  e.preventDefault();

  try {
    // ログイン
    const result = await signInWithPopup(auth, provider);

    localStorage.setItem("user_id", result.user.uid);

    // user_id取得
    const user_id = result.user.uid;

    // APIに通知
    await fetch(`${API_BASE_URL}/v1/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_id })
    });

    // ★ここで遷移
    window.location.href = "./qa.html";

    } catch (err) {
    alert(err.code || String(err));
  }
});
