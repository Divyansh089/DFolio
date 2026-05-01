import React, { useState } from "react";
import { Play } from "lucide-react";
import PdfModal from "./PdfModal";

interface CertificateCardProps {
  pdfUrl: string;
  title: string;
  isLeft?: boolean;
  onlyButton?: boolean;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ pdfUrl, title, isLeft = false, onlyButton = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={`relative group ${onlyButton ? "flex items-center" : "w-full flex flex-col items-center lg:block"}`}>
        {/* Placeholder (Iframe preview) - Only if not onlyButton mode */}
        {!onlyButton && (
          <div 
            className="hidden lg:block relative w-full aspect-[1.414/1] overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:border-primary/50 cursor-pointer mb-6 lg:mb-0"
            onClick={() => setIsModalOpen(true)}
          >
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              title={`${title} preview`}
              className="pointer-events-none h-full w-full opacity-80 group-hover:opacity-100 transition-all duration-700 scale-[1.01]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </div>
        )}

        {/* Play Button - Enhanced Glassmorphism */}
        <button
          onClick={() => setIsModalOpen(true)}
          className={`
            relative z-10
            flex items-center justify-center
            w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
            rounded-full shadow-2xl transition-all duration-500
            
            
            bg-white/5 backdrop-blur-xl border border-white/10 text-primary
            
           
            hover:bg-primary hover:text-white hover:border-transparent hover:shadow-primary/20
            
            ${!onlyButton && isLeft ? "lg:absolute lg:-left-8 lg:-bottom-8" : ""}
            ${!onlyButton && !isLeft ? "lg:absolute lg:-right-8 lg:-bottom-8" : ""}
            hover:scale-110 active:scale-95
          `}
          aria-label={`View ${title}`}
        >
          <Play className="ml-1 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 fill-current" />
        </button>

        {/* Mobile only label - Only if not onlyButton mode */}
        {!onlyButton && (
          <div className="lg:hidden mt-3 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/80">
              View Certificate
            </p>
          </div>
        )}
      </div>

      <PdfModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pdfUrl={pdfUrl}
        title={title}
      />
    </>
  );
};

export default CertificateCard;
