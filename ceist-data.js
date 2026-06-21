// Shared birth data persistence across all Ceist screens
(function(){
  const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];

  function fmtDate(iso){
    const [y,m,d]=iso.split('-');
    return parseInt(d)+' '+MONTHS[parseInt(m)-1]+' '+y;
  }

  function loadBirthData(){
    const dob=localStorage.getItem('ceist_dob');
    const tob=localStorage.getItem('ceist_tob');
    const place=localStorage.getItem('ceist_place');
    if(!dob) return;

    const dateLabel=fmtDate(dob)+(tob?' · '+tob:'');

    // Chart who/where lines (ceist-screens, ceist-bridge-chart)
    document.querySelectorAll('.chart-head .who, .who').forEach(el=>{
      el.textContent=dateLabel;
    });
    document.querySelectorAll('.chart-head .where').forEach(el=>{
      // Keep the system label after the place name
      const suffix=el.textContent.indexOf('·')>-1?' · '+el.textContent.split('·').slice(1).join('·').trim():'';
      el.textContent=(place||el.textContent.split('·')[0].trim())+suffix;
    });

    // Onboarding — pre-fill form fields if they already have values
    const dobEl=document.getElementById('dob');
    const tobEl=document.getElementById('tob');
    const placeEl=document.querySelector('.step[data-step="2"] input[type="text"]');
    if(dobEl && !dobEl.value) dobEl.value=dob;
    if(tobEl && !tobEl.value) tobEl.value=tob||'';
    if(placeEl && place && !placeEl.value) placeEl.value=place;
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',loadBirthData);
  } else {
    loadBirthData();
  }
})();
