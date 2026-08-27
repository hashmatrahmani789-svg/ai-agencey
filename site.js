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
    return "We build the website and the AI systems behind it: sites that convert, chatbots that answer and qualify, online booking, review requests, follow-up, and custom automation — so other businesses stop losing work to missed calls and a slow site.";
  }
  if (hasAny(q, ["price", "pricing", "cost", "quote", "how much", "expensive", "rate"])) {
    return "No public price list. After a 30-minute call we quote one clear number for the project — website, automations, or both. Email hash@getwebnow.co if you want to send details first.";
  }
  if (hasAny(q, ["chatbot", "chat bot", "ai chat", "bot"])) {
    return "We install AI chatbots that answer real questions about the business, qualify the lead, and can book the next step — including after hours.";
  }
  if (hasAny(q, ["review"])) {
    return "Review automation sends the ask after the job is done, so happy customers actually leave reviews instead of you chasing them.";
  }
  if (hasAny(q, ["book a", "booking", "calendar", "schedule", "appointment", "diagnostic", "cal.com"])) {
    return "Book 30 minutes on the calendar, email hash@getwebnow.co, call or WhatsApp (253) 397-0341, or open the Facebook page. We look at the site, the inbox, and what is costing you work. Use Book a 30-min call above.";
  }
  if (hasAny(q, ["website", "web site", "web page", "redesign", "landing page"])) {
    return "We build or refresh the website so hiring you is obvious: fast, current, services and the next step on the first screen. Live samples are on the Work page.";
  }
  if (hasAny(q, ["automat", "follow up", "follow-up", "system"])) {
    return "If you do it every week — quotes, reminders, routing, inbox — we turn it into a system so you can take more customers, not more busywork.";
  }
  if (hasAny(q, ["cascade", "ridgeline", "wahaj", "reset", "roof", "plumb", "portfolio", "live work", "projects", "samples"])) {
    return "Selected live work: Cascade Plumbing, Ridgeline Roofing, 12-Week Reset, and Wahaj Welfare. 150+ websites built successfully — we only list a few. Open Work to click through.";
  }
  if (hasAny(q, ["hashmat", "founder", "who are you", "who is", "studio"])) {
    return "GetWebNow is led by Hashmatullah. You talk to the person who scopes and builds the work — not a ticket queue. Email hash@getwebnow.co.";
  }
  if (hasAny(q, ["email", "phone", "contact", "reach", "whatsapp", "facebook"])) {
    return "Email hash@getwebnow.co · Phone or WhatsApp (253) 397-0341 · Facebook page facebook.com/getwebnow.co. That is the studio — use it for quotes and questions.";
  }
  if (hasAny(q, ["how long", "timeline", "how fast", "weeks"])) {
    return "Most website updates go live in 1–2 weeks. Chatbots, booking, and follow-up usually ship in the same window. You get the timeline before we start.";
  }
  if (hasAny(q, ["help", "hi", "hello", "hey"])) {
    return "We help businesses with websites, AI chatbots, booking, reviews, and automation. Ask what we build, how we price, or how to start — or email hash@getwebnow.co.";
  }
  return "We build websites and AI automation for other businesses. Ask what we build, pricing, live work, or how to start. Email hash@getwebnow.co or call (253) 397-0341.";
}

function mountChat() {
  if (document.getElementById("chat-launch")) return;
  document.body.insertAdjacentHTML("beforeend", `
<button class="chat-launch" id="chat-launch" type="button" aria-label="Open chat">
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10c-1.6 0-3.11-.365-4.46-1.02L2 22l1.06-5.3A9.94 9.94 0 0 1 2 12Z"/></svg>
</button>
<div class="chat-panel" id="chat-panel">
  <div class="chat-head">
    <div>
      <strong>GetWebNow assistant</strong>
      <p>Questions about the studio and our work</p>
    </div>
    <button type="button" id="chat-close" aria-label="Close chat">×</button>
  </div>
  <a href="mailto:hash@getwebnow.co" class="chat-book">Email hash@getwebnow.co</a>
  <div class="chat-log" id="chat-log"></div>
  <form class="chat-form" id="chat-form">
    <input id="chat-input" type="text" placeholder="Ask what we build, pricing, work..." autocomplete="off">
    <button type="submit">Send</button>
  </form>
</div>`);

  const panel = document.getElementById("chat-panel");
  const log = document.getElementById("chat-log");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");

  function bubble(text, who) {
    const el = document.createElement("div");
    el.className = "chat-bubble " + who;
    el.textContent = text;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
  }

  bubble("Hi — I can answer what GetWebNow builds, how we work, pricing, live projects, or how to start. Try “what you build”.", "bot");

  document.getElementById("chat-launch").addEventListener("click", () => panel.classList.add("open"));
  document.getElementById("chat-close").addEventListener("click", () => panel.classList.remove("open"));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    bubble(text, "user");
    input.value = "";
    bubble(replyTo(text), "bot");
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
