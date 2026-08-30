const nav = document.getElementById("nav");
const toggle = document.querySelector("[data-nav-toggle]");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggle.setAttribute("aria-label", nav.classList.contains("open") ? "Close menu" : "Open menu");
  });
}

function hasAny(q, words) {
  return words.some((w) => q.includes(w));
}

function replyTo(text) {
  const q = " " + text.toLowerCase().replace(/[^\w\s+]/g, " ").replace(/\s+/g, " ") + " ";

  if (hasAny(q, [" what you build", " what do you build", " what you do", " what do you do", " what can you", " what does getwebnow", " services", " your offer", " you offer", " you make", " you install"])) {
    return "We build the website and the AI systems behind it: sites that convert, chatbots that answer and book, online booking, email follow-up, reviews, branding, and custom automation — so businesses stop losing work to missed calls and a slow site.";
  }
  if (hasAny(q, ["price", "pricing", "cost", "quote", "how much", "expensive", "rate", "pay"])) {
    return "No public price list. After a 30-minute call we quote one clear number for the project — website, automations, or both. Email hash@getwebnow.co if you want to send details first.";
  }
  if (hasAny(q, ["brand", "logo", "identity"])) {
    return "Branding is a mark, type, and color system that carries from the website to the invoice, so the business looks hired — not pieced together from templates.";
  }
  if (hasAny(q, ["email marketing", "newsletter", "sequence", "inbox"])) {
    return "Email marketing is sequences for quotes, reviews, and past customers — written in your voice and sent on a schedule. No more one thank-you email and then silence.";
  }
  if (hasAny(q, ["chatbot", "chat bot", "ai chat", "bot"])) {
    return "We install AI chatbots that answer real questions about the business, qualify the lead, and can book the next step — including after hours.";
  }
  if (hasAny(q, ["review"])) {
    return "Review automation sends the ask after the job is done, so happy customers actually leave reviews instead of you chasing them.";
  }
  if (hasAny(q, ["start", "get started", "next step", "how can i start"])) {
    return "Book a 30-minute diagnostic call. We look at the site, the inbox, and where you are losing work, then you get a clear plan and a number. Use Book a call, email hash@getwebnow.co, or call (253) 397-0341.";
  }
  if (hasAny(q, ["book a", "booking", "calendar", "schedule", "appointment", "diagnostic", "cal.com"])) {
    return "We can put a calendar on your site so customers pick the time themselves. To talk to us, book 30 minutes, email hash@getwebnow.co, or call / WhatsApp (253) 397-0341.";
  }
  if (hasAny(q, ["website", "web site", "web page", "redesign", "landing page"])) {
    return "We build or refresh the website so hiring you is obvious: fast, current, services and the next step on the first screen. Live samples are on the Work page.";
  }
  if (hasAny(q, ["automat", "follow up", "follow-up", "system"])) {
    return "If you do it every week — quotes, reminders, routing, inbox — we turn it into a system so you can take more customers, not more busywork.";
  }
  if (hasAny(q, ["who is it for", "who do you", "trades", "clinic", "shop", "coach", "industry"])) {
    return "Trades, clinics, shops, coaches, firms, and nonprofits. If leads die on a weak website or in the inbox, we can build the system.";
  }
  if (hasAny(q, ["cascade", "ridgeline", "wahaj", "reset", "roof", "plumb", "portfolio", "live work", "projects", "samples"])) {
    return "Selected live work: Cascade Plumbing, Ridgeline Roofing, 12-Week Reset, and Wahaj Welfare. 150+ websites built successfully — we only list a few. Open the Work page to click through.";
  }
  if (hasAny(q, ["hashmat", "founder", "who are you", "who is", "studio"])) {
    return "GetWebNow is led by Hashmatullah. You talk to the person who scopes and builds the work — not a ticket queue. Email hash@getwebnow.co.";
  }
  if (hasAny(q, ["where", "location", "based", "city", "hours", "open"])) {
    return "The studio works online with businesses anywhere. Book a call any weekday, or email hash@getwebnow.co and we reply the same day when we can. Phone and WhatsApp: (253) 397-0341.";
  }
  if (hasAny(q, ["email", "phone", "contact", "reach", "whatsapp", "facebook"])) {
    return "Email hash@getwebnow.co · Phone or WhatsApp (253) 397-0341 · Facebook facebook.com/getwebnow.co. Use those for quotes and questions.";
  }
  if (hasAny(q, ["how long", "timeline", "how fast", "weeks"])) {
    return "Most website updates go live in 1–2 weeks. Chatbots, booking, and follow-up usually ship in the same window. You get the timeline before we start.";
  }
  if (hasAny(q, ["own", "support", "after launch", "maintain"])) {
    return "The system is yours when we launch. Stay on with us later only if you want the next piece built.";
  }
  if (hasAny(q, ["help", "hi", "hello", "hey", "how are you"])) {
    return "Hi, how can I help you? Ask about what we build, pricing, how long it takes, or how to start.";
  }
  return "I can help with common questions — what we build, pricing, timeline, live work, or how to start. Leave your details in the chat and I will pass them to the studio.";
}

function isEmail(text) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
}

function isPhone(text) {
  const digits = text.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function wantsLead(text) {
  const q = " " + text.toLowerCase().replace(/[^\w\s+]/g, " ").replace(/\s+/g, " ") + " ";
  return hasAny(q, [
    "quote", "get a quote", "leave my", "call me", "contact me", "follow up",
    "talk to someone", "talk to hash", "send my", "my name is", "my email",
    "my number", "reach me"
  ]);
}

function shouldOfferLead(text) {
  const q = " " + text.toLowerCase().replace(/[^\w\s+]/g, " ").replace(/\s+/g, " ") + " ";
  return hasAny(q, [
    "price", "pricing", "cost", "how much", "start", "get started", "next step",
    "book a", "quote", "contact", "how can i start"
  ]);
}

function mountChat() {
  if (document.getElementById("chat-launch")) return;
  document.body.insertAdjacentHTML("beforeend", `
<button class="chat-launch" id="chat-launch" type="button" aria-label="Open chat">
  <img src="media/chat-avatar.png" alt="" width="60" height="60">
</button>
<div class="chat-panel" id="chat-panel">
  <div class="chat-head">
    <div class="chat-head-person">
      <img class="chat-avatar" src="media/chat-avatar.png" alt="">
      <div>
        <strong>Maya</strong>
        <p>GetWebNow assistant · online</p>
      </div>
    </div>
    <button type="button" id="chat-close" aria-label="Close chat">×</button>
  </div>
  <a href="mailto:hash@getwebnow.co" class="chat-book">Email hash@getwebnow.co</a>
  <div class="chat-log" id="chat-log"></div>
  <form class="chat-form" id="chat-form">
    <input id="chat-input" type="text" placeholder="Ask a common question..." autocomplete="off">
    <button type="submit">Send</button>
  </form>
</div>`);

  const panel = document.getElementById("chat-panel");
  const log = document.getElementById("chat-log");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const transcript = [];
  const lead = { name: "", email: "", phone: "", need: "" };
  let leadStep = null;
  let leadSent = false;
  let leadFormShown = false;

  function bubble(text, who) {
    const row = document.createElement("div");
    row.className = "chat-row " + who;
    if (who === "bot") {
      const img = document.createElement("img");
      img.className = "chat-avatar";
      img.src = "media/chat-avatar.png";
      img.alt = "";
      row.appendChild(img);
    }
    const el = document.createElement("div");
    el.className = "chat-bubble " + who;
    el.textContent = text;
    row.appendChild(el);
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
    transcript.push((who === "bot" ? "Maya: " : "Visitor: ") + text);
  }

  async function sendLead() {
    const payload = {
      name: lead.name || "Not given",
      email: lead.email || "not-given@getwebnow.co",
      phone: lead.phone || "Not given",
      need: lead.need || "Not specified",
      page: location.href,
      chat: transcript.slice(-20).join("\n"),
      _subject: "New GetWebNow chat lead",
      _template: "table",
      _captcha: "false"
    };
    try {
      const res = await fetch("https://formsubmit.co/ajax/hash@getwebnow.co", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) return true;
    } catch (_) { /* fall through */ }
    const body = [
      "New chat lead from getwebnow.co",
      "Name: " + payload.name,
      "Email: " + payload.email,
      "Phone: " + payload.phone,
      "Need: " + payload.need,
      "Page: " + payload.page,
      "",
      payload.chat
    ].join("\n");
    window.location.href = "mailto:hash@getwebnow.co?subject=" + encodeURIComponent(payload._subject) + "&body=" + encodeURIComponent(body);
    return false;
  }

  function finishLead() {
    leadSent = true;
    leadStep = null;
    sendLead().then((ok) => {
      bubble(
        ok
          ? "Thanks" + (lead.name ? ", " + lead.name.split(" ")[0] : "") + ". I sent your details to the studio. Hashmatullah will follow up — or book 30 minutes at cal.com/hashmat/30min."
          : "I opened an email with your details so you can send it to hash@getwebnow.co. You can also call (253) 397-0341.",
        "bot"
      );
    });
  }

  function startLeadCapture() {
    if (leadSent || leadStep) return;
    leadStep = "name";
    bubble("I can have the studio follow up. What’s your name?", "bot");
  }

  function handleLeadAnswer(text) {
    if (leadStep === "name") {
      lead.name = text.replace(/^(i am|i'm|im|my name is|this is)\s+/i, "").trim();
      leadStep = "contact";
      bubble("Thanks, " + lead.name.split(" ")[0] + ". What’s the best email or phone number?", "bot");
      return true;
    }
    if (leadStep === "contact") {
      if (isEmail(text)) lead.email = text;
      else if (isPhone(text)) lead.phone = text;
      else {
        bubble("I need a real email or a 10-digit phone number so the studio can reach you.", "bot");
        return true;
      }
      leadStep = "need";
      bubble("Got it. What do you need help with — website, chatbot, booking, or something else?", "bot");
      return true;
    }
    if (leadStep === "need") {
      lead.need = text;
      finishLead();
      return true;
    }
    return false;
  }

  function showLeadForm() {
    if (leadSent || leadFormShown) return;
    leadFormShown = true;
    const card = document.createElement("form");
    card.className = "chat-lead";
    card.innerHTML = `
      <p>Leave your details and the studio will follow up.</p>
      <input name="name" type="text" placeholder="Your name" autocomplete="name" required>
      <input name="email" type="email" placeholder="Email" autocomplete="email">
      <input name="phone" type="tel" placeholder="Phone" autocomplete="tel">
      <input name="need" type="text" placeholder="What do you need?">
      <button type="submit">Send my details</button>
    `;
    card.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(card);
      lead.name = String(data.get("name") || "").trim();
      lead.email = String(data.get("email") || "").trim();
      lead.phone = String(data.get("phone") || "").trim();
      lead.need = String(data.get("need") || "").trim();
      if (!lead.email && !lead.phone) {
        bubble("Add an email or a phone number so we can reach you.", "bot");
        return;
      }
      card.remove();
      if (lead.name) bubble(lead.name + (lead.email ? " · " + lead.email : " · " + lead.phone), "user");
      finishLead();
    });
    log.appendChild(card);
    log.scrollTop = log.scrollHeight;
  }

  function ask(text) {
    bubble(text, "user");
    if (leadSent) {
      bubble(replyTo(text), "bot");
      return;
    }
    if (isEmail(text) && !lead.email) lead.email = text;
    if (isPhone(text) && !lead.phone) lead.phone = text;
    if (handleLeadAnswer(text)) return;
    if (wantsLead(text) && !leadStep && !leadFormShown) {
      startLeadCapture();
      return;
    }
    bubble(replyTo(text), "bot");
    if (shouldOfferLead(text)) showLeadForm();
  }

  bubble("Hi, how can I help you?", "bot");

  const chips = document.createElement("div");
  chips.className = "chat-chips";
  [
    ["What do you build?", "What do you build?"],
    ["How much does it cost?", "How much does it cost?"],
    ["How long does it take?", "How long does it take?"],
    ["Get a quote", "Get a quote"]
  ].forEach(([label, query]) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = label;
    btn.addEventListener("click", () => {
      chips.remove();
      if (query === "Get a quote") {
        bubble(query, "user");
        bubble("I can have the studio follow up. Leave your name and a way to reach you.", "bot");
        showLeadForm();
        return;
      }
      ask(query);
    });
    chips.appendChild(btn);
  });
  log.appendChild(chips);

  document.getElementById("chat-launch").addEventListener("click", () => panel.classList.add("open"));
  document.getElementById("chat-close").addEventListener("click", () => panel.classList.remove("open"));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    if (chips.parentNode) chips.remove();
    input.value = "";
    ask(text);
  });
}

function animateCounts() {
  const nodes = document.querySelectorAll("[data-count]");
  if (!nodes.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      io.unobserve(el);
      const to = Number(el.getAttribute("data-count")) || 0;
      const start = performance.now();
      const dur = 1600;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = String(Math.round(to * eased));
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = String(to);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });
  nodes.forEach((n) => io.observe(n));
}

mountChat();
animateCounts();
