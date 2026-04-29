import { useRouter } from 'next/navigation';
import { Plus, Search } from 'lucide-react';
import useTranslation from '@/shared/hooks/useTranslation';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '@/shared/redux/slices/users';
import { AUTH_ROUTES, USER_ROUTES } from '@/shared/constants/PATHS';

export default function EmptyDataPlaceholder({
  title,
}: {
  title: string;
}) {
  const { t } = useTranslation();
  const currentUser = useSelector(getCurrentUser);
  const router = useRouter();

  const isLoggedIn = Boolean(currentUser?._id);

  const handlePostAd = () => {
    if (!isLoggedIn) {
      router.push(AUTH_ROUTES.login);
      return;
    }

    router.push(USER_ROUTES.addVehicle);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
      <div className="w-full max-w-sm mx-auto text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100">

        {/* Search Icon */}
        <div className="flex justify-center mb-5">
          <button
            onClick={handleScrollToTop}
            className="w-16 h-16 rounded-full bg-[#414279]/10 flex items-center justify-center hover:bg-[#414279]/20 transition-all duration-200 cursor-pointer"
          >
            <Search size={30} className="text-[#414279]" />
          </button>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          No {title} Found
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          No {title.toLowerCase()} vehicles are available in this category right now.
          Try adjusting your search or check back later for new listings.
        </p>

        {/* Action Buttons */}
<div className="flex items-center justify-center gap-2">
  <button
    onClick={handleScrollToTop}
    className="inline-flex items-center gap-1.5 border border-gray-300 text-gray-700 px-3.5 py-2 rounded-lg text-xs font-medium hover:bg-gray-100 transition-colors cursor-pointer"
  >
    <Search size={14} />
    Back to Search
  </button>

  <button
    onClick={handlePostAd}
    className="bg-[#414279] inline-flex items-center gap-1.5 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-[#32335f] transition-colors cursor-pointer"
  >
    <Plus size={14} />
    Post Vehicle
  </button>
</div>
      </div>
    </div>
  );
}