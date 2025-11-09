import React, { useMemo, useState } from "react";
import PARTS from "../data/parts";
import { CONTACT } from "../constants/contact";
import { Search, SlidersHorizontal, Filter, ShoppingCart, MessageCircle, ChevronDown } from "lucide-react";

const CATS = ["Consumables","Brakes","Suspension","Wheels & Tyres","Electrical/Battery","Fluids","Performance"];
const BRANDS = Array.from(new Set(PARTS.map(p => p.brand))).sort();

export default function PartsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [brand, setBrand] = useState("All");
  const [sort, setSort] = useState("price-asc");

  const filtered = useMemo(() => {
    let list = PARTS;
    if (q.trim()) {
      const term = q.toLowerCase();
      list = list.filter(p =>
        [p.name, p.brand, p.category, p.compatibility?.join(" ")].join(" ").toLowerCase().includes(term)
      );
    }
    if (cat !== "All") list = list.filter(p => p.category === cat);
    if (brand !== "All") list = list.filter(p => p.brand === brand);

    if (sort === "price-asc") list = [...list].sort((a,b) => a.priceOMR - b.priceOMR);
    if (sort === "price-desc") list = [...list].sort((a,b) => b.priceOMR - a.priceOMR);
    if (sort === "name-asc") list = [...list].sort((a,b) => a.name.localeCompare(b.name));
    if (sort === "name-desc") list = [...list].sort((a,b) => b.name.localeCompare(a.name));
    return list;
  }, [q, cat, brand, sort]);

  const orderWhatsApp = (item) => {
    const text = encodeURIComponent(
      `Hi Elite Motors, I'd like to order:\n- ${item.name} (${item.brand})\n- Price: ${item.priceOMR.toFixed(2)} OMR (VAT included)\n\nPlease advise availability & ETA.`
    );
    window.open(`https://wa.me/${CONTACT.WHATSAPP}?text=${text}`, "_blank", "noopener");
  };

  const addToQuote = (item) => {
    const subject = encodeURIComponent(`Quote request: ${item.name}`);
    const body = encodeURIComponent(`Hello,\n\nI'd like a quote for:\n- ${item.name} (${item.brand})\n- Category: ${item.category}\n- Price listed: ${item.priceOMR.toFixed(2)} OMR (VAT included)\n\nVehicle / compatibility:\n${(item.compatibility||[]).join(", ") || "N/A"}\n\nThanks.`);
    window.location.href = `mailto:${CONTACT.EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <header className="mb-8 text-start">
        <div className="text-sm uppercase tracking-[0.25em] text-neutral-500 dark:text-white/50">Elite Motors</div>
        <h1 className="mt-2 text-3xl md:text-5xl font-extrabold">Parts & Accessories</h1>
        <p className="mt-3 text-neutral-700 dark:text-white/70 max-w-2xl">
          Transparent pricing in OMR. VAT included. Stock varies by item; contact us for fitment confirmation.
        </p>
      </header>

      <div className="mb-6 grid lg:grid-cols-4 gap-3">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2">
            <Search className="h-4 w-4" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search parts, brands, fitments…"
              className="bg-transparent outline-none w-full"
              aria-label="Search parts"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Filter className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-70" />
            <select value={cat} onChange={(e)=>setCat(e.target.value)}
              className="w-full appearance-none rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 pl-9 pr-8 py-2" aria-label="Category filter">
              <option>All</option>
              {CATS.map(c => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-70" />
          </div>

          <div className="flex-1 relative">
            <SlidersHorizontal className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-70" />
            <select value={brand} onChange={(e)=>setBrand(e.target.value)}
              className="w-full appearance-none rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 pl-9 pr-8 py-2" aria-label="Brand filter">
              <option>All</option>
              {BRANDS.map(b => <option key={b}>{b}</option>)}
            </select>
            <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-70" />
          </div>

          <div className="flex-1 relative">
            <select value={sort} onChange={(e)=>setSort(e.target.value)}
              className="w-full appearance-none rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 pr-8 py-2" aria-label="Sort">
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="name-asc">Name A–Z</option>
              <option value="name-desc">Name Z–A</option>
            </select>
            <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-70" />
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <div key={p.id} className="p-5 rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-md text-start">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/10">
              {p.image ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" /> : null}
            </div>
            <div className="mt-4 text-xs uppercase tracking-widest text-neutral-500 dark:text-white/50">{p.brand}</div>
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <div className="text-sm text-neutral-600 dark:text-white/60">{p.category}</div>
            <div className="mt-2 text-2xl font-bold text-cyan-600 dark:text-cyan-400">
              {p.priceOMR.toFixed(2)} OMR <span className="text-xs font-normal text-neutral-500">(VAT incl.)</span>
            </div>
            {p.stock <= 0 ? (
              <div className="mt-1 text-sm text-rose-500">Out of stock</div>
            ) : (
              <div className="mt-1 text-sm text-emerald-500">In stock</div>
            )}
            {p.compatibility?.length ? (
              <div className="mt-2 text-xs text-neutral-500 dark:text-white/50">
                Fitment: {p.compatibility.slice(0,3).join(", ")}{p.compatibility.length>3 ? "…" : ""}
              </div>
            ) : null}

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button onClick={()=>orderWhatsApp(p)}
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-white bg-emerald-600 hover:bg-emerald-500">
                <MessageCircle className="h-4 w-4" /> Order on WhatsApp
              </button>
              <button onClick={()=>addToQuote(p)}
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5">
                <ShoppingCart className="h-4 w-4" /> Add to Quote
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
