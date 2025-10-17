import useCountAnimation from "@/hooks/useCountAnimation";
import { useEffect, useRef } from "react";

const CountingNumber = ({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [count, setIsVisible] = useCountAnimation(value);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [setIsVisible]);

  return (
    <div ref={targetRef}>
      {count}
      {suffix}
    </div>
  );
};

export default CountingNumber;