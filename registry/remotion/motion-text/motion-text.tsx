/**
 * MotionText
 *
 * A word on a soft gradient pill that springs up into place. Good for logo
 * stings, chapter cards, and single-word emphasis beats.
 *
 * Plain Remotion: no UI library, no fonts to load.
 */

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

export type MotionTextVariant =
  | "macha"
  | "ocean"
  | "sunset"
  | "midnight"
  | "rose";

export const MOTION_TEXT_VARIANTS: Record<
  MotionTextVariant,
  { label: string; gradient: string; defaultColor: string }
> = {
  macha: {
    label: "Macha",
    gradient:
      "radial-gradient(89.08% 84.62% at 16.54% 78.46%, #6ee7b7 0%, #34d399 39.58%, #10b981 77.6%, #059669 100%)",
    defaultColor: "#022c22",
  },
  ocean: {
    label: "Ocean",
    gradient:
      "radial-gradient(89.08% 84.62% at 16.54% 78.46%, #60a5fa 0%, #3b82f6 39.58%, #1d4ed8 77.6%, #0636e0 100%)",
    defaultColor: "#ffffff",
  },
  sunset: {
    label: "Sunset",
    gradient:
      "radial-gradient(89.08% 84.62% at 16.54% 78.46%, #fb923c 0%, #f97316 39.58%, #ea580c 77.6%, #c2410c 100%)",
    defaultColor: "#fff7ed",
  },
  midnight: {
    label: "Midnight",
    gradient:
      "radial-gradient(89.08% 84.62% at 16.54% 78.46%, #334155 0%, #1e293b 39.58%, #0f172a 77.6%, #020617 100%)",
    defaultColor: "#e2e8f0",
  },
  rose: {
    label: "Rose",
    gradient:
      "radial-gradient(89.08% 84.62% at 16.54% 78.46%, #f472b6 0%, #ec4899 39.58%, #db2777 77.6%, #be185d 100%)",
    defaultColor: "#fff1f2",
  },
};

/** Zod schema so the composition is editable in Remotion Studio. */
export const motionTextSchema = z.object({
  text: z.string().default("TEXT"),
  color: z.string().default("#022c22"),
  variant: z
    .enum(["macha", "ocean", "sunset", "midnight", "rose"])
    .default("macha"),
  animation: z.enum(["scale-up", "none"]).default("scale-up"),
  fontFamily: z.string().default("system-ui, sans-serif"),
});

export type MotionTextProps = z.infer<typeof motionTextSchema>;

export const motionTextDefaults: MotionTextProps = {
  text: "TEXT",
  color: "#022c22",
  variant: "macha",
  animation: "scale-up",
  fontFamily: "system-ui, sans-serif",
};

export const motionTextComposition = {
  id: "MotionText",
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 90,
} as const;

export const MotionText: React.FC<Partial<MotionTextProps>> = ({
  text = motionTextDefaults.text,
  color = motionTextDefaults.color,
  variant = motionTextDefaults.variant,
  animation = motionTextDefaults.animation,
  fontFamily = motionTextDefaults.fontFamily,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const preset = MOTION_TEXT_VARIANTS[variant] ?? MOTION_TEXT_VARIANTS.macha;

  const springProgress =
    animation === "scale-up"
      ? spring({
          frame,
          fps,
          config: { damping: 10, stiffness: 120, mass: 0.8 },
        })
      : 1;

  const scale =
    animation === "scale-up"
      ? interpolate(springProgress, [0, 1], [0.6, 1])
      : 1;

  const opacity =
    animation === "scale-up"
      ? interpolate(frame, [0, Math.round(fps * 0.35) * 0.5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: preset.gradient,
          borderRadius: 48,
          padding: "48px 72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          scale: String(scale),
          opacity,
        }}
      >
        <span
          style={{
            color,
            fontSize: 120,
            fontWeight: 800,
            fontFamily,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          {text}
        </span>
      </div>
    </AbsoluteFill>
  );
};

export default MotionText;
