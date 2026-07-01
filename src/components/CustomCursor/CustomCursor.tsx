import { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hoverState, setHoverState] = useState<'default' | 'pointer' | 'text' | 'large-text'>('default');
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    // Start off screen
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let trailX = -100;
    let trailY = -100;
    let angle = 0;
    let lastState: 'default' | 'pointer' | 'text' | 'large-text' = 'default';

    // Physics loop for butter smooth gliding
    const animate = () => {
      // Snappy center dot
      currentX += (targetX - currentX) * 0.28;
      currentY += (targetY - currentY) * 0.28;
      
      // Lagging trailing ring (lower number = smoother delay)
      trailX += (targetX - trailX) * 0.12;
      trailY += (targetY - trailY) * 0.12;
      
      // Continual rotation of HUD dash arrays
      angle = (angle + 1.5) % 360;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(calc(${currentX}px - 50%), calc(${currentY}px - 50%), 0)`;
      }
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(calc(${trailX}px - 50%), calc(${trailY}px - 50%), 0) rotate(${angle}deg)`;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    const checkCursorState = (clientX: number, clientY: number, target: HTMLElement) => {
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
          currentElement.classList.contains('inline-video-wrapper') ||
          currentElement.classList.contains('team-nav-arrow-btn') ||
          currentElement.classList.contains('team-card-new') ||
          currentElement.classList.contains('team-progress-slider-container') ||
          currentElement.classList.contains('evidence-action-btn')
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
                  clientX >= (rect.left + hInset) && 
                  clientX <= (rect.right - hInset) &&
                  clientY >= (rect.top + vInset) && 
                  clientY <= (rect.bottom - vInset)
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

      if (state !== lastState) {
        lastState = state;
        setHoverState(state);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (e.target) {
        checkCursorState(e.clientX, e.clientY, e.target as HTMLElement);
      }
    };

    const onScroll = () => {
      if (targetX < 0 || targetY < 0) return;
      const target = document.elementFromPoint(targetX, targetY);
      if (target) {
        checkCursorState(targetX, targetY, target as HTMLElement);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('scroll', onScroll, true);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className={`custom-cursor-dot ${hoverState} ${isClicking ? 'click' : ''}`}
      />
      <div 
        ref={ringRef}
        className={`custom-cursor-ring ${hoverState} ${isClicking ? 'click' : ''}`}
      />
    </>
  );
};

export default CustomCursor;
