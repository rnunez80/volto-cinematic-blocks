import { useState, useEffect } from 'react';

/**
 * Hook that dynamically imports GSAP and ScrollTrigger.
 * Returns { gsap, ScrollTrigger, loaded } once ready.
 */
const useGsap = () => {
  const [state, setState] = useState({
    gsap: null,
    ScrollTrigger: null,
    loaded: false,
  });

  useEffect(() => {
    let cancelled = false;

    const loadGsap = async () => {
      try {
        const gsapModule = await import('gsap');
        const scrollTriggerModule = await import('gsap/ScrollTrigger');

        const gsap = gsapModule.default || gsapModule.gsap;
        const ScrollTrigger =
          scrollTriggerModule.default || scrollTriggerModule.ScrollTrigger;

        if (gsap && ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger);
        }

        if (!cancelled) {
          setState({ gsap, ScrollTrigger, loaded: true });
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('volto-cinematic-blocks: GSAP failed to load', err);
        if (!cancelled) {
          setState({ gsap: null, ScrollTrigger: null, loaded: true });
        }
      }
    };

    loadGsap();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
};

export default useGsap;
