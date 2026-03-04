import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKuzJ71_N-RQQ9k5SCfCs4MtfFDyHjr-A",
  authDomain: "sainiwalaa-d2042.firebaseapp.com",
  databaseURL: "https://sainiwalaa-d2042-default-rtdb.firebaseio.com",
  projectId: "sainiwalaa-d2042",
  storageBucket: "sainiwalaa-d2042.firebasestorage.app",
  messagingSenderId: "1042478892476",
  appId: "1:1042478892476:web:8f1ed5accaad1a24b617b9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

window.login = function() {
  signInWithEmailAndPassword(auth,
    email.value,
    password.value
  );
}

window.register = function() {
  createUserWithEmailAndPassword(auth,
    email.value,
    password.value
  );
}

window.logout = function() {
  signOut(auth);
}

onAuthStateChanged(auth, (user) => {
  if(user){
    document.getElementById("auth").style.display="none";
    document.getElementById("app").style.display="block";
    loadPosts();
  } else {
    document.getElementById("auth").style.display="block";
    document.getElementById("app").style.display="none";
  }
});

window.addPost = function() {
  push(ref(db, "posts"), {
    text: postText.value,
    image: postImage.value
  });
}

function loadPosts(){
  onValue(ref(db,"posts"), snapshot=>{
    posts.innerHTML="";
    snapshot.forEach(child=>{
      let data = child.val();
      posts.innerHTML += `
        <div>
          <p>${data.text}</p>
          <img src="${data.image}">
        </div>
      `;
    });
  });
}
