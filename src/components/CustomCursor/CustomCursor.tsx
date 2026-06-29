import { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoverState, setHoverState] = useState<'default' | 'pointer' | 'text' | 'large-text'>('default');
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    // Start off screen
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let lastState: 'default' | 'pointer' | 'text' | 'large-text' = 'default';

    // Physics loop for butter smooth gliding
    const animate = () => {
      currentX += (targetX - currentX) * 0.25; // Lower number = more glide/delay. 0.25 is perfect snappy smoothness.
      currentY += (targetY - currentY) * 0.25;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(calc(${currentX}px - 50%), calc(${currentY}px - 50%), 0)`;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      const target = e.target as HTMLElement;
      let state: 'default' | 'pointer' | 'text' | 'large-text' = 'default';
      
      // Check interactive elements first (walking up DOM)
      let currentElement: HTMLElement | null = target;
      let isPointer = false;
      while (currentElement) {
        const style = window.getComputedStyle(currentElement);
        const tag = currentElement.tagName.toLowerCase();
        
        if (
          style.cursor === 'pointer' ||
          tag === 'a' ||
          tag === 'button' ||
          currentElement.classList.contains('inline-video-wrapper')
        ) {
          isPointer = true;
          break;
        }
        currentElement = currentElement.parentElement;
      }

      if (isPointer) {
        state = 'pointer';
      } else {
        const tag = target.tagName.toLowerCase();
        const textTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'li', 'strong', 'em', 'div'];
        
        if (textTags.includes(tag)) {
          let isExactlyOverText = false;
          let textFontSize = 0;
          
          const walk = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, null);
          let textNode: Node | null;
          
          while ((textNode = walk.nextNode())) {
            if (textNode.textContent && textNode.textContent.trim().length > 0) {
              const range = document.createRange();
              range.selectNodeContents(textNode);
              const rects = range.getClientRects();
              
              for (let i = 0; i < rects.length; i++) {
                const rect = rects[i];
                const isHorizontal = rect.width >= rect.height;
                const vInset = isHorizontal ? rect.height * 0.2 : 0;
                const hInset = isHorizontal ? 0 : rect.width * 0.2;
                
                if (
                  e.clientX >= (rect.left + hInset) && 
                  e.clientX <= (rect.right - hInset) &&
                  e.clientY >= (rect.top + vInset) && 
                  e.clientY <= (rect.bottom - vInset)
                ) {
                  isExactlyOverText = true;
                  if (textNode.parentElement) {
                    textFontSize = parseFloat(window.getComputedStyle(textNode.parentElement).fontSize);
                  }
                  break;
                }
              }
            }
            if (isExactlyOverText) break;
          }

          if (isExactlyOverText) {
            state = textFontSize > 40 ? 'large-text' : 'text';
          }
        }
      }

      // ONLY trigger a React state update if the cursor state actually changed!
      // This massively improves performance and eliminates jitter.
      if (state !== lastState) {
        lastState = state;
        setHoverState(state);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className={`custom-cursor-dot ${hoverState} ${isClicking ? 'click' : ''}`}
        // Inline style transform is now handled directly by the physics loop!
      />
    </>
  );
};

export default CustomCursor;
