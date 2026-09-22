import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  Check,
  ChevronDown,
  Heart,
  Instagram,
  Menu,
  Minus,
  Play,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
} from "lucide-react";

const WHATSAPP = "9647812033099";
const INSTAGRAM = "https://www.instagram.com/lamasat.mustafa/";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  badge?: string;
  image: string;
  tone: string;
};

const products: Product[] = [
  { id: 1, name: "مرطّب اليدين", category: "العناية بالبشرة", price: 7500, badge: "الأكثر طلباً", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=900&q=85", tone: "rose" },
  { id: 2, name: "شامبو علاج القشرة", category: "العناية بالشعر", price: 12000, badge: "جديدنا", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=900&q=85", tone: "sage" },
  { id: 3, name: "باودر سوشيا", category: "المكياج", price: 18000, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85", tone: "peach" },
  { id: 4, name: "عدسات تقوى", category: "العدسات", price: 15000, image: "https://images.unsplash.com/photo-1597225244660-1cd128c64284?auto=format&fit=crop&w=900&q=85", tone: "lilac" },
  { id: 5, name: "زيوت ومنتجات إيرانية", category: "العناية بالشعر", price: 10000, badge: "عرض محدود", image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=85", tone: "cream" },
  { id: 6, name: "إكسسوارات مختارة", category: "الإكسسوارات", price: 8500, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85", tone: "blue" },
];

const videos = [
  { title: "وصلنا الجديد", category: "منتجات جديدة", href: INSTAGRAM, image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=85" },
  { title: "اختيارات لمسات", category: "روتين العناية", href: INSTAGRAM, image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85" },
  { title: "تفاصيل تحبّينها", category: "إكسسوارات", href: INSTAGRAM, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85" },
  { title: "من داخل لمسات", category: "كواليس المتجر", href: INSTAGRAM, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85" },
];

const formatPrice = (price: number) => `${price.toLocaleString("ar-IQ")} د.ع`;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = ["الكل", "العناية بالبشرة", "العناية بالشعر", "المكياج", "العدسات", "الإكسسوارات"];
  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = activeCategory === "الكل" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [activeCategory, search]);

  const cartItems = products.filter((product) => cart[product.id]);
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const cartTotal = cartItems.reduce((sum, product) => sum + product.price * cart[product.id], 0);

  const updateCart = (id: number, delta: number) => {
    setCart((current) => {
      const next = Math.max(0, (current[id] || 0) + delta);
      const updated = { ...current };
      if (next === 0) delete updated[id];
      else updated[id] = next;
      return updated;
    });
  };

  const orderOnWhatsApp = () => {
    const lines = cartItems.map((product) => `• ${product.name} × ${cart[product.id]} — ${formatPrice(product.price * cart[product.id])}`);
    const message = `مرحباً لمسات مصطفى، أريد طلب:\n${lines.join("\n")}\n\nالإجمالي التقريبي: ${formatPrice(cartTotal)}\nأرجو تأكيد التوفر والتوصيل.`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <main dir="rtl" className="min-h-screen overflow-hidden bg-[#fcfaf7] text-[#211d1a]">
      <div className="announcement">التوصيل لكل المحافظات بـ ٥٬٠٠٠ د.ع <span>•</span> الدفع عند الاستلام متاح</div>
      <header className="sticky top-0 z-40 border-b border-[#eee7df]/80 bg-[#fcfaf7]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
          <button className="lg:hidden" aria-label="فتح القائمة" onClick={() => setMenuOpen(!menuOpen)}><Menu size={22} /></button>
          <a href="#top" className="brand flex items-center gap-3">
            <span className="brand-mark">ل</span>
            <span><strong>لمسات</strong><small>مصطفى</small></span>
          </a>
          <nav className={`${menuOpen ? "flex" : "hidden"} absolute right-5 top-[68px] flex-col gap-5 rounded-2xl border border-[#eee7df] bg-[#fcfaf7] p-5 shadow-xl lg:static lg:flex lg:flex-row lg:items-center lg:gap-8 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}>
            <a href="#products" onClick={() => setMenuOpen(false)} className="nav-link active">المنتجات</a>
            <a href="#story" onClick={() => setMenuOpen(false)} className="nav-link">قصتنا</a>
            <a href="#videos" onClick={() => setMenuOpen(false)} className="nav-link">فيديوهاتنا</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="nav-link">تواصل معنا</a>
          </nav>
          <div className="flex items-center gap-2">
            <label className="search-box hidden md:flex"><Search size={17} /><input aria-label="ابحثي عن منتج" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحثي عن منتج" /></label>
            <button className="icon-button" aria-label="إنستغرام" onClick={() => window.open(INSTAGRAM, "_blank")}><Instagram size={19} /></button>
            <button className="cart-button" aria-label="سلة المشتريات" onClick={() => setCartOpen(true)}><ShoppingBag size={20} /><span>{cartCount}</span></button>
          </div>
        </div>
      </header>

      <section id="top" className="hero relative mx-auto grid max-w-[1240px] gap-8 px-5 pb-16 pt-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="hero-copy relative z-10">
          <div className="eyebrow"><Sparkles size={15} /> لمساتك اليومية تبدأ من هنا</div>
          <h1>جمالكِ،<br /><em>بلمسة</em> مختلفة.</h1>
          <p>منتجات مختارة بعناية من لمسات مصطفى — للعناية، الجمال، وكل التفاصيل الصغيرة التي تشبهكِ.</p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#products" className="primary-button">تسوّقي الآن <ArrowLeft size={17} /></a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="secondary-button">شاهدي الجديد <ArrowUpLeft size={17} /></a>
          </div>
          <div className="hero-meta"><span><b>+١,٠٠٠,٠٠٠</b> عميلة تثق بنا</span><i></i><span><b>كل المحافظات</b> توصيل لباب البيت</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-orb"></div>
          <div className="hero-image-wrap"><img src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=90" alt="منتجات تجميل مختارة من لمسات مصطفى" /><div className="hero-sticker">منتقى<br /><span>بحب</span></div></div>
          <div className="floating-note"><span className="note-icon"><Truck size={17} /></span><span><b>توصيل سريع</b><small>إلى كل المحافظات</small></span></div>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-[1240px] px-5 pb-24 lg:px-8">
        <div className="section-heading"><div><span className="eyebrow muted">اكتشفي اختياراتنا</span><h2>منتجات تحبّينها.</h2></div><a href={INSTAGRAM} target="_blank" rel="noreferrer" className="text-link">شاهدي كل الجديد <ArrowLeft size={16} /></a></div>
        <div className="category-row">{categories.map((category) => <button key={category} className={activeCategory === category ? "category active" : "category"} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
        <div className="product-grid">{filteredProducts.map((product) => <article className="product-card" key={product.id}><div className={`product-image ${product.tone}`}><img src={product.image} alt={product.name} />{product.badge && <span className="product-badge">{product.badge}</span>}<button className="wish-button" aria-label="إضافة للمفضلة"><Heart size={17} /></button><button className="quick-add" onClick={() => updateCart(product.id, 1)}><Plus size={16} /> أضيفي للسلة</button></div><div className="product-info"><div><span>{product.category}</span><h3>{product.name}</h3></div><strong>{formatPrice(product.price)}</strong></div></article>)}</div>
      </section>

      <section id="story" className="story-section"><div className="mx-auto grid max-w-[1240px] gap-10 px-5 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-8"><div className="story-images"><img className="story-main" src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85" alt="منتجات لمسات مصطفى" /><img className="story-small" src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=500&q=85" alt="تفاصيل منتجات التجميل" /></div><div className="story-copy"><span className="eyebrow muted">لماذا لمسات؟</span><h2>مو بس منتجات.<br /><em>اختيارات تشبهكِ.</em></h2><p>من أول مرطّب إلى آخر إكسسوار، نختار لكِ الأشياء التي نحب أن نستخدمها نحن. جودة واضحة، سعر عادل، ولمسة قريبة منكِ.</p><div className="story-points"><div><b>01</b><span><strong>اختيار موثوق</strong><small>منتجات نعرفها ونحبها</small></span></div><div><b>02</b><span><strong>توصيل لكل العراق</strong><small>من متجرنا إلى بابكِ</small></span></div></div><a href="#contact" className="text-link">اعرفي أكثر عن لمسات <ArrowLeft size={16} /></a></div></div></section>

      <section id="videos" className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8"><div className="section-heading"><div><span className="eyebrow muted">من يومياتنا</span><h2>شاهديها على إنستغرام.</h2></div><a href={INSTAGRAM} target="_blank" rel="noreferrer" className="text-link">@lamasat.mustafa <ArrowUpLeft size={16} /></a></div><div className="video-grid">{videos.map((video, index) => <a className={`video-card video-${index + 1}`} href={video.href} target="_blank" rel="noreferrer" key={video.title}><img src={video.image} alt={video.title} /><div className="video-shade"></div><span className="play-button"><Play size={17} fill="currentColor" /></span><div className="video-caption"><small>{video.category}</small><strong>{video.title}</strong></div></a>)}</div></section>

      <section id="contact" className="contact-section"><div className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-8 px-5 lg:flex-row lg:items-end lg:px-8"><div><span className="eyebrow">هل تحتاجين مساعدة؟</span><h2>خلّي اختيارك<br />أسهل علينا.</h2></div><div className="contact-side"><p>أرسلي لنا المنتج الذي تبحثين عنه، ونساعدكِ باختيار الأنسب والتوصيل لباب البيت.</p><a className="whatsapp-button" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">تواصلي عبر واتساب <ArrowLeft size={17} /></a></div></div></section>

      <footer><div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-5 py-8 md:flex-row md:items-center md:justify-between lg:px-8"><div className="brand flex items-center gap-3"><span className="brand-mark">ل</span><span><strong>لمسات</strong><small>مصطفى</small></span></div><p>© ٢٠٢٦ لمسات مصطفى. جمالكِ بلمسة مختلفة.</p><a href={INSTAGRAM} target="_blank" rel="noreferrer"><Instagram size={19} /></a></div></footer>

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(e) => e.stopPropagation()}><div className="drawer-head"><div><span className="eyebrow muted">اختياراتك</span><h2>سلة المشتريات</h2></div><button onClick={() => setCartOpen(false)} aria-label="إغلاق"><X size={21} /></button></div>{cartItems.length === 0 ? <div className="empty-cart"><ShoppingBag size={32} /><p>السلة فاضية حالياً</p><small>اختاري المنتجات التي تحبينها، وستظهر هنا.</small><button className="primary-button" onClick={() => setCartOpen(false)}>تصفّحي المنتجات</button></div> : <><div className="cart-list">{cartItems.map((product) => <div className="cart-item" key={product.id}><img src={product.image} alt="" /><div className="cart-item-info"><strong>{product.name}</strong><span>{formatPrice(product.price)}</span><div className="quantity"><button onClick={() => updateCart(product.id, -1)}><Minus size={13} /></button><b>{cart[product.id]}</b><button onClick={() => updateCart(product.id, 1)}><Plus size={13} /></button></div></div></div>)}</div><div className="cart-footer"><div><span>الإجمالي التقريبي</span><strong>{formatPrice(cartTotal)}</strong></div><small>أجرة التوصيل تُحسب عند تأكيد الطلب</small><button className="whatsapp-button full" onClick={orderOnWhatsApp}>أكملي الطلب عبر واتساب <ArrowLeft size={17} /></button></div></>}</aside></div>}
    </main>
  );
}

export { Check };
