import { firebaseConfig } from "./firebase-config.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* Navigation */
document.querySelectorAll(".bottom-nav button").forEach(btn=>{
btn.addEventListener("click",()=>{
document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
document.getElementById(btn.dataset.page).classList.add("active");
});
});

/* Anti Double Click */
function protect(btn){
btn.disabled=true;
btn.innerText="Tharo hukum likhayo ja ryo hai...";
setTimeout(()=>{
btn.disabled=false;
btn.innerText="+ Naya Post";
},2000);
}

/* Create Post */
document.getElementById("postBtn").addEventListener("click",async(e)=>{
let btn=e.target;
protect(btn);

await addDoc(collection(db,"posts"),{
text:"Ram Ram Sa 👑",
createdAt:Date.now()
});
});

/* Realtime Feed */
onSnapshot(collection(db,"posts"),snapshot=>{
let feed=document.getElementById("feed");
feed.innerHTML="";
snapshot.forEach(doc=>{
feed.innerHTML+=`
<div class="card">${doc.data().text}</div>
`;
});
});
