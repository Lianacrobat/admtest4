import{c as v}from"./productUtils.Du6jOUUm.js";import{s as d}from"./telegram.Ce-bSytT.js";class r{static instance;constructor(){}static getInstance(){return r.instance||(r.instance=new r),r.instance}getFavorites(){try{const e=localStorage.getItem("favorites");return e?JSON.parse(e):[]}catch(e){return console.error("Error reading favorites from localStorage:",e),[]}}saveFavorites(e){try{localStorage.setItem("favorites",JSON.stringify(e))}catch(o){console.error("Error saving favorites to localStorage:",o)}}async toggleFavorite(e,o){const a=this.getFavorites(),n=a.indexOf(e);if(n>-1){a.splice(n,1),this.saveFavorites(a);try{await d(o,"removed")}catch(l){console.error("Error sending telegram notification:",l)}return!1}else{a.push(e),this.saveFavorites(a);try{await d(o,"added")}catch(l){console.error("Error sending telegram notification:",l)}return!0}}updateHeartIcon(e,o){const a=e.querySelector(".heart-icon");a&&(a.style.fill=o?"var(--favorite-color)":"none",a.style.color=o?"var(--favorite-color)":"var(--text-color-soft)")}updateAllHeartIcons(e,o){document.querySelectorAll(`.favorite-btn[data-product-id="${e}"] .heart-icon`).forEach(a=>{a.style.fill=o?"var(--favorite-color)":"none",a.style.color=o?"var(--favorite-color)":"var(--text-color-soft)"})}initializeButton(e){const o=e.dataset.productId;if(o){const a=this.getFavorites().includes(o);this.updateHeartIcon(e,a)}}clearAllFavorites(){this.saveFavorites([]),window.dispatchEvent(new CustomEvent("favoritesCleared"))}}const i=r.getInstance();function u(){return i.getFavorites().map(t=>v(t)).filter(Boolean)}function f(t){const e=document.createElement("div");e.className="product-card";let o="https://via.placeholder.com/400x400/374151/FFFFFF?text=Sin+Imagen";if(t.images&&t.images.length>0){const a=t.images[0];o=typeof a=="string"?a:a?.src||o}return e.innerHTML=`
			<!-- Desktop Card -->
			<div class="hidden lg:block bg-[var(--cajas)] rounded-lg shadow transition-shadow overflow-hidden hover:shadow-xl ">
				<div class="relative">
					<a href="/producto/${t.slug}" class="block">
						<div class="aspect-square product-image-container overflow-hidden">
							<img
								src="${o}"
								alt="${t.name}"
								class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								loading="lazy"
							/>
						</div>
					</a>
					<div class="absolute top-3 right-3">
						<button
							class="favorite-btn relative w-10 h-10 bg-[var(--cajas)] rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center group"
							data-product-id="${t.id}"
							data-product-name="${t.name}"
							aria-label="${t.name} - Quitar de favoritos"
						>
							<svg
								class="heart-icon w-5 h-5 text-[var(--favorite-color)] transition-all duration-200 drop-shadow-sm"
								fill="currentColor"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/>
							</svg>
						</button>
					</div>
				</div>
				<div class="p-4">
					<h3 class="font-semibold product-title mb-2 line-clamp-2">
						<a href="/producto/${t.slug}" class="hover:text-[var(--vinculo)] transition-colors text-[var(--accent-color)]">
							${t.name}
						</a>
					</h3>
					<div class="flex items-center justify-between">
						<a
							href="/producto/${t.slug}"
							class="product-link text-sm font-medium transition-colors"
						>
							Ver detalles →
						</a>
					</div>
				</div>
			</div>


			<!-- 🚀 Mobile Card -->
			<div class="flex lg:hidden h-[100px] product-card-mobile bg-[var(--cajas)] rounded-lg shadow transition-shadow overflow-hidden hover:shadow-xl">
				<div class="w-[100px] h-[100px] flex-shrink-0 relative">
					<img
						src="${o}"
						alt="${t.name}"
						class="w-full h-full object-cover"
						loading="lazy"
					/>
					<div class="absolute top-2 right-2 z-20">
						<button
							class="favorite-btn w-7 h-7 bg-white/95 shadow-xl rounded-full flex items-center justify-center group"
							data-product-id="${t.id}"
							data-product-name="${t.name}"
							aria-label="${t.name} - Quitar de favoritos"
						>
							<svg
								class="heart-icon w-3 h-3 text-[var(--favorite-color)] transition-all duration-200 drop-shadow-sm"
								fill="currentColor"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/>
							</svg>
						</button>
					</div>
					<div class="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 via-black/0 to-black/0"></div>
				</div>
				<div class="flex-1 p-2 flex flex-col justify-between">
					<div>
						<h3 class="text-sm font-medium product-title-mobile line-clamp-1">
							<a href="/producto/${t.slug}" class="hover:text-[var(--vinculo)] transition-colors text-[var(--accent-color)]">
								${t.name}
							</a>
						</h3>
						<p class="text-xs product-description-mobile line-clamp-2 mt-1">
							${t.shortDescription?.slice(0,90)}...
						</p>
					</div>
					<div class="flex items-center justify-between mt-1">
						<a
							href="/producto/${t.slug}"
							class="product-link-mobile text-xs text-[var(--accent-color)] hover:text-[var(--vinculo)] transition-colors"
						>
							Ver detalles →
						</a>
					</div>
				</div>
			</div>
		`,e}function m(){document.getElementById("empty-favorites")?.classList.remove("hidden"),document.getElementById("favorites-grid-container")?.classList.add("hidden"),document.getElementById("clear-all-favorites")?.classList.add("hidden")}function h(){document.getElementById("empty-favorites")?.classList.add("hidden"),document.getElementById("favorites-grid-container")?.classList.remove("hidden"),document.getElementById("clear-all-favorites")?.classList.remove("hidden")}function g(t){const e=document.getElementById("favorites-count-number");e&&(e.textContent=t.toString())}function s(){const t=u();if(g(t.length),window.updateFavoritesCount&&window.updateFavoritesCount(t.length),t.length===0)m();else{h();const e=document.querySelector("#favorites-grid-container .grid");e&&(e.innerHTML="",t.forEach(o=>{e.appendChild(f(o))}),setTimeout(w,100))}}async function p(t){const e=t.currentTarget,o=e.dataset.productId,a=e.dataset.productName;if(!o||!a){console.error("Missing product ID or name");return}if(!e.disabled){e.disabled=!0,e.classList.add("opacity-50","cursor-wait");try{const n=await i.toggleFavorite(o,a);i.updateAllHeartIcons(o,n),window.dispatchEvent(new CustomEvent("favoritesChanged",{detail:{productId:o,isFavorite:n,productName:a}})),window.updateFavoritesCount&&window.updateFavoritesCount(i.getFavorites().length)}finally{e.disabled=!1,e.classList.remove("opacity-50","cursor-wait")}}}function w(){document.querySelectorAll(".favorite-btn").forEach(t=>{i.initializeButton(t);const e=t.cloneNode(!0);t.parentNode&&t.parentNode.replaceChild(e,t),e.addEventListener("click",p)})}function y(){const t=document.getElementById("clear-all-favorites"),e=document.getElementById("trash-icon"),o=document.getElementById("clear-text");if(!(!t||!e||!o)){if(!o.classList.contains("hidden")){i.clearAllFavorites(),s(),e.classList.remove("hidden"),o.classList.add("hidden");return}e.classList.add("hidden"),o.classList.remove("hidden"),setTimeout(()=>{o.classList.contains("hidden")||(e.classList.remove("hidden"),o.classList.add("hidden"))},3e3)}}function c(){window.addEventListener("favoritesChanged",s),window.addEventListener("favoritesCleared",s);const t=document.getElementById("clear-all-favorites");t&&t.addEventListener("click",y),s()}document.addEventListener("DOMContentLoaded",c);document.addEventListener("astro:page-load",c);
