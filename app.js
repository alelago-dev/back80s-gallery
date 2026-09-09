const data=[{slug:'2026-09-05-vorterix',date:'05 SEP 2026',title:'VORTERIX · SEPTIEMBRE',venue:'Teatro Vorterix · Buenos Aires'}];
const home=document.querySelector('#homeView');
const gallery=document.querySelector('#galleryView');
const grid=document.querySelector('#eventGrid');
const photos=document.querySelector('#photoGrid');
function events(){document.querySelector('#eventCounter').textContent='1 FECHA';grid.innerHTML=data.map(x=>'<a class="event-card" href="#/'+x.slug+'"><div class="event-card-content"><span class="event-date">'+x.date+'</span><h3>'+x.title+'</h3><p>'+x.venue+'</p></div></a>').join('')}
function openGallery(slug){const e=data.find(x=>x.slug===slug);if(!e)return;home.classList.add('hidden');gallery.classList.remove('hidden');document.querySelector('#galleryEyebrow').textContent=e.date;document.querySelector('#galleryTitle').textContent=e.title;document.querySelector('#gallerySubtitle').textContent=e.venue;const list=(window.BACK80S_PHOTOS||{})[slug]||[];document.querySelector('#photoCount').textContent=list.length+' FOTOS';document.querySelector('#galleryStatus').classList.toggle('hidden',list.length>0);photos.innerHTML=list.map((p,i)=>'<a class="photo-card" href="'+p.url+'" target="_blank"><img src="'+p.url+'" loading="lazy" alt="Foto '+(i+1)+'"></a>').join('')}
function route(){const slug=location.hash.replace('#/','');if(!slug){gallery.classList.add('hidden');home.classList.remove('hidden')}else openGallery(slug)}
window.addEventListener('hashchange',route);events();route();