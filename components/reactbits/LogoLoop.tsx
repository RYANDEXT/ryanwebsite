"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export type LogoItem =
  | {
      node: React.ReactNode;
      href?: string;
      title?: string;
      ariaLabel?: string;
    }
  | {
      src: string;
      alt?: string;
      href?: string;
      title?: string;
      srcSet?: string;
      sizes?: string;
      width?: number;
      height?: number;
    };

export interface LogoLoopProps {
  logos: LogoItem[];
  /** render label text after each logo (uses title || alt || ariaLabel) */
  showLabel?: boolean;
  scrambleRadius?: number;
  scrambleDuration?: number;
  scrambleSpeed?: number;
  scrambleChars?: string;
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: React.Key) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
} as const;

const toCssLength = (value?: number | string): string | undefined =>
  typeof value === "number" ? `${value}px` : value ?? undefined;

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

const useResizeObserver = (
  callback: () => void,
  elements: Array<React.RefObject<Element | null>>,
  dependencies: React.DependencyList
) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener("resize", handleResize);
      callback();
      return () => window.removeEventListener("resize", handleResize);
    }

    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });

    callback();

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, dependencies);
};

const useImageLoader = (
  seqRef: React.RefObject<HTMLUListElement | null>,
  onLoad: () => void,
  dependencies: React.DependencyList
) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll("img") ?? [];

    if (images.length === 0) {
      onLoad();
      return;
    }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) {
        onLoad();
      }
    };

    images.forEach((img) => {
      const htmlImg = img as HTMLImageElement;
      if (htmlImg.complete) {
        handleImageLoad();
      } else {
        htmlImg.addEventListener("load", handleImageLoad, { once: true });
        htmlImg.addEventListener("error", handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
        img.removeEventListener("error", handleImageLoad);
      });
    };
  }, dependencies);
};

const useAnimationLoop = (
  trackRef: React.RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  seqHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean
) => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const seqSize = isVertical ? seqHeight : seqWidth;

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      const transformValue = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
      track.style.transform = transformValue;
    }

    if (prefersReduced) {
      track.style.transform = isVertical
        ? "translate3d(0, 0, 0)"
        : "translate3d(0, 0, 0)";
      return () => {
        lastTimestampRef.current = null;
      };
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime =
        Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target =
        isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;

      const easingFactor =
        1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqSize > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
        offsetRef.current = nextOffset;

        const transformValue = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
        track.style.transform = transformValue;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical]);
};

export const LogoLoop = React.memo<LogoLoopProps>(
  ({
    logos,
    speed = 120,
    direction = "left",
    width = "100%",
    logoHeight = 28,
    gap = 32,
    pauseOnHover,
    hoverSpeed,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    renderItem,
    showLabel = false,
    scrambleRadius = 100,
    scrambleDuration = 1.2,
    scrambleSpeed = 0.5,
    scrambleChars = ".:",
    ariaLabel = "Partner logos",
    className,
    style,
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const seqRef = useRef<HTMLUListElement>(null);

    const [seqWidth, setSeqWidth] = useState<number>(0);
    const [seqHeight, setSeqHeight] = useState<number>(0);
    const [copyCount, setCopyCount] = useState<number>(
      ANIMATION_CONFIG.MIN_COPIES
    );
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const effectiveHoverSpeed = useMemo(() => {
      if (hoverSpeed !== undefined) return hoverSpeed;
      if (pauseOnHover === true) return 0;
      if (pauseOnHover === false) return undefined;
      return 0;
    }, [hoverSpeed, pauseOnHover]);

    const isVertical = direction === "up" || direction === "down";

    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      let directionMultiplier: number;
      if (isVertical) {
        directionMultiplier = direction === "up" ? 1 : -1;
      } else {
        directionMultiplier = direction === "left" ? 1 : -1;
      }
      const speedMultiplier = speed < 0 ? -1 : 1;
      return magnitude * directionMultiplier * speedMultiplier;
    }, [speed, direction, isVertical]);

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const sequenceRect = seqRef.current?.getBoundingClientRect?.();
      const sequenceWidth = sequenceRect?.width ?? 0;
      const sequenceHeight = sequenceRect?.height ?? 0;
      if (isVertical) {
        const parentHeight =
          containerRef.current?.parentElement?.clientHeight ?? 0;
        if (containerRef.current && parentHeight > 0) {
          const targetHeight = Math.ceil(parentHeight);
          if (containerRef.current.style.height !== `${targetHeight}px`)
            containerRef.current.style.height = `${targetHeight}px`;
        }
        if (sequenceHeight > 0) {
          setSeqHeight(Math.ceil(sequenceHeight));
          const viewport =
            containerRef.current?.clientHeight ??
            parentHeight ??
            sequenceHeight;
          const copiesNeeded =
            Math.ceil(viewport / sequenceHeight) +
            ANIMATION_CONFIG.COPY_HEADROOM;
          setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
        }
      } else if (sequenceWidth > 0) {
        setSeqWidth(Math.ceil(sequenceWidth));
        const copiesNeeded =
          Math.ceil(containerWidth / sequenceWidth) +
          ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
      }
    }, [isVertical]);

    useResizeObserver(
      updateDimensions,
      [containerRef, seqRef],
      [logos, gap, logoHeight, isVertical]
    );

    useImageLoader(seqRef, updateDimensions, [
      logos,
      gap,
      logoHeight,
      isVertical,
    ]);

    useAnimationLoop(
      trackRef,
      targetVelocity,
      seqWidth,
      seqHeight,
      isHovered,
      effectiveHoverSpeed,
      isVertical
    );

    const cssVariables = useMemo(
      () =>
        ({
          "--logoloop-gap": `${gap}px`,
          "--logoloop-logoHeight": `${logoHeight}px`,
          ...(fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }),
        } as React.CSSProperties),
      [gap, logoHeight, fadeOutColor]
    );

    const rootClasses = useMemo(
      () =>
        cx(
          "relative group",
          isVertical
            ? "overflow-hidden h-full inline-block"
            : "overflow-x-hidden",
          "[--logoloop-gap:32px]",
          "[--logoloop-logoHeight:28px]",
          "[--logoloop-fadeColorAuto:#ffffff]",
          "dark:[--logoloop-fadeColorAuto:#0b0b0b]",
          scaleOnHover && "py-[calc(var(--logoloop-logoHeight)*0.1)]",
          className
        ),
      [isVertical, scaleOnHover, className]
    );

    const handleMouseEnter = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(true);
    }, [effectiveHoverSpeed]);
    const handleMouseLeave = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(false);
    }, [effectiveHoverSpeed]);

    const renderLogoItem = useCallback(
      (item: LogoItem, key: React.Key) => {
        if (renderItem) {
          return (
            <li
              className={cx(
                "flex-none text-[length:var(--logoloop-logoHeight)] leading-[1]",
                isVertical
                  ? "mb-[var(--logoloop-gap)]"
                  : "mr-[var(--logoloop-gap)]",
                scaleOnHover && "overflow-visible group/item"
              )}
              key={key}
              role="listitem"
            >
              {renderItem(item, key)}
            </li>
          );
        }

        const isNodeItem = "node" in item;

        const content = isNodeItem ? (
          <span
            className={cx(
              "inline-flex items-center",
              "motion-reduce:transition-none",
              scaleOnHover &&
                "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120"
            )}
            aria-hidden={!!(item as any).href && !(item as any).ariaLabel}
          >
            {(item as any).node}
          </span>
        ) : (
          <img
            className={cx(
              "h-[var(--logoloop-logoHeight)] w-auto block object-contain",
              "[-webkit-user-drag:none] pointer-events-none",
              "[image-rendering:-webkit-optimize-contrast]",
              "motion-reduce:transition-none",
              scaleOnHover &&
                "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120"
            )}
            src={(item as any).src}
            srcSet={(item as any).srcSet}
            sizes={(item as any).sizes}
            width={(item as any).width}
            height={(item as any).height}
            alt={(item as any).alt ?? ""}
            title={(item as any).title}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        );

        const labelText =
          (item as any).title ??
          (item as any).alt ??
          (item as any).ariaLabel ??
          "";

        const itemAriaLabel = isNodeItem
          ? (item as any).ariaLabel ?? (item as any).title
          : (item as any).alt ?? (item as any).title;
        // If href exists, wrap both icon and label in the anchor so label is clickable.
        const contentWithLabel = (item as any).href ? (
          <a
            className={cx(
              "inline-flex items-center no-underline rounded",
              "transition-opacity duration-200 ease-linear",
              "hover:opacity-80",
              "focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2"
            )}
            href={(item as any).href}
            aria-label={itemAriaLabel || "logo link"}
            target="_blank"
            rel="noreferrer noopener"
          >
            {content}
            {showLabel && labelText ? (
              <span
                data-logoloop-label
                className="ml-2 text-[length:calc(var(--logoloop-logoHeight)*0.52)] whitespace-nowrap"
              >
                {labelText}
              </span>
            ) : null}
          </a>
        ) : (
          <span className="inline-flex items-center">
            {content}
            {showLabel && labelText ? (
              <span
                data-logoloop-label
                className="ml-2 text-[length:calc(var(--logoloop-logoHeight)*0.52)] whitespace-nowrap"
              >
                {labelText}
              </span>
            ) : null}
          </span>
        );

        return (
          <li
            className={cx(
              "flex-none text-[length:var(--logoloop-logoHeight)] leading-[1]",
              isVertical
                ? "mb-[var(--logoloop-gap)]"
                : "mr-[var(--logoloop-gap)]",
              scaleOnHover && "overflow-visible group/item"
            )}
            key={key}
            role="listitem"
          >
            {contentWithLabel}
          </li>
        );
      },
      [isVertical, scaleOnHover, renderItem, showLabel]
    );

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className={cx("flex items-center", isVertical && "flex-col")}
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {logos.map((item, itemIndex) =>
              renderLogoItem(item, `${copyIndex}-${itemIndex}`)
            )}
          </ul>
        )),
      [copyCount, logos, renderLogoItem, isVertical]
    );

    const containerStyle = useMemo(
      (): React.CSSProperties => ({
        width: isVertical
          ? toCssLength(width) === "100%"
            ? undefined
            : toCssLength(width)
          : toCssLength(width) ?? "100%",
        ...cssVariables,
        ...style,
      }),
      [width, cssVariables, style, isVertical]
    );

    // Apply SplitText + ScrambleText behavior to labels (mimic ScrambledText)
    useEffect(() => {
      if (!showLabel) return;
      const container = containerRef.current;
      if (!container) return;

      const labelEls = Array.from(
        container.querySelectorAll<HTMLElement>("[data-logoloop-label]")
      );
      const splits: Array<any> = [];

      const originalStyles: Array<{
        el: HTMLElement;
        display?: string;
        width?: string;
        boxSizing?: string;
      }> = [];

      labelEls.forEach((el) => {
        try {
          // preserve original inline styles
          originalStyles.push({
            el,
            display: el.style.display,
            width: el.style.width,
            boxSizing: el.style.boxSizing,
          });

          // lock width/display so scramble doesn't change layout (prevents "pulling" behavior)
          const measured = Math.ceil(el.getBoundingClientRect().width || 0);
          el.style.display = "inline-block";
          el.style.width = `${measured}px`;
          el.style.boxSizing = "border-box";

          const s = SplitText.create(el, {
            type: "chars",
            charsClass: "inline-block will-change-transform",
          });
          s.chars.forEach((c: any) => {
            const ce = c as HTMLElement;
            gsap.set(ce, { attr: { "data-content": ce.innerHTML } });
          });
          splits.push(s);
        } catch (e) {
          // noop
        }
      });

      // Batch pointer events via RAF for smoother updates
      let rafId: number | null = null;
      let lastEvent: PointerEvent | null = null;

      const onPointer = (e: PointerEvent) => {
        lastEvent = e;
        if (rafId == null) {
          rafId = requestAnimationFrame(() => {
            rafId = null;
            const ev = lastEvent;
            lastEvent = null;
            if (!ev || !isHovered) return;

            splits.forEach((s: any) => {
              s.chars.forEach((el: any) => {
                const c = el as HTMLElement;
                const { left, top, width, height } = c.getBoundingClientRect();
                const dx = ev.clientX - (left + width / 2);
                const dy = ev.clientY - (top + height / 2);
                const dist = Math.hypot(dx, dy);

                if (dist < scrambleRadius) {
                  gsap.to(c, {
                    overwrite: true,
                    duration: scrambleDuration * (1 - dist / scrambleRadius),
                    scrambleText: {
                      text: c.dataset.content || "",
                      chars: scrambleChars,
                      speed: scrambleSpeed,
                    },
                    ease: "none",
                  });
                }
              });
            });
          });
        }
      };

      window.addEventListener("pointermove", onPointer);

      return () => {
        window.removeEventListener("pointermove", onPointer);
        if (rafId != null) cancelAnimationFrame(rafId);
        splits.forEach((s) => s.revert && s.revert());
        // restore original inline styles
        originalStyles.forEach((orig) => {
          try {
            orig.el.style.display = orig.display ?? "";
            orig.el.style.width = orig.width ?? "";
            orig.el.style.boxSizing = orig.boxSizing ?? "";
          } catch (e) {
            // noop
          }
        });
      };
    }, [
      showLabel,
      isHovered,
      scrambleRadius,
      scrambleDuration,
      scrambleSpeed,
      scrambleChars,
    ]);

    return (
      <div
        ref={containerRef}
        className={rootClasses}
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
      >
        {fadeOut && (
          <>
            {isVertical ? (
              <>
                <div
                  aria-hidden
                  className={cx(
                    "pointer-events-none absolute inset-x-0 top-0 z-10",
                    "h-[clamp(24px,8%,120px)]",
                    "bg-[linear-gradient(to_bottom,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]"
                  )}
                />
                <div
                  aria-hidden
                  className={cx(
                    "pointer-events-none absolute inset-x-0 bottom-0 z-10",
                    "h-[clamp(24px,8%,120px)]",
                    "bg-[linear-gradient(to_top,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]"
                  )}
                />
              </>
            ) : (
              <>
                <div
                  aria-hidden
                  className={cx(
                    "pointer-events-none absolute inset-y-0 left-0 z-10",
                    "w-[clamp(24px,8%,120px)]",
                    "bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]"
                  )}
                />
                <div
                  aria-hidden
                  className={cx(
                    "pointer-events-none absolute inset-y-0 right-0 z-10",
                    "w-[clamp(24px,8%,120px)]",
                    "bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]"
                  )}
                />
              </>
            )}
          </>
        )}

        <div
          className={cx(
            "flex will-change-transform select-none relative z-0",
            "motion-reduce:transform-none",
            isVertical ? "flex-col h-max w-full" : "flex-row w-max"
          )}
          ref={trackRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {logoLists}
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;
