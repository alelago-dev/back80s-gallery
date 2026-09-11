const SUPA='https://ieuamsitzobqczpbwzze.supabase.co';
const KEY='sb_publishable_1-wlpnr0dj0ZMMCy_u4fPg_q0AAOUvt';
const BUCKET='event-photos';
const data=[{slug:'2026-09-05-vorterix',date:'SÁBADO 5 DE SEPTIEMBRE · 2026',shortDate:'05 SEP 2026',title:'BACK TO THE 80s',venue:'TEATRO VORTERIX · BUENOS AIRES',prefix:'2026-09-05-vorterix/',fallback:'',count:205}];
const $=s=>document.querySelector(s);
const home=$('#homeView'),gallery=$('#galleryView'),photos=$('#photoGrid'),box=$('#lightbox'),boxImg=$('#lightboxImage');
const machine=$('#insertTape'),machineStatus=$('#machineStatus'),playControl=$('#playControl'),insertVideo=$('#insertVideo');
let current=[],pos=0,inserting=false;

const publicUrl=name=>'/photos/'+name.split('/').map(encodeURIComponent).join('/');
async function listPrefix(prefix){
  const r=await fetch(SUPA+'/storage/v1/object/list/'+BUCKET,{method:'POST',headers:{apikey:KEY,Authorization:'Bearer '+KEY,'Content-Type':'application/json'},body:JSON.stringify({prefix,limit:1000,offset:0,sortBy:{column:'name',order:'asc'}})});
  if(!r.ok)throw Error('No se pudieron cargar las fotos');
  const list=await r.json();
  return list.filter(x=>x.name&&!x.name.startsWith('.')&&/\.(jpe?g|png|webp)$/i.test(x.name)).sort((a,b)=>{const na=+(a.name.match(/\((\d+)\s+de/i)||[])[1]||0,nb=+(b.name.match(/\((\d+)\s+de/i)||[])[1]||0;return na-nb||a.name.localeCompare(b.name)}).map(x=>({name:x.name,url:publicUrl(prefix+x.name)}));
}
async function load(e){let list=await listPrefix(e.prefix);if(!list.length&&e.fallback!==undefined)list=await listPrefix(e.fallback);return list}

function resetMachine(){
  inserting=false;
  machine.classList.remove('inserting','playing');
  machineStatus.textContent='● STANDBY';
  playControl.textContent='▶ TOCÁ EL VIDEOCASSETTE';
  insertVideo.pause();
  insertVideo.currentTime=0;
}

function insertTape(){
  if(inserting)return;
  inserting=true;
  machine.classList.add('inserting');
  machineStatus.textContent='● INSERTING';
  playControl.textContent='INSERTANDO CASSETTE…';
  let done=false;
  const goPlay=()=>{
    if(done)return;done=true;
    insertVideo.removeEventListener('ended',goPlay);
    clearTimeout(safety);
    machine.classList.add('playing');
    machineStatus.textContent='● PLAY';
    playControl.textContent='▶ PLAY';
    setTimeout(()=>{location.hash='/2026-09-05-vorterix'},350);
  };
  insertVideo.addEventListener('ended',goPlay);
  insertVideo.currentTime=0;
  insertVideo.play().catch(goPlay);
  const safety=setTimeout(goPlay,1600);
}
machine.addEventListener('click',insertTape);

async function openGallery(slug){
  const e=data.find(x=>x.slug===slug);if(!e)return;
  document.body.classList.add('gallery-mode');
  home.classList.add('hidden');gallery.classList.remove('hidden');window.scrollTo({top:0,behavior:'instant'});
  $('#galleryEyebrow').textContent='▶ PLAYING · '+e.shortDate;
  $('#galleryTitle').textContent=e.title;
  $('#galleryTitle').dataset.text=e.title.toUpperCase();
  $('#gallerySubtitle').textContent=e.date+' · '+e.venue;
  $('#galleryStatus').classList.remove('hidden');$('#galleryStatus').innerHTML='<strong>REW ◀◀ Rebobinando la cinta…</strong><br><span>Estamos cargando las fotos.</span>';photos.innerHTML='';
  try{current=await load(e);$('#photoCount').textContent=current.length+' FOTOS';$('#galleryStatus').classList.add('hidden');photos.innerHTML=current.map((p,i)=>`<a class="photo-card" href="${p.url}" data-i="${i}"><img src="${p.url}" loading="lazy" alt="Back to the 80s · foto ${i+1}"><span>${String(i+1).padStart(3,'0')}</span></a>`).join('')}catch(err){$('#galleryStatus').innerHTML='<strong>Ups.</strong><br><span>'+err.message+'</span>'}
}
function show(i){if(!current.length)return;pos=(i+current.length)%current.length;boxImg.src=current[pos].url;$('#lightboxNumber').textContent='PLAY  '+(pos+1)+' / '+current.length;box.showModal()}
photos.addEventListener('click',e=>{const a=e.target.closest('.photo-card');if(!a)return;e.preventDefault();show(+a.dataset.i)});
$('#closeLightbox').onclick=()=>box.close();$('#prevPhoto').onclick=()=>show(pos-1);$('#nextPhoto').onclick=()=>show(pos+1);$('#downloadPhoto').onclick=async()=>{const p=current[pos];const b=await fetch(p.url).then(r=>r.blob());const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=p.name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
document.addEventListener('keydown',e=>{if(!box.open)return;if(e.key==='ArrowLeft')show(pos-1);if(e.key==='ArrowRight')show(pos+1);if(e.key==='Escape')box.close()});

function route(){
  const slug=location.hash.replace('#/','');
  if(!slug){document.body.classList.remove('gallery-mode');gallery.classList.add('hidden');home.classList.remove('hidden');resetMachine();window.scrollTo({top:0,behavior:'instant'})}
  else openGallery(slug)
}
window.addEventListener('hashchange',route);route();
