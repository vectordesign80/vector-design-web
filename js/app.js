const grid=document.querySelector('#product-grid');
fetch('data/products.json').then(r=>r.json()).then(products=>{
  if(!products.length){grid.innerHTML='<div class="card"><h3>Catálogo en preparación</h3><p>Estamos cargando nuestros productos personalizados.</p></div>';return;}
  grid.innerHTML=products.filter(p=>p.published!==false).map(p=>`<article class="card"><h3>${p.title}</h3><p>${p.description||''}</p><div class="price">${p.price?new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(p.price):'Consultar'}</div></article>`).join('');
}).catch(()=>{grid.innerHTML='<div class="card"><h3>VECTOR Design 3D</h3><p>Catálogo próximamente.</p></div>'});