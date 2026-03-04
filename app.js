import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { getDatabase, ref, push, onValue } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

import { getStorage, ref as sRef, uploadBytes, getDownloadURL } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";


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
const storage = getStorage(app);

window.login = function() {
  signInWithEmailAndPassword(auth,email.value,password.value);
}

window.register = function() {
  createUserWithEmailAndPassword(auth,email.value,password.value);
}

window.logout = function() {
  signOut(auth);
}

onAuthStateChanged(auth,(user)=>{
  if(user){
    authBox.style.display="none";
    appBox.style.display="block";
    loadPosts();
  }else{
    authBox.style.display="block";
    appBox.style.display="none";
  }
});

window.addPost = async function(){

  const file = document.getElementById("postImage").files[0];
  const caption = document.getElementById("postText").value;

  if(!file){
    alert("Image select karo");
    return;
  }

  const imageRef = sRef(storage,"posts/"+Date.now()+"_"+file.name);
  await uploadBytes(imageRef,file);

  const imageURL = await getDownloadURL(imageRef);

  push(ref(db,"posts"),{
    text: caption,
    image: imageURL,
    uid: auth.currentUser.uid,
    time: Date.now()
  });

  postText.value="";
  postImage.value="";
};

function loadPosts(){
  onValue(ref(db,"posts"),snapshot=>{
    posts.innerHTML="";
    snapshot.forEach(child=>{
      let data = child.val();
      posts.innerHTML += `
      <div class="card">
        <img src="${data.image}">
        <p>${data.text}</p>
      </div>
      `;
    });
  });
}
