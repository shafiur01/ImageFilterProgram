// @copywrite Shafiur Rahman Bhauyan 2022
// Implementing the macig onclick event and interaction after onclick 
// This is a dynamic panel, so all the panels clicked will be interacting well without closing or interrupting other panels

const allPanels = document.getElementsByClassName("panel");

for (panel of allPanels){
    panel.addEventListener('click', function(e){
        e.target.classList.toggle('open')
    })
};

for (panel of allPanels){
    panel.addEventListener('click', function(e){
        e.target.classList.toggle('close')
    })
};


