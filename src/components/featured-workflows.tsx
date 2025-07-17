"use client";

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Workflow } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

const FeaturedWorkflows = () => {
  const [workflows, setWorkflows] = useState<any[]>([]);

  useEffect(() => {
    const fetchWorkflows = async () => {
      const { data } = await supabase
        .from('workflows')
        .select('id, title, description')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(4);
      setWorkflows(data || []);
    };
    fetchWorkflows();
  }, []);

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start justify-start mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between w-full gap-4 sm:gap-6">
            <h2
              className="font-sans font-light heading-mobile-xl sm:heading-mobile-lg md:heading-mobile lg:text-7xl xl:text-8xl 2xl:text-9xl leading-[10.2] tracking-tight text-white text-left break-words"
              style={{
                fontFamily: 'Albert Sans',
                fontWeight: 300,
                fontStyle: 'normal',
                letterSpacing: 0,
                color: '#FFFFFF',
                margin: 0,
                padding: 0,
                flex: 1,
                minWidth: 0,
                whiteSpace: 'normal',
                overflow: 'visible',
                textOverflow: 'clip',
              }}
            >
              Explore Workflow
            </h2>
            <Link
              href="/workflows"
              className="btn-jelajah w-auto flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 button-text-mobile sm:button-text-mobile-lg whitespace-nowrap flex-shrink-0"
              style={{ height: 'auto', minHeight: '44px' }}
            >
              Jelajahi Workflow
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {workflows.map((workflow) => (
            <div
              key={workflow.id}
              className="bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-700
                         hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out
                         min-h-[200px] sm:min-h-[250px] lg:min-h-[300px]"
            >
              <div className="flex items-start mb-3 sm:mb-4 gap-3 sm:gap-4">
                <svg className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 17V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2z" />
                </svg>
                <h3 className="text-responsive-lg sm:text-xl lg:text-2xl font-bold text-white break-words leading-tight">
                  {workflow.title}
                </h3>
              </div>
              <p className="body-text-mobile sm:body-text-mobile-lg text-gray-300 leading-relaxed break-words line-clamp-3">
                {workflow.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkflows;
