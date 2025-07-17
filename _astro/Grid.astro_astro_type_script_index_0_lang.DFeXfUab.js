import{a as b}from"./productUtils.Du6jOUUm.js";import{s as f}from"./telegram.Ce-bSytT.js";let s=[];const c=25;class i{static instance;constructor(){}static getInstance(){return i.instance||(i.instance=new i),i.instance}getFavorites(){try{const t=localStorage.getItem("favorites");return t?JSON.parse(t):[]}catch(t){return console.error("Error reading favorites from localStorage:",t),[]}}saveFavorites(t){try{localStorage.setItem("favorites",JSON.stringify(t))}catch(o){console.error("Error saving favorites to localStorage:",o)}}async toggleFavorite(t,o){const a=this.getFavorites(),r=a.indexOf(t);if(r>-1){a.splice(r,1),this.saveFavorites(a);try{await f(o,"removed")}catch(n){console.warn("❌ Failed to send Telegram notification for removal:",n)}return!1}else{a.push(t),this.saveFavorites(a);try{await f(o,"added")}catch(n){console.error("❌ Failed to send Telegram notification for addition:",n)}return!0}}updateHeartIcon(t,o){const a=t.querySelector(".heart-icon");a&&(o?(a.classList.add("fill-[var(--favorite-color)]","text-[var(--favorite-color)]"),a.classList.remove("fill-none","text-[var(--text-color-soft)]")):(a.classList.remove("fill-[var(--favorite-color)]","text-[var(--favorite-color)]"),a.classList.add("fill-none","text-[var(--text-color-soft)]")))}updateAllHeartIcons(t,o){document.querySelectorAll(`.favorite-btn[data-product-id="${t}"] .heart-icon`).forEach(r=>{o?(r.classList.add("fill-[var(--favorite-color)]","text-[var(--favorite-color)]"),r.classList.remove("fill-none","text-[var(--text-color-soft)]")):(r.classList.remove("fill-[var(--favorite-color)]","text-[var(--favorite-color)]"),r.classList.add("fill-none","text-[var(--text-color-soft)]"))})}initializeButton(t){const o=t.dataset.productId,r=this.getFavorites().includes(o);this.updateHeartIcon(t,r)}}const l=i.getInstance(),u={desktopCard:(e,t)=>`
		<div class="hidden lg:block rounded-lg shadow transition-shadow overflow-hidden hover:shadow-xl bg-[var(--cajas)]">
			<div class="relative">
				<a href="/producto/${e.slug}" class="block">
					<div class="aspect-square overflow-hidden">
						<img
							src="${t}"
							alt="${e.name}"
							class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
							loading="lazy"
						/>
					</div>
				</a>

				<div class="absolute top-3 right-3">
					<button
						class="favorite-btn relative w-8 h-8 transition-all duration-200 flex items-center justify-center group bg-white rounded-full p-2 shadow-lg"
						data-product-id="${e.id}"
						data-product-name="${e.name}"
						aria-label="${e.name} - Agregar a favoritos"
					>
						<svg
							class="heart-icon w-5 h-5 text-[var(--text-color-soft)] transition-all duration-200"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							/>
						</svg>
					</button>
				</div>
			</div>
			<div class="p-4">
				<div class="mb-2">
				</div>
				<h3 class="font-semibold text-[var(--accent-color)] mb-2 line-clamp-2">
					<a href="/producto/${e.slug}" class="hover:text-[var(--accent-color)] transition-colors">
						${e.name}
					</a>
				</h3>
				<p class="text-sm text-[var(--text-color)] mb-3 line-clamp-2">
					${e.shortDescription}
				</p>
				<div class="flex items-center justify-between">
					<a
						href="/producto/${e.slug}"
						class="text-sm font-medium transition-colors text-[var(--accent-color)] hover:text-[var(--vinculo)]"
					>
						Ver detalles →
					</a>
				</div>
			</div>
		</div>
	`,mobileCard:(e,t)=>`
		<div class="flex lg:hidden h-[100px] bg-[var(--cajas)] rounded-lg overflow-hidden">
			<div class="w-[100px] h-[100px] flex-shrink-0 relative">
				<img
					src="${t}"
					alt="${e.name}"
					class="w-full h-full object-cover"
					loading="lazy"
				/>
				<!-- Favorite button positioned at top-right of image -->
				<div class="absolute top-2 right-2 z-20">
					<button
						class="favorite-btn w-7 h-7 transition-all duration-200 flex items-center justify-center group bg-white rounded-full p-2 shadow-lg"
						data-product-id="${e.id}"
						data-product-name="${e.name}"
						aria-label="${e.name} - Agregar a favoritos"
					>
						<svg
							class="heart-icon w-3 h-3 text-[var(--text-color-soft)] transition-all duration-200"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							/>
						</svg>
					</button>
				</div>
				<!-- Optional: subtle dark overlay for better contrast -->
				<div class="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 via-black/0 to-black/0"></div>
			</div>
			<div class="flex-1 p-2 flex flex-col justify-between">
				<div>
					<h3 class="text-sm font-medium text-[var(--text-color)] line-clamp-1">
						<a href="/producto/${e.slug}" class="hover:text-[var(--accent-color)] transition-colors">
							${e.name}
						</a>
					</h3>
					<p class="text-xs text-[var(--text-color-soft)] line-clamp-2 mt-1">
						${e.shortDescription?.slice(0,90)}...
					</p>
				</div>
				<div class="flex items-center justify-between mt-1">
					<a
						href="/producto/${e.slug}"
						class="text-xs text-[var(--accent-color)] hover:text-[var(--vinculo)] transition-colors"
					>
						leer más →
					</a>
				</div>
			</div>
		</div>
	`};function L(e){const t=document.createElement("div");t.className="product-card";let o="https://via.placeholder.com/400x400/374151/FFFFFF?text=Sin+Imagen";if(e.images&&e.images.length>0){const a=e.images[0];typeof a=="string"?o=a:a&&typeof a=="object"&&"src"in a&&(o=a.src)}return t.innerHTML=u.desktopCard(e,o)+u.mobileCard(e,o),t}function g(e,t){const o=document.getElementById("page-count"),a=document.getElementById("filtered-count"),r=document.getElementById("counter-text");if(o&&a&&r){const n=e.length;o.textContent=n.toString(),a.textContent=t.toString(),r.innerHTML=`Mostrando <span id="page-count" class="font-semibold text-[var(--text-color)]">${n}</span> de <span id="filtered-count" class="font-semibold text-[var(--text-color)]">${t}</span> productos`}}function y(e,t){const o=Math.ceil(e/c);window.dispatchEvent(new CustomEvent("paginationUpdate",{detail:{currentPage:t,totalPages:o,totalProducts:e,productsPerPage:c}}))}function v(e,t=1){const o=document.getElementById("products-grid"),a=document.getElementById("no-products"),r=document.getElementById("loading");!o||!a||!r||(t===1&&(r.classList.remove("hidden"),o.classList.add("hidden"),a.classList.add("hidden")),setTimeout(()=>{const n=(t-1)*c,p=n+c,d=e.slice(n,p);d.length===0?(o.classList.add("hidden"),a.classList.remove("hidden"),g([],e.length)):(o.innerHTML="",d.forEach(x=>{const w=L(x);o.appendChild(w)}),o.classList.remove("hidden"),a.classList.add("hidden"),g(d,e.length)),r.classList.add("hidden"),y(e.length,t),setTimeout(()=>{m()},100)},300))}async function C(e){e.preventDefault(),e.stopPropagation();const t=e.currentTarget,o=t.dataset.productId,a=t.dataset.productName;if(!t.disabled){t.disabled=!0;try{const r=await l.toggleFavorite(o,a);if(l.updateAllHeartIcons(o,r),window.dispatchEvent(new CustomEvent("favoritesChanged",{detail:{productId:o,isFavorite:r,productName:a}})),window.updateFavoritesCount){const n=l.getFavorites();window.updateFavoritesCount(n.length)}}catch(r){console.error("Error toggling favorite:",r)}finally{t.disabled=!1}}}function m(){document.querySelectorAll(".favorite-btn").forEach(t=>{l.initializeButton(t);const o=t.cloneNode(!0);t.parentNode?.replaceChild(o,t),o.addEventListener("click",C)})}function h(){window.addEventListener("pageChanged",e=>{const{page:t}=e.detail;v(s,t)}),window.addEventListener("productsFiltered",e=>{s=e.detail.products,v(s,1)}),window.addEventListener("favoritesChanged",()=>{setTimeout(m,100)}),s.length===0&&(s=b(),v(s,1))}document.addEventListener("DOMContentLoaded",h);document.addEventListener("astro:page-load",h);
