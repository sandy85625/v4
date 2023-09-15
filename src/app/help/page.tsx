import { Metadata } from 'next';
import Link from 'next/link';

interface Props {
}

export const metadata: Metadata = {
  title: "Help Center | Contents.cafe",
  description: 'Generate Content Ideas using AI. Influencers, Content Creators, Marketers, Advertisers can use it to generate content ideas for their media channels.'
};


const HelpComponent: React.FC<Props> = (props) => {
  return (
    <div className='flex-grow'>
      <div className="flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl md:text-4xl mt-4 md:my-10 font-bold">Help Center</h2>
        <p className='mb-4 mx-4 md:mx-20'>'Help Center' is for you to seek help, report and feedback in any Payment issues or if you think you're getting abused by other users in/through our platform, or any general concerns. We are here to serve the best for you. </p>
        <p className='mb-4 mx-4 md:mx-20'>Please contact us by writing to <span className='text-blue-500'>contact@evoura.in</span>. Please include [HELP] in subject section of the email. We take your safety and concerns with utmost importance. You can expect a reply within 24 hours.</p>
        <p className='mb-4 mx-4 md:mx-20'>We (as contents.cafe, or as Evoura Technologies Private Limited), do collect your limited data (excluding sensitive datas, but not limited to, like Card and Payment Details, etc) in order to serve the best for you. You can read <span className='text-blue-500'> <Link href='/privacy'>Privacy policy</Link></span>, <span className='text-blue-500'> <Link href='/terms-and-conditions'>Term & Conditions</Link></span> and <span className='text-blue-500'> <Link href='/refund'>Refund Policy</Link></span> here.</p>
      </div>
    </div>
  );
};

export default HelpComponent;
