'use client';

import React from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowUpRight 
} from 'lucide-react';
import { COSMIC_DATA } from '../data/cosmicPortfolioData';

export default function BlogInsights() {
  const { blogPosts } = COSMIC_DATA;

  return (
    <section id="blog" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/[0.08] border border-amber-200/20 text-[#E5C378] text-xs font-mono font-medium uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" /> Editorial &amp; Perspectives
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Technical Insights &amp; Architectural Writings
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed text-justify sm:text-center">
            Reflections, engineering guides, and practical architectural patterns from working with computer vision models, LLM APIs, and modern full-stack frameworks.
          </p>
        </div>

        {/* 3 Editorial Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="luxury-card p-6 sm:p-7 flex flex-col justify-between group transition-all duration-300 relative overflow-hidden"
            >
              <div>
                {/* Category & Meta */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-amber-400/[0.08] border border-amber-200/20 text-[#E5C378]">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#E5C378]/70" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#E5C378]/70" /> {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Article Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white font-heading mb-3 group-hover:text-[#E5C378] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify mb-5 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {post.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] border border-amber-200/15 text-zinc-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Read More Link */}
              <div className="pt-4 border-t border-white/[0.07] flex items-center justify-between text-xs font-mono font-medium text-[#E5C378] group-hover:text-[#F7E7C4]">
                <span>Read Technical Monograph</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
