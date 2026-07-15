"use client";
import { motion } from "framer-motion";

// Wraps a list grid so children animate in one-by-one on scroll.
// Usage:
//   <StaggerContainer className="grid ...">
//     {items.map(item => <StaggerItem key={item.id}> <Card /> </StaggerItem>)}
//   </StaggerContainer>

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
};

const itemVariants = {
    hidden:  { opacity: 0, y: 22 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
    },
};

export function StaggerContainer({ children, className = "" }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className = "" }) {
    return (
        <motion.div variants={itemVariants} className={className}>
            {children}
        </motion.div>
    );
}
