"use client";
import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code, Terminal, Cpu, Brackets, Shield } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "GPU Accelerated",
      description: "Hardware-accelerated rendering for buttery-smooth UIs",
      icon: <Cpu className="w-6 h-6 text-emerald-500" />
    },
    {
      title: "Type Safe",
      description: "Leverage Rust's type system for reliable applications",
      icon: <Shield className="w-6 h-6 text-violet-500" />
    },
    {
      title: "Declarative",
      description: "Build UIs with a modern, component-based approach",
      icon: <Brackets className="w-6 h-6 text-cyan-500" />
    },
    {
      title: "Native Performance",
      description: "Zero overhead abstractions for maximum speed",
      icon: <Terminal className="w-6 h-6 text-rose-500" />
    }
  ];

  return (
    <div className="dark min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <main className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-48 lg:px-8 lg:pt-56">
          <div className="relative mx-auto max-w-2xl lg:max-w-4xl lg:text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              <span className="inline-block bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
                Zed GPUI
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              A revolutionary GPU-accelerated UI framework for building lightning-fast native applications in Rust
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/docs/getting-started">
                <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="https://github.com/zed-industries/zed">
                <button className="w-full sm:w-auto px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg text-white font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                  View Source <Code className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 bg-gray-800/50 backdrop-blur-sm border-gray-700">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </Card>
              ))}
            </div>

            <div className="mt-24 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 py-12 sm:py-16">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-500 mb-2">60+ FPS</div>
                    <div className="text-sm text-gray-400">Smooth Performance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-500 mb-2">&lt;1ms</div>
                    <div className="text-sm text-gray-400">Render Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-violet-500 mb-2">100%</div>
                    <div className="text-sm text-gray-400">Type Safe</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-24 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Ready to Build?</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/docs/introduction">
                  <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    Read the Docs <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/examples">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg text-white font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                    View Examples <Code className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}