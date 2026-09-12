/**
 * TextReveal
 *
 * A masked slide-up reveal. Each unit rises out of a clipped row on its own
 * spring, so the line assembles itself rather than fading in as a block.
 *
 * Two modes:
 *   letter — per-character stagger, best for a single word
 *   word   — per-word stagger, best for a sentence
 * "auto" picks word mode when the text contains a space.
 *
 * Plain Remotion. Loads Poppins through @remotion/google-fonts, which is
 * render-safe; pass `fontFamily` to use your own face instead.
 */

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Poppins";
import { z } from "zod";

const { fontFamily: poppins } = loadFont("normal", {
  weights: ["700", "800"],
  subsets: ["latin"],
});

export const textRevealSchema = z.object({
  /** The word or sentence to reveal. */
  text: z.string().default("Introducing"),
  /** Reveal granularity. "auto" uses word mode when the text has spaces. */
  mode: z.enum(["letter", "word", "auto"]).default("auto"),
  /** Text treatment. */
  variant: z.enum(["solid", "gradient", "gradient-bg"]).default("solid"),
  /** Text colour, solid variant only. */
  color: z.string().default("#0f0f0f"),
  /** Page colour behind the text. */
  bgColor: z.string().default("#fafaf9"),
  /** Frames between each unit entrance. 0 uses the per-mode default. */
  stagger: z.number().min(0).max(12).default(0),
  /** Total composition length, used to time the optional exit. */
  durationInFrames: z.number().int().min(30).default(90),
  /** Slide and fade the line away before the composition ends. */
  exitAnimation: z.boolean().default(false),
  /** Font family override. Empty string uses Poppins. */
  fontFamily: z.string().default(""),
  /** Font weight override. 0 uses the variant default. */
  fontWeight: z.number().int().min(0).max(900).default(0),
  /** gradient-bg: inner colour of the radial page background. */
  gradBgFrom: z.string().default(""),
  /** gradient-bg: outer colour of the radial page background. */
  gradBgTo: z.string().default(""),
  /** gradient-bg: CSS gradient painted through the glyphs. */
  gradText: z.string().default(""),
  /** gradient-bg: colour of the glow behind the line. */
  gradGlow: z.string().default(""),
});

export type TextRevealProps = z.infer<typeof textRevealSchema>;

export const textRevealDefaults: TextRevealProps = {
  text: "Introducing",
  mode: "auto",
  variant: "solid",
  color: "#0f0f0f",
  bgColor: "#fafaf9",
  stagger: 0,
  durationInFrames: 90,
  exitAnimation: false,
  fontFamily: "",
  fontWeight: 0,
  gradBgFrom: "",
  gradBgTo: "",
  gradText: "",
  gradGlow: "",
};

export const textRevealComposition = {
  id: "TextReveal",
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 90,
} as const;

const DEFAULT_STAGGER = { letter: 1.5, word: 4 } as const;
const T_START = 6;

/**
 * Character index each unit starts at, so the gradient variants can paint one
 * continuous gradient across units that are rendered as separate elements.
 */
function cumulativeCharOffsets(
  units: string[],
  mode: "letter" | "word"
): number[] {
  const offsets: number[] = [];
  let offset = 0;
  for (const unit of units) {
    offsets.push(offset);
    offset += mode === "word" ? unit.length + 1 : 1;
  }
  return offsets;
}

export const TextReveal: React.FC<Partial<TextRevealProps>> = ({
  text = textRevealDefaults.text,
  mode = textRevealDefaults.mode,
  variant = textRevealDefaults.variant,
  color = textRevealDefaults.color,
  bgColor = textRevealDefaults.bgColor,
  stagger = textRevealDefaults.stagger,
  durationInFrames = textRevealDefaults.durationInFrames,
  exitAnimation = textRevealDefaults.exitAnimation,
  fontFamily: fontFamilyProp = "",
  fontWeight: fontWeightProp = 0,
  gradBgFrom = "",
  gradBgTo = "",
  gradText = "",
  gradGlow = "",
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const resolvedMode =
    mode === "auto" ? (text.includes(" ") ? "word" : "letter") : mode;
  const resolvedStagger = stagger > 0 ? stagger : DEFAULT_STAGGER[resolvedMode];

  // Sentences get a smaller face so a long line still fits the frame.
  const fontSize =
    resolvedMode === "word"
      ? Math.round(width * 0.065)
      : Math.round(width * 0.09);
  const lineHeight = 1.35;
  const maskH = Math.round(fontSize * lineHeight);
  const wordGap = Math.round(fontSize * 0.3);

  const units: string[] =
    resolvedMode === "word" ? text.split(" ") : text.split("");

  const avgCharW = fontSize * 0.62;
  const totalTextW = Math.round(avgCharW * text.length * 1.15);

  const unitCharOffsets = cumulativeCharOffsets(units, resolvedMode);

  let exitOpacity = 1;
  let exitSlideY = 0;
  if (exitAnimation) {
    const exitStart = durationInFrames - 20;
    const exitSpr = spring({
      frame: Math.max(0, frame - exitStart),
      fps,
      config: { damping: 200 },
      durationInFrames: 15,
    });
    exitOpacity = frame >= exitStart ? interpolate(exitSpr, [0, 1], [1, 0]) : 1;
    exitSlideY =
      frame >= exitStart ? interpolate(exitSpr, [0, 1], [0, -maskH]) : 0;
  }

  const resolvedFont = fontFamilyProp || poppins;

  const getUnitStyle = (unitCharOffset: number): React.CSSProperties => {
    const base: React.CSSProperties = {
      fontFamily: resolvedFont,
      fontSize,
      fontWeight: fontWeightProp || 700,
      lineHeight,
      letterSpacing: "-0.03em",
      whiteSpace: "pre",
    };

    const offsetX = Math.round(unitCharOffset * avgCharW);

    switch (variant) {
      case "gradient":
        return {
          ...base,
          fontWeight: fontWeightProp || 800,
          background: "linear-gradient(90deg, #60efff 0%, #0061ff 100%)",
          backgroundSize: `${totalTextW}px 100%`,
          backgroundPosition: `-${offsetX}px 0`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        };
      case "gradient-bg":
        return {
          ...base,
          fontWeight: fontWeightProp || 800,
          background:
            gradText ||
            "linear-gradient(180deg, #34d399 0%, #059669 40%, #10b981 70%, #6ee7b7 100%)",
          backgroundSize: `100% ${maskH * 1.3}px`,
          backgroundPosition: `0 -${Math.round(maskH * 0.1)}px`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        };
      case "solid":
      default:
        return { ...base, color };
    }
  };

  const glowOpacity =
    variant === "gradient-bg"
      ? interpolate(
          frame,
          [T_START, T_START + units.length * resolvedStagger + 10],
          [0, 0.6],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        ) * exitOpacity
      : 0;

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={
          variant === "gradient-bg"
            ? {
                background: `radial-gradient(circle at 50% 50%, ${
                  gradBgFrom || "#d1fae5"
                } 0%, ${gradBgTo || "#e6f9ee"} 100%)`,
              }
            : { backgroundColor: bgColor }
        }
      />

      {variant === "gradient-bg" ? (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: totalTextW * 1.1,
            height: maskH * 2.5,
            translate: "-50% -50%",
            background: `radial-gradient(ellipse, ${
              gradGlow || "rgba(16,185,129,0.18)"
            } 0%, transparent 70%)`,
            filter: `blur(${Math.round(fontSize * 0.5)}px)`,
            opacity: glowOpacity,
          }}
        />
      ) : null}

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: `0 ${Math.round(width * 0.06)}px`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: resolvedMode === "word" ? "wrap" : "nowrap",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: resolvedMode === "word" ? `0 ${wordGap}px` : 0,
            translate: `0 ${exitSlideY}px`,
            opacity: exitOpacity,
          }}
        >
          {units.map((unit, i) => {
            const localFrame = frame - (T_START + i * resolvedStagger);

            const spr = spring({
              frame: Math.max(0, localFrame),
              fps,
              config:
                resolvedMode === "word"
                  ? { damping: 18, stiffness: 160, mass: 0.7 }
                  : { damping: 16, stiffness: 180, mass: 0.65 },
              durationInFrames: resolvedMode === "word" ? 16 : 14,
            });

            const slideY = interpolate(spr, [0, 1], [maskH, 0]);

            // A space in letter mode is a gap, not a masked glyph.
            if (resolvedMode === "letter" && unit === " ") {
              return (
                <div
                  key={`sp-${i}`}
                  style={{ width: fontSize * 0.28, height: maskH }}
                />
              );
            }

            return (
              <div
                key={`${unit}-${i}`}
                style={{
                  overflow: "hidden",
                  height: maskH,
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <span
                  style={{
                    display: "block",
                    ...getUnitStyle(unitCharOffsets[i]),
                    translate: `0 ${slideY}px`,
                  }}
                >
                  {unit}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default TextReveal;
