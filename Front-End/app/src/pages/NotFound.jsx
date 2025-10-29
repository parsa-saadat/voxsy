import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-900 text-white text-2xl font-bold">
      <span>404 | صفحه پیدا نشد</span>
      <br />
      <Link to="/" className="text-[--primary-color] text-md">
        صفحه اصلی
      </Link>
    </div>
  );
}
