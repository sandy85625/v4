import Link from 'next/link';
import { FacebookIcon, TwitterIcon, InstagramIcon } from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-950 py-4 mt-16 border-t border-zinc-300">
      <div className="container mx-auto px-4 md:px-8">

        {/* Company name */}
        <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-sm mb-4 md:mb-0">
                &copy; {currentYear} Evoura Technologies Private Limited
            </h1>

            <div className='flex flex-col md:flex-row text-sm mb-4 md:mb-0'>
                <Link href='/help' className='text-blue-500 mr-0 md:mr-4'>
                    Help Center
                </Link>
                <Link href='/terms-and-conditions' className='text-blue-500 mr-0 md:mr-4'>
                    Terms and Conditions
                </Link>
                <Link href='/privacy' className='text-blue-500 mr-0 md:mr-4'>
                    Privacy Policy
                </Link>
                <Link href='/refund' className='text-blue-500 mr-0 md:mr-4'>
                    Refund Policy
                </Link>
            </div>
          
          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <Link target="_blank" href="#">
              <p aria-label="Facebook">
                {/* Replace with your Facebook icon */}
                <FacebookIcon className='mr-3'/> 
              </p>
            </Link>
            <Link target="_blank" href="#">
              <p aria-label="Twitter">
                {/* Replace with your Twitter icon */}
                <TwitterIcon className='mr-3'/> 
              </p>
            </Link>
            <Link target="_blank" href="#">
              <p aria-label="Instagram">
                {/* Replace with your Instagram icon */}
                <InstagramIcon className='mr-3'/> 
              </p>
            </Link>
            {/* Add more icons as needed */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
