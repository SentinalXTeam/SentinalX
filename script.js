import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCQvIsedCSSOBpgr6pvFEhqOyISOVy6KH4",
  authDomain: "sentinalxeditor.firebaseapp.com",
  databaseURL: "https://sentinalxeditor-default-rtdb.firebaseio.com",
  projectId: "sentinalxeditor",
  storageBucket: "sentinalxeditor.appspot.com",
  messagingSenderId: "681449014864",
  appId: "1:681449014864:web:bd09c7b21f1a6d02787355"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.saveConfig = function () {
  const gameId = document.getElementById('gameId').value.trim();
  const key = document.getElementById('accessKey').value.trim();

  if (!gameId || !key) {
    alert('Game ID and Access Key are required.');
    return;
  }

  const config = {
    aiDetection: document.getElementById('aiDetection').checked,
    autoUpdate: document.getElementById('autoUpdate').checked,
    logInjection: document.getElementById('logInjection').checked,
    scanRate: parseInt(document.getElementById('scanRate').value)
  };

  set(ref(db, `games/${gameId}/${key}/config`), config)
    .then(() => alert("Config saved!"))
    .catch(err => console.error("Error:", err));

  localStorage.setItem('sentinalx_config', JSON.stringify({ gameId, key, config }));
};

window.onload = () => {
  const saved = localStorage.getItem('sentinalx_config');
  if (saved) {
    const data = JSON.parse(saved);
    document.getElementById('gameId').value = data.gameId;
    document.getElementById('accessKey').value = data.key;
    document.getElementById('aiDetection').checked = data.config.aiDetection;
    document.getElementById('autoUpdate').checked = data.config.autoUpdate;
    document.getElementById('logInjection').checked = data.config.logInjection;
    document.getElementById('scanRate').value = data.config.scanRate;
  }
};
