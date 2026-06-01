"use client"

import { CheckCircle2 } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function BuyEstampCta() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-40, 40], [8, -8]), {
    stiffness: 260,
    damping: 22,
    mass: 0.4,
  })
  const rotateY = useSpring(useTransform(x, [-40, 40], [-10, 10]), {
    stiffness: 260,
    damping: 22,
    mass: 0.4,
  })

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const nextX = event.clientX - (rect.left + rect.width / 2)
    const nextY = event.clientY - (rect.top + rect.height / 2)
    x.set(nextX)
    y.set(nextY)
  }

  function handlePointerLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="h-full"
    >
      <Card
        size="sm"
        className="h-full min-h-[204px] rounded-lg border-0 p-4 text-primary-foreground ring-0"
        style={{
          backgroundImage:
            "linear-gradient(135deg, var(--primary-button-from) 0%, var(--primary-button-to) 100%)",
        }}
      >
        <div className="flex h-full flex-col gap-2.5">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            <p className="text-sm font-medium leading-snug">
              Purchase Digital E-Stamp ?
            </p>
          </div>
          <p className="text-xs leading-relaxed text-primary-foreground/85">
            Complete the required document setup, add party information, and select
            the stamp value to proceed with your e-stamp purchase.
          </p>
          <div className="mt-auto">
            <motion.div
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              whileHover={{
                y: -5,
                scale: 1.04,
                boxShadow: "0px 18px 28px rgba(0, 0, 0, 0.28)",
              }}
              whileTap={{
                y: 1,
                scale: 0.98,
                boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                rotateX,
                rotateY,
                transformPerspective: 850,
                backfaceVisibility: "hidden",
              }}
              className="relative inline-block rounded-full drop-shadow-[0_8px_18px_rgba(0,0,0,0.28)] will-change-transform"
            >
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-r from-white/50 via-white/10 to-transparent"
                initial={{ opacity: 0.35 }}
                whileHover={{ opacity: 0.9 }}
                transition={{ duration: 0.2 }}
              />
              <Button
                size="default"
                className="w-fit border border-white/60 bg-background/90 font-semibold text-foreground backdrop-blur-sm"
              >
                Buy E-Stamp
              </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
