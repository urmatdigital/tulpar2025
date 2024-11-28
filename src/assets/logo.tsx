import Image from 'next/image'

export function Logo({ className = 'h-8 w-auto' }) {
  return (
    <Image
      src="/images/logo.png"
      alt="Tulpar Logo"
      width={48}
      height={48}
      className={className}
      priority
    />
  );
}