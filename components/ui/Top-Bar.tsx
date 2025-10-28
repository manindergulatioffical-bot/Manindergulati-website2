export const TopBar = () => {
  return (
    <div className="w-full bg-black text-white text-center font-dmsans py-2 px-4 text-xs sm:text-sm md:text-base flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-2">
      <span className="font-medium tracking-wide">
        For best prices and early deliveries,
      </span>
      <a
        href="https://wa.me/917065070555"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#D4AF37] hover:text-[#f5d78e] underline-offset-2 hover:underline font-semibold transition-colors duration-300"
      >
        WhatsApp us at: +91 7065070555
      </a>
    </div>
  );
};
