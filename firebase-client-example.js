/*
EXEMPLO PARA PUSH COM O APP FECHADO.
1) Crie um projeto Firebase e um Web App.
2) Ative Cloud Messaging.
3) Copie os dados firebaseConfig e a chave pública VAPID.
4) Adapte este exemplo ao index.html.
*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "COLE_AQUI",
  authDomain: "COLE_AQUI",
  projectId: "COLE_AQUI",
  storageBucket: "COLE_AQUI",
  messagingSenderId: "COLE_AQUI",
  appId: "COLE_AQUI"
};
const VAPID_KEY = "COLE_A_CHAVE_PUBLICA_VAPID";
const REGISTRAR_TOKEN_URL = "COLE_A_URL_DA_FUNCTION_registrarToken";

const app=initializeApp(firebaseConfig);
const messaging=getMessaging(app);

export async function registrarPush(nome=""){
  const reg=await navigator.serviceWorker.ready;
  const token=await getToken(messaging,{vapidKey:VAPID_KEY,serviceWorkerRegistration:reg});
  await fetch(REGISTRAR_TOKEN_URL,{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({token,nome})
  });
  return token;
}
