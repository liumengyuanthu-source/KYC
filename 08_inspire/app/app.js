/* Clear-to-Trade Agentic Portal — shared interactions */
(function () {
  "use strict";

  /* ---------- entrance reveals ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("in"), (e.target.dataset.stagger || 0) * 90);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach((el, i) => {
    if (!el.dataset.stagger) el.dataset.stagger = (i % 6);
    io.observe(el);
  });

  /* ---------- animated progress fills ---------- */
  const pio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const t = e.target;
        requestAnimationFrame(() => { t.style.width = t.dataset.fill + "%"; });
        pio.unobserve(t);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll(".progress .fill").forEach((el) => pio.observe(el));

  /* ---------- readiness ring ---------- */
  document.querySelectorAll(".ring-fill").forEach((el) => {
    const pct = +el.dataset.pct || 0;
    const r = +el.getAttribute("r");
    const c = 2 * Math.PI * r;
    el.style.strokeDasharray = c;
    el.style.strokeDashoffset = c;
    const rio = new IntersectionObserver((es) => {
      es.forEach((en) => {
        if (en.isIntersecting) {
          requestAnimationFrame(() => { el.style.strokeDashoffset = c * (1 - pct / 100); });
          rio.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    rio.observe(el);
  });

  /* ---------- counters ---------- */
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix || "";
      let v = 0;
      const step = Math.max(1, Math.round(target / 40));
      const tick = setInterval(() => {
        v = Math.min(target, v + step);
        el.textContent = v + suffix;
        if (v >= target) clearInterval(tick);
      }, 50);
      cio.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll("[data-count]").forEach((el) => cio.observe(el));

  /* ---------- toast ---------- */
  let toastEl;
  window.toast = function (msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.innerHTML = '<span class="t-dot"></span><span class="t-msg"></span>';
      document.body.appendChild(toastEl);
    }
    toastEl.querySelector(".t-msg").textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => toastEl.classList.remove("show"), 3200);
  };

  /* ---------- Aria chat drawer ---------- */
  const fab = document.querySelector(".chat-fab");
  const drawer = document.querySelector(".chat-drawer");
  if (fab && drawer) {
    const body = drawer.querySelector(".chat-body");
    const input = drawer.querySelector(".chat-input input");
    const send = drawer.querySelector(".chat-send");
    const ctx = document.body.dataset.page || "home";

    const replies = {
      home: [
        "Your Meridian Holdings case is at 68% readiness. The fastest thing you can do right now is upload the two outstanding ownership documents — that would unblock QA review M6.2.",
        "Screening (M4) is running in parallel with document sourcing (M3). No action needed from you there — I adjudicate routine hits automatically and only escalate material findings.",
        "Based on the current trajectory, Meridian Holdings could reach cleared-to-trade within 6–8 business days, provided the EDD information arrives this week."
      ],
      intake: [
        "I pre-fill anything I already hold from public registries and your relationship record — you only confirm or correct it. Fields marked with a dot are mandatory for booking-model determination.",
        "If you're unsure about the booking entity, pick your sales location and preferred currency first; I'll recommend the reporting entity based on the approved product scope.",
        "You can save a draft at any step. I'll keep it for 30 days and remind your RM if it stalls."
      ],
      case: [
        "M5.2 evidence pack is compiling now. I've pulled 9 of 11 evidence items; the two remaining need your input — see the outstanding requirements panel.",
        "Human-in-the-loop: a KYC Ops specialist will review my EDD risk assessment (M5.9) before approval. You don't need to do anything unless I flag a complex gap.",
        "Conflicts check (M7) is complete with no hits. Legal agreement drafting (C1) is running in parallel — expected draft by Thursday."
      ],
      documents: [
        "I've already sourced 5 documents from public registries and your previous refresh — no upload needed for those. Only the rows marked 'Upload needed' require action from you.",
        "Certified copies are required for the register of directors. A scanned PDF under 10 MB works; I'll validate it against the registry data automatically.",
        "Once you upload, I check completeness and evidence sufficiency immediately — you'll see the status change within seconds."
      ],
      edd: [
        "Source of Wealth should describe how the wealth was originally generated (e.g. business profits, asset disposal). Source of Funds is where the money for this relationship comes from — they're assessed separately.",
        "Your expected activity profile calibrates transaction monitoring. Rough figures are fine at this stage; they're re-validated at the annual refresh.",
        "Everything you submit here feeds the EDD evidence pack (M5.2) and is reviewed by a Financial Crime Risk specialist (M5.10) before approval."
      ]
    };

    const bank = replies[ctx] || replies.home;
    let ri = 0;

    function addMsg(text, who, tag) {
      const m = document.createElement("div");
      m.className = "msg " + who;
      if (tag) m.innerHTML = '<span class="msg-tag">' + tag + "</span>" + text;
      else m.textContent = text;
      body.appendChild(m);
      body.scrollTop = body.scrollHeight;
    }
    function agentSay(text) {
      const t = document.createElement("div");
      t.className = "msg agent";
      t.innerHTML = '<div class="typing"><i></i><i></i><i></i></div>';
      body.appendChild(t);
      body.scrollTop = body.scrollHeight;
      setTimeout(() => {
        t.innerHTML = '<span class="msg-tag">Aria · Agentic</span>' + text;
        body.scrollTop = body.scrollHeight;
      }, 900 + Math.random() * 700);
    }

    fab.addEventListener("click", () => {
      drawer.classList.add("open");
      fab.style.display = "none";
      if (!body.dataset.seeded) {
        body.dataset.seeded = "1";
        const hello = {
          home: "Hi Annette — I'm Aria, orchestrating your clear-to-trade cases. Ask me about status, what's blocking, or what I need from you next.",
          intake: "I'll guide you through this request. I auto-fill what I can and only ask for what the booking model and risk rules actually require.",
          case: "You're looking at the live execution state of case OB-2026-0147. Ask me why anything is waiting, or what's running in parallel.",
          documents: "I source documents from registries and data providers first — uploads are the last resort. Ask me about any row.",
          edd: "This is the Enhanced Due Diligence information request. I'll explain any field — nothing here is asked without a regulatory reason."
        }[ctx] || "Hi, I'm Aria.";
        agentSay(hello);
      }
    });
    drawer.querySelector(".chat-close").addEventListener("click", () => {
      drawer.classList.remove("open");
      fab.style.display = "flex";
    });

    function ask(q) {
      addMsg(q, "user");
      agentSay(bank[ri % bank.length]);
      ri++;
    }
    function submit() {
      const v = input.value.trim();
      if (!v) return;
      input.value = "";
      ask(v);
    }
    send.addEventListener("click", submit);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });
    drawer.querySelectorAll(".chat-chips .pill").forEach((p) =>
      p.addEventListener("click", () => ask(p.textContent.trim()))
    );
  }

  /* ---------- wizard (intake page) ---------- */
  const wizard = document.querySelector("[data-wizard]");
  if (wizard) {
    const panes = [...wizard.querySelectorAll(".wizard-pane")];
    const steps = [...document.querySelectorAll(".wstep")];
    const btnNext = document.querySelector("[data-w-next]");
    const btnBack = document.querySelector("[data-w-back]");
    const bar = document.querySelector("[data-w-bar]");
    let cur = 0;

    function show(i, user) {
      cur = i;
      panes.forEach((p, k) => p.classList.toggle("active", k === i));
      steps.forEach((s, k) => {
        s.classList.toggle("active", k === i);
        s.classList.toggle("done", k < i);
        if (k < i) s.querySelector(".wnum").innerHTML = "✓";
        else s.querySelector(".wnum").textContent = k + 1;
      });
      if (bar) bar.style.width = ((i + 1) / panes.length) * 100 + "%";
      btnBack.style.visibility = i === 0 ? "hidden" : "visible";
      btnNext.innerHTML = i === panes.length - 1
        ? 'Submit request <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
        : 'Continue <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
      if (user) {
        const top = wizard.getBoundingClientRect().top - 80 + (document.querySelector(".frame") || document.documentElement).scrollTop;
        (document.querySelector(".frame") || window).scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      }
    }
    btnNext.addEventListener("click", () => {
      if (cur === panes.length - 1) {
        const ov = document.querySelector(".overlay");
        if (ov) ov.classList.add("show");
        return;
      }
      show(cur + 1, true);
      toast("Draft saved · step " + (cur + 1) + " of " + panes.length);
    });
    btnBack.addEventListener("click", () => show(Math.max(0, cur - 1), true));
    show(0);
  }

  /* ---------- UBO repeater ---------- */
  const uboAdd = document.querySelector("[data-add-ubo]");
  if (uboAdd) {
    uboAdd.addEventListener("click", () => {
      const list = document.querySelector("#ubo-list");
      const tpl = document.querySelector("#ubo-tpl");
      const node = tpl.content.cloneNode(true);
      const card = node.querySelector(".ubo-card");
      card.style.animation = "paneIn .4s var(--ease-out)";
      list.appendChild(node);
      toast("Owner " + list.children.length + " added");
    });
    document.addEventListener("click", (e) => {
      const rm = e.target.closest("[data-rm-ubo]");
      if (rm) rm.closest(".ubo-card").remove();
    });
  }

  /* ---------- upload simulation ---------- */
  document.querySelectorAll(".dropzone").forEach((dz) => {
    const fi = dz.querySelector('input[type="file"]');
    function fakeUpload(name) {
      const row = dz.closest("[data-doc-target]");
      dz.innerHTML = '<div class="progress" style="max-width:260px;margin:18px auto 10px"><div class="fill" style="width:0"></div></div><div class="dz-sub">Validating evidence…</div>';
      const fill = dz.querySelector(".fill");
      let p = 0;
      const t = setInterval(() => {
        p += 8 + Math.random() * 14;
        fill.style.width = Math.min(100, p) + "%";
        if (p >= 100) {
          clearInterval(t);
          setTimeout(() => {
            dz.innerHTML = '<div class="dz-title" style="color:var(--ok)">✓ ' + (name || "Document") + ' received</div><div class="dz-sub">Aria is checking completeness & evidence sufficiency — status updates in seconds.</div>';
            toast("Uploaded · validation started");
          }, 350);
        }
      }, 140);
    }
    dz.addEventListener("click", () => fi && fi.click());
    if (fi) fi.addEventListener("change", () => fi.files[0] && fakeUpload(fi.files[0].name));
    ["dragover", "dragenter"].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.add("dragover"); }));
    ["dragleave", "drop"].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.remove("dragover"); }));
    dz.addEventListener("drop", (e) => {
      const f = e.dataTransfer.files && e.dataTransfer.files[0];
      fakeUpload(f ? f.name : "Document.pdf");
    });
  });

  /* ---------- overlay close ---------- */
  document.querySelectorAll(".overlay").forEach((ov) => {
    ov.addEventListener("click", (e) => { if (e.target === ov) ov.classList.remove("show"); });
  });
  document.querySelectorAll("[data-overlay-close]").forEach((b) =>
    b.addEventListener("click", () => b.closest(".overlay").classList.remove("show"))
  );

  /* ---------- live agent feed ticker (dashboard) ---------- */
  const feed = document.querySelector("[data-live-feed]");
  if (feed) {
    const items = [
      ["now", "<b>M5.2</b> Evidence pack compiled — 9 of 11 items"],
      ["2m", "<b>M4.4</b> Screening complete — 14 parties, 0 confirmed hits"],
      ["9m", "<b>M3.1</b> Sourced registry extract · HK Companies Registry"],
      ["21m", "<b>M2.5</b> Requirements issued to client — 6 items"],
      ["1h", "<b>M0.4</b> Booking model recorded · HK entity"]
    ];
    let fi = 0;
    setInterval(() => {
      const [time, html] = items[fi % items.length];
      const d = document.createElement("div");
      d.className = "agent-item";
      d.innerHTML = '<span class="ai-time">' + time + '</span><span>' + html + "</span>";
      feed.prepend(d);
      while (feed.children.length > 4) feed.lastChild.remove();
      fi++;
    }, 5200);
  }

  /* ---------- pill filters (dashboard) ---------- */
  document.querySelectorAll("[data-filter-row] .pill").forEach((p) => {
    p.addEventListener("click", () => {
      p.parentElement.querySelectorAll(".pill").forEach((x) => x.classList.remove("active"));
      p.classList.add("active");
      const f = p.dataset.filter;
      document.querySelectorAll("[data-case]").forEach((c) => {
        c.style.display = f === "all" || c.dataset.case.includes(f) ? "" : "none";
      });
    });
  });
})();
