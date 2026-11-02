const lightbox=document.querySelector('#lightbox');
const lightboxImage=document.querySelector('#lightboxImage');
document.querySelectorAll(".photo img").forEach(image=>{
  image.closest(".photo").style.setProperty("--photo-background", `url("${image.src}")`);
});

document.querySelectorAll('.photo img,.family-card img').forEach(image=>{
  image.addEventListener('click',()=>{
    lightboxImage.src=image.currentSrc||image.src;
    lightboxImage.alt=image.alt;
    lightbox.showModal();
  });
  image.addEventListener('error',()=>{image.style.visibility='hidden';});
});

document.querySelector('#lightboxClose').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close();});

// Revelação suave da "família de três" ao rolar a página.
if('IntersectionObserver' in window){
  const items=document.querySelectorAll('.family-arrow,.family-card.is-new');
  document.documentElement.classList.add('js');
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
    });
  },{threshold:.35});
  items.forEach(item=>observer.observe(item));
}
