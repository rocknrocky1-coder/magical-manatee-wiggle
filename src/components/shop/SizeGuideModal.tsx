"use client";

import React from 'react';
import { X, Ruler } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, category }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-2xl bg-white p-6">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl flex items-center gap-2 text-stone-900">
            <Ruler className="w-5 h-5 text-rose-900" />
            <span>Size & Measurement Guide</span>
          </DialogTitle>
          <p className="text-xs text-stone-500">
            All garment dimensions are measured in inches. We craft our pieces with generous 2-inch side seams for easy personal tailoring.
          </p>
        </DialogHeader>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-stone-100 text-stone-800 border-b border-stone-200">
                <th className="py-2.5 px-3 font-semibold">Size</th>
                <th className="py-2.5 px-3 font-semibold">Bust (in)</th>
                <th className="py-2.5 px-3 font-semibold">Waist (in)</th>
                <th className="py-2.5 px-3 font-semibold">Hip (in)</th>
                <th className="py-2.5 px-3 font-semibold">Shoulder (in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              <tr className="hover:bg-stone-50">
                <td className="py-2 px-3 font-bold text-stone-900">XS</td>
                <td className="py-2 px-3">34</td>
                <td className="py-2 px-3">30</td>
                <td className="py-2 px-3">38</td>
                <td className="py-2 px-3">13.5</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="py-2 px-3 font-bold text-stone-900">S</td>
                <td className="py-2 px-3">36</td>
                <td className="py-2 px-3">32</td>
                <td className="py-2 px-3">40</td>
                <td className="py-2 px-3">14.0</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="py-2 px-3 font-bold text-stone-900">M</td>
                <td className="py-2 px-3">38</td>
                <td className="py-2 px-3">34</td>
                <td className="py-2 px-3">42</td>
                <td className="py-2 px-3">14.5</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="py-2 px-3 font-bold text-stone-900">L</td>
                <td className="py-2 px-3">40</td>
                <td className="py-2 px-3">36</td>
                <td className="py-2 px-3">44</td>
                <td className="py-2 px-3">15.0</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="py-2 px-3 font-bold text-stone-900">XL</td>
                <td className="py-2 px-3">42</td>
                <td className="py-2 px-3">38</td>
                <td className="py-2 px-3">46</td>
                <td className="py-2 px-3">15.5</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="py-2 px-3 font-bold text-stone-900">XXL</td>
                <td className="py-2 px-3">44</td>
                <td className="py-2 px-3">40</td>
                <td className="py-2 px-3">48</td>
                <td className="py-2 px-3">16.0</td>
              </tr>
            </tbody>
          </table>
        </div>

        {category.includes('saree') && (
          <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200/70 text-xs text-amber-950 space-y-1">
            <p className="font-semibold">Saree Draping Dimensions:</p>
            <p>• Saree Length: 5.5 Metres | Saree Width: 44 Inches (112 cm)</p>
            <p>• Unstitched Blouse Piece: 80cm matching woven fabric included.</p>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-stone-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800"
          >
            Got It
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};