
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';

const Header: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full bg-primary text-primary-foreground py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold">
            <Link to="/">
              SWP Calculator
            </Link>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-10 h-10"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <a 
            href="https://teamcrp.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm hover:underline flex items-center"
          >
            Powered by Team CRP
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
