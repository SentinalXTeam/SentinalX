function navigate(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.add('hidden'));
  
    const activePage = document.getElementById(pageId);
    if (activePage) {
      activePage.classList.remove('hidden');
    }
  }
  
  function saveConfig() {
    const expId = document.getElementById("expId").value;
    const secret = document.getElementById("secret").value;
    const date = document.getElementById("dateToken").value;
  
    const encoded = `${expId}${date}${secret}`;
    alert("Generated Key: " + encoded);
  }
  