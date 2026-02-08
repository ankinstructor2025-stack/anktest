// Firebase読み込み（CDN版）
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ★ここにFirebaseコンソールで出た設定を貼る
//const firebaseConfig = {
//  apiKey: "ここ",
//  authDomain: "ここ",
//  projectId: "ここ",
//  appId: "ここ"
//};

const firebaseConfig = {
  apiKey: "AIzaSyAv2McrXvVxr0cbm8IBE6epHw6OX-z0rpA",
  authDomain: "anktest-92615.firebaseapp.com",
  projectId: "anktest-92615",
  storageBucket: "anktest-92615.firebasestorage.app",
  messagingSenderId: "655855416600",
  appId: "1:655855416600:web:3d0730fd917b9ff76f5a6d",
  measurementId: "G-RRGRTX2Q7L"
};

// Firebase起動
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ログインボタン押下
document.getElementById("loginButton").addEventListener("click", async (e) => {
  e.preventDefault(); // これでsubmit/遷移を潰す

  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    alert(err.code || String(err)); // 理由だけ出す
  }
});
