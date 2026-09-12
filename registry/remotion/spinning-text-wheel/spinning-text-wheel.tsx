/**
 * SpinningTextWheel
 *
 * A 3D drum of options that spins down and settles on the first line, like a
 * slot reel picking a winner. Deterministic, so it renders identically every
 * time; the heavy spring mass reads as a weighted drum losing momentum rather
 * than a UI element easing out.
 *
 * The first line of `items` is the one it lands on.
 *
 * Plain Remotion. Loads Inter through @remotion/google-fonts, which is
 * render-safe.
 */

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { z } from "zod";

const { fontFamily: inter } = loadFont("normal", {
  weights: ["500", "700"],
  subsets: ["latin"],
});

export const spinningTextWheelSchema = z.object({
  /** Options, one per line. The FIRST line is the one it lands on. */
  items: z
    .string()
    .default("Monday\nTuesday\nWednesday\nThursday\nFriday\nSaturday\nSunday"),
  /** Wheel width in design pixels. */
  wheelWidth: z.number().int().min(240).max(1000).default(560),
  /** Wheel height in design pixels. Controls how much of the drum is visible. */
  wheelHeight: z.number().int().min(120).max(600).default(280),
  /** Type size in design pixels. */
  fontSize: z.number().int().min(24).max(160).default(76),
  /** Colour of the landed line. */
  color: z.string().default("#101828"),
  /** How faint the passing lines are. */
  idleOpacity: z.number().min(0).max(1).default(0.28),
  /** Frames the spin takes to settle. */
  spinFrames: z.number().int().min(20).max(180).default(90),
  /** Idle frames held after it lands. */
  holdFrames: z.number().int().min(5).max(600).default(30),
  /** Background colour behind the wheel. */
  bgColor: z.string().default("#ffffff"),
  /**
   * Width the px values above are authored against. The wheel scales from this
   * to the real canvas, so it keeps its proportions at any composition size.
   */
  designWidth: z.number().int().min(320).default(1080),
});

export type SpinningTextWheelProps = z.infer<typeof spinningTextWheelSchema>;

export const spinningTextWheelDefaults: SpinningTextWheelProps = {
  items: "Monday\nTuesday\nWednesday\nThursday\nFriday\nSaturday\nSunday",
  wheelWidth: 560,
  wheelHeight: 280,
  fontSize: 76,
  color: "#101828",
  idleOpacity: 0.28,
  spinFrames: 90,
  holdFrames: 30,
  bgColor: "#ffffff",
  designWidth: 1080,
};

const BUFFER = 2;

/** Frames this composition needs for the given props. */
export function calcSpinningTextWheelDuration(
  props?: Partial<SpinningTextWheelProps>
): number {
  return (props?.spinFrames ?? 90) + (props?.holdFrames ?? 30) + BUFFER;
}

export const spinningTextWheelComposition = {
  id: "SpinningTextWheel",
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: calcSpinningTextWheelDuration(),
} as const;

const FADE =
  "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, transparent 100%)";

export const SpinningTextWheel: React.FC<Partial<SpinningTextWheelProps>> = ({
  items = spinningTextWheelDefaults.items,
  wheelWidth = spinningTextWheelDefaults.wheelWidth,
  wheelHeight = spinningTextWheelDefaults.wheelHeight,
  fontSize = spinningTextWheelDefaults.fontSize,
  color = spinningTextWheelDefaults.color,
  idleOpacity = spinningTextWheelDefaults.idleOpacity,
  spinFrames = spinningTextWheelDefaults.spinFrames,
  bgColor = spinningTextWheelDefaults.bgColor,
  designWidth = spinningTextWheelDefaults.designWidth,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const values = items
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  /* Heavy mass plus high damping reads as a weighted drum losing momentum.
     durationRestThreshold keeps the last few degrees of travel instead of
     snapping once the spring is visually "close". */
  const progress = spring({
    frame,
    fps,
    config: { mass: 10, damping: 200, stiffness: 200 },
    durationInFrames: spinFrames,
    durationRestThreshold: 0.0001,
  });
  const rotation = interpolate(progress, [0, 1], [1, 0]);
  const radius = wheelHeight / 2;
  const scale = width / designWidth;

  if (values.length === 0) {
    return <AbsoluteFill style={{ backgroundColor: bgColor }} />;
  }

  return (
    <AbsoluteFill style={{ fontFamily: inter, backgroundColor: bgColor }}>
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          scale: String(scale),
        }}
      >
        <div
          style={{
            position: "relative",
            width: wheelWidth,
            height: wheelHeight,
            overflow: "hidden",
            perspective: 10000,
            maskImage: FADE,
            WebkitMaskImage: FADE,
          }}
        >
          {values.map((value, index) => {
            const wheelIndex = index / values.length + rotation;
            const angle = wheelIndex * Math.PI * 2;
            const rotateX = wheelIndex * 360;

            return (
              <div
                key={`${index}-${value}`}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backfaceVisibility: "hidden",
                  opacity:
                    index === 0
                      ? interpolate(progress, [0.88, 1], [idleOpacity, 1], {
                          extrapolateLeft: "clamp",
                          extrapolateRight: "clamp",
                        })
                      : idleOpacity,
                  transform: `translateZ(${
                    Math.cos(angle) * radius
                  }px) translateY(${
                    Math.sin(angle) * radius
                  }px) rotateX(${rotateX}deg)`,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    backfaceVisibility: "hidden",
                    transform: `rotateX(${-rotateX}deg)`,
                    color,
                    fontSize,
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {value}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default SpinningTextWheel;
