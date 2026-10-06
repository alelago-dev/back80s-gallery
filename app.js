const data=[
  {slug:'2026-09-05-vorterix',date:'SÁBADO 5 DE SEPTIEMBRE · 2026',shortDate:'05 SEP 2026',labelDate:'05·09·2026',title:'BACK TO THE 80s',venue:'TEATRO VORTERIX · BUENOS AIRES',cover:'./assets/cover.png',count:205},
  {slug:'2026-10-03-vorterix',date:'3 de octubre 2026',shortDate:'03 OCT 2026',labelDate:'03·10·2026',title:'Back to the 80s — Edición Halloween',venue:'TEATRO VORTERIX · BUENOS AIRES',cover:'./assets/halloween-cover.jpg',count:149}
];
const $=s=>document.querySelector(s);
const home=$('#homeView'),gallery=$('#galleryView'),photos=$('#photoGrid'),box=$('#lightbox'),boxImg=$('#lightboxImage');
let current=[],pos=0,routeVersion=0;

const publicUrl=name=>'/photos/'+name.split('/').map(encodeURIComponent).join('/');
async function load(e){
  const r=await fetch('./manifests/'+e.slug+'.json');
  if(!r.ok)throw Error('No se pudieron cargar las fotos');
  const list=await r.json();
  if(!Array.isArray(list)||list.length!==e.count||new Set(list).size!==e.count||list.some(name=>typeof name!=='string'||name.includes('/')||! /\.(jpe?g|png|webp)$/i.test(name)))throw Error('El listado de fotos no está disponible');
  return list.map(name=>({name,url:publicUrl(e.slug+'/'+name)}));
}

async function openGallery(slug){
  const e=data.find(x=>x.slug===slug);if(!e)return;
  const version=++routeVersion;
  current=[];$('#photoCount').textContent=e.count+' FOTOS';
  document.body.classList.add('gallery-mode');
  home.classList.add('hidden');gallery.classList.remove('hidden');window.scrollTo({top:0,behavior:'instant'});
  $('#galleryEyebrow').textContent='▶ PLAYING · '+e.shortDate;
  $('#galleryTitle').textContent=e.title;
  $('#galleryTitle').dataset.text=e.title.toUpperCase();
  $('#gallerySubtitle').textContent=e.date+' · '+e.venue;
  $('.next-party').classList.toggle('hidden',e===data[1]);
  $('#galleryStatus').classList.remove('hidden');$('#galleryStatus').innerHTML='<strong>REW ◀◀ Rebobinando la cinta…</strong><br><span>Estamos cargando las fotos.</span>';photos.innerHTML='';
  try{const list=await load(e);if(version!==routeVersion)return;current=list;$('#photoCount').textContent=current.length+' FOTOS';$('#galleryStatus').classList.add('hidden');photos.innerHTML=current.map((p,i)=>`<a class="photo-card" href="${p.url}" data-i="${i}"><img src="${p.url}" loading="lazy" alt="Back to the 80s · foto ${i+1}"><span>${String(i+1).padStart(3,'0')}</span></a>`).join('')}catch(err){if(version!==routeVersion)return;$('#galleryStatus').innerHTML='<strong>Ups.</strong><br><span>'+err.message+'</span>'}
}
function show(i){if(!current.length)return;pos=(i+current.length)%current.length;boxImg.src=current[pos].url;$('#lightboxNumber').textContent='PLAY  '+(pos+1)+' / '+current.length;box.showModal()}
photos.addEventListener('click',e=>{const a=e.target.closest('.photo-card');if(!a)return;e.preventDefault();show(+a.dataset.i)});
$('#closeLightbox').onclick=()=>box.close();$('#prevPhoto').onclick=()=>show(pos-1);$('#nextPhoto').onclick=()=>show(pos+1);$('#downloadPhoto').onclick=async()=>{const p=current[pos];const b=await fetch(p.url).then(r=>r.blob());const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=p.name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
document.addEventListener('keydown',e=>{if(!box.open)return;if(e.key==='ArrowLeft')show(pos-1);if(e.key==='ArrowRight')show(pos+1);if(e.key==='Escape')box.close()});

function route(){
  if(box.open)box.close();
  const slug=location.hash.replace('#/','');
  if(!slug||!data.some(e=>e.slug===slug)){++routeVersion;current=[];document.body.classList.remove('gallery-mode');gallery.classList.add('hidden');home.classList.remove('hidden');window.scrollTo({top:0,behavior:'instant'})}
  else openGallery(slug)
}
window.addEventListener('hashchange',route);route();
