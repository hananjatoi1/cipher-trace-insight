import { useState } from 'react';
import { Search, LucideIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface QuickSearchCardProps {
  title: string;
  icon: LucideIcon;
  placeholder: string;
  onSearch?: (value: string) => void;
  restricted?: boolean;
}

export function QuickSearchCard({ title, icon: Icon, placeholder, onSearch, restricted }: QuickSearchCardProps) {
  const [value, setValue] = useState('');

  const handleSearch = () => {
    if (onSearch && value.trim()) {
      onSearch(value);
    }
  };

  return (
    <div className="glass-card rounded-xl p-4 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Icon className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {restricted && (
            <span className="ml-auto text-xs px-2 py-0.5 rounded bg-destructive/10 text-destructive border border-destructive/20">
              Restricted
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors font-mono text-sm"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button
            size="sm"
            onClick={handleSearch}
            className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 shrink-0"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
