import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link2 } from 'lucide-react';
import { SharePointSectionProps } from './types';

export const SharePointSection = ({ sharePointLink, onChange }: SharePointSectionProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <Label className="text-gray-700">SharePoint Upload Folder</Label>
      <div className="relative">
        <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <Input
          type="url"
          className="pl-10 bg-white border-gray-300 focus:ring-2 focus:ring-primary"
          placeholder="Paste SharePoint folder link for photo uploads..."
          value={sharePointLink}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <p className="mt-1 text-sm text-gray-600">
        Share this link with contributors to upload their photos
      </p>
    </div>
  );
};