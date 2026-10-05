'use strict';
const comparisons = {
  fabcurate: {before:'fabcurate-cart-before.png',after:'fabcurate-cart-after.png',beforeAlt:'Fabcurate original cart before the reassurance experiment',afterAlt:'Fabcurate cart after: savings, delivery, quality and return reassurance'},
  dotkey: {before:'dot-key-shade-guidance-before.png',after:'dot-key-shade-guidance-after.png',beforeAlt:'Dot and Key product page before shade guidance was added',afterAlt:'Dot and Key product page after: a How to choose your shade link near product details'}
};
document.querySelectorAll('[data-compare]').forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.compare, view = button.dataset.view, item = comparisons[key];
  const img = document.getElementById(key + '-image'); img.src = item[view]; img.alt = item[view + 'Alt'];
  document.querySelectorAll('[data-compare="'+ key +'"]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
}));
const stages = {
  discover:{kicker:'THE FIRST IMPRESSION',question:'“Is this <br>for me?”',heading:'Make the next step feel obvious.',copy:'Connect the promise of an ad with the experience on the page. Find where attention turns into confusion, and give people a clear reason to explore.',list:['Landing-page and message alignment','Navigation and product discovery','Behavior analysis and customer research'],metric:'Qualified progression through the funnel, with purchase conversion as the downstream check.'},
  decide:{kicker:'THE MOMENT OF CHOICE',question:'“Can I feel <br>sure about this?”',heading:'Give confidence a place to land.',copy:'Understand the doubts behind an abandoned cart. Put useful information, credible reassurance, and the right choices at the moments people need them.',list:['Product value and choice clarity','Cart and checkout friction','Prioritized A/B experiments'],metric:'Purchase conversion and revenue per eligible visitor, alongside order value and refunds.'},
  experience:{kicker:'AFTER THE FIRST YES',question:'“Did I make <br>a good choice?”',heading:'Help the first purchase deliver.',copy:'A purchase starts a new set of expectations. Build timely onboarding and post-purchase journeys that help customers get value and stay connected.',list:['Welcome and onboarding flows','Behavior-based post-purchase messages','Relevant education and next-step guidance'],metric:'Activation and meaningful product engagement, with unsubscribes and message fatigue as guardrails.'},
  return:{kicker:'THE REASON TO COME BACK',question:'“Why should <br>I come back?”',heading:'Earn the next purchase.',copy:'Use what you know about customer needs and purchase cycles to build relevant reasons to return. Make every nudge useful, well-timed, and personal.',list:['Cohort segmentation and replenishment','Repeat-purchase and loyalty journeys','Winback, timing and frequency experiments'],metric:'Repeat-purchase rate and cohort retention, alongside margin and customer lifetime value.'}
};
const tabs = [...document.querySelectorAll('[data-stage]')];
function setStage(tab){
  const key=tab.dataset.stage, item=stages[key];
  tabs.forEach(b => {b.setAttribute('aria-selected', String(b===tab));b.tabIndex=b===tab?0:-1});
  document.getElementById('journey-panel').setAttribute('aria-labelledby',tab.id);
  for(const part of ['kicker','heading','copy','metric'])document.getElementById('journey-'+part).textContent=item[part];
  document.getElementById('journey-question').innerHTML=item.question;
  const list=document.getElementById('journey-list');list.replaceChildren(...item.list.map(text=>{const li=document.createElement('li');li.textContent=text;return li}));
}
tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>setStage(tab));
  tab.addEventListener('keydown',event=>{
    let i=index;if(event.key==='ArrowRight')i=(index+1)%tabs.length;else if(event.key==='ArrowLeft')i=(index+tabs.length-1)%tabs.length;else if(event.key==='Home')i=0;else if(event.key==='End')i=tabs.length-1;else return;
    event.preventDefault();tabs[i].focus();setStage(tabs[i]);
  });
});

const imageDialog=document.getElementById('image-dialog');
document.querySelectorAll('[data-enlarge]').forEach(button=>button.addEventListener('click',()=>{
 const source=document.getElementById(button.dataset.enlarge), image=document.getElementById('full-image');
 image.src=source.src;image.alt=source.alt;imageDialog.showModal();
}));
document.getElementById('close-dialog').addEventListener('click',()=>imageDialog.close());
imageDialog.addEventListener('click',event=>{if(event.target===imageDialog){const r=imageDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)imageDialog.close()}});
