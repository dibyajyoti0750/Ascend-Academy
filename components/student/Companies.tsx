import { assets } from "@/assets/assets";
import Image from "next/image";

const companies = [
  assets.amazon,
  assets.apple,
  assets.google,
  assets.meta,
  assets.microsoft,
  assets.playstation,
];

export default function Companies() {
  return (
    <section className="py-10">
      <p className="mb-6 text-center text-sm font-medium text-muted-foreground">
        Trusted by students working at
      </p>

      <div className="flex flex-wrap items-center justify-center gap-10">
        {companies.map((asset, index) => (
          <div
            key={index}
            className="opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
          >
            <Image
              src={asset}
              alt={`company-${index}`}
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
