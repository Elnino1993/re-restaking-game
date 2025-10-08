"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

type Choice = {
  text: string
  description: string
  points: number
  isRe: boolean
  image: string
}

type Scenario = {
  id: number
  title: string
  description: string
  leftChoice: Choice
  rightChoice: Choice
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Dream Vacation",
    description: "You saved $3,000 for your break. Where do you go?",
    leftChoice: {
      text: "Luxury Resort in Bali",
      description: "2 weeks of paradise, infinity pools, and Instagram photos",
      points: 0,
      isRe: false,
      image: "/luxury-beach-resort-bali-infinity-pool-sunset.jpg",
    },
    rightChoice: {
      text: "Get reUSDe Insurance Alpha",
      description: "Hold continuously through campaign, earn 5x ⚡+ 5x Ethena sats daily",
      points: 15,
      isRe: true,
      image: "/cryptocurrency-staking-dashboard-growth-chart.jpg",
    },
  },
  {
    id: 2,
    title: "The Car Decision",
    description: "Time for a new ride. Budget: $50,000",
    leftChoice: {
      text: "BMW M3",
      description: "Fast, sleek, depreciates 30% in year one",
      points: 0,
      isRe: false,
      image: "/bmw-m3-sports-car-luxury-vehicle.jpg",
    },
    rightChoice: {
      text: "Provide LP on Curve reUSD:sUSDe",
      description: "Earn 20x ⚡ + 30x Ethena sats daily on Curve",
      points: 20,
      isRe: true,
      image: "/ethereum-cryptocurrency-portfolio-growth.jpg",
    },
  },
  {
    id: 3,
    title: "Tech Upgrade",
    description: "New phone release day! $1,200 burning a hole in your pocket",
    leftChoice: {
      text: "iPhone 17 Pro Max", // Updated from iPhone 17 to iPhone 17 Pro Max
      description: "Slightly better camera, same apps as your current phone",
      points: 0,
      isRe: false,
      image: "/iphone-17-pro-max.webp", // Updated image path to new iPhone 17 Pro Max image
    },
    rightChoice: {
      text: "Get reUSD Basis-Plus",
      description: "Hold continuously through campaign, earn 5x ⚡+ 5x Ethena sats daily",
      points: 15,
      isRe: true,
      image: "/stablecoin-cryptocurrency-defi-protocol.jpg",
    },
  },
  {
    id: 4,
    title: "Fashion Statement",
    description: "Bonus check arrived: $2,500",
    leftChoice: {
      text: "Designer Wardrobe",
      description: "Gucci, Prada, Louis Vuitton - flex for the season",
      points: 0,
      isRe: false,
      image: "/luxury-designer-fashion-gucci-prada-shopping.jpg",
    },
    rightChoice: {
      text: "Swap to YT on Pendle",
      description: "Hold reUSD or reUSDe, swap to YT, earn 30x ⚡+ 5x Ethena sats daily",
      points: 25,
      isRe: true,
      image: "/defi-liquidity-pool-cryptocurrency-earnings.jpg",
    },
  },
  {
    id: 5,
    title: "Entertainment Choice",
    description: "VIP concert tickets or financial freedom? $1,500 to spend",
    leftChoice: {
      text: "VIP Concert Package",
      description: "Meet & greet, front row, one night of memories",
      points: 0,
      isRe: false,
      image: "/vip-concert-tickets-front-row-stage-lights.jpg",
    },
    rightChoice: {
      text: "Provide LP on Pendle",
      description: "Hold reUSD or reUSDe, provide LP on Pendle, earn 30x ⚡ daily",
      points: 25,
      isRe: true,
      image: "/cryptocurrency-investment-growth-financial-freedom.jpg",
    },
  },
  {
    id: 6,
    title: "Gaming Setup",
    description: "New gaming console and accessories: $800",
    leftChoice: {
      text: "PS5 Pro + Games",
      description: "Latest console, 5 AAA games, premium controller",
      points: 0,
      isRe: false,
      image: "/gaming-console-ps5-setup-rgb-lights.jpg",
    },
    rightChoice: {
      text: "Provide LP on Curve reUSD:USDC",
      description: "Stable pair liquidity provision, earn 20x ⚡ daily",
      points: 20,
      isRe: true,
      image: "/cryptocurrency-liquidity-pool-defi-dashboard.jpg",
    },
  },
  {
    id: 7,
    title: "Dining Experience",
    description: "Michelin star restaurant reservation: $600",
    leftChoice: {
      text: "3-Star Michelin Dinner",
      description: "12-course tasting menu, wine pairing, one evening",
      points: 0,
      isRe: false,
      image: "/michelin-star-restaurant-fine-dining-plated-food.jpg",
    },
    rightChoice: {
      text: "Provide LP on Curve reUSDe:sUSDe",
      description: "Ethena-based stable pair, earn 20x ⚡ daily",
      points: 20,
      isRe: true,
      image: "/defi-yield-farming-cryptocurrency-earnings.jpg",
    },
  },
  {
    id: 8,
    title: "Fitness Investment",
    description: "Premium gym membership: $2,000/year",
    leftChoice: {
      text: "Luxury Gym Membership",
      description: "Spa, sauna, personal trainer sessions, towel service",
      points: 0,
      isRe: false,
      image: "/luxury-gym-fitness-center-modern-equipment.jpg",
    },
    rightChoice: {
      text: "Blackhole Concentrated Stable LP",
      description: "Concentrated liquidity position, earn 20x ⚡ daily",
      points: 20,
      isRe: true,
      image: "/concentrated-liquidity-defi-protocol-dashboard.jpg",
    },
  },
  {
    id: 9,
    title: "Home Upgrade",
    description: "New furniture or financial leverage? $4,000 available",
    leftChoice: {
      text: "Designer Furniture Set",
      description: "Italian leather sofa, marble coffee table, aesthetic upgrade",
      points: 0,
      isRe: false,
      image: "/luxury-modern-furniture-italian-leather-sofa-marbl.jpg",
    },
    rightChoice: {
      text: "Use reUSD on Morpho",
      description: "Use reUSD as collateral for borrowing, earn 5x ⚡ daily",
      points: 15,
      isRe: true,
      image: "/defi-lending-borrowing-protocol-collateral.jpg",
    },
  },
]

type PersonaType = {
  name: string
  title: string
  description: string
  image: string
  advice: string
}

const personas: PersonaType[] = [
  {
    name: "Impulsive Spender",
    title: "Living for Today",
    description:
      "You prioritize instant gratification over long-term growth. Every purchase feels good in the moment, but your future self might have different feelings.",
    image: "/person-shopping-bags-credit-cards-spending-money.jpg",
    advice: "Start small. Even one Re Protocol position can change your financial trajectory.",
  },
  {
    name: "Cautious Beginner",
    title: "Taking First Steps",
    description:
      "You're starting to see the value of long-term thinking, but old habits die hard. You made some smart choices, but there's room to grow.",
    image: "/person-thinking-about-investment-decisions-laptop.jpg",
    advice: "You're on the right path. Learn more about Re Protocol's earning opportunities.",
  },
  {
    name: "Balanced Investor",
    title: "Finding Your Way",
    description:
      "You understand the basics of delayed gratification and are building good financial habits. You balance enjoyment with smart investing.",
    image: "/confident-person-financial-planning-balanced-lifes.jpg",
    advice: "Keep learning. Explore advanced strategies like Pendle YT and Curve LP positions.",
  },
  {
    name: "DeFi Strategist",
    title: "Yield Optimizer",
    description:
      "You get it. You understand that today's sacrifices become tomorrow's freedom. You're actively seeking the best yield opportunities.",
    image: "/professional-trader-analyzing-defi-charts-multiple.jpg",
    advice: "You're doing great. Consider diversifying across multiple Re Protocol strategies.",
  },
  {
    name: "Restaking Pro",
    title: "Future-Focused",
    description:
      "You've mastered the art of long-term thinking. You see through marketing hype and focus on building real, sustainable wealth through restaking.",
    image: "/successful-crypto-investor-confident-professional-.jpg",
    advice: "You're nearly perfect. Maximize your positions and help others learn about Re Protocol.",
  },
  {
    name: "Re Protocol Master",
    title: "Perfect Vision",
    description:
      "Flawless execution. You chose every Re Protocol opportunity and understand the power of decentralized restaking. Your future self is already thanking you.",
    image: "/successful-defi-expert-celebrating-achievement-win.jpg",
    advice: "You've achieved mastery. Now share your knowledge and help grow the Re Protocol community.",
  },
]

const getPersona = (points: number, maxPoints: number): PersonaType => {
  const percentage = (points / maxPoints) * 100

  if (percentage === 100) return personas[5] // Re Protocol Master
  if (percentage >= 76) return personas[4] // Restaking Pro
  if (percentage >= 56) return personas[3] // DeFi Strategist
  if (percentage >= 36) return personas[2] // Balanced Investor
  if (percentage >= 16) return personas[1] // Cautious Beginner
  return personas[0] // Impulsive Spender
}

export default function ReWisdomGame() {
  const [currentScene, setCurrentScene] = useState(0)
  const [wisdomPoints, setWisdomPoints] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [selectedChoice, setSelectedChoice] = useState<"left" | "right" | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleChoice = (choice: "left" | "right") => {
    const scenario = scenarios[currentScene]
    const chosenOption = choice === "left" ? scenario.leftChoice : scenario.rightChoice

    setSelectedChoice(choice)
    setShowFeedback(true)

    // Play sound effect (simple beep using Web Audio API)
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = chosenOption.isRe ? 800 : 400
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)

    setTimeout(() => {
      setWisdomPoints((prev) => prev + chosenOption.points)

      setTimeout(() => {
        if (currentScene < scenarios.length - 1) {
          setCurrentScene((prev) => prev + 1)
          setSelectedChoice(null)
          setShowFeedback(false)
        } else {
          setGameEnded(true)
        }
      }, 1500)
    }, 1000)
  }

  const resetGame = () => {
    setCurrentScene(0)
    setWisdomPoints(0)
    setGameStarted(false)
    setGameEnded(false)
    setSelectedChoice(null)
    setShowFeedback(false)
  }

  const getScoreMessage = () => {
    const maxPoints = scenarios.reduce((sum, s) => sum + Math.max(s.leftChoice.points, s.rightChoice.points), 0)
    const percentage = (wisdomPoints / maxPoints) * 100

    if (percentage === 100) return "Re Protocol Master!"
    if (percentage >= 80) return "Restaking Champion"
    if (percentage >= 60) return "DeFi Enthusiast"
    if (percentage >= 40) return "Crypto Curious"
    if (percentage >= 20) return "Getting Started"
    return "NGMI (Not Gonna Make It)"
  }

  useEffect(() => {
    const createStars = () => {
      const starfield = document.querySelector(".starfield")
      if (!starfield) return

      // Clear existing stars
      starfield.innerHTML = ""

      // Create 100 stars
      for (let i = 0; i < 100; i++) {
        const star = document.createElement("div")
        star.className = "star"
        star.style.left = `${Math.random() * 100}%`
        star.style.top = `${Math.random() * 100}%`
        star.style.animationDelay = `${Math.random() * 3}s`
        star.style.animationDuration = `${2 + Math.random() * 3}s`
        starfield.appendChild(star)
      }
    }

    createStars()
  }, [])

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        <div className="starfield" />

        <Card className="max-w-2xl w-full bg-black/80 border-purple-500/20 backdrop-blur-sm animate-scale-in relative z-10">
          <div className="p-8 md:p-12 text-center space-y-6">
            <div className="flex justify-center mb-4">
              <div className="relative w-24 h-24 animate-float">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/octopus_transparent%20%288%29-yNpHOXUAUUFg36wwZptTnTvKuGy45h.png"
                  alt="Re Protocol Mascot"
                  fill
                  className="object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                />
              </div>
            </div>

            <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
              <span className="text-purple-400 text-sm font-mono">Re Protocol</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white text-balance">
              Spend or <span className="text-purple-400">(Re)Stake?</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto text-pretty">
              Make 9 choices. Each decision shapes your financial future. Will you choose instant gratification or
              long-term growth? Discover who you become.
            </p>

            <div className="pt-4">
              <Button
                onClick={() => setGameStarted(true)}
                size="lg"
                className="bg-purple-500 text-white hover:bg-purple-600 font-semibold px-8 py-6 text-lg rounded-full"
              >
                Start Your Journey
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (gameEnded) {
    const maxPoints = scenarios.reduce((sum, s) => sum + Math.max(s.leftChoice.points, s.rightChoice.points), 0)
    const percentage = (wisdomPoints / maxPoints) * 100
    const persona = getPersona(wisdomPoints, maxPoints)

    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        <div className="starfield" />

        <Card className="max-w-3xl w-full bg-black/80 border-purple-500/20 backdrop-blur-sm animate-scale-in relative z-10">
          <div className="p-8 md:p-12 space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
                <span className="text-purple-400 text-sm font-mono">Game Complete</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white">Your Future Self Score</h2>
            </div>

            <div className="text-center space-y-4">
              <div className="text-7xl md:text-8xl font-bold text-purple-400 animate-scale-in">{wisdomPoints}</div>
              <div className="text-xl text-gray-400">Re Wisdom Points</div>
            </div>

            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="pt-6 space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-white">You Are:</h3>
                <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500/20 to-purple-500/5 border border-purple-500/30 rounded-full">
                  <span className="text-purple-400 text-3xl font-bold">{persona.name}</span>
                </div>
                <p className="text-gray-400 text-lg italic">{persona.title}</p>
              </div>

              <div className="flex justify-center">
                <div className="relative w-64 h-80 flex items-center justify-center">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Buffy%20%286%29-bhWjm6hoBHYwWaV9jCaQiKhPbHIhZ3.png"
                    alt={persona.name}
                    width={256}
                    height={320}
                    className="object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.4)] animate-float"
                  />
                </div>
              </div>

              <div className="bg-gray-900/50 border border-purple-500/10 rounded-xl p-6 space-y-4">
                <p className="text-gray-300 text-center leading-relaxed">{persona.description}</p>
                <div className="pt-2 border-t border-purple-500/10">
                  <p className="text-purple-400 text-center font-semibold">💡 {persona.advice}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={resetGame}
                  variant="outline"
                  size="lg"
                  className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 bg-transparent rounded-full"
                >
                  Play Again
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  const scenario = scenarios[currentScene]

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="starfield" />

      {/* Header with progress and points */}
      <div className="w-full max-w-6xl mb-8 animate-fade-in relative z-10">
        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentScene + 1) / scenarios.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main scenario card */}
      <Card className="max-w-6xl w-full bg-black/80 border-purple-500/20 backdrop-blur-sm animate-scale-in relative z-10">
        <div className="p-6 md:p-8 space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-balance">{scenario.title}</h2>
            <p className="text-gray-400 text-lg md:text-xl text-pretty">{scenario.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-6">
            {/* Left choice */}
            <button
              onClick={() => !showFeedback && handleChoice("left")}
              disabled={showFeedback}
              className={`group relative rounded-xl border-2 transition-all duration-300 text-left overflow-hidden ${
                selectedChoice === "left"
                  ? "border-red-500 bg-red-500/10 scale-105"
                  : selectedChoice === "right"
                    ? "opacity-50 scale-95"
                    : "border-gray-700 hover:border-gray-500 hover:scale-105"
              } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={scenario.leftChoice.image || "/placeholder.svg"}
                  alt={scenario.leftChoice.text}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors">
                    {scenario.leftChoice.text}
                  </span>
                  <div className="w-8 h-8 rounded-full border-2 border-gray-600 group-hover:border-gray-400 transition-colors flex items-center justify-center text-lg">
                    💸
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{scenario.leftChoice.description}</p>
                {selectedChoice === "left" && showFeedback && (
                  <div className="pt-2 text-red-400 text-sm font-semibold animate-fade-in">
                    +{scenario.leftChoice.points} points
                  </div>
                )}
              </div>
            </button>

            {/* Right choice */}
            <button
              onClick={() => !showFeedback && handleChoice("right")}
              disabled={showFeedback}
              className={`group relative rounded-xl border-2 transition-all duration-300 text-left overflow-hidden ${
                selectedChoice === "right"
                  ? "border-purple-500 bg-purple-500/10 scale-105"
                  : selectedChoice === "left"
                    ? "opacity-50 scale-95"
                    : "border-purple-500/30 hover:border-purple-500 hover:scale-105"
              } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={scenario.rightChoice.image || "/placeholder.svg"}
                  alt={scenario.rightChoice.text}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {scenario.rightChoice.text}
                  </span>
                  <div className="w-8 h-8 rounded-full border-2 border-purple-500/50 group-hover:border-purple-500 transition-colors flex items-center justify-center text-lg">
                    ⚡
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{scenario.rightChoice.description}</p>
                {selectedChoice === "right" && showFeedback && (
                  <div className="pt-2 text-purple-400 text-sm font-semibold animate-fade-in">
                    +{scenario.rightChoice.points} points
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
