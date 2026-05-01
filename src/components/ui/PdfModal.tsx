import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { gsap } from "gsap";
import { useIsMobile } from "../../hooks/use-mobile";

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

const PdfModal: React.FC<PdfModalProps> = ({ isOpen, onClose, pdfUrl, title }) => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        ".modal-overlay",
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        ".modal-content",
        { scale: 0.95, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Use Portal to ensure the modal is at the root of the document and above ALL other content
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-8">
      {/* Darkened backdrop with heavy blur - Covers everything */}
      <div 
        className="modal-overlay absolute inset-0 bg-background/90 backdrop-blur-2xl transition-all"
        onClick={onClose} 
      />
      
      <div className="modal-content relative w-full max-w-[95vw] h-[90vh] bg-card border border-border/50 rounded-2xl md:rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col z-[10000]">
        {/* Header - Premium frosted look */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-border bg-card/80 backdrop-blur-md">
          <div>
            <h3 className="text-sm sm:text-base md:text-xl font-bold font-display text-foreground truncate max-w-[60vw]">
              {title}
            </h3>
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest mt-0.5 font-medium">Official Certificate</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 sm:p-3 rounded-full hover:bg-secondary transition-all text-muted-foreground hover:text-foreground hover:rotate-90"
            aria-label="Close modal"
          >
            <X size={isMobile ? 20 : 28} />
          </button>
        </div>
        
        {/* PDF Content - Full bleed iframe */}
        <div className="flex-1 bg-white relative overflow-hidden">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            title={title}
            className="w-full h-full border-none"
          />
        </div>
        
        {/* Footer - Compact and clean */}
        <div className="px-6 py-3 border-t border-border bg-muted/30 flex justify-between items-center">
          <span className="text-[10px] text-muted-foreground font-mono font-semibold tracking-wider">DOC_VIEWER_PRO v1.2</span>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5"
          >
            Open Original File
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PdfModal;
