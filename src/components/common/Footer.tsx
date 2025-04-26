
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="w-full bg-primary text-primary-foreground py-4 px-6 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {new Date().getFullYear()} Team CRP. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://teamcrp.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm hover:underline"
            >
              Visit Team CRP
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
