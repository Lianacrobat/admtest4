const n="7555861557:AAGfZFvIiXAYxYUB21e7HHGCD7XPOXffM3g",c="1223367230",d="https://api.telegram.org/bot",i={added:{emoji:"🛍️",text:"Producto añadido a favoritos",color:"🟢"},removed:{emoji:"❌",text:"Producto removido de favoritos",color:"🔴"},default:{emoji:"ℹ️",text:"Acción en favoritos",color:"🟡"}};async function l(t,a={}){try{const e=`${d}${n}/${t}`,o=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!o.ok)throw new Error(`HTTP ${o.status}: ${await o.text()}`);const r=await o.json();if(!r.ok)throw new Error(r.description||"Unknown Telegram API error");return r}catch(e){throw console.error(`❌ Telegram API call failed for ${t}:`,e),e}}async function m(t,a="added"){try{const e=i[a]||i.default,o=new Date().toLocaleString("es-ES",{timeZone:"America/Mexico_City",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}),r=`${e.color} <b>${e.text}</b>

📦 <b>Producto:</b> "${t}"
⏰ <b>Hora:</b> ${o}
🌐 <b>Origen:</b> Tienda Web

${e.emoji} <i>Acción realizada desde la tienda online</i>`,s=await l("sendMessage",{chat_id:c,text:r,parse_mode:"HTML",disable_web_page_preview:!0});return console.log(`✅ Telegram notification sent: ${t} (${a})`),{success:!0,result:s}}catch(e){return console.error(`❌ Telegram error: ${e.message}`),{success:!1,error:e.message}}}export{m as s};
