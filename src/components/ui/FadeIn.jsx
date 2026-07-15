"use client";
import { motion } from "framer-motion";

// Wraps children with a scroll-triggered fade + slide animation.
// Usage: <FadeIn delay={0.1} direction="up"> ... </FadeIn>
// direction: "up" | "down" | "left" | "right" | "none"

export default function FadeIn({
    children,
    delay = 0,
    direction = "up",
    duration = 0.5,
    className = "",
}) {
    const offsets = {
        up:    { y: 28, x: 0   },
        down:  { y: -28, x: 0  },
        left:  { y: 0,   x: 28 },
        right: { y: 0,   x: -28 },
        none:  { y: 0,   x: 0  },
    };

    const { y, x } = offsets[direction] || offsets.up;

    return (
        <motion.div
            initial={{ opacity: 0, y, x }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
