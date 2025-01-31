import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link2 } from 'lucide-react';

interface SharePointSectionProps {
  sharePointLink: string;
  onChange: (value: string) => void;
  contentType: 'photos' | 'video' | 'canvas';
}

export const SharePointSection = ({ sharePointLink, onChange, contentType }: SharePointSectionProps) => {
  const getPlaceholder = () => {
    switch (contentType) {
      case 'video':
        return 'Paste SharePoint folder link for video uploads...';
      case 'canvas':
        return 'Paste SharePoint folder link for canvas template files...';
      default:
        return 'Paste SharePoint folder link for photo uploads...';
    }
  };

  const getHelpText = () => {
    switch (contentType) {
      case 'video':
        return 'Share this link with contributors to upload their video content';
      case 'canvas':
        return 'Share this link to access and customize canvas templates';
      default:
        return 'Share this link with contributors to upload their photos';
    }
  };

  return (
    <div className="bg-[#1A1F2C] p-4 rounded-lg shadow-sm">
      <Label className="text-gray-200">SharePoint Upload Folder</Label>
      <div className="relative">
        <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <Input
          type="url"
          className="pl-10 bg-[#2F3A4A] border-gray-700 text-gray-200"
          placeholder={getPlaceholder()}
          value={sharePointLink}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <p className="mt-1 text-sm text-gray-400">
        {getHelpText()}
      </p>
    </div>
  );
};