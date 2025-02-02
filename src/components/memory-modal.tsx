import { motion, AnimatePresence } from "framer-motion";
import CustomImage from "./shared/image";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface MemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  memory: {
    author?: string;
    message: string;
    tags: string[];
    imageUrl: string;
    title: string;
  } | null;
}

const MemoryModal = ({ isOpen, onClose, memory }: MemoryModalProps) => {
  if (!memory) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 flex items-start sm:items-center justify-center isolate p-4"
          style={{ zIndex: 9999 }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            style={{ zIndex: 1 }}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-y-auto max-h-[90vh]"
            style={{ zIndex: 2 }}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute right-4 top-4 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors z-50"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Mobile, Tablet & Medium Screens Layout */}
            <div className="h-fit xl:hidden">
              {/* <div className="h-[40vh] md:h-[45vh] w-full"> */}
              <div>
                <CustomImage
                  src={memory.imageUrl}
                  alt={memory.title}
                  className="w-full h-full object-contain bg-black/5"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-medium mb-2 break-all">{memory.title}</h2>
                  <p className="text-sm md:text-base text-black/50">
                    Shared by {memory.author || "Anonymous"}
                  </p>
                </div>
                <p className="text-base md:text-lg leading-relaxed mb-8 whitespace-pre-wrap">
                  {memory.message}
                </p>
                <div className="flex flex-wrap gap-2">
                  {memory.tags
                    ?.filter((tag) => tag.trim() !== "")
                    ?.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-black/5 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            {/* Large Desktop Layout */}
            <div className="hidden xl:flex">
              <div className="w-1/2 min-h-[50vh]">
                <CustomImage
                  src={memory.imageUrl}
                  alt={memory.title}
                  className="w-full h-full object-cover bg-black/5"
                />
              </div>
              <div className="w-1/2 p-8 overflow-y-auto max-h-[85vh]">
                <div className="mb-6">
                  <h2 className="text-3xl font-medium mb-2 break-all">{memory.title}</h2>
                  <p className="text-base text-black/50">
                    Shared by {memory.author || "Anonymous"}
                  </p>
                </div>
                <p className="text-lg leading-relaxed mb-8 whitespace-pre-wrap break-all">
  {memory.message}
</p>

                <div className="flex flex-wrap gap-2">
                  {memory.tags
                    ?.filter((tag) => tag.trim() !== "")
                    ?.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-black/5 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default MemoryModal;