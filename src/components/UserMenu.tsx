
import React from "react";
import { Info, User, Settings, LogOut } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface UserMenuProps {
  showInfo: boolean;
  setShowInfo: (show: boolean) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ 
  showInfo, 
  setShowInfo, 
  isLoggedIn, 
  onLogout 
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
      <button 
        onClick={() => setShowInfo(!showInfo)}
        className="p-2 rounded-full bg-space-dark/60 hover:bg-space-dark/80 transition-colors"
        aria-label="Show information"
      >
        <Info className="w-4 h-4 text-space-blue" />
      </button>
      
      {isLoggedIn && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-full bg-space-dark/60 hover:bg-space-dark/80 transition-colors">
              <User className="w-4 h-4 text-space-bright" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="glassmorphism border-space-purple/30">
            <div className="px-2 py-1.5 text-sm font-medium text-space-bright">My Account</div>
            <DropdownMenuSeparator className="bg-space-purple/30" />
            <DropdownMenuItem 
              className="cursor-pointer flex items-center gap-2 focus:bg-space-purple/30"
              onClick={() => navigate('/login')}
            >
              <Settings className="w-4 h-4" />
              Change Preferences
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer flex items-center gap-2 focus:bg-space-purple/30 text-red-400"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      {showInfo && (
        <div className="absolute top-14 right-4 z-10 cosmos-card w-64 text-xs">
          <h4 className="font-medium text-space-bright mb-1">How to use the globe:</h4>
          <ul className="text-muted-foreground list-disc list-inside">
            <li>Drag to rotate</li>
            <li>Pinch or scroll to zoom</li>
            <li>Click on Rio de Janeiro to view places</li>
            <li>Click on other markers to view news</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
