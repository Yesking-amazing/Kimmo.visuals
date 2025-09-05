"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type EmbedCardProps = { src: string };
function EmbedCard({ src }: EmbedCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-md border border-white/20 bg-black hover:border-white/40 transition-colors">
      <div className="relative w-full">
        <div className="aspect-square w-full">
          <iframe
            src={src}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>
      </div>
    </div>
  );
}

type LocalVideo = { src: string; poster?: string; title?: string };
const videos: LocalVideo[] = [
  { src: "/videos/video1.mp4", poster: "/videos/poster1.jpg", title: "Reel 1" },
  { src: "/videos/video2.mp4", poster: "/videos/poster2.jpg", title: "Reel 2" },
  { src: "/videos/video3.mp4", poster: "/videos/poster3.jpg", title: "Reel 3" },
  { src: "/videos/video4.mp4", poster: "/videos/poster4.jpg", title: "Reel 4" },
  { src: "/videos/video5.mp4", poster: "/videos/poster5.jpg", title: "Reel 5" },
  { src: "/videos/video6.mp4", poster: "/videos/poster6.jpg", title: "Reel 6" },
];

function VideoThumb({ v, onClick }: { v: LocalVideo; onClick: () => void }) {
  return (
    <button onClick={onClick} className="group relative block overflow-hidden rounded-md border border-white/20 focus:outline-none">
      <div className="aspect-square w-full bg-black">
        <video
          src={v.src}
          poster={v.poster}
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
          onMouseLeave={(e) => {
            const vid = e.currentTarget as HTMLVideoElement;
            vid.pause();
            vid.currentTime = 0;
          }}
        />
      </div>
    </button>
  );
}

function Lightbox({ open, onClose, v }: { open: boolean; onClose: () => void; v?: LocalVideo }) {
  if (!open || !v) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <video src={v.src} poster={v.poster} controls playsInline className="w-full rounded-lg border border-white/20 bg-black" />
        <button onClick={onClose} className="absolute -right-3 -top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">Close</button>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-black/95 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <Link href="/" className="text-xl font-bold tracking-tight">
          KIM VISUALS
        </Link>
        <div className="flex items-center gap-8">
          <Link href="#work" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            WORK
          </Link>
          <Link href="#services" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            SERVICES
          </Link>
          <Link href="#about" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            ABOUT
          </Link>
          <Link href="#contact" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            CONTACT
          </Link>
          <Link
            href="https://www.instagram.com/kimzo.visuals?igsh=ZTQ4Y2lyZ3Nqcjl4"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium hover:border-white/40 transition-colors"
          >
            INSTAGRAM
          </Link>
        </div>
      </div>
    </nav>
  );
}

function InstagramButton() {
  return (
    <Link
      href="https://www.instagram.com/kimzo.visuals?igsh=ZTQ4Y2lyZ3Nqcjl4"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-current px-5 py-2 text-sm font-medium hover:opacity-80"
    >
      <svg aria-hidden viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3zm12 1.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
      </svg>
      Instagram
    </Link>
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<LocalVideo | undefined>(undefined);
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-8 pt-32 pb-24">
          <div className="flex flex-col items-center text-center">
            <div className="mb-8">
              <Image
                src="/kim-portrait.jpg"
                alt="Kim Zürcher portrait"
                width={100}
                height={100}
                className="h-16 w-16 rounded-full object-cover ring-2 ring-white/10"
                priority
              />
            </div>
            <h1 className="mb-4 text-5xl font-bold tracking-tighter sm:text-6xl lg:text-7xl">
              KIM VISUALS
            </h1>
            <p className="mb-8 text-lg text-white/60 font-light tracking-wide">Visual storytelling by Kim</p>
            <a 
              href="#contact" 
              className="inline-flex items-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-black hover:bg-white/90 transition-colors"
            >
              GET IN TOUCH
            </a>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-24">
        <div className="mx-auto max-w-7xl px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">FEATURED WORK</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              A collection of recent projects showcasing dynamic visuals and storytelling
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-6">
            {videos.map((v, i) => (
              <VideoThumb key={i} v={v} onClick={() => { setActive(v); setOpen(true); }} />
            ))}
          </div>
        </div>
      </section>

      <Lightbox open={open} onClose={() => setOpen(false)} v={active} />

      {/* About Section */}
      <section id="about" className="py-24 bg-white/5">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">ABOUT</h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Kim Zürcher is a videographer and camera operator crafting bold visuals for brands,
                artists, and events. From dynamic handheld shots to clean commercial frames, the focus
                is on narrative—the energy, mood, and movement that make a story memorable.
              </p>
            </div>
            <div>
              <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-white/10">
                <Image src="/kim-portrait.jpg" alt="Kim Zürcher portrait" width={800} height={1000} className="h-auto w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="mx-auto max-w-7xl px-8">
          <h2 className="mb-10 text-center text-2xl font-semibold tracking-tight">SERVICES</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-white/10 p-6">
              <h3 className="mb-2 text-lg font-medium">Music Videos</h3>
              <p className="text-sm text-white/60">Concept to cut: performance, narrative, and stylized visuals.</p>
            </div>
            <div className="rounded-lg border border-white/10 p-6">
              <h3 className="mb-2 text-lg font-medium">Commercial & Product</h3>
              <p className="text-sm text-white/60">Clean product shots and brand-driven stories for social and web.</p>
            </div>
            <div className="rounded-lg border border-white/10 p-6">
              <h3 className="mb-2 text-lg font-medium">Events & Social Packages</h3>
              <p className="text-sm text-white/60">Afternoon to aftermovie: coverage cutdowns optimized for platforms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">LET'S WORK TOGETHER</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Ready to bring your vision to life? Get in touch to discuss your next project.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 tracking-tight">CONTACT INFO</h3>
                  <div className="space-y-3">
                    <a href="mailto:kim.zuercher@kimzo.net" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      kim.zuercher@kimzo.net
                    </a>
                    <a href="https://www.instagram.com/kimzo.visuals?igsh=ZTQ4Y2lyZ3Nqcjl4" target="_blank" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      @kimzo.visuals
                    </a>
                  </div>
                </div>
              </div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;
                  const formData = new FormData(form);
                  const payload = {
                    name: String(formData.get("name") || ""),
                    email: String(formData.get("email") || ""),
                    message: String(formData.get("message") || ""),
                  };
                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(payload),
                    });
                    if (!res.ok) throw new Error("Failed to send");
                    const data = await res.json().catch(() => ({}));
                    if (data && (data as any).previewUrl) {
                      alert(`Message sent! Preview: ${(data as any).previewUrl}`);
                    } else {
                      alert("Message sent! I'll get back to you soon.");
                    }
                    form.reset();
                  } catch (err) {
                    alert("Sorry, something went wrong. Please try again later.");
                  }
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wide">Name</label>
                    <input className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder-white/40 focus:border-white/30 focus:outline-none transition-colors" name="name" placeholder="Your name" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wide">Email</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder-white/40 focus:border-white/30 focus:outline-none transition-colors" name="email" placeholder="you@example.com" required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wide">Message</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder-white/40 focus:border-white/30 focus:outline-none transition-colors h-32 resize-none" name="message" placeholder="Tell me about your project..." required />
                </div>
                <button type="submit" className="inline-flex items-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-black hover:bg-white/90 transition-colors">
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
