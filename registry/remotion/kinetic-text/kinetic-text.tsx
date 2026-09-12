import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type KineticTextProps = {
  /** Headline to reveal. Split on spaces; each word animates in turn. */
  text: string;
  /** Word index (0-based) to paint in the accent colour. Omit for none. */
  accentWord?: number;
  accent?: string;
  background?: string;
  foreground?: string;
  fontFamily?: string;
  /** Frames between the start of one word and the next. */
  stagger?: number;
};

export const kineticTextDefaults = {
  text: "Ship video like you ship UI",
  accentWord: 4,
  accent: "#2f7cf6",
  background: "#0b0b0d",
  foreground: "#f5f5f7",
  fontFamily:
    'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
  stagger: 5,
} satisfies KineticTextProps;

export const kineticTextComposition = {
  id: "KineticText",
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 105,
} as const;

const Word: React.FC<{
  word: string;
  color: string;
  isLast: boolean;
}> = ({ word, color, isLast }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Interactive.Span
      name="Word"
      style={{
        display: "inline-block",
        color,
        marginRight: isLast ? 0 : "0.22em",
        opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: `0px ${interpolate(
          spring({ frame, fps, config: { damping: 18, stiffness: 140, mass: 0.9 } }),
          [0, 1],
          [64, 0]
        )}px`,
        rotate: `${interpolate(
          spring({ frame, fps, config: { damping: 18, stiffness: 140, mass: 0.9 } }),
          [0, 1],
          [-6, 0]
        )}deg`,
        filter: `blur(${interpolate(frame, [0, 0.35 * fps], [10, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}px)`,
        transformOrigin: "left bottom",
        willChange: "transform, opacity, filter",
      }}
    >
      {word}
    </Interactive.Span>
  );
};

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  accentWord,
  accent = kineticTextDefaults.accent,
  background = kineticTextDefaults.background,
  foreground = kineticTextDefaults.foreground,
  fontFamily = kineticTextDefaults.fontFamily,
  stagger = kineticTextDefaults.stagger,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const words = text.trim().split(/\s+/);

  return (
    <AbsoluteFill
      name="Scene"
      style={{
        backgroundColor: background,
        justifyContent: "center",
        alignItems: "center",
        padding: 120,
        fontFamily,
      }}
    >
      <Interactive.Div
        name="Accent glow"
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: 9999,
          background: accent,
          filter: "blur(220px)",
          opacity: interpolate(frame, [0, 1.2 * fps], [0, 0.22], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: String(
            interpolate(frame, [0, durationInFrames], [0.8, 1.15], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          ),
        }}
      />
      <Interactive.Div
        name="Headline"
        style={{
          position: "relative",
          fontSize: 148,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1.02,
          textAlign: "center",
          maxWidth: 1500,
          opacity: interpolate(
            frame,
            [durationInFrames - 0.5 * fps, durationInFrames],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          ),
        }}
      >
        {words.map((word, i) => (
          <Sequence
            key={`${word}-${i}`}
            name="Word timing"
            from={0.3 * fps + i * stagger}
            layout="none"
          >
            <Word
              word={word}
              color={i === accentWord ? accent : foreground}
              isLast={i === words.length - 1}
            />
          </Sequence>
        ))}
      </Interactive.Div>
    </AbsoluteFill>
  );
};

export default KineticText;
