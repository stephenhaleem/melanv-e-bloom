import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/447000000000"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-cocoa text-cream rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-espresso transition-transform hover:scale-105"
    >
      <MessageCircle size={22} />
    </a>
  );
}
