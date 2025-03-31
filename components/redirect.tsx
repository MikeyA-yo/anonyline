"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface RedirectProps {
  path: string;
}

export default function Redirect({ path }: RedirectProps) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(path);
    }, 1000);

    return () => clearTimeout(timer);
  }, [path, router]);

  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '20px', 
      fontWeight: 'bold',
      textAlign: 'center'
    }}>
      Redirecting to {path}... in 1 second
    </div>
  );
}
