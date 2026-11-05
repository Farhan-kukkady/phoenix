import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Brand data for the mega menu — 21 brands in 3 rows of 7
const MEGA_BRANDS = [
  { name: "X-Rite", slug: "x-rite", logo: "/images/brands/x-rite.webp" },
  { name: "GMG", slug: "gmg", logo: "/images/brands/gmg.webp" },
  { name: "GlobalVision", slug: "globalvision", logo: "/images/brands/globalvision.webp" },
  { name: "Hybrid Software", slug: "hybrid-software", logo: "/images/brands/hybrid-software.webp" },
  { name: "Phoenix M.I.S + IoT", slug: "phoenix-mis", logo: "/images/brands/phoenix-mis.webp" },
  { name: "Miraclon", slug: "miraclon", logo: "/images/brands/miraclon.webp" },
  { name: "EIZO", slug: "eizo", logo: "/images/brands/eizo.webp" },
  { name: "Valiani", slug: "valiani", logo: "/images/brands/valiani.webp" },
  { name: "IGT", slug: "igt", logo: "/images/brands/igt.webp" },
  { name: "Inkmaker", slug: "inkmaker", logo: "/images/brands/inkmaker.webp" },
  { name: "Just Normlicht", slug: "just-normlicht", logo: "/images/brands/just-normlicht.webp" },
  { name: "Hanatek Instruments", slug: "hanatek", logo: "/images/brands/hanatek.webp" },
  { name: "Siegwerk", slug: "siegwerk", logo: "/images/brands/siegwerk.webp" },
  { name: "Apex International", slug: "apex", logo: "/images/brands/apex.webp" },
  { name: "Epson", slug: "epson", logo: "/images/brands/epson.webp" },
  { name: "Luster", slug: "luster", logo: "/images/brands/luster.webp" },
  { name: "Pantone", slug: "pantone", logo: "/images/brands/pantone.webp" },
  { name: "EngView Systems", slug: "engview", logo: "/images/brands/engview.webp" },
  { name: "PrintFactory", slug: "printfactory", logo: "/images/brands/printfactory.webp" },
  { name: "ECO3", slug: "eco3", logo: "/images/brands/eco3.webp" },
  { name: "StudioRIP", slug: "studiorip", logo: "/images/brands/studiorip.webp" },
];

interface MegaMenuProps {
  onClose: () => void;
}

export function MegaMenu({ onClose }: MegaMenuProps) {
  return (
    <div
      className="absolute top-full left-0 right-0 backdrop-blur-2xl border-t border-b border-white/10 shadow-2xl z-50 transition-all duration-200"
      style={{ backgroundColor: "rgba(15, 23, 66, 0.98)" }}
      role="navigation"
      aria-label="Products mega menu"
    >
      <div className="container-wide py-6">
        <div className="flex items-center justify-between mb-5">
          <p className="text-white/50 text-xs font-semibold uppercase tracking-widest">
            Our Brands
          </p>
          <Link
            href="/products"
            onClick={onClose}
            className="text-xs font-semibold text-white/60 hover:text-white transition-colors uppercase tracking-wider"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-7 gap-3">
          {MEGA_BRANDS.map((brand) => (
            <Link
              key={brand.slug}
              href={`/products/${brand.slug}`}
              onClick={onClose}
              className={cn(
                "group flex items-center justify-center",
                "bg-white/8 hover:bg-white/15 rounded-xl p-3 h-16",
                "transition-all duration-200 border border-white/5 hover:border-white/20"
              )}
              aria-label={`${brand.name} products`}
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={110}
                height={38}
                className="max-h-8 max-w-[100px] object-contain opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-200"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
